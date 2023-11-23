
posAttendantRootModule.controller('pinCodePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal, $filter) {


    $scope.backBtnClicked = function (pinCodeValue) {


        if (pinCodeValue === null || pinCodeValue === undefined || pinCodeValue === "") {
            swal($filter('translate')('addPinCode'), "", "warning");
            return;
        }

        //call api to check credentials
        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/Request/CheckPinCodeAsync",
            //data: { email: data.username, password: pinCodeValue }
            data: { email: "admin@gsm.com", password: "odoo123" }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode && result.resultData.sessionId !== null) {

                    localStorage.setItem('session_id', result.resultData.sessionId);
                    localStorage.setItem('isEmployeeLoggedIn', "true");
                    localStorage.setItem('username', data.username);
                    $rootScope.profileName = data.username.slice(0, 2).toUpperCase();
                    localStorage.setItem('employeeRoles', JSON.stringify(result.resultData.roles));
                    $uibModalInstance.close(true)

                } else {
                    localStorage.setItem('session_id', '');
                    swal($filter('translate')('VerficationFailed'), "", "error");
                }

            } else {
                localStorage.setItem('session_id', '');
                swal($filter('translate')('VerficationFailed'), "", "error");
            }

        }, function (error) {
                localStorage.setItem('session_id', '');
                swal($filter('translate')('VerficationFailed'), "", "error");
                $rootScope.showLoader = false;
        });

    }

});