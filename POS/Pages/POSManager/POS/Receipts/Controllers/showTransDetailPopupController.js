


rootModule.controller('showTransDetailPopupController', function ($scope, $rootScope, $http, $filter, $uibModal, $uibModalInstance, data) {


	var trans = data.transactionItem;
	$scope.transList = [];



	if (trans.saleInvoice !== null) {
		trans.saleInvoice.category = $filter('translate')('DryProduct');
		trans.saleInvoice.type = "dry";
		trans.saleInvoice.amount = trans.saleInvoice.saleDetails.length + " " + $filter('translate')('item(s)');
		trans.saleInvoice.creationDate = trans.creationDate;
		trans.saleInvoice.creator = trans.creator;
		$scope.transList.push(trans.saleInvoice);
	}

	if (trans.saleTransactions !== null && trans.saleTransactions !== undefined && trans.saleTransactions !== "") {
		for (let j = 0; j < trans.saleTransactions.length; j++) {
			trans.saleTransactions[j].category = $filter('translate')('Fuel');
			trans.saleTransactions[j].type = "fuel";
			trans.saleTransactions[j].amount = trans.saleTransactions[j].dispensedVolume + " " + $filter('translate')('Litre');
			trans.saleTransactions[j].creationDate = trans.creationDate;
			trans.saleTransactions[j].creator = trans.creator;
			$scope.transList.push(trans.saleTransactions[j]);
		}
	}



	$scope.openDryDetailsPopup = function (item) {

		if (item !== null) {

			if (item.type === "dry") {


				var modalInstance;

				modalInstance = $uibModal.open({
					animate: true,
					templateUrl: '/Pages/POSManager/POS/Receipts/Views/showDyDetailPopup.html',
					controller: 'showDryDetailPopupController',
					scope: $scope,
					windowClass: 'show',
					resolve: {
						data: function () {
							return { transactionItem: item };
						}
					}
				});

				modalInstance.result.then(function (Result) {
					//when $uibModalInstance.close() fct executed


				}, function () {
					//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
				});

			}

		}

	};

	

});