rootModule.controller("generatorInvoicesController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService) {

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
			console.log("Viewing generator history page.")
			$state.go('pos.generatorHistory');
		})

	};

	minDate = new DateTime('#min', {
		format: 'MMMM Do YYYY'
	});
	maxDate = new DateTime('#max', {
		format: 'MMMM Do YYYY'
	});


}]);


