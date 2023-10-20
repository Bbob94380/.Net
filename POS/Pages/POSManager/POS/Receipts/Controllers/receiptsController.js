

rootModule.controller("receiptsController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "$translate", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter, filterTableListService, $translate) {

	if (localStorage.getItem('languageSM') === 'en') {
		$translate.use('en');
	} else if (localStorage.getItem('languageSM') === 'ar') {
		$translate.use('ar');
	}

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});



    function getAllReceipts() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
			url: "/api/SmApi/GetAllReceiptsAsync",
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

						var isCardPaid = false;
						var isCashPaid = false;
						var isDollarPaid = false;
						var isLLPaid = false;

						if (result.resultData !== null && result.resultData !== undefined) {

							for (let i = 0; i < result.resultData.length; i++) {

								result.resultData[i].ReceiptTotalMC = 0;
								result.resultData[i].ReceiptTotalSC = 0;

								for (let j = 0; j < result.resultData[i].transactions.length; j++) {

									var trans = result.resultData[i].transactions[j];
									result.resultData[i].ReceiptTotalMC += trans.netTotalMc;
									result.resultData[i].ReceiptTotalSC += trans.netTotalSc;


									if (trans.firstCardTypeAmount !== 0 && trans.firstCardTypeAmount !== null) {
										isCardPaid = true;

										if (trans.firstCardCurrency === "USD") {
											isDollarPaid = true;
										}

										if (trans.firstCardCurrency === "LBP") {
											isLLPaid = true;
										}
									}

									if (trans.secondCardTypeAmount !== 0 && trans.secondCardTypeAmount !== null) {
										isCardPaid = true;

										if (trans.secondCardCurrency === "USD") {
											isDollarPaid = true;
										}

										if (trans.secondCardCurrency === "LBP") {
											isLLPaid = true;
										}
									}



									if ((trans.cachAmountMc !== 0 && trans.cachAmountMc !== null) || (trans.cachAmountSc !== 0 && trans.cachAmountSc !== null)) {
										isCashPaid = true;

										if (trans.cachAmountMc !== 0) {
											isLLPaid = true;
										}

										if (trans.cachAmountSc !== 0) {
											isDollarPaid = true;
										}
									}

								}//end for loop

									if (isCardPaid && isCashPaid) {
										result.resultData[i].wop = "Cash and card";
									} else if (isCardPaid) {
										result.resultData[i].wop = "Card";
									} else if (isCashPaid) {
										result.resultData[i].wop = "Cash";
									} else {
										result.resultData[i].wop = "";
									}

									if (isDollarPaid && isLLPaid) {
										result.resultData[i].currency = "Lebanese Lire and dollar";
									} else if (isDollarPaid) {
										result.resultData[i].currency = "Dollar";
									} else if (isLLPaid) {
										result.resultData[i].currency = "Lebanese Lire";
									} else {
										result.resultData[i].currency = "";
									}


								if (result.resultData[i].transactions !== null && result.resultData[i].transactions !== undefined) {
									result.resultData[i].numberOfTransactions = result.resultData[i].transactions.length;
								}


							}// end for loop
						}


						$scope.ReceiptsList = result.resultData;

					
					} else {
						swal("Oops", "Failed getting receipts", "");
					}

				} else {
					swal("Oops", "No receipts found", "");
				}

			} else {
				swal("Oops", "Failed getting receipts", "");
			}


        }, function (error) {
            swal("Oops", "Failed getting receipts", "error");
            $rootScope.showLoader = false;
        });

    };

    getAllReceipts();


	//Open transaction info popup
	$scope.openCreateNewReceiptPopup = function () {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSManager/POS/Receipts/Views/createNewReceiptPopup.html',
			controller: 'createNewReceiptPopupController',
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


	$scope.goToReceiptInfo = function (receiptItem) {

		$timeout(function () {
			$state.go('pos.receiptInfo', {
				item: receiptItem
			});
		})

	};

	$scope.goToHistoryPage = function (person) {

		$timeout(function () {
			$state.go('pos.receiptHistory');
		})

	};


	$scope.refreshReceiptsGrid = function () {
		getAllReceipts();
	}

}]);


