
rootModule.controller('karedAlHassanPopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.creationDate = data.creationDate;
    $scope.creationTime = data.creationTime;
    $scope.eodId = data.eodId;
    $scope.shiftNumber = data.shiftNumber;

    $scope.done = function () {

        $uibModalInstance.close($scope.choices);

    }


    $scope.choices = [
        {
            "id": 1,
            "name": "",
            "accountNumber": "",
            "receiptNumber": "",
            "checkNumber": "",
            "currencyCheck": "",
            "checkValue": "",
            "description": "",
            "usdAmount": "",
            "lbpAmount": ""
        }
    ];

    $scope.index = $scope.choices.length;

    $scope.addNewChoice = function () {
        var newItemNo = ++$scope.index;
        $scope.choices.push({
            "id": newItemNo,
            "name": "",
            "accountNumber": "",
            "receiptNumber": "",
            "checkNumber": "",
            "currencyCheck": "",
            "checkValue": "",
            "description": "",
            "usdAmount": "",
            "lbpAmount": ""
        });
    };

    $scope.removeChoice = function (id) {

        var index = -1;
        var comArr = eval($scope.choices);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.choices.splice(index, 1);
    };

});