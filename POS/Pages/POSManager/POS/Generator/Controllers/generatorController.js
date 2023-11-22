rootModule.controller("generatorController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService, $common_helper) {
	function unselectAllfilters() {
		var filtersIds = ["clear-filters", "kw-filter", "ampere-filter"];
		filtersIds.forEach((filterbuttonId) => {
			$("#" + filterbuttonId).css({ "backgroundColor": "#fff", "color": "black" });
		})
	}
	function selectFilter(filterId) {
		$("#" + filterId).css({ "backgroundColor": "#D80404", "color": "white" });
	}

	selectFilter("clear-filters");

	$rootScope.showLoader = true;
	$("#generatorSearchTextField").on('keyup', function () {
		$('#customersTable').dataTable().fnFilter(this.value);
	});

	

	$common_helper.createRequest("GET", "/FPOS/rest/generatorCustomer/findAll")
	.then(function (response) {
		$scope.customerList = response.data;
		$scope.customerList.forEach((customer) => {
			console.log("Finding unpaid subs for customer: ", customer.id);
			customer.totalAmount = 0;
			$common_helper.createRequest("GET", "/FPOS/rest/generatorSubscription/findUnpaidByCustomerId/" + customer.id)
				.then(function (response) {
					console.log("Unpaid data: ", response.data);
					unpaidInvoices = response.data;
					customer.unpaidInvoicesCount = unpaidInvoices.length;
					console.log("Found Unpaid Subscriptions: ", customer.unpaidInvoicesCount);
					unpaidInvoices.forEach((invoice) => {
						customer.totalAmount = customer.totalAmount + invoice.monthlyFees;
					});
				});
		});
		
	});

	$scope.filterTable = function ($event, criteria) {
		unselectAllfilters();
		$('#customersTable').DataTable().column(2)
			.search(criteria)
			.draw();
		selectFilter($event.srcElement.id);
	}

	$scope.goToInvoicesPage = function () {
		$timeout(function () {
			$state.go('pos.generatorInvoices');
		});
	}

	/*$scope.goToSubscriptionsPage = function () {
		$timeout(function () {
			$state.go('pos.generatorSubscriptions');
		});
	}*/
	$scope.openCreateNewCustomerPopup = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/createNewCustomerPopup.html',
			controller: 'createNewCustomerPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { transactionItem: "11", "customerId" : "10"};
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed
		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed
		});


	};

	$scope.goToCustomerInvoices = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/customerInvoicesPopup.html',
			controller: 'customerInvoicesPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { transactionItem: "11" };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed


		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});

		
	};


	$scope.goToHistoryPage = function (person) {

		$timeout(function () {
			console.log("Viewing generator history page.")
			$state.go('pos.generatorHistory');
		})

	};
	/*$scope.addInvoice = function (customer) {
		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/addInvoicePopup.html',
			controller: 'addInvoicePopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { transactionItem: "11", customer: customer };
				}
			}
		});

		modalInstance.result.then(function (Result) {}, function () {});
	}*/

	$scope.openSubscriptionPopup = function (customer) {
		console.log("customer was passed: ", customer);
		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/createNewSubscriptionPopup.html',
			controller: 'createNewSubscriptionPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { transactionItem: "11", "customer": customer };
				}
			}
		});
	}

	$rootScope.showLoader = false;

}]);


