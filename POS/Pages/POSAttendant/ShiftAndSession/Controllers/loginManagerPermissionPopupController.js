
posAttendantRootModule.controller('loginManagerPermissionPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    $scope.loginBtnClicked = function (pinCodeValue) {

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
                    swal("Oops", "Login failed", "");
                }

            } else {
                swal("Oops", "Login failed", "");
            }

        }, function (error) {
                swal("Oops", "Login failed", "");
            $rootScope.showLoader = false;
        });

    }

});