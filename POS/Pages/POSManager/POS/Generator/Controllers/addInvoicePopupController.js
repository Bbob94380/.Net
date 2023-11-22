rootModule.controller('addInvoicePopupController', function ($scope, $rootScope, $uibModal, $http, $filter, $uibModalInstance, data, commonHelper) {

	console.log("Customer: ", data.customer);
	$scope.customer = data.customer;
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

	/*$rootScope.showLoader = true;*/

	console.log("Calling request from insidde controller");
	commonHelper.create_request("GET", "/FPOS/rest/generatorSubscription/getKwPrice").then(function (response) {
		console.log("KW Price: ", response.data);
		$scope.kwPrice = response.data;
		commonHelper.create_request("GET", "/FPOS/rest/generatorInvoice/findAll")
			.then(function (response) {
				console.log("Received invoices list");
				console.log(response.data);
				$scope.invoicesList = response.data;
				/*$rootScope.showLoader = true;*/
			});
	});

	$scope.closeModal = function () {
		$uibModalInstance.close();
	}

});