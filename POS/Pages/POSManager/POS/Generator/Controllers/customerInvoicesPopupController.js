
rootModule.directive('customerinvoicesTable', function ($timeout) {
	return {
		restrict: 'A',
		link: function () {
			$timeout(function () {
				$("#dataTableCustomerInvoicesId").DataTable({
					"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
					pageLength: 5,
					"dom": "lrtip",
					pagingType: "full_numbers"
				});
			});
		}
	}
});

rootModule.controller('customerInvoicesPopupController', function ($scope, $rootScope, $uibModal, $http, $filter, $uibModalInstance, data) {

	$scope.invoicesList =
		[
			{
				id: '1',
				type: 'kw',
				isPaid: 'pay',
				range: 890,
				consuming: '1/4/2023',
				price: 34,
				total: 20000
			},
			{
				id: '2',
				type: 'kw',
				isPaid: 'unPaid',
				range: 890,
				consuming: '1/4/2023',
				price: 423,
				total: 20000
			},
		{
			id: '3',
			type: 'kw',
			isPaid: 'unPaid',
			range: 890,
			consuming: '1/4/2023',
			price: 423,
			total: 20000
		},
			{
				id: '4',
				type: 'AM',
				isPaid: 'unPaid',
				range: 890,
				consuming: '1/4/2023',
				price: 423,
				total: 20000
			},
			{
				id: '5',
				type: 'AM',
				isPaid: 'unPaid',
				range: 75,
				consuming: '1/4/2023',
				price: 534,
				total: 20000
			},
			{
				id: '6',
				type: 'kw',
				isPaid: 'unPaid',
				range: 75,
				consuming: '1/4/2023',
				price: 312,
				total: 20000
			},
			{
				id: '7',
				type: 'kw',
				isPaid: 'pay',
				range: 54,
				consuming: '1/4/2023',
				price:31,
				total: 20000
			},
			{
				id: '8',
				type: 'kw',
				isPaid: 'pay',
				range: 432,
				consuming: '1/4/2023',
				price: 312,
				total: 20000
			},
			{
				id: '9',
				type: 'AM',
				isPaid: 'pay',
				range: 432,
				consuming: '1/4/2023',
				price: 423,
				total: 20000
			}

		];

	$scope.allClicked = function () {
		$scope.filterTable = ""

		$("#clear2-filters").css({ "backgroundColor": "#D80404", "color": "white" });
		$("#pay-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#unPaid-filters").css({ "backgroundColor": "#fff", "color": "black" });

		$('#dataTableCustomerInvoicesId').DataTable().column(7)
			.search("")
			.draw();

	}

	$scope.payClicked = function () {
		$scope.filterTable = "Pay";

		$("#clear2-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#pay-filters").css({ "backgroundColor": "#D80404", "color": "white" });
		$("#unPaid-filters").css({ "backgroundColor": "#fff", "color": "black" });

		$('#dataTableCustomerInvoicesId').DataTable().column(7)
			.search("pay")
			.draw();
	}

	$scope.unPaidClicked = function () {
		$scope.filterTable = "unPaid";

		$("#clear2-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#pay-filters").css({ "backgroundColor": "#fff", "color": "black" });
		$("#unPaid-filters").css({ "backgroundColor": "#D80404", "color": "white" });

		$('#dataTableCustomerInvoicesId').DataTable().column(7)
			.search("unPaid")
			.draw();
	}


	$scope.showInvoiceDetailUnPaid = function () {


		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/showInvoiceDetailsUnPaidPopup.html',
			controller: 'showInvoiceDetailsUnPaidPopupController',
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

	$scope.showInvoiceDetailPaid = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Generator/Views/showInvoiceDetailsPaidPopup.html',
			controller: 'showInvoiceDetailsPaidPopupController',
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

});