
rootModule.controller('dryRefundInfoPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    $scope.refundItem = data.refundItem;



    //events

    function getCredit() {

        $scope.dollarPaid = 0;
        $scope.lebanesePaid = 0;

        if ($scope.saleInvoice.firstCardTypeAmount !== 0 && $scope.saleInvoice.firstCardTypeAmount !== null) {

            if ($scope.saleInvoice.firstCardCurrency === "USD") {
                $scope.dollarPaid += $scope.saleInvoice.firstCardTypeAmount;
            }

            if ($scope.saleInvoice.firstCardCurrency === "LBP") {
                $scope.lebanesePaid += $scope.saleInvoice.firstCardTypeAmount;

            }
        }

        if ($scope.saleInvoice.secondCardTypeAmount !== 0 && $scope.saleInvoice.secondCardTypeAmount !== null) {

            if ($scope.saleInvoice.secondCardCurrency === "USD") {
                $scope.dollarPaid += $scope.saleInvoice.secondCardTypeAmount;
            }

            if ($scope.saleInvoice.secondCardCurrency === "LBP") {
                $scope.lebanesePaid += $scope.saleInvoice.secondCardTypeAmount;

            }
        }
    }

    //http call - get sale invoice id
    function findDryProductSaleById() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/findDryProductSaleById",
            data: { sessionId: localStorage.getItem('session_id_sm'), saleId: $scope.refundItem.saleId }
        }).then(function (response) {

            $rootScope.showLoader = false;
            console.log(response);

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.saleInvoice = result.resultData;
                        getCredit();

                    } else {
                        $rootScope.showLoader = false;
                        swal("Creation process failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    $rootScope.showLoader = false;
                    swal("Creation process failed", "Please try again", "error");
                }

            } else {
                $rootScope.showLoader = false;

                swal("Creation process failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Creation process failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    findDryProductSaleById();


	var isCardPaid = false;
	var isCashPaid = false;
	var isDollarPaid = false;
	var isLLPaid = false;

	if ($scope.refundItem.firstCardTypeAmount !== 0 && $scope.refundItem.firstCardTypeAmount !== null) {
		isCardPaid = true;

		if ($scope.refundItem.firstCardCurrency === "USD") {
			isDollarPaid = true;
		}

		if ($scope.refundItem.firstCardCurrency === "LBP") {
			isLLPaid = true;
		}
	}

	if ($scope.refundItem.secondCardTypeAmount !== 0 && $scope.refundItem.secondCardTypeAmount !== null) {
		isCardPaid = true;

		if ($scope.refundItem.secondCardCurrency === "USD") {
			isDollarPaid = true;
		}

		if ($scope.refundItem.secondCardCurrency === "LBP") {
			isLLPaid = true;
		}
	}



	if (($scope.refundItem.cachAmountMc !== 0 && $scope.refundItem.cachAmountMc !== null) || ($scope.refundItem.cachAmountSc !== 0 && $scope.refundItem.cachAmountSc !== null)) {
		isCashPaid = true;

		if ($scope.refundItem.cachAmountMc !== 0) {
			isLLPaid = true;
		}

		if ($scope.refundItem.cachAmountSc !== 0) {
			isDollarPaid = true;
		}

	}

	if (isCardPaid && isCashPaid) {
		$scope.refundItem.wop = "Cash and card";
	} else if (isCardPaid) {
		$scope.refundItem.wop = "Card";
	} else if (isCashPaid) {
		$scope.refundItem.wop = "Cash";
	} else {
		$scope.refundItem.wop = "";
	}



    var totalDiscount = 0;
    var totalPriceLL = 0;
    var totalPriceDollar = 0;
    var totalOfTotalLL = 0;
    var totalOfTotalDollar = 0;

    for (let i = 0; i < $scope.refundItem.saleDetailReturn.length; i++) {
        totalDiscount = totalDiscount + $scope.refundItem.saleDetailReturn[i].discountPercent;
        totalPriceLL = totalPriceLL + $scope.refundItem.saleDetailReturn[i].priceMc;
        totalPriceDollar = totalPriceDollar + $scope.refundItem.saleDetailReturn[i].priceSc;
        totalOfTotalLL = totalOfTotalLL + $scope.refundItem.saleDetailReturn[i].netTotalMc;
        totalOfTotalDollar = totalOfTotalDollar + $scope.refundItem.saleDetailReturn[i].netTotalSc;
    }

    $scope.discount = totalDiscount;
    $scope.price = totalPriceLL + " L.L/" + totalPriceDollar + " $";
    $scope.total = totalOfTotalLL + " L.L/" + totalOfTotalDollar + " $";


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});