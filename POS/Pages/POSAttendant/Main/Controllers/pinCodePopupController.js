
posAttendantRootModule.controller('pinCodePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal, $filter) {

    function getCurrentUser() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetCurrentUser",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.employeeName = result.resultData.name;
                        $scope.employeeId = result.resultData.id;
                        localStorage.setItem("employeeId", $scope.employeeId);
                        $rootScope.profileName = $scope.employeeName.slice(0, 2).toUpperCase();
                        $uibModalInstance.close(true);

                    } else {
                        //swal($filter('translate')('failedGetUserInfo'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    //swal($filter('translate')('failedGetUserInfo'), "", "error");
                }

            } else {
                //swal($filter('translate')('failedGetUserInfo'), "", "error");
            }


        }, function (error) {
            //swal($filter('translate')('failedGetUserInfo'), "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

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
                    $rootScope.profileName = data.username.slice(0, 2).toUpperCase();
                    localStorage.setItem('employeeRoles', JSON.stringify(result.resultData.roles));
                    getCurrentUser();

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