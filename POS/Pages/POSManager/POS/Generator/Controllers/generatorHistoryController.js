rootModule.controller("generatorHistoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService, $common_helper) {

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
		$('#customersHistoryTable').DataTable().column(2)
			.search(criteria)
			.draw();
		selectFilter($event.srcElement.id);
	}


	$("#customersSearchField").on('keyup', function () {
		$('#customersHistoryTable').dataTable().fnFilter(this.value);
	});

	minDate = new DateTime('#min', {
		format: 'MMMM Do YYYY'
	});
	maxDate = new DateTime('#max', {
		format: 'MMMM Do YYYY'
	});

	$common_helper.createRequest("GET", "/FPOS/rest/generatorCustomer/history")
		.then(function (response) {
			$scope.customerList = response.data;
		});
	$scope.openSubscriptionPopup = function (customer) {
		
		var modalInstance = $uibModal.open({
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

}]);


