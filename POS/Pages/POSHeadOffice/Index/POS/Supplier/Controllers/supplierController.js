rootHOModule.controller("supplierController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "$translate", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, $translate) {

	if (localStorage.getItem('languageSM') === 'en') {
		$translate.use('en');
	} else if (localStorage.getItem('languageSM') === 'ar') {
		$translate.use('ar');
	}

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	$scope.getAllSuppliers = function() {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/GetAllSuppliersAsync",
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

						$scope.suppliersList = result.resultData;


					} else {
						swal("Oops", "No suppliers found", "");
					}

				} else {
					swal("Oops", "No suppliers found", "");
				}

			} else {
				swal("Oops", "Failed getting suppliers", "");
			}


		}, function (error) {
				swal("Oops", "Failed getting suppliers", "");
			$rootScope.showLoader = false;
		});

	};

	$scope.getAllSuppliers();


	//Open transaction info popup
	$scope.openCreateNewSupplierPopup = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSHeadOffice/Index/POS/Supplier/Views/createNewSupplierPopup.html',
			controller: 'createNewSupplierPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { supplierItem: "bb" };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed


		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});
	};


	$scope.goToSupplierInfo = function (person) {

		$timeout(function () {
			$state.go('pos.supplierInfo', {
				item: person
			});
		})

	};


}]);


