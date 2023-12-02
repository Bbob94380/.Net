rootModule.controller("transactionController", ["$scope", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $uibModal, $http, $rootScope, $filter, filterTableListService) {


	$scope.wetProductTypes = [];

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

								bigTransCardLL = bigTransCardLL + trans.firstCardTypeAmount;
							} else if (trans.firstCardCurrency === "USD") {
								bigTransCardDollar = bigTransCardDollar + trans.firstCardTypeAmount;

							}

							if (trans.secondCardCurrency === "LBP") {
								bigTransCardLL = bigTransCardLL + trans.secondCardTypeAmount;

							} else if (trans.secondCardCurrency === "USD") {
								bigTransCardDollar = bigTransCardDollar + trans.secondCardTypeAmount;

							}


							if (trans.saleInvoice !== null) {
								trans.saleInvoice.category = $filter('translate')('DryProduct');
								trans.saleInvoice.type = "dry";
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

							console.log(trans.saleTransactions);

							if (trans.saleTransactions !== null && trans.saleTransactions !== undefined && trans.saleTransactions !== "") {
								for (let j = 0; j < trans.saleTransactions.length; j++) {
									//trans.saleTransactions[j].category = $filter('translate')('Fuel');
									trans.saleTransactions[j].type = "fuel";
									trans.saleTransactions[j].amount = trans.saleTransactions[j].dispensedVolume + " " + $filter('translate')('Litre');
									trans.saleTransactions[j].creationDate = trans.creationDate;
									trans.saleTransactions[j].creator = trans.creator;
									trans.saleTransactions[j].bigTransCashLL = trans.cachAmountMc;
									trans.saleTransactions[j].bigTransCashDollar = trans.cachAmountSc;
									trans.saleTransactions[j].bigTransCardLL = bigTransCardLL;
									trans.saleTransactions[j].bigTransCardDollar = bigTransCardDollar;
									trans.saleTransactions[j].bigTransTotalLL = trans.netTotalMc;
									trans.saleTransactions[j].bigTransTotalDollar = trans.netTotalSc;

									for (var h = 0; h < $scope.wetProductTypes.length; h++) {
										if (trans.saleTransactions[j].wetProductId === $scope.wetProductTypes[h].id) {
											trans.saleTransactions[j].category = $filter('translate')('Fuel') + " (" + $scope.wetProductTypes[h].nameLang + ")";
											break;
										}
									}


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

	//getAllTransactions();

	function getWetProductTypes() {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/Request/getAllWetProductTypes",
			data: { sessionId: localStorage.getItem('session_id_sm') }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.wetProductTypes = result.resultData;
						console.log($scope.wetProductTypes);

						for (var i = 0; i < $scope.wetProductTypes.length; i++) {

							if (localStorage.getItem('languageSM') === 'en') {

								if ($scope.wetProductTypes[i].type === "BENZENE95") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "BENZENE98") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "DIESEL1") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "DIESEL2") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "GAZ12") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "GAZ10") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
								if ($scope.wetProductTypes[i].type === "GAZ_EMPTY") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;

							} else if (localStorage.getItem('languageSM') === 'ar') {

								if ($scope.wetProductTypes[i].type === "BENZENE95") $scope.wetProductTypes[i].nameLang = "أوكتان 95";
								if ($scope.wetProductTypes[i].type === "BENZENE98") $scope.wetProductTypes[i].nameLang = "أوكتان 98";
								if ($scope.wetProductTypes[i].type === "DIESEL1") $scope.wetProductTypes[i].nameLang = "مازوت أخضر";
								if ($scope.wetProductTypes[i].type === "DIESEL2") $scope.wetProductTypes[i].nameLang = "مازوت أحمر";
								if ($scope.wetProductTypes[i].type === "GAZ12") $scope.wetProductTypes[i].nameLang = "غاز 12 كلغ";
								if ($scope.wetProductTypes[i].type === "GAZ10") $scope.wetProductTypes[i].nameLang = "غاز 10 كلغ";
								if ($scope.wetProductTypes[i].type === "GAZ_EMPTY") $scope.wetProductTypes[i].nameLang = "غاز";
							}
						}

						getAllTransactions();

					} else {
						$rootScope.showLoader = false;
						//swal($filter('translate')('failedGetWetProductsTypes'), "", "error");
						console.log(result.errorMsg);
					}

				} else {
					$rootScope.showLoader = false;
					//swal($filter('translate')('failedGetWetProductsTypes'), "", "error");
				}

			} else {
				$rootScope.showLoader = false;

				//swal($filter('translate')('failedGetWetProductsTypes'), "", "error");
			}


		}, function (error) {
			//swal($filter('translate')('failedGetWetProductsTypes'), "", "error");
			$rootScope.showLoader = false;
			console.log(error);
		});

	}

	getWetProductTypes();




	//Open transaction info popup
	$scope.openTransactionInfoPopup = function (transactionItem) {

		var modalInstance;

		if (transactionItem.type === "fuel") {

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

		} else if (transactionItem.type === "dry") {

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


