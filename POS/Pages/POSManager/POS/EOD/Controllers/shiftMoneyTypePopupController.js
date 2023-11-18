
rootModule.controller('shiftMoneyTypePopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.shiftObj = data.shiftObj;
    $scope.creationDate = data.creationDate;
    $scope.creationTime = data.creationTime;
    $scope.eodId = data.eodId;
    $scope.shiftNumber = data.shiftNumber;


    $scope.closeShift1 = function () {
        $uibModalInstance.close($scope.shiftNumber);
    }

});