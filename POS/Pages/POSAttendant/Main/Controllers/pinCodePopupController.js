
posAttendantRootModule.controller('pinCodePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    $scope.backBtnClicked = function (pinCodeValue) {

        //call api to check credentials
        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/Request/CheckPinCodeAsync",
            data: { email: data.username, password: pinCodeValue }
            //data: { email: "admin@gsm.com", password: "odoo123" }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode && result.resultData.sessionId !== null) {

                    localStorage.setItem('session_id', result.resultData.sessionId);
                    localStorage.setItem('isEmployeeLoggedIn', "true");
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('employeeRoles', JSON.stringify(result.resultData.roles));
                    $uibModalInstance.close(true)

                } else {
                    localStorage.setItem('session_id', '');
                    swal("Oops", "Verfication failed", "");
                }

            } else {
                localStorage.setItem('session_id', '');
                swal("Oops", "Verfication failed", "");
            }

        }, function (error) {
                localStorage.setItem('session_id', '');
                swal("Oops", "Verfication failed", "");
                $rootScope.showLoader = false;
        });

    }

});