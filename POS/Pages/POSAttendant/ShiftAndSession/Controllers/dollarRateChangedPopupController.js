
posAttendantRootModule.controller('dollarRateChangedPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {

    $scope.oldRate = "Previous Rate: " + data.oldDollarRate + " L.L";
    $scope.newRate = "New Rate: " + data.newDollarRate + " L.L";

    localStorage.setItem('blockUI', "true");

    $scope.closeSession = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/ShiftAndSession/Views/closeSessionPopup.html',
            controller: 'closeSessionPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { id: "1" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed
            $uibModalInstance.close();

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

        modalInstance.opened.then(function () {
            //alert('hi');
        });
    }

});