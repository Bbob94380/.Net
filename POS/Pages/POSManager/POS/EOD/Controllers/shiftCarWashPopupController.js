
rootModule.controller('shiftCarWashPopupController', function ($scope, $uibModalInstance, data ) {

    $scope.shiftObj = data.shiftObj;
    $scope.creationDate = data.creationDate;
    $scope.creationTime = data.creationTime;
    $scope.eodId = data.eodId;
    $scope.shiftNumber = data.shiftNumber;


    $scope.goToMoneyCollectPopup = function () {

        $uibModalInstance.close($scope.shiftNumber);

    }


});