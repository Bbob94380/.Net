
rootModule.controller('shiftDryPopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.goToCarWashShift = function () {
        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftCarWashPopup.html',
            controller: 'shiftCarWashPopupController',
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
    }
 
});