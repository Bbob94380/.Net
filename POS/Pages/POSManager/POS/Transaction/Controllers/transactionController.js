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

							var bigTransCardLL = 0;
							var bigTransCardDollar = 0;

							if (trans.firstCardCurrency === "LBP") {

								bigTransCardLL = bigTransCardLL + firstCardTypeAmount;
							} else if (trans.firstCardCurrency === "USD") {
								bigTransCardDollar = bigTransCardDollar + firstCardTypeAmount;

							}

							if (trans.secondCardCurrency === "LBP") {
								bigTransCardLL = bigTransCardLL + secondCardTypeAmount;

							} else if (trans.secondCardCurrency === "USD") {
								bigTransCardDollar = bigTransCardDollar + secondCardTypeAmount;

							}


							if (trans.saleInvoice !== null) {
								trans.saleInvoice.category = "Dry Product";
								trans.saleInvoice.amount = trans.saleInvoice.saleDetails.length + " " + $filter('translate')('item(s)');
								trans.saleInvoice.creationDate = trans.creationDate;
								trans.saleInvoice.creator = trans.creator;
								trans.saleInvoice.bigTransCashLL = trans.cachAmountMc;
								trans.saleInvoice.bigTransCashDollar = trans.cachAmountSc;
								trans.saleInvoice.bigTransCardLL = bigTransCardLL;
								trans.saleInvoice.bigTransCardDollar = bigTransCardDollar;
								trans.saleInvoice.bigTransTotalLL = trans.netTotalMc;
								trans.saleInvoice.bigTransTotalDollar = trans.netTotalSc;
								$scope.saleTransList.push(trans.saleInvoice);
							}

							if (trans.saleTransactions !== null && trans.saleTransactions !== undefined && trans.saleTransactions !== "") {
								for (let j = 0; j < trans.saleTransactions.length; j++) {
									trans.saleTransactions[j].category = "Fuel";
									trans.saleTransactions[j].amount = trans.saleTransactions[j].dispensedVolume + " "+ $filter('translate')('Litre');
									trans.saleTransactions[j].creationDate = trans.creationDate;
									trans.saleTransactions[j].creator = trans.creator;
									trans.saleTransactions[j].bigTransCashLL = trans.cachAmountMc;
									trans.saleTransactions[j].bigTransCashDollar = trans.cachAmountSc;
									trans.saleTransactions[j].bigTransCardLL = bigTransCardLL;
									trans.saleTransactions[j].bigTransCardDollar = bigTransCardDollar;
									trans.saleTransactions[j].bigTransTotalLL = trans.netTotalMc;
									trans.saleTransactions[j].bigTransTotalDollar = trans.netTotalSc;
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
								item.wop = $filter('translate')('CashAndcard');
							} else if (isCardPaid) {
								item.wop = $filter('translate')('card');
							} else if (isCashPaid) {
								item.wop = $filter('translate')('cash');
							} else {
								item = "";
							}

							if (isDollarPaid && isLLPaid) {
								item.currency = $filter('translate')('LebaneseAnddollar');
							} else if (isDollarPaid) {
								item.currency = $filter('translate')('dollar');
							} else if (isLLPaid) {
								item.currency = $filter('translate')('lebanese');
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


