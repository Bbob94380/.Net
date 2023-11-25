rootModule.controller("receiptsHistoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService) {

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


	$scope.getReceiptsHistory = function (dateFrom, dateTo) {

		var historyPayload = {
			fromDate: changeDateFormat(dateFrom),
			toDate: changeDateFormat(dateTo)
		}


		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/SmApi/getReceiptsHistory",
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



						var isCardPaid = false;
						var isCashPaid = false;
						var isDollarPaid = false;
						var isLLPaid = false;

						if (result.resultData !== null && result.resultData !== undefined) {

							for (let i = 0; i < result.resultData.length; i++) {

								result.resultData[i].ReceiptTotalMC = 0;
								result.resultData[i].ReceiptTotalSC = 0;

								for (let j = 0; j < result.resultData[i].transactions.length; j++) {

									var trans = result.resultData[i].transactions[j];
									result.resultData[i].ReceiptTotalMC += trans.netTotalMc;
									result.resultData[i].ReceiptTotalSC += trans.netTotalSc;


									if (trans.firstCardTypeAmount !== 0 && trans.firstCardTypeAmount !== null) {
										isCardPaid = true;

										if (trans.firstCardCurrency === "USD") {
											isDollarPaid = true;
										}

										if (trans.firstCardCurrency === "LBP") {
											isLLPaid = true;
										}
									}

									if (trans.secondCardTypeAmount !== 0 && trans.secondCardTypeAmount !== null) {
										isCardPaid = true;

										if (trans.secondCardCurrency === "USD") {
											isDollarPaid = true;
										}

										if (trans.secondCardCurrency === "LBP") {
											isLLPaid = true;
										}
									}



									if ((trans.cachAmountMc !== 0 && trans.cachAmountMc !== null) || (trans.cachAmountSc !== 0 && trans.cachAmountSc !== null)) {
										isCashPaid = true;

										if (trans.cachAmountMc !== 0) {
											isLLPaid = true;
										}

										if (trans.cachAmountSc !== 0) {
											isDollarPaid = true;
										}
									}

								}//end for loop

								if (isCardPaid && isCashPaid) {
									result.resultData[i].wop = $filter('translate')('CashAndcard');
								} else if (isCardPaid) {
									result.resultData[i].wop = $filter('translate')('card');
								} else if (isCashPaid) {
									result.resultData[i].wop = $filter('translate')('cash');
								} else {
									result.resultData[i].wop = "";
								}

								if (isDollarPaid && isLLPaid) {
									result.resultData[i].currency = $filter('translate')('LebaneseAnddollar');
								} else if (isDollarPaid) {
									result.resultData[i].currency = $filter('translate')('dollar');
								} else if (isLLPaid) {
									result.resultData[i].currency = $filter('translate')('lebanese');
								} else {
									result.resultData[i].currency = "";
								}


								if (result.resultData[i].transactions !== null && result.resultData[i].transactions !== undefined) {
									result.resultData[i].numberOfTransactions = result.resultData[i].transactions.length;
								}


							}// end for loop
						}


						$scope.ReceiptsList = result.resultData;




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


