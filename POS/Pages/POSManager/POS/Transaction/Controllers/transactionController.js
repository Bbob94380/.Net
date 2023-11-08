rootModule.controller("transactionController", ["$scope", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $uibModal, $http, $rootScope, $filter, filterTableListService) {

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	function getAllTransactions() {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/SmApi/GetAllTransactionsAsync",
			data: { sessionId: localStorage.getItem('session_id_sm') }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {


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


						$scope.saleTransList = [];
						var isCardPaid = false;
						var isCashPaid = false;
						var isDollarPaid = false;
						var isLLPaid = false;


						for (let i = 0; i < result.resultData.length; i++) {

							var trans = result.resultData[i];

							if (trans.saleInvoice !== null) {
								trans.saleInvoice.category = "Dry Product";
								trans.saleInvoice.amount = trans.saleInvoice.saleDetails.length + " item(s)";
								trans.saleInvoice.creationDate = trans.creationDate;
								trans.saleInvoice.creator = trans.creator;
								$scope.saleTransList.push(trans.saleInvoice);
							}

							if (trans.saleTransactions !== null && trans.saleTransactions !== undefined && trans.saleTransactions !== "") {
								for (let j = 0; j < trans.saleTransactions.length; j++) {
									trans.saleTransactions[j].category = "Fuel";
									trans.saleTransactions[j].amount = trans.saleTransactions[j].dispensedVolume + " L";
									trans.saleTransactions[j].creationDate = trans.creationDate;
									trans.saleTransactions[j].creator = trans.creator;
									$scope.saleTransList.push(trans.saleTransactions[j]);
								}
							}
						}//end for loop


						for (let j = 0; j < $scope.saleTransList.length; j++) {

							var item = $scope.saleTransList[j];

							if (item.firstCardTypeAmount !== 0 && item.firstCardTypeAmount !== null) {
								isCardPaid = true;

								if (item.firstCardCurrency === "USD") {
									isDollarPaid = true;
								}

								if (item.firstCardCurrency === "LBP") {
									isLLPaid = true;
								}
							}

							if (item.secondCardTypeAmount !== 0 && item.secondCardTypeAmount !== null) {
								isCardPaid = true;

								if (item.secondCardCurrency === "USD") {
									isDollarPaid = true;
								}

								if (item.secondCardCurrency === "LBP") {
									isLLPaid = true;
								}
							}

							if ((item.cachAmountMc !== 0 && item.cachAmountMc !== null) || (item.cachAmountSc !== 0 && item.cachAmountSc !== null)) {
								isCashPaid = true;

								if (item.cachAmountMc !== 0) {
									isLLPaid = true;
								}

								if (item.cachAmountSc !== 0) {
									isDollarPaid = true;
								}
							}

							if (isCardPaid && isCashPaid) {
								item.wop = "Cash and card";
							} else if (isCardPaid) {
								item.wop = "Card";
							} else if (isCashPaid) {
								item.wop = "Cash";
							} else {
								item = "";
							}

							if (isDollarPaid && isLLPaid) {
								item.currency = "Lebanese Lire and dollar";
							} else if (isDollarPaid) {
								item.currency = "Dollar";
							} else if (isLLPaid) {
								item.currency = "Lebanese Lire";
							} else {
								item.currency = "";
							}
						}// end for loop

						console.log($scope.saleTransList);

					} else {
						//swal("Oops", "Failed getting transactions", "");
					}

				} else {
					//swal("Oops", "No transactions found", "");
				}

			} else {
				//swal("Oops", "Failed getting transactions", "");
			}


		}, function (error) {
			//swal("Oops", "Failed getting transactions", "error");
			$rootScope.showLoader = false;
		});

	};

	getAllTransactions();


	//Open transaction info popup
	$scope.openTransactionInfoPopup = function (transactionItem) {

		var modalInstance;

		if (transactionItem.category === "Fuel") {

			modalInstance = $uibModal.open({
				animate: true,
				templateUrl: '/Pages/POSManager/POS/Transaction/Views/fuelTransactionInfoPopup.html',
				controller: 'fuelTransactionInfoPopupController',
				scope: $scope,
				windowClass: 'show',
				resolve: {
					data: function () {
						return { transactionItem: transactionItem };
					}
				}
			});

			modalInstance.result.then(function (Result) {
				//when $uibModalInstance.close() fct executed


			}, function () {
				//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
			});

		} else if (transactionItem.category === "Dry Product") {

			modalInstance = $uibModal.open({
				animate: true,
				templateUrl: '/Pages/POSManager/POS/Transaction/Views/dryTransactionInfoPopup.html',
				controller: 'dryTransactionInfoPopupController',
				scope: $scope,
				windowClass: 'show',
				resolve: {
					data: function () {
						return { transactionItem: transactionItem };
					}
				}
			});

			modalInstance.result.then(function (Result) {
				//when $uibModalInstance.close() fct executed


			}, function () {
				//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
			});

		}
	};

}]);


