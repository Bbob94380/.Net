

rootModule.controller("generatorController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService) {

	function createRequest(method, url) {
		return $http({
			method: method,
			url: "http://localhost:8080" + url,
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "http://localhost:44346",
			},
		});
	}

	function unselectAllfilters() {
		var filtersIds = ["clear-filters", "kw-filter", "ampere-filter"];
		filtersIds.forEach((filterbuttonId) => {
			$("#" + filterbuttonId).css({ "backgroundColor": "#fff", "color": "black" });
		})
	}
	function selectFilter(filterId) {
		$("#" + filterId).css({ "backgroundColor": "#D80404", "color": "white" });
	}

	$rootScope.showLoader = true;
	$("#generatorSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	selectFilter("clear-filters");

	createRequest("GET", "/FPOS/rest/generatorCustomer/findAll")
	.then(function (response) {
		console.log("Data = ", response.data);
		$scope.GeneratorList = response.data;
	});

	$scope.filterTable = function ($event, criteria) {
		unselectAllfilters();
		$('#dataTableId').DataTable().column(2)
			.search(criteria)
			.draw();
		selectFilter($event.srcElement.id);
	}

	$scope.goToInvoicesPage = function () {
		$timeout(function () {
			$state.go('pos.generatorInvoices');
		});
	}
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
			$uibModal.close();
			$uibModal.dismiss();
		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
			$uibModal.close();
			$uibModal.dismiss();
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



	$scope.addInvoice = function () {
		console.log("Add Invoice has been called");
		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/addInvoicePopup.html',
			controller: 'addInvoicePopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
					return { transactionItem: "11" };
				}
			}
		});

		modalInstance.result.then(function (Result) {}, function () {});
	}

	$rootScope.showLoader = false;

}]);


