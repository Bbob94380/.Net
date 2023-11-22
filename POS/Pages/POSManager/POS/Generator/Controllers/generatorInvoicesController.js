﻿rootModule.controller("generatorInvoicesController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService, $common_helper) {

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

	$scope.filterTable = function ($event, criteria) {
		unselectAllfilters();
		$('#dataTableCustomerInvoicesId').DataTable().column(2)
			.search(criteria)
			.draw();
		selectFilter($event.srcElement.id);
	}

	$scope.goToHistoryPage = function (person) {
		$timeout(function () {
			$state.go('pos.generatorHistory');
		})
	};
	$common_helper.createRequest("GET", "/FPOS/rest/generatorSubscription/findAll").then(function (response) {
		console.log("Retrieved Customer Subscriptions");
		$scope.subscriptionsList = response.data;
	});

	$scope.addInvoice = function (customer) {
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

		modalInstance.result.then(function (Result) { }, function () { });
	}

}]);


