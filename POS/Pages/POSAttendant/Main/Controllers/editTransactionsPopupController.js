
posAttendantRootModule.controller('editTransactionsPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    $scope.deleteTrans = function (transId) {
        for (let i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId) {
                $rootScope.transactionsList.splice(i, 1);
            }
        }

        console.log($rootScope.transactionsList);

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";

    }

    $scope.deleteAllTrans = function () {
        $rootScope.transactionsList = [];
        $rootScope.calculateTotal();
        $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
    }

});