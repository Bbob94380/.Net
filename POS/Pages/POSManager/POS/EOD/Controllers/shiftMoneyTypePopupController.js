
rootModule.controller('shiftMoneyTypePopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.shiftObj = data.shiftObj;
    $scope.creationDate = data.creationDate;
    $scope.creationTime = data.creationTime;
    $scope.eodId = data.eodId;
    $scope.shiftNumber = data.shiftNumber;


    for (var i = 0; i < $scope.shiftObj.employeeMoneyAmounts.length; i++) {

        for (var j = 0; j < $scope.shiftObj.employeeMoneyAmounts[i].moneyAmounts.length; j++) {

            var money = $scope.shiftObj.employeeMoneyAmounts[i].moneyAmounts[j];

            if (money.hasOwnProperty("currencyCardUsd")) {

                if (money.currencyCardUsd !== null && money.currencyCardUsd !== undefined) {
                    money.isDollar = true;
                    money.isLL = false;
                }
            }

            if (money.hasOwnProperty("currencyCardLbp")) {
                if (money.currencyCardLbp !== null && money.currencyCardLbp !== undefined) {
                    money.isDollar = false;
                    money.isLL = true;
                }
            }

        }

    }

    console.log($scope.shiftObj.employeeMoneyAmounts);

    $scope.closeShift1 = function () {
        $uibModalInstance.close($scope.shiftNumber);
    }

});