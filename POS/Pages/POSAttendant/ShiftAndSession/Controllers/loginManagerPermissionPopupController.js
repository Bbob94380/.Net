
posAttendantRootModule.controller('loginManagerPermissionPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    $scope.loginBtnClicked = function () {

        //call api to check credentials

        $uibModalInstance.close(true)

    }

});