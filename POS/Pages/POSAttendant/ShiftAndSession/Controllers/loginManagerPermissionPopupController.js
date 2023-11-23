
posAttendantRootModule.controller('loginManagerPermissionPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal, $filter) {


    $scope.loginBtnClicked = function () {

        //call api to check credentials
        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/Request/loginManagerPermission",
            data: { email: $scope.username, password: $scope.password }
            //data: { email: "admin@gsm.com", password: "odoo123" }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode) {

                    $uibModalInstance.close(true)

                } else {
                    swal($filter('translate')('LoginFailed'), "", "error");
                }

            } else {
                swal($filter('translate')('LoginFailed'), "", "error");
            }

        }, function (error) {
                swal($filter('translate')('LoginFailed'), "", "error");
            $rootScope.showLoader = false;
        });

    }

    //$scope.loginBtnClicked = function (pinCodeValue) {

    //    $uibModalInstance.close(true)

    //}

});