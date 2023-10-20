
posAttendantRootModule.controller('openShiftPopupController', function ($scope, $rootScope, $uibModal, $http, $uibModalInstance, data) {

    $scope.isCounterDisabled = true;
    $scope.isOpenBtnHide = false;
    $scope.isSaveBtnHide = true;
    var isFieldFocus = [];
    var displayCounterValue = [];
    $scope.displayCounterResult = [];

    $scope.validateByManager = function () {

        if ($scope.isChecked) {
            $scope.isChecked = false;

            var modalInstance;

            modalInstance = $uibModal.open({
                animate: true,
                templateUrl: '/Pages/POSAttendant/ShiftAndSession/Views/loginManagerPermissionPopup.html',
                controller: 'loginManagerPermissionPopupController',
                scope: $scope,
                windowClass: 'show',
                resolve: {
                    data: function () {
                        return { wetName: "1" };
                    }
                }
            });

            modalInstance.result.then(function (loginSuccess) {
                //when $uibModalInstance.close() fct executed
                if (loginSuccess) {
                    $scope.isChecked = true;
                    $scope.isCounterDisabled = false;
                    $scope.isOpenBtnHide = true;
                    $scope.isSaveBtnHide = false;
                } else {
                    $scope.isChecked = false;
                    $scope.isCounterDisabled = true;
                    $scope.isOpenBtnHide = false;
                    $scope.isSaveBtnHide = true;
                }

            }, function () {
                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
            });

            modalInstance.opened.then(function () {
                //alert('hi');
            });


        } else {
            $scope.isCounterDisabled = true;
            $scope.isOpenBtnHide = false;
            $scope.isSaveBtnHide = true;
        }

    }

    $scope.updateNozzleCounters = function () {

        var nozzleCounters = [];

        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var obj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                newNozzleCounter: $scope.displayCounterResult[i]
            };

            nozzleCounters.push(obj);
        }


        $rootScope.showLoader = true;
        $http({
            method: "PUT",
            url: "/api/Request/updateNozzleCounters",
            data: { sessionId: localStorage.getItem('session_id'), nozzleCounters: nozzleCounters }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {


                        $scope.isOpenBtnHide = false;
                        $scope.isSaveBtnHide = true;
                        $scope.isCounterDisabled = true;
                        $scope.isChecked = false;

                        swal("Update process succeeded", "", "success");

                    } else {
                        swal("Update operation failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Update operation failed", "Please try again", "error");
                }

            } else {
                swal("Update operation failed", "Please try again", "error");
            }

        }, function (error) {
            swal("Update operation failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }


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
                        findNozzlesAccordingToEmployee(result.resultData.id);

                    } else {
                        swal("Failed getting user info", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting user info", "Please try again", "error");
                }

            } else {
                swal("Failed getting user info", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting user info", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    getCurrentUser();

    function getStationManagerName() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getStationManagerName",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined ) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $rootScope.stationManagerName = result.resultData;

                    } else {
                        swal("Failed getting station manager name", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting station manager name", "Please try again", "error");
                }

            } else {
                swal("Failed getting station manager name", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting station manager name", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    getStationManagerName();


    function findNozzlesAccordingToEmployee(employeeId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/findNozzlesAccordingToEmployee",
            data: { sessionId: localStorage.getItem('session_id'), employeeId: employeeId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.nuzzlesList = result.resultData;
                        for (var i = 0; i < $scope.nuzzlesList.length; i++ ) {
                            isFieldFocus[i] = false;
                            displayCounterValue[i] = '0';
                            $scope.displayCounterResult[i] = '0';
                        }

                    } else {
                        swal("Failed getting nozzles of employee", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting nozzles of employee", "Please try again", "error");
                }

            } else {
                swal("Failed getting nozzles of employee", "Please try again", "error");
            }


        }, function (error) {
                swal("Failed getting nozzles of employee", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };


    $scope.createShift = function () {

        var nozzleCounters = [];


        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var nozzleCounterObj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                oldNozzleCounter: $scope.nuzzlesList[i].litersCounterEnd
            }

            nozzleCounters.push(nozzleCounterObj);

        }

        var shiftObj = {
            employeeName: $scope.employeeName,
            employeeId: $scope.employeeId,
            currencyRatio: localStorage.getItem("dollarRate"),
            dateOfCreation: $scope.creationDate2,
            timeOfCreation: $scope.creationTime2,
            nozzleCounters: nozzleCounters
        }

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/openEmployeeShift",
            data: { sessionId: localStorage.getItem('session_id'), shift: shiftObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("Great", "Shift created successfully", "success");
                        $uibModalInstance.close('Succeeded');

                    } else {
                        swal("Shift creation failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Shift creation failed", "Please try again", "error");
                }

            } else {
                swal("Shift creation failed", "Please try again", "error");
            }


        }, function (error) {
                swal("Shift creation failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
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
        const formattedToday2 = yyyy + '-' + mm + '-' + dd;

        $scope.creationDate = formattedToday;
        $scope.creationDate2 = formattedToday2;
        $scope.creationTime = today.toLocaleTimeString();
        $scope.creationTime2 = today.toISOString();

    }

    getCurrentDateAndTime();


    $scope.dollarRate = localStorage.getItem('dollarRate');


/*Calulator logic*/



    const calculator = {
        displayCounterValue: displayCounterValue,
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {

        if (isFieldFocus[$scope.indexArray]) {
            const { displayCounterValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayCounterValue[$scope.indexArray] = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayCounterValue[$scope.indexArray] = displayCounterValue[$scope.indexArray] === '0' ? digit : displayCounterValue[$scope.indexArray] + digit;
            }
        }

    }


    function resetCalculator() {
        calculator.displayCounterValue[$scope.indexArray] = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function inputDecimal(dot) {

        if (isFieldFocus[$scope.indexArray]) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayCounterValue[$scope.indexArray].includes(dot)) {
                // Append the decimal point
                calculator.displayCounterValue += dot;
            }
        }
    }

    function updateDisplay() {
        if (isFieldFocus[$scope.indexArray]) {
            $scope.displayCounterResult[$scope.indexArray] = calculator.displayCounterValue[$scope.indexArray];
        }
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }

    $scope.clearAll = function () {
        resetCalculator();
        $scope.displayCounterResult[$scope.indexArray] = calculator.displayCounterValue[$scope.indexArray];
    }

    $scope.ClearFocusedField = function () {

        if (isFieldFocus[$scope.indexArray]) {
            calculator.displayCounterValue[$scope.indexArray] = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        updateDisplay();
    }

    $scope.clearCounter = function () {
        resetCalculator();
        $scope.displayCounterResult[$scope.indexArray] = '0';

    }

    $scope.addNumber = function (number) {
        inputDigit(number);
        updateDisplay();
    }

    $scope.CounterFocus = function (index) {
        $scope.indexArray = index;

        for (var i = 0; i < isFieldFocus.length; i++) {
            if (i === $scope.indexArray) { isFieldFocus[i] = true; }
            else { isFieldFocus[i] = false }
        }

    }

    $scope.CounterBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayCounterValue[$scope.indexArray] = v;
        }
    }



});