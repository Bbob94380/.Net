
posAttendantRootModule.controller('closeSessionPopupController', function ($scope, $rootScope, $http, $uibModalInstance, $uibModal, data) {

    //Initialization
    $scope.isCloseSessionBtnDisabled = true;
    $scope.isChecked = false;
    $scope.TotalLitreAmount = [];
    $scope.totalLL = 0;
    $scope.totalDollar = 0;
    var isNewFieldFocus = [];
    var displayNewCounterValue = [];
    $scope.displayNewCounterResult = [];
    $scope.dollarCashFirst = 0;
    $scope.lebaneseCashFirst = 0;
    $scope.nuzzlesList = [];

    function getCurrencyRatio() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/findPreviousCurrencyRatio",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        console.log(result.resultData);
                        $rootScope.oldDollarRate = result.resultData;
                        localStorage.setItem('oldDollarRate', result.resultData);

                    } else {
                        swal("Failed getting currency ratio", "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting currency ratio", "", "error");
                }

            } else {
                swal("Failed getting currency ratio", "", "error");
            }


        }, function (error) {
            swal("Failed getting currency ratio", "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    getCurrencyRatio();


    $scope.closeSessionClicked = function () {

        var nozzleCounters = [];

        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var nozzleCounterObj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                oldNozzleCounter: $scope.nuzzlesList[i].litersCounterEnd,
                newNozzleCounter: $scope.displayNewCounterResult[i]
            }

            nozzleCounters.push(nozzleCounterObj);

        }

        var closeSession = {
            usdAmount: $scope.dollarCashFirst,
            lbpAmount: $scope.lebaneseCashFirst,
            requiredUsdAmount: $scope.totalDollar,
            requiredLbpAmount: $scope.totalLL,
            creationDate: $scope.creationDate2,
            creationTime: $scope.creationTime2,
            previousCurrencyRatio: $scope.oldDollarRate,
            currenctCurrencyRatio: localStorage.getItem('dollarRate'),
            counters: nozzleCounters
        }

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/closeSession",
            data: { sessionId: localStorage.getItem('session_id'), closeSession: closeSession }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        localStorage.setItem('blockUI', "false");
                        $uibModalInstance.close('Succeeded');
                        swal("Great", "Session closing succeeded", "success");

                    } else {
                        swal("Closing session failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Closing session failed", "Please try again", "error");
                }

            } else {
                swal("Closing session failed", "Please try again", "error");
            }


        }, function (error) {
                swal("Closing session failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }


    $scope.calculateTotalLitreAmount = function (newCounter, oldCounter, index) {

        $scope.TotalLitreAmount[index] = newCounter - oldCounter;

        $scope.totalLL = 0;
        $scope.totalDollar = 0;

        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            if ($scope.TotalLitreAmount[i] !== null && $scope.TotalLitreAmount[i] !== undefined) {
                $scope.totalLL += $scope.TotalLitreAmount[i] * $scope.nuzzlesList[i].priceInLbp;
                $scope.totalDollar += $scope.TotalLitreAmount[i] * $scope.nuzzlesList[i].priceInUsd;

                //$scope.totalLL += $scope.TotalLitreAmount[i] * 1.0;
                //$scope.totalDollar += $scope.TotalLitreAmount[i] * 100000.0;
            }
        }
    }

    

    $scope.calculateTotalAttendantMoney = function (value, type) {

        $scope.TotalAttendantLL = 0;

        if (value === "" || value === null || value === undefined) value = 0;
        if ($scope.dollarCashFirst === "" || $scope.dollarCashFirst === null || $scope.dollarCashFirst === undefined) $scope.dollarCashFirst = 0;
        if ($scope.lebaneseCashFirst === "" || $scope.lebaneseCashFirst === null || $scope.lebaneseCashFirst === undefined) $scope.lebaneseCashFirst = 0;

        if (type === "LL") {
            $scope.TotalAttendantLL = parseInt(value) + (parseInt($scope.dollarCashFirst) * parseInt($scope.oldDollarRate));

        }

        if (type === "USD") {
            $scope.TotalAttendantLL = parseInt($scope.lebaneseCashFirst) + (parseInt(value) * parseInt($scope.oldDollarRate));
        }


    }

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
                    $scope.isCloseSessionBtnDisabled = false;
                } else {
                    $scope.isChecked = false;
                    $scope.isCloseSessionBtnDisabled = true;
                }

            }, function () {
                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
            });

            modalInstance.opened.then(function () {
                //alert('hi');
            });


        } else {
            $scope.isCloseSessionBtnDisabled = true;
        }

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
                        findNozzlesAccordingToEmployeeForClosingSession(result.resultData.id);

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


    function findNozzlesAccordingToEmployeeForClosingSession(employeeId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/findNozzlesAccordingToEmployeeForClosingSession",
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
                            isNewFieldFocus[i] = false;
                            displayNewCounterValue[i] = '0';
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


    //$scope.dollarRate = localStorage.getItem('dollarRate') + " L.L";


/*Calulator logic*/


    var isFirstCashDollarFieldFocus = false;
    var isFirstCashLebaneseFieldFocus = false;


    const calculator = {
        displayFirstCashDollarValue: '0',
        displayFirstCashLebaneseValue: '0',
        displayNewCounterValue: displayNewCounterValue,
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {

        if (isFirstCashDollarFieldFocus) {
            const { displayFirstCashDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstCashDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstCashDollarValue = displayFirstCashDollarValue === '0' ? digit : displayFirstCashDollarValue + digit;
            }
        }

        if (isFirstCashLebaneseFieldFocus) {
            const { displayFirstCashLebaneseValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstCashLebaneseValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstCashLebaneseValue = displayFirstCashLebaneseValue === '0' ? digit : displayFirstCashLebaneseValue + digit;
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
        calculator.displayFirstCashDollarValue = '0';
        calculator.displayFirstCashLebaneseValue = '0';
        calculator.displayCounterValue[$scope.indexArray] = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function inputDecimal(dot) {

        if (isFirstCashDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstCashDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstCashDollarValue += dot;
            }
        }

        if (isFirstCashLebaneseFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstCashLebaneseValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstCashLebaneseValue += dot;
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
        if (isFirstCashDollarFieldFocus) {
            $scope.dollarCashFirst = calculator.displayFirstCashDollarValue;
            $scope.calculateTotalAttendantMoney(parseInt(calculator.displayFirstCashDollarValue), 'USD');
        }

        if (isFirstCashLebaneseFieldFocus) {
            $scope.lebaneseCashFirst = calculator.displayFirstCashLebaneseValue;
            $scope.calculateTotalAttendantMoney(parseInt(calculator.displayFirstCashLebaneseValue), 'LL');
        }

        if (isNewFieldFocus[$scope.indexArray]) {
            $scope.displayNewCounterResult[$scope.indexArray] = calculator.displayNewCounterValue[$scope.indexArray];
            $scope.calculateTotalLitreAmount(parseInt(calculator.displayNewCounterValue[$scope.indexArray]), $scope.nuzzlesList[$scope.indexArray].litersCounterEnd, $scope.indexArray );

        }

        //console.log(calculator.displayValue);
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }



    $scope.ClearFocusedField = function () {

        if (isFirstCashDollarFieldFocus) {
            calculator.displayFirstCashDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isFirstCashLebaneseFieldFocus) {
            calculator.displayFirstCashLebaneseValue = '0';
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

    $scope.FirstCashDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = true;
        isFirstCashLebaneseFieldFocus = false;


        for (var i = 0; i < isNewFieldFocus.length; i++) {
            isNewFieldFocus[i] = false;
        }
    }

    $scope.FirstCashLebaneseFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = true;


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

        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;

    }

    $scope.FirstCashDollarFieldBlur = function (v) {

        if (v != undefined || v != null) {
            calculator.displayFirstCashDollarValue = v;
        }
    }

    $scope.FirstCashLebaneseFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayFirstCashLebaneseValue = v;
        }
    }

    $scope.NewCounterBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayNewCounterValue[$scope.indexArray] = v;
        }
    }
  

});