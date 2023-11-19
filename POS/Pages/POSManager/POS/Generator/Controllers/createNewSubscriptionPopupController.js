

rootModule.controller('createNewSubscriptionPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data, commonHelper) {

	$scope.customerNameInputfield = data.customer.name;
	$scope.customerIdInputfield = data.customer.id;
	$scope.createSubscription = function () {
		var subscriptionData = {
			"creator": "admin@gsm.com",
			"customer_id": data.customer.id,
			"ampsSize": $scope.amps_size,
			"monthlyFees": $scope.monthly_fees,
			"serviceType": $scope.service_type,
			"beginCounter": 0.0
		}
		commonHelper.createRequest("POST", "/FPOS/rest/generatorSubscription/create", subscriptionData).then(function (response) {
			$scope.closeModal();
		});
	}

	$scope.handleServiceTypeChanged = function ($event) {
		if ($event.srcElement.value == "OPEN_USAGE") {
			$scope.ampPrice = 25;
		} else {
			$scope.ampPrice = 1;
		}
		$scope.setMonthlyFees();
	}

	$scope.setMonthlyFees = function () {
		$scope.monthly_fees = $scope.amps_size * $scope.ampPrice;
	}

	$scope.closeModal = function() {
		$uibModalInstance.close();
	}
});