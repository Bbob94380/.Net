

rootModule.controller('createNewCustomerPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data, commonHelper) {

	console.log("Testing receiving data in popup: ", data.customerId);

	$scope.shouldCreateNewCustomer = false;
	$scope.shouldDisablePhoneNumber = true;

	function createRequest(method, url, data) {
		return $http({
			method: method,
			url: "http://localhost:8080" + url,
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "http://localhost:44346",
			},
			data: data
		});
	}

	commonHelper.test();

	$scope.checkIfCustomerExists = function (fullNameValue) {
		var url = "/FPOS/rest/generatorCustomer/findByName/";
		var data = { "name": fullNameValue };
		createRequest("POST", url, data).then(function (response) {
			console.log("received the following response data: ", response.data);
			if (response.data.length === 0) {
				$scope.shouldCreateNewCustomer = true;
				$scope.shouldDisablePhoneNumber = false;
			} else {
				$scope.customer_id = response.data.id;
				$scope.phone_number = response.data.mobileNum;
			}
		});
	}

	$scope.createNewSubscription = function () {
		if ($scope.shouldCreateNewCustomer) {
			var customerData = {
				"creator": "admin@gsm.com",
				"name": $scope.customerNameInputfield,
				"mobileNum": $scope.phone_number,
				"numOfInvoices": 0
			}
			console.log("Creating the following customer with the following data: ", customerData);
			createRequest("POST", "/FPOS/rest/generatorCustomer/create", customerData).then(function (response) {
				console.log("created new customer successfully with response: ", response);
				$scope.customer_id = response.data.id;
				createSubscription();
			});
		} else {
			createSubscription();
		}
	}

	function createSubscription() {
		var url = "/FPOS/rest/generatorSubscription/create";
		var subscriptionData = {
			"creator": "admin@gsm.com",
			"ampsSize": $scope.ampSize,
			"customer_id": $scope.customer_id,
			"serviceType": $scope.serviceType,  // OPEN_USAGE or PAY_AS_YOU_GO
			"startDate": "2023-10-1",
			"endDate": "2023-11-1",
			"payStatus": "PAID",     //PAID OR UNPAID
			"beginCounter": 0.0
		}
		console.log("Submitting the following data: ", subscriptionData);
		createRequest("POST", url, data).then(function (response) {
			console.log("Created new subscription successfully with response: ", response);
		});
		$uibModalInstance.close();
	}

	$scope.closeModal = function() {
		$uibModalInstance.close();
	}
});