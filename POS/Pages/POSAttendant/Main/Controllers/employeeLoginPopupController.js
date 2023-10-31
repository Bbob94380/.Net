
posAttendantRootModule.controller('employeeLoginPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $uibModal) {


    localStorage.setItem("isEmployeeLoggedIn", "false");


    $scope.getCheckedInUsers = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getCheckedInUsers",
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    //if (result.isSuccessStatusCode) {

                    //    $scope.employeesList = result.resultData;

                    //} else {
                    //    swal("Failed getting car was options", "Please try again", "error");
                    //    console.log(result.errorMsg);
                    //}

                    $scope.employeesList = [
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        }
                        
                     ];

                } else {
                    swal("Failed getting car was options", "Please try again", "error");
                }

            } else {
                swal("Failed getting car was options", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting car was options", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getCheckedInUsers();


    $scope.showPinCodePopup = function (username) {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Main/Views/pinCodePopup.html',
            controller: 'pinCodePopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { username: username };
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