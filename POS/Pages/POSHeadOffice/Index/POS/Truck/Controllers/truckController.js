rootHOModule.controller("truckController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "$translate", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, $translate) {

	if (localStorage.getItem('languageSM') === 'en') {
		$translate.use('en');
	} else if (localStorage.getItem('languageSM') === 'ar') {
		$translate.use('ar');
	}

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	$scope.getAllTrucks = function() {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/GetAllTrucksAsync",
			data: { sessionId: localStorage.getItem('session_id_ho') }
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

						$scope.trucksList = result.resultData;


					} else {
						swal("Oops", "No trucks found", "");
					}

				} else {
					swal("Oops", "No trucks found", "");
				}

			} else {
				swal("Oops", "Failed getting trucks", "");
			}


		}, function (error) {
				swal("Oops", "Failed getting trucks", "");
			$rootScope.showLoader = false;
		});

	};

	$scope.getAllTrucks();


	//Open transaction info popup
	$scope.openCreateNewTruckPopup = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSHeadOffice/Index/POS/Truck/Views/createNewTruckPopup.html',
			controller: 'createNewTruckPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { truckItem: "bb", supplier: "" };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed


		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});
	};


	$scope.goToTruckInfo = function (person) {

		$timeout(function () {
			$state.go('pos.truckInfo', {
				item: person
			});
		})

	};


}]);


