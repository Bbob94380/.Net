rootModule.controller("shiftsHistoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService) {

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	let minDate, maxDate;

	// Custom filtering function which will search data in column four between two values
	DataTable.ext.search.push(function (settings, data, dataIndex) {
		let min = minDate.val();
		let max = maxDate.val();
		let date = new Date(data[3]);

		if (
			(min === null && max === null) ||
			(min === null && date <= max) ||
			(min <= date && max === null) ||
			(min <= date && date <= max)
		) {
			return true;
		}
		return false;
	});

	// Create date inputs
	minDate = new DateTime('#min', {
		format: 'DD-MM-YYYY'
	});
	maxDate = new DateTime('#max', {
		format: 'DD-MM-YYYY'
	});


	// Refilter the table
	document.querySelectorAll('#min, #max').forEach((el) => {
		el.addEventListener('change', () => $('#dataTableId').dataTable().fnFilter(this.value));
	});



	function changeDateFormat(date) {

		const yyyy = date.getFullYear();
		let mm = date.getMonth() + 1; // Months start at 0!
		let dd = date.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		const formattedToday = dd + '-' + mm + '-' + yyyy;

		return formattedToday;

	}


	$scope.getShiftsHistory = function (dateFrom, dateTo) {

		var historyPayload = {
			fromDate: changeDateFormat(dateFrom),
			toDate: changeDateFormat(dateTo)
		}


		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/SmApi/getShiftsHistory",
			data: { sessionId: localStorage.getItem('session_id_sm'), historyPayload: historyPayload }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						var dt = $("#dataTableId").DataTable();
						dt.destroy();

						angular.element(document).ready(function () {
							dataTable = $('#dataTableId');
							$("#dataTableId").DataTable({
								"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
								pageLength: 5,
								"dom": "lrtip",
								pagingType: "full_numbers"
							});
						});


						if (result.resultData !== null && result.resultData !== undefined) {
							$scope.shiftsHistoryList = result.resultData;
							console.log($scope.shiftsHistoryList);

						}




					} else {
						//swal("Oops", "Failed getting receipts", "");
					}

				} else {
					//swal("Oops", "No receipts found", "");
				}

			} else {
				//swal("Oops", "Failed getting receipts", "");
			}


		}, function (error) {
			//swal("Oops", "Failed getting receipts", "error");
			$rootScope.showLoader = false;
		});

	};

}]);


