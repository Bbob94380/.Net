rootModule.controller('addInvoicePopupController', function ($scope, $rootScope, $uibModal, $http, $filter, $uibModalInstance, data) {

	function unselectAllfilters() {
		var filtersIds = ["popup-kw-filter", "popup-ampere-filter"];
		filtersIds.forEach((filterbuttonId) => {
			$("#" + filterbuttonId).css({ "backgroundColor": "#fff", "color": "black" });
		})
	}
	function selectFilter(filterId) {
		$("#" + filterId).css({ "backgroundColor": "#D80404", "color": "white" });
	}

	selectFilter("popup-kw-filter");

	$scope.filterTable = function ($event, criteria) {
		unselectAllfilters();
		$('#dataTableCustomerInvoicesId').DataTable().column(2)
			.search(criteria)
			.draw();
		selectFilter($event.srcElement.id);
	}

	$rootScope.showLoader = true;

	$http({
		method: "GET",
		url: "http://localhost:8080/FPOS/rest/generatorInvoice/findAll",
		withCredentials: true,
		headers: {
			"Access-Control-Allow-Origin": "http://localhost:44346",
		},
	}).then(function (response) {
		console.log("Received invoices list");
		console.log(response.data);
		$scope.invoicesList = response.data;
	});

	$rootScope.showLoader = false;

	$scope.closeModal = function () {
		$uibModalInstance.close();
	}

});