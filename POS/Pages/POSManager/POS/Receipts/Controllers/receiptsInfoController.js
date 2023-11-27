rootModule.controller("receiptsInfoController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService) {

    $scope.receipt = $stateParams.item; //getting fooVal


    if ($scope.receipt === undefined || $scope.receipt === null || $scope.receipt === "") {
        $scope.receipt = JSON.parse(localStorage.getItem("itemDataReceipt"));
    } else {
        localStorage.setItem("itemDataReceipt", JSON.stringify($scope.receipt));
    }

    $scope.receiptId = $scope.receipt.id;
    $scope.wop = $scope.receipt.wop;
    $scope.transNb = $scope.receipt.numberOfTransactions;
    $scope.creationDate = $scope.receipt.creationDate;
    $scope.createdBy = $scope.receipt.creator;


    $scope.transInfoList = $scope.receipt.transactions;



    $scope.totalTrans = "";
    var totalLL = 0
    var totalDollar = 0
    $scope.LebaneseCash = 0;
    $scope.dollarCash = 0;
    $scope.dollarCredit = 0;
    $scope.LebaneseCredit = 0;

    for (let i = 0; i < $scope.transInfoList.length; i++) {
        
        totalLL = totalLL + $scope.transInfoList[i].netTotalMc;
        totalDollar = totalDollar + $scope.transInfoList[i].netTotalSc;

        $scope.LebaneseCash = $scope.LebaneseCash + $scope.transInfoList[i].cachAmountMc;
        $scope.dollarCash = $scope.dollarCash + $scope.transInfoList[i].cachAmountSc;

        if ($scope.transInfoList[i].firstCardTypeAmount !== 0 && $scope.transInfoList[i].firstCardTypeAmount !== null) {

            if ($scope.transInfoList[i].firstCardCurrency === "USD") {
                $scope.dollarCredit = $scope.dollarCredit + $scope.transInfoList[i].firstCardTypeAmount;
            }

            if ($scope.transInfoList[i].firstCardCurrency === "LBP") {
                $scope.LebaneseCredit = $scope.LebaneseCredit + $scope.transInfoList[i].firstCardTypeAmount;
            }
        }

        if ($scope.transInfoList[i].secondCardTypeAmount !== 0 && $scope.transInfoList[i].secondCardTypeAmount !== null) {

            if ($scope.transInfoList[i].secondCardCurrency === "USD") {
                $scope.dollarCredit = $scope.dollarCredit + $scope.transInfoList[i].secondCardTypeAmount;
            }

            if ($scope.transInfoList[i].secondCardCurrency === "LBP") {
                $scope.LebaneseCredit = $scope.LebaneseCredit + $scope.transInfoList[i].secondCardTypeAmount;
            }
        }


    }

    $scope.totalTrans = totalLL +  $filter('translate')('LL') +" /" + totalDollar + " $";



}]);


