
posAttendantRootModule.controller('employeeLoginPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    localStorage.setItem("isEmployeeLoggedIn", "false");


    $scope.showPinCodePopup = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Main/Views/pinCodePopup.html',
            controller: 'pinCodePopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { id: "1" };
                }
            }
        });

        modalInstance.result.then(function (result) {
            //when $uibModalInstance.close() fct executed

            if (result) {
                $uibModalInstance.close(true)
            }

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

        modalInstance.opened.then(function () {
            //alert('hi');
        });
    }

});