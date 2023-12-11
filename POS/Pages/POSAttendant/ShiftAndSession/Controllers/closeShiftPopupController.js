
posAttendantRootModule.controller('closeShiftPopupController', function ($scope, $rootScope, $uibModal, $http, $uibModalInstance, data, $filter) {

    $scope.isCounterDisabled = true;
    $scope.isOpenBtnHide = false;
    $scope.isSaveBtnHide = true;
    $scope.hideSummary = true;
    $scope.isPts = false;
    $scope.showBoxSection = false;
    $scope.showNuzzlesSection = false;
    $scope.nuzzlesList = [];
    var isFieldFocus = [];
    var isNewFieldFocus = [];
    var isMoneyFieldFocus = [];
    var displayCounterValue = [];
    var displayNewCounterValue = [];
    var displayMoneyValue = [];
    $scope.displayCounterResult = [];
    $scope.displayNewCounterResult = [];
    $scope.displayMoneyResult = [];
    $scope.TotalLBPAdded = 0;
    $scope.TotalUSDAdded = 0;


    for (var i = 0; i < 13; i++) {
        isMoneyFieldFocus[i] = false;
        displayMoneyValue[i] = '0';
        $scope.displayMoneyResult[i] = '0';
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

                        swal($filter('translate')('updateSuccess'), "", "success");

                    } else {
                        swal($filter('translate')('updateFailed'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('updateFailed'), "", "error");
                }

            } else {
                swal($filter('translate')('updateFailed'), "", "error");
            }

        }, function (error) {
                swal($filter('translate')('updateFailed'), "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.checkIfPtsFound = function() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/checkIfPtsFound",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData === true) {
                            console.log(result.resultData);
                            $scope.isPts = true;
                            $scope.showNuzzlesSection = false;
                        } else {
                            $scope.isPts = false;
                            $scope.showNuzzlesSection = true;
                        }

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
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    $scope.checkIfPtsFound();

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
            $rootScope.showLoader = false;
            console.log(error);
        });

    };

    getCurrentUser();

    function getStationManagerName() {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getStationManagerName",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $rootScope.stationManagerName = result.resultData;

                    } else {
                        //swal("Failed getting station manager name", "Please try again", "error");
                        console.log(result.errorMsg);
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
                        //if ($scope.nuzzlesList.length > 0 && $scope.isPts === false) $scope.showBoxSection = true;
                        if ($scope.nuzzlesList.length > 0) $scope.showBoxSection = true;

                        if ($scope.isPts === true) { $scope.getSalesSummary();}

                    } else {
                        swal($filter('translate')('failedGetNozzles'), "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('failedGetNozzles'), "Please try again", "error");
                }

            } else {
                swal($filter('translate')('failedGetNozzles'), "Please try again", "error");
            }


        }, function (error) {
                swal($filter('translate')('failedGetNozzles'), "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    };


    $scope.getSalesSummary = function () {

        var nozzleCounters = [];

        if ($scope.isPts === false) {

            for (var i = 0; i < $scope.nuzzlesList.length; i++) {

                var nozzleCounterObj = {
                    nozzleNumber: $scope.nuzzlesList[i].number,
                    oldNozzleCounter: $scope.displayCounterResult[i],
                    newNozzleCounter: $scope.displayNewCounterResult[i]
                }

                nozzleCounters.push(nozzleCounterObj);

            }
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
                        swal($filter('translate')('failedGetSales'), "", "error");
                        console.log(result.errorMsg);
                        $scope.hideSummary = true;
                    }

                } else {
                    swal($filter('translate')('failedGetSales'), "", "error");
                    $scope.hideSummary = true;
                }

            } else {
                swal($filter('translate')('failedGetSales'), "", "error");
                $scope.hideSummary = true;
            }


        }, function (error) {
                swal($filter('translate')('failedGetSales'), "", "error");
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

   

    $scope.MoneyAdded = function () {

        $scope.TotalLBPAdded = 0;
        $scope.TotalUSDAdded = 0;
        var currency = "";
        var value = 0;

        for (var i = 0; i < $scope.displayMoneyResult.length; i++) {

            if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5) currency = "USD";
            if (i === 6 || i === 7 || i === 8 || i === 9 || i === 10 || i === 11) currency = "LBP";

            if (i === 0) value = 100;
            if (i === 1) value = 50;
            if (i === 2) value = 20;
            if (i === 3) value = 10;
            if (i === 4) value = 5;
            if (i === 5) value = 1;
            if (i === 6) value = 100000;
            if (i === 7) value = 50000;
            if (i === 8) value = 20000;
            if (i === 9) value = 10000;
            if (i === 10) value = 5000;
            if (i === 11) value = 1000;

            if (currency === "USD") {

                if ($scope.displayMoneyResult[i] === undefined || $scope.displayMoneyResult[i] === null || $scope.displayMoneyResult[i] === "") $scope.displayMoneyResult[i] = '0';
                $scope.TotalUSDAdded += value * parseInt($scope.displayMoneyResult[i]);
            }

            if (currency === "LBP") {
                if ($scope.displayMoneyResult[i] === undefined || $scope.displayMoneyResult[i] === null || $scope.displayMoneyResult[i] === "") $scope.displayMoneyResult[i] = '0';
                $scope.TotalLBPAdded += value * parseInt($scope.displayMoneyResult[i]);
            }
        }
       
    }

    $scope.closeEmployeeShift = function () {


        if ($scope.isPts === false && $scope.nuzzlesList.length <= 0) {
            swal($filter('translate')('noNuzzles'), "", "warning");
            return;
        }


        var nozzleCounters = [];
        var amounts = [];

        amounts.push({ quantity: $scope.displayMoneyResult[0], currencyCardUsd: "$100"});
        amounts.push({ quantity: $scope.displayMoneyResult[1], currencyCardUsd: "$50"});
        amounts.push({ quantity: $scope.displayMoneyResult[2], currencyCardUsd: "$20"});
        amounts.push({ quantity: $scope.displayMoneyResult[3], currencyCardUsd: "$10"});
        amounts.push({ quantity: $scope.displayMoneyResult[4], currencyCardUsd: "$5"});
        amounts.push({ quantity: $scope.displayMoneyResult[5], currencyCardUsd: "$1" });


        amounts.push({ quantity: $scope.displayMoneyResult[6], currencyCardLbp: "LBP100" });
        amounts.push({ quantity: $scope.displayMoneyResult[7], currencyCardLbp: "LBP50" });
        amounts.push({ quantity: $scope.displayMoneyResult[8], currencyCardLbp: "LBP20" });
        amounts.push({ quantity: $scope.displayMoneyResult[9], currencyCardLbp: "LBP10" });
        amounts.push({ quantity: $scope.displayMoneyResult[10], currencyCardLbp: "LBP5" });
        amounts.push({ quantity: $scope.displayMoneyResult[11], currencyCardLbp: "LBP1" });


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

                        
                        var openedShifts = JSON.parse(localStorage.getItem("openedShifts"));
                        var newOpenedShifts = [];
                        for (var i = 0; i < openedShifts.length; i++) {
                            if (openedShifts[i].employeeId !== localStorage.getItem("employeeId")) { newOpenedShifts.push(openedShifts[i]) }
                        }

                        localStorage.setItem("openedShifts", JSON.stringify(newOpenedShifts));
                        localStorage.setItem("isCurrentEmployeeHasOpenShift", "false");

                        swal($filter('translate')('shiftCloseSuccess'), "", "success");
                        $uibModalInstance.close('Succeeded');

                    } else {
                        swal($filter('translate')('shiftCloseFailed'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('shiftCloseFailed'), "", "error");
                }

            } else {
                swal($filter('translate')('shiftCloseFailed'), "", "error");
            }


        }, function (error) {
                swal($filter('translate')('shiftCloseFailed'), "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    /*Calulator logic*/



    const calculator = {
        displayCounterValue: displayCounterValue,
        displayNewCounterValue: displayNewCounterValue,
        displayMoneyValue: displayMoneyValue,
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

        if (isMoneyFieldFocus[$scope.indexArrayMoney]) {
            const { displayMoneyValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayMoneyValue[$scope.indexArrayMoney] = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayMoneyValue[$scope.indexArrayMoney] = displayMoneyValue[$scope.indexArrayMoney] === '0' ? digit : displayMoneyValue[$scope.indexArrayMoney] + digit;
            }
        }
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

        if (isMoneyFieldFocus[$scope.indexArrayMoney]) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayMoneyValue[$scope.indexArrayMoney].includes(dot)) {
                // Append the decimal point
                calculator.displayMoneyValue += dot;
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

        if (isMoneyFieldFocus[$scope.indexArrayMoney]) {
            $scope.displayMoneyResult[$scope.indexArrayMoney] = calculator.displayMoneyValue[$scope.indexArrayMoney];
            $scope.MoneyAdded($scope.displayMoneyResult[$scope.indexArrayMoney], $scope.valueMoney, $scope.currencyMoney);
        }
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }


    $scope.ClearFocusedField = function () {

        if (isFieldFocus[$scope.indexArray]) {
            //calculator.displayCounterValue[$scope.indexArray] = '0';
            calculator.displayCounterValue[$scope.indexArray] = calculator.displayCounterValue[$scope.indexArray].slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isNewFieldFocus[$scope.indexArray]) {
            //calculator.displayNewCounterValue[$scope.indexArray] = '0';
            calculator.displayNewCounterValue[$scope.indexArray] = calculator.displayNewCounterValue[$scope.indexArray].slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isMoneyFieldFocus[$scope.indexArrayMoney]) {
            //calculator.displayMoneyValue[$scope.indexArrayMoney] = '0';
            calculator.displayMoneyValue[$scope.indexArrayMoney] = calculator.displayMoneyValue[$scope.indexArrayMoney].slice(0, -1);
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

        for (var i = 0; i < isMoneyFieldFocus.length; i++) {
            isMoneyFieldFocus[i] = false;
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

        for (var i = 0; i < isMoneyFieldFocus.length; i++) {
            isMoneyFieldFocus[i] = false;
        }

    }

    $scope.MoneyFocus = function (index, valueMoney, currencyMoney) {
        $scope.indexArrayMoney = index;
        $scope.currencyMoney = currencyMoney;
        $scope.valueMoney = valueMoney;

        for (var i = 0; i < isMoneyFieldFocus.length; i++) {
            if (i === $scope.indexArrayMoney) { isMoneyFieldFocus[i] = true; }
            else { isMoneyFieldFocus[i] = false }
        }

        for (var i = 0; i < isFieldFocus.length; i++) {
            isFieldFocus[i] = false;
        }

        for (var i = 0; i < isNewFieldFocus.length; i++) {
            isNewFieldFocus[i] = false;
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

    $scope.MoneyBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayMoneyValue[$scope.indexArrayMoney] = v;
        }
    }


});