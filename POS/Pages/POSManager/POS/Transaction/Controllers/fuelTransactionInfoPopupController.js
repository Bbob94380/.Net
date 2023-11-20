
rootModule.controller('fuelTransactionInfoPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    console.log(data.transactionItem);
    $scope.transactionItem = data.transactionItem;

    var isCardPaid = false;
    var isCashPaid = false;
    $scope.dollarCredit = 0;
    $scope.LebaneseCredit = 0;

    if ($scope.transactionItem.firstCardTypeAmount !== 0 && $scope.transactionItem.firstCardTypeAmount !== null) {

        isCardPaid = true;

        if ($scope.transactionItem.firstCardCurrency === "USD") {
            $scope.dollarCredit = $scope.dollarCredit + $scope.transactionItem.firstCardTypeAmount;
        }

        if ($scope.transactionItem.firstCardCurrency === "LBP") {
            $scope.LebaneseCredit = $scope.LebaneseCredit + $scope.transactionItem.firstCardTypeAmount;
        }
    }

    if ($scope.transactionItem.secondCardTypeAmount !== 0 && $scope.transactionItem.secondCardTypeAmount !== null) {

        isCardPaid = true;
            
        if ($scope.transactionItem.secondCardCurrency === "USD") {
            $scope.dollarCredit = $scope.dollarCredit + $scope.transactionItem.secondCardTypeAmount;
        }

        if (result.receipt.transaction.secondCardCurrency === "LBP") {
            $scope.LebaneseCredit = $scope.LebaneseCredit + $scope.transactionItem.secondCardTypeAmount;
        }
    }

    if (($scope.transactionItem.cachAmountMc !== 0 && $scope.transactionItem.cachAmountMc !== null) || ($scope.transactionItem.cachAmountSc !== 0 && $scope.transactionItem.cachAmountSc !== null)) {
        isCashPaid = true;
    }

    if (isCardPaid && isCashPaid) {
        $scope.wop = "Cash and card";
    } else if (isCardPaid) {
        $scope.wop = "Card";
    } else if (isCashPaid) {
        $scope.wop = "Cash";
    } else {
        $scope.wop = "";
    }


    //events

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});