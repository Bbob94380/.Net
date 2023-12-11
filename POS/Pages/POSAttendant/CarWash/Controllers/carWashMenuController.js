posAttendantRootModule.controller("carWashMenuController", ["$scope", "$uibModal", "$http", "$rootScope", "$filter", function ($scope, $uibModal, $http, $rootScope, $filter) {

	$rootScope.dryItemsList = [];

	$scope.displayCarWashTransactionPopup = function (carWashType, carTypeLang) {

		if (localStorage.getItem("isCurrentEmployeeHasOpenShift") !== "true") {
			swal($filter('translate')('noOpenShift'), "", "warning");
			return;
		}

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSAttendant/CarWash/Views/carWashTransactionPopup.html',
			controller: 'carWashTransactionPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { carWashType: carWashType, carTypeLang: carTypeLang };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed


		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});

		modalInstance.opened.then(function () {
			//alert('hi');
		});


	};

	

}]);


