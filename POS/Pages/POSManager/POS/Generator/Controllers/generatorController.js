

rootModule.controller("generatorController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService) {

	$("#generatorSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	$scope.GeneratorList =
		[
			{
				id: '1',
				Customer: 'ali',
				Type: 'Kw - 40 AM',
				Mobile: '+961-76734561',
				Invoice: 20,
				unPaid: 2,
				total: 150
			},
			{
				id: '2',
				Customer: 'mhd',
				Type: 'Kw - 50 AM',
				Mobile: '+961-76734561',
				Invoice: 17,
				unPaid: 29,
				total: 150
			},
		{
			id: '3',
			Customer: 'hassan',
			Type: 'Ampere - 60 AM',
			Mobile: '+961-76734561',
			Invoice: 90,
			unPaid: 0,
			total: 150
		},
		{
			id: '4',
			Customer: 'hussein',
			Type: 'Kw - 22 AM',
			Mobile: '+961-76734561',
			Invoice: 12,
			unPaid: 6,
			total: 150
		},
		{
			id: '5',
			Customer: 'jaafar',
			Type: 'Ampere - 24 AM',
			Mobile: '+961-76734561',
			Invoice: 40,
			unPaid: 5,
			total: 150
		},
		{
			id: '6',
			Customer: 'walid',
			Type: 'Kw - 25 AM',
			Mobile: '+961-76734561',
			Invoice: 10,
			unPaid: 0,
			total: 150
		},
		];


	$scope.allClicked = function () {
		$scope.filterTable = ""

		$("#clear-filters").css({ "backgroundColor": "#D80404", "color": "white" });
		$("#wet-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#dry-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#car-filters").css({ "backgroundColor": "#fff", "color": "black" });

		$('#dataTableId').DataTable().column(2)
			.search("")
			.draw();
	}

	$scope.kwClicked = function () {
		$scope.filterTable = "kw";

		$("#clear-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#wet-filters").css({ "backgroundColor": "#D80404", "color": "white" });
		$("#dry-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#car-filters").css({ "backgroundColor": "#fff", "color": "black" });

		$('#dataTableId').DataTable().column(2)
			.search("kw")
			.draw();
	}

	$scope.ampereClicked = function () {
		$scope.filterTable = "Ampere";

		$("#clear-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#wet-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#dry-filters").css({ "backgroundColor": "#D80404", "color": "white" });
		$("#car-filters").css({ "backgroundColor": "#fff", "color": "black" });

		$('#dataTableId').DataTable().column(2)
			.search("Ampere")
			.draw();
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


	$scope.goToReceiptInfo = function (person) {

		$timeout(function () {
			$state.go('pos.receiptInfo', {
				item: person
			});
		})

	};

	$scope.goToHistoryPage = function (person) {

		$timeout(function () {
			$state.go('pos.receiptHistory');
		})

	};

	$scope.addNewReceipt = function (item) {

		var dt = $("#dataTableId").DataTable();
		dt.destroy();

		angular.element(document).ready(function () {
			dataTable = $('#dataTableId');
			$("#dataTableId").DataTable({
				"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
				pageLength: 5,
				"dom": "lrtip",
				pagingType: "full_numbers"
			});
		});
		$scope.ReceiptsList.push(item);

	}

}]);


