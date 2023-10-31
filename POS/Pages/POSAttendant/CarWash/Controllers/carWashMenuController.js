posAttendantRootModule.controller("carWashMenuController", ["$scope", "$uibModal", "$http", "$rootScope", function ($scope, $uibModal, $http, $rootScope) {

	$rootScope.dryItemsList = [];

	$scope.displayCarWashTransactionPopup = function (carWashType) {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSAttendant/CarWash/Views/carWashTransactionPopup.html',
			controller: 'carWashTransactionPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { carWashType: carWashType};
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


