

rootModule.controller("shiftsController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "$translate", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService, $translate) {



	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	function GetAllShiftsAsync() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
			url: "/api/SmApi/GetAllShiftsAsync",
			data: { sessionId: localStorage.getItem('session_id_sm') }
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
							$scope.shiftsList = result.resultData;
							console.log($scope.shiftsList);

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

	GetAllShiftsAsync();



	$scope.goToShiftInfo = function (item) {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Shifts/Views/shiftsInfoPopup.html',
			controller: 'shiftsInfoPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { item: item };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed
			if (Result === 'Succeeded') {
				$rootScope.transactionsList = [];
				localStorage.setItem("transList", JSON.stringify($rootScope.transactionsList));
				$scope.transTotalLebanese = "";
				$scope.transTotalDollar = "";
				$rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
			}

		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});


	};

	$scope.goToHistoryPage = function () {

		$timeout(function () {
			$state.go('pos.shiftHistory');
		})

	};


	$scope.refreshReceiptsGrid = function () {
		getAllReceipts();
	}

}]);


