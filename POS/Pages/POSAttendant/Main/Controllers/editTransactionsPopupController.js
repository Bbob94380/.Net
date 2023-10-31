
posAttendantRootModule.controller('editTransactionsPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    $scope.showTotal = true;

    $scope.deleteTrans = function (transId, productType) {
        for (let i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId && $rootScope.transactionsList[i].productType === productType) {
                $rootScope.transactionsList.splice(i, 1);
            }
        }

        //console.log($rootScope.transactionsList);

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) { $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet"; $scope.showTotal = false; }

    }

    $scope.deleteAllTrans = function () {
        $rootScope.transactionsList = [];
        $rootScope.calculateTotal();
        $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
        $scope.showTotal = false;
    }

    $scope.cancel = function () {
        $uibModalInstance.close(true)
    }

    $scope.cancel = function () {
        $uibModalInstance.close(true)
    }

    $scope.done = function () {
        $uibModalInstance.close(true)
    }

});