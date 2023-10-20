
posAttendantRootModule.controller('pinCodePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    $scope.backBtnClicked = function (pinCodeValue) {

        //call api to check credentials

        var success = true

        if (success) {
            $uibModalInstance.close(true)
        }

        

    }

});