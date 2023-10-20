
posAttendantRootModule.controller('closeShiftPopupController', function ($scope, $rootScope, $uibModal, $http, $uibModalInstance, data) {

    $scope.isCounterDisabled = true;
    $scope.isOpenBtnHide = false;
    $scope.isSaveBtnHide = true;
    $scope.hideSummary = true;
    var isFieldFocus = [];
    var isNewFieldFocus = [];
    var displayCounterValue = [];
    var displayNewCounterValue = [];
    $scope.displayCounterResult = [];
    $scope.displayNewCounterResult = [];

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
                newNozzleCounter: $scope.displayNewCounterResult[i]
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

                if (response.data !== null && response.data !== undefined) {

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
                        for (var i = 0; i < $scope.nuzzlesList.length; i++) {
                            isFieldFocus[i] = false;
                            isNewFieldFocus[i] = false;
                            displayCounterValue[i] = '0';
                            displayNewCounterValue[i] = '0';
                            $scope.displayCounterResult[i] = '0';
                            $scope.displayNewCounterResult[i] = '0';
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


    $scope.getSalesSummary = function () {

        var nozzleCounters = [];


        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var nozzleCounterObj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                oldNozzleCounter: $scope.displayCounterResult[i],
                newNozzleCounter: $scope.displayNewCounterResult[i]
            }

            nozzleCounters.push(nozzleCounterObj);

        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getSalesSummary",
            data: { sessionId: localStorage.getItem('session_id'), nozzleCounters: nozzleCounters }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.salesSummary = result.resultData;
                        $scope.hideSummary = false;

                    } else {
                        swal("Failed getting sales summary", "Please try again", "error");
                        console.log(result.errorMsg);
                        $scope.hideSummary = true;
                    }

                } else {
                    swal("Failed getting sales summary", "Please try again", "error");
                    $scope.hideSummary = true;
                }

            } else {
                swal("Failed getting sales summary", "Please try again", "error");
                $scope.hideSummary = true;
            }


        }, function (error) {
            swal("Shift creation failed", "Please try again", "error");
            $scope.hideSummary = true;
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

    $scope.TotalLBPAdded = 0;
    $scope.TotalUSDAdded = 0;

    $scope.MoneyAdded = function (qty, value, type) {

        if (type === "USD") {

            $scope.TotalUSDAdded += value * qty;
        }

        if (type === "LBP") {
            $scope.TotalLBPAdded += value * qty;
        }
       
    }

    $scope.closeEmployeeShift = function () {

        var nozzleCounters = [];
        var amounts = [];

        amounts.push({ quantity: $scope.USD100, currencyCardUsd: "$100"});
        amounts.push({ quantity: $scope.USD50, currencyCardUsd: "$50"});
        amounts.push({ quantity: $scope.USD20, currencyCardUsd: "$20"});
        amounts.push({ quantity: $scope.USD10, currencyCardUsd: "$10"});
        amounts.push({ quantity: $scope.USD5, currencyCardUsd: "$5"});
        amounts.push({ quantity: $scope.USD1, currencyCardUsd: "$1" });


        amounts.push({ quantity: $scope.LBP100, currencyCardLbp: "LBP100" });
        amounts.push({ quantity: $scope.LBP50, currencyCardLbp: "LBP50" });
        amounts.push({ quantity: $scope.LBP20, currencyCardLbp: "LBP20" });
        amounts.push({ quantity: $scope.LBP10, currencyCardLbp: "LBP10" });
        amounts.push({ quantity: $scope.LBP5, currencyCardLbp: "LBP5" });
        amounts.push({ quantity: $scope.LBP1, currencyCardLbp: "LBP1" });


        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var nozzleCounterObj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                oldNozzleCounter: $scope.nuzzlesList[i].litersCounterEnd,
                newNozzleCounter: $scope.displayNewCounterResult[i]
            }

            nozzleCounters.push(nozzleCounterObj);

        }

        var closeShift = {
            counters: nozzleCounters,
            amounts: amounts
        }

        $rootScope.showLoader = true;
        $http({
            method: "PUT",
            url: "/api/Request/closeEmployeeShift",
            data: { sessionId: localStorage.getItem('session_id'), closeShift: closeShift }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("Great", "Shift closing succeeded", "success");
                        $uibModalInstance.close('Succeeded');

                    } else {
                        swal("Closing shift failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Closing shift failed", "Please try again", "error");
                }

            } else {
                swal("Closing shift failed", "Please try again", "error");
            }


        }, function (error) {
                swal("Closing shift failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    /*Calulator logic*/



    const calculator = {
        displayCounterValue: displayCounterValue,
        displayNewCounterValue: displayNewCounterValue,
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

        if (isNewFieldFocus[$scope.indexArray]) {
            const { displayNewCounterValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayNewCounterValue[$scope.indexArray] = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayNewCounterValue[$scope.indexArray] = displayNewCounterValue[$scope.indexArray] === '0' ? digit : displayNewCounterValue[$scope.indexArray] + digit;
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

        if (isNewFieldFocus[$scope.indexArray]) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayNewCounterValue[$scope.indexArray].includes(dot)) {
                // Append the decimal point
                calculator.displayNewCounterValue += dot;
            }
        }
    }

    function updateDisplay() {
        if (isFieldFocus[$scope.indexArray]) {
            $scope.displayCounterResult[$scope.indexArray] = calculator.displayCounterValue[$scope.indexArray];
        }

        if (isNewFieldFocus[$scope.indexArray]) {
            $scope.displayNewCounterResult[$scope.indexArray] = calculator.displayNewCounterValue[$scope.indexArray];
        }
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }


    $scope.ClearFocusedField = function () {

        if (isFieldFocus[$scope.indexArray]) {
            calculator.displayCounterValue[$scope.indexArray] = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isNewFieldFocus[$scope.indexArray]) {
            calculator.displayNewCounterValue[$scope.indexArray] = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        updateDisplay();
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

        for (var i = 0; i < isNewFieldFocus.length; i++) {
            isNewFieldFocus[i] = false;
        }

    }

    $scope.NewCounterFocus = function (index) {
        $scope.indexArray = index;

        for (var i = 0; i < isNewFieldFocus.length; i++) {
            if (i === $scope.indexArray) { isNewFieldFocus[i] = true; }
            else { isNewFieldFocus[i] = false }
        }

        for (var i = 0; i < isFieldFocus.length; i++) {
            isFieldFocus[i] = false;
        }

    }

    $scope.CounterBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayCounterValue[$scope.indexArray] = v;
        }
    }

    $scope.NewCounterBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayNewCounterValue[$scope.indexArray] = v;
        }
    }



});