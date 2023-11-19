

rootModule.controller('createNewCustomerPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data, commonHelper) {


	$scope.createCustomer = function () {
		var customerData = {
			"creator": "admin@gsm.com",
			"name": $scope.customerNameInputfield,
			"mobileNum": $scope.phone_number
		}
		commonHelper.createRequest("POST", "/FPOS/rest/generatorCustomer/create", customerData).then(function (response) {
			console.log("Customer was created successfully");
			$scope.closeModal();
		});
	}

	$scope.closeModal = function() {
		$uibModalInstance.close();
	}
});