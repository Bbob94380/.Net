
rootModule.controller('shiftFuelPopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.goToDryShift = function () {


        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftDryPopup.html',
            controller: 'shiftDryPopupController',
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