
rootModule.controller("eodFormController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$timeout", "$state", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $timeout, $state) {

   

    $scope.type = $stateParams.type; //getting fooVal

    $scope.isShiftOneFinished = false;
    $scope.isShiftTwoFinished = false;
    $scope.isShiftThreeFinished = false;
    $scope.isKaredHassanFinished = false;
    $scope.isEPaymentFinished = false;
    $scope.eodId = 0;

    $scope.eodObj = {
        cashUsd: 0,
        cashLbp: 0,
        numberOfEmployeesShift1: 0,
        numberOfEmployeesShift2: 0,
        numberOfEmployeesShift3: 0,
    }

    if (localStorage.getItem("isShiftOneFinished") === "true") {
        $scope.styleShiftFinishedOne = "styleShiftFinished";
        $scope.isShiftOneFinished = true;

    }

    if (localStorage.getItem("isShiftTwoFinished") === "true") {
        $scope.styleShiftFinishedTwo = "styleShiftFinished";
        $scope.isShiftTwoFinished = true;

    }

    if (localStorage.getItem("isShiftThreeFinished") === "true") {
        $scope.styleShiftFinishedThree = "styleShiftFinished";
        $scope.isShiftThreeFinished = true;

    }

    if (localStorage.getItem("isKaredHassanFinished") === "true") {
        $scope.styleShiftFinishedKared = "styleShiftFinished";
        $scope.isKaredHassanFinished = true;

    }

    if (localStorage.getItem("isEPaymentFinished") === "true") {
        $scope.styleShiftFinishedPayment = "styleShiftFinished";
        $scope.isEPaymentFinished = true;

    }


    $scope.shiftFuelClicked = function (shiftNumber) {

        if (shiftNumber === 1 && localStorage.getItem("isShiftOneFinished") === "true") return;
        if (shiftNumber === 2 && localStorage.getItem("isShiftTwoFinished") === "true") return;
        if (shiftNumber === 3 && localStorage.getItem("isShiftThreeFinished") === "true") return;

        if (shiftNumber === 1) {
            if ($scope.eodObj.numberOfEmployeesShift1 === 0) { swal("There is no employees found", "", "warning"); return; }
        }

        if (shiftNumber === 2) {
            if ($scope.eodObj.numberOfEmployeesShift2 === 0) { swal("There is no employees found", "", "warning"); return; }
        }

        if (shiftNumber === 3) {
            if ($scope.eodObj.numberOfEmployeesShift3 === 0) { swal("There is no employees found", "", "warning"); return; }
        }



        var index = 0;

        if (shiftNumber === 1) index = 0;
        if (shiftNumber === 2) index = 1;
        if (shiftNumber === 3) index = 2;


        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftFuelPopup.html',
            controller: 'shiftFuelPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { shiftObj: $scope.eodObj.shifts[index], creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId, shiftNumber: shiftNumber  };
                }
            }
        });

        modalInstance.result.then(function (Result) {

                var modalInstance;

                modalInstance = $uibModal.open({
                    animate: true,
                    templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftDryPopup.html',
                    controller: 'shiftDryPopupController',
                    scope: $scope,
                    windowClass: 'show',
                    resolve: {
                        data: function () {
                            return { shiftObj: $scope.eodObj.shifts[index], creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId, shiftNumber: Result };
                        }
                    }
                });

                modalInstance.result.then(function (Result) {

                    var modalInstance2;

                    modalInstance2 = $uibModal.open({
                        animate: true,
                        templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftCarWashPopup.html',
                        controller: 'shiftCarWashPopupController',
                        scope: $scope,
                        windowClass: 'show',
                        resolve: {
                            data: function () {
                                return { shiftObj: $scope.eodObj.shifts[index], creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId, shiftNumber: Result };
                            }
                        }
                    });

                    modalInstance2.result.then(function (Result) {


                        var modalInstance3;

                        modalInstance3 = $uibModal.open({
                            animate: true,
                            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftMoneyTypePopup.html',
                            controller: 'shiftMoneyTypePopupController',
                            scope: $scope,
                            windowClass: 'show',
                            resolve: {
                                data: function () {
                                    return { shiftObj: $scope.eodObj.shifts[index], creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId, shiftNumber: Result };
                                }
                            }
                        });

                        modalInstance3.result.then(function (Result) {

                            if (Result === 1) {
                                $scope.isShiftOneFinished = true;
                                $scope.styleShiftFinishedOne = "styleShiftFinished";
                                localStorage.setItem("isShiftOneFinished", "true")
                            }

                            if (Result === 2) {
                                $scope.isShiftTwoFinished = true;
                                $scope.styleShiftFinishedTwo = "styleShiftFinished";
                                localStorage.setItem("isShiftTwoFinished", "true")
                            }

                            if (Result === 3) {
                                $scope.isShiftThreeFinished = true;
                                $scope.styleShiftFinishedThree = "styleShiftFinished";
                                localStorage.setItem("isShiftThreeFinished", "true")

                            }

                        }, function () {
                            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
                        });


                    }, function () {
                        //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
                    });


                }, function () {
                    //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
                });


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });
    }


    $scope.goToKaredAlHassan = function () {


        if (localStorage.getItem("isKaredHassanFinished") === "true") { return; }


        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/karedAlHassanPopup.html',
            controller: 'karedAlHassanPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId };
                }
            }
        });

        modalInstance.result.then(function (Result) {

            $scope.isKaredHassanFinished = true;
            $scope.karedHassanObj = Result;
            localStorage.setItem("karedHassanData", JSON.stringify($scope.karedHassanObj));
            $scope.styleShiftFinishedKared = "styleShiftFinished";
            localStorage.setItem("isKaredHassanFinished", "true");

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });
    }

    $scope.goToEPayment = function () {

        if (localStorage.getItem("isEPaymentFinished") === "true") { return; }


        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/EPaymentPopup.html',
            controller: 'EPaymentPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { creationDate: $scope.creationDate, creationTime: $scope.creationTime, eodId: $scope.eodId};
                }
            }
        });

        modalInstance.result.then(function (Result) {

            $scope.isEPaymentFinished = true;
            $scope.ePaymentObj = Result;
            localStorage.setItem("EPaymentData", JSON.stringify($scope.ePaymentObj));
            $scope.styleShiftFinishedPayment = "styleShiftFinished";
            localStorage.setItem("isEPaymentFinished", "true");

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });
    }

    function getCurrentDateAndTime() {

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        $scope.creationDate = formattedToday;
        $scope.creationTime = today.toLocaleTimeString();

        return formattedToday;

    }

    function getStationManagerName() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getStationManagerName",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.stationManagerName = result.resultData;

                    } else {
                        //swal("Failed getting station manager name", "Please try again", "error");
                        //console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting station manager name", "Please try again", "error");
                }

            } else {
                //swal("Failed getting station manager name", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting station manager name", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    function getCurrentUser() {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetCurrentUser",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.creator = result.resultData.name;

                    } else {
                        //swal("Failed getting user info", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting user info", "Please try again", "error");
                }

            } else {
                //swal("Failed getting user info", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting user info", "Please try again", "error");
            //$rootScope.showLoader = false;
            console.log(error);
        });

    };

    getCurrentUser();

    function getEodId() {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getEodId",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.eodId = result.resultData;

                    } else {
                        //swal("Failed getting station manager name", "Please try again", "error");
                        //console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting station manager name", "Please try again", "error");
                }

            } else {
                //swal("Failed getting station manager name", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting station manager name", "Please try again", "error");
            //$rootScope.showLoader = false;
            console.log(error);
        });

    };

    getEodId();
    getStationManagerName();
    getCurrentDateAndTime();


    function changeDateFormat(date) {

        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        return formattedToday;

    }

    $scope.getEod = function (dateOfEod) {

        var payload = {
            date: changeDateFormat(dateOfEod) //getCurrentDateAndTime()
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getEod",
            data: { sessionId: localStorage.getItem('session_id_sm'), eodPaylod: payload }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.eodObj = result.resultData;

                    } else {
                        swal("Error", "", "error");
                    }

                } else {
                    swal("Error", "", "error");
                }

            } else {
                swal("Error", "", "error");
            }


        }, function (error) {
                swal("Error", "", "error");
            $rootScope.showLoader = false;
        });
    };

    //getEod();


    $scope.createEOD = function() {

        if ($scope.dateOfEod === null || $scope.dateOfEod === undefined) {
            swal("Please select EOD date", "", "warning");
            return;
        }

        if ($scope.eodObj.numberOfEmployeesShift1 === 0 && $scope.eodObj.numberOfEmployeesShift2 === 0 && $scope.eodObj.numberOfEmployeesShift3 === 0) {
            swal("There is no shifts to create an eod", "", "warning");
            return;
        }

        $scope.eodObj.id = $scope.eodId;
        $scope.eodObj.creator = $scope.creator;
        $scope.eodObj.dateOfEod = $scope.dateOfEod;

        if (localStorage.getItem("karedHassanData") !== null && localStorage.getItem("karedHassanData") !== undefined && localStorage.getItem("karedHassanData") !=="") {
            $scope.eodObj.kardHasanPayments = JSON.parse(localStorage.getItem("karedHassanData"));
        }

        if (localStorage.getItem("EPaymentData") !== null && localStorage.getItem("EPaymentData") !== undefined && localStorage.getItem("EPaymentData") !== "") {
            $scope.eodObj.ePayments = JSON.parse(localStorage.getItem("EPaymentData"));
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/createEODAsync",
            data: { sessionId: localStorage.getItem('session_id_sm'), eodObj: $scope.eodObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                          swal("Operation succeeded", "", "success");
                            $timeout(function () {
                                $state.go('pos.eod', {
                                    item: null
                                });
                            })

                    } else {
                        swal("Oops", "Operation failed", "error");
                    }

                } else {
                    swal("Oops", "Operation failed", "error");
                }

            } else {
                swal("Oops", "Operation failed", "error");
            }


        }, function (error) {
                swal("Oops", "Operation failed", "error");
            $rootScope.showLoader = false;
        });
    };

    $scope.clear = function () {

        $scope.dateOfEod = null;

        $scope.eodObj = {
            cashUsd: 0,
            cashLbp: 0,
            numberOfEmployeesShift1: 0,
            numberOfEmployeesShift2: 0,
            numberOfEmployeesShift3: 0,
        }

        $scope.isShiftOneFinished = false;
        $scope.isShiftTwoFinished = false;
        $scope.isShiftThreeFinished = false;
        $scope.isKaredHassanFinished = false;
        $scope.isEPaymentFinished = false;

        localStorage.setItem("isShiftOneFinished", "false")
        localStorage.setItem("isShiftTwoFinished", "false")
        localStorage.setItem("isShiftThreeFinished", "false")
        localStorage.setItem("isKaredHassanFinished", "false");
        localStorage.setItem("isEPaymentFinished", "false");


        $scope.styleShiftFinishedOne = "";
        $scope.styleShiftFinishedTwo = "";
        $scope.styleShiftFinishedThree = "";
        $scope.styleShiftFinishedKared = "";
        $scope.styleShiftFinishedPayment = "";

        localStorage.setItem("karedHassanData", "");
        localStorage.setItem("EPaymentData", "");

    }

}]);