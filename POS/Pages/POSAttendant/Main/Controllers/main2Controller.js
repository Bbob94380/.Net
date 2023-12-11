posAttendantRootModule.controller("main2Controller", ["$scope", "$uibModal", "$http", "$rootScope", "$translate", "commonAttendantHelper", "$filter", function ($scope, $uibModal, $http, $rootScope, $translate, $common_helper, $filter) {

    var modalInstanceRate = null;
    var totalLeb = 0;
    var totalDol = 0;
    $rootScope.transactionsList = [];
    $rootScope.dryItemsList = [];
    $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
    $scope.showMenuWet = false;
    $scope.showMenuDry = false;
    $scope.showMenuCar = false;

    $rootScope.OpenEmployeeLoginPopup = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Main/Views/employeeLoginPopup.html',
            controller: 'employeeLoginPopupController',
            backdrop: 'static',
            keyboard: false,
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { item: "b" };
                }
            }
        });

        modalInstance.result.then(function (loginEmployeeSuccess) {
            //when $uibModalInstance.close() fct executed
            if (loginEmployeeSuccess) {
                localStorage.setItem("isEmployeeLoggedIn", "true");

                $scope.transTotalLebanese = "";
                $scope.transTotalDollar = "";
                $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";


                if (localStorage.getItem("openedShifts") !== null && localStorage.getItem("openedShifts") !== "" && localStorage.getItem("openedShifts") !== undefined) {
                    var openedShifts = JSON.parse(localStorage.getItem("openedShifts"));
                    var existOpen = false;
                    var isBlockUI = false;
                    for (var g = 0; g < openedShifts.length; g++) {
                        if (openedShifts[g].employeeId === localStorage.getItem("employeeId")) { existOpen = true; isBlockUI = openedShifts[g].blockUI; break; }
                    }
                    if (existOpen) {
                        localStorage.setItem("isCurrentEmployeeHasOpenShift", "true");
                        if (isBlockUI === "true") {
                            var oldDollarRate = localStorage.getItem('oldDollarRate');
                            var newDollarRate = localStorage.getItem('dollarRate');
                            if (modalInstanceRate !== null) modalInstanceRate.dismiss();
                            OpenDollarRateChangedPopup(oldDollarRate, newDollarRate);
                        }
                    } else {
                        localStorage.setItem("isCurrentEmployeeHasOpenShift", "false");
                    }
                } else {
                    localStorage.setItem("isCurrentEmployeeHasOpenShift", "false");
                }


                var roles = JSON.parse(localStorage.getItem("employeeRoles"));
                if (roles !== undefined && roles !== null && roles !== "")
                    for (var i = 0; i < roles.length; i++) {
                        var role = roles[i];
                        if (role === "admin_payroll") { $scope.showMenuWet = true; }
                        if (role === "admin_contracts") { $scope.showMenuDry = true; }
                        if (role === "admin_employees") { $scope.showMenuCar = true; }

                    }


                var transJson = JSON.parse(localStorage.getItem("transList"));
                if (transJson !== undefined && transJson !== null && transJson !== "") {
                    //add for loop 3al transJson to show just transactions for current user
                    $rootScope.transactionsList = transJson;
                    console.log($rootScope.transactionsList);
                    if ($rootScope.transactionsList.length > 0) $rootScope.calculateTotal();
                }



                if (localStorage.getItem('blockUI') === 'true' && localStorage.getItem('isEmployeeLoggedIn') === "true") {
                    if (modalInstanceRate !== null) modalInstanceRate.dismiss();
                    OpenDollarRateChangedPopup(localStorage.getItem("oldDollarRate"), localStorage.getItem("dollarRate"));
                }

                if ($rootScope.dryItemsList.length > 0) $rootScope.clearDryBtn();


            } else {
                localStorage.setItem("isEmployeeLoggedIn", "false");
            }

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

    }


    if (localStorage.getItem('isEmployeeLoggedIn') !== "true") {
        $rootScope.OpenEmployeeLoginPopup();
    }



    if (localStorage.getItem('language') === 'en') {
        $translate.use('en');
    } else if (localStorage.getItem('language') === 'ar') {
        $translate.use('ar');
    }

    var userActionHandle;
    function userDidSomething() {
        clearTimeout(userActionHandle);
        userActionHandle = setTimeout(function () {
            //alert("5 seconds of inactivity");
            localStorage.setItem("isEmployeeLoggedIn", "false");
            $rootScope.OpenEmployeeLoginPopup();
        }, 300000);
    }
    window.addEventListener("mousemove", userDidSomething, false);
    window.addEventListener("keydown", userDidSomething, false);
    window.addEventListener("keypress", userDidSomething, false);
    window.addEventListener("scroll", userDidSomething, false);
    window.addEventListener("click", userDidSomething, false);
    //Start timeout
    userDidSomething();


    var roles = JSON.parse(localStorage.getItem("employeeRoles"));

    if (roles !== undefined && roles !== null && roles !== "")
    for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        if (role === "admin_payroll") { $scope.showMenuWet = true; }
        if (role === "admin_contracts") { $scope.showMenuDry = true; }
        if (role === "admin_employees") { $scope.showMenuCar = true; }

        }

   
    //var ws = new WebSocket("ws://localhost:8080/FPOS/sendingNotifications");
    var ws = new WebSocket("ws://35.181.42.111:8080/FPOS/sendingNotifications");

    ws.onopen = function () {
        console.log("connection established...");
    };


    ws.onmessage = function (evt) {
        var received_msg = evt.data;    

        if (received_msg !== null && received_msg !== undefined) {
            var result = JSON.parse(received_msg);

            if (result.type === "CurrencyRatio") {

                $rootScope.$apply(function () {

                    var oldDollarRate = localStorage.getItem('dollarRate');
                    console.log(oldDollarRate);

                    if (oldDollarRate !== result.currencyRatio) {
                        $rootScope.dollarRate = result.currencyRatio;
                        localStorage.setItem('oldDollarRate', oldDollarRate);
                        localStorage.setItem('dollarRate', result.currencyRatio);

                        if (localStorage.getItem("openedShifts") !== null && localStorage.getItem("openedShifts") !== "" && localStorage.getItem("openedShifts") !== undefined) {
                            var openedShifts = JSON.parse(localStorage.getItem("openedShifts"));
                            for (var g = 0; g < openedShifts.length; g++) {
                                openedShifts[g].blockUI === "true";
                            }
                        }

                        if (localStorage.getItem('isEmployeeLoggedIn') === "true" && localStorage.getItem('isCurrentEmployeeHasOpenShift') === "true") {
                            if (modalInstanceRate !== null) modalInstanceRate.dismiss();
                            OpenDollarRateChangedPopup(oldDollarRate, result.currencyRatio);
                        }
                    }

                });

            } else if (result.type === "SaleTransaction") {

                var fuelResultObj = {
                    id: 0,
                    qty: result.saleTransaction.dispensedVolume,
                    priceLL: parseFloat(result.saleTransaction.netTotalMc).toFixed(2),
                    priceDollar: parseFloat(result.saleTransaction.netTotalSc).toFixed(2),
                    productType: "Fuel",
                    wetId: result.saleTransaction.wetProductId,
                    priceMcOfLitre: result.saleTransaction.priceMc,
                    priceScOfLitre: result.saleTransaction.priceSc,
                    employeeId:  result.saleTransaction.creatorId,
                    ispts: true,
                    nozzleNumber: result.saleTransaction.nozzleNumber
                }

                $rootScope.transactionsList.push(fuelResultObj);
                $rootScope.calculateTotal();
            }

        }


    };

    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };


    function OpenDollarRateChangedPopup(oldDollarRate, newDollarRate) {


        modalInstanceRate = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/ShiftAndSession/Views/dollarRateChangedPopup.html',
            controller: 'dollarRateChangedPopupController',
            backdrop: 'static',
            keyboard: false,
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { oldDollarRate: oldDollarRate, newDollarRate: newDollarRate};
                }
            }
        });

        modalInstanceRate.result.then(function (loginSuccess) {
            //when $uibModalInstance.close() fct executed
            //if (loginSuccess) {
            //    $scope.isChecked = true;
            //    $scope.isCloseSessionBtnDisabled = false;
            //} else {
            //    $scope.isChecked = false;
            //    $scope.isCloseSessionBtnDisabled = true;
            //}

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

    }

    

    function getCurrencyRatio(){

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetCurrencyRatio",
            data: { sessionId: localStorage.getItem('session_id')}
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        console.log(result.resultData);
                        $rootScope.dollarRate = result.resultData;
                        localStorage.setItem('dollarRate', result.resultData);

                    } else {
                        //swal($filter('translate')('failedGetCurrentRatio'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    //swal($filter('translate')('failedGetCurrentRatio'), "", "error");
                }

            } else {
                //swal($filter('translate')('failedGetCurrentRatio'), "", "error");
            }


        }, function (error) {
                //swal($filter('translate')('failedGetCurrentRatio'), "", "error");
            //$rootScope.showLoader = false;
            console.log(error);
        });

    };

    if (localStorage.getItem('dollarRate') === '' || localStorage.getItem('dollarRate') === "" || localStorage.getItem('dollarRate') === " " || localStorage.getItem('dollarRate') === null ||
        localStorage.getItem('dollarRate') === undefined || localStorage.getItem('dollarRate') === '0' || localStorage.getItem('dollarRate') === "0" || localStorage.getItem('dollarRate') === "0.0") {
        getCurrencyRatio();
    } else {
        $rootScope.dollarRate = localStorage.getItem('dollarRate');
    }

    function fixTransList() {

        var finalTranList = [];
        var drySummaryProducts = [];
        var dryTotalQty = 0;
        var dryTotalPriceLL = 0;
        var dryTotalPriceDollar = 0;
        var isDryExist = false;
        var idDry = 0;
        var hasId = false;


        for (let i = 0; i < $rootScope.transactionsList.length; i++) {


            if ($rootScope.transactionsList[i].productType === "Dry" && $rootScope.transactionsList[i].employeeId === localStorage.getItem("employeeId")) {


                dryTotalQty += parseInt($rootScope.transactionsList[i].qty);
                dryTotalPriceLL = parseInt(dryTotalPriceLL) + (parseInt($rootScope.transactionsList[i].priceDollar) * parseFloat(localStorage.getItem('dollarRate')));
                dryTotalPriceDollar += parseInt($rootScope.transactionsList[i].priceDollar);
                Array.prototype.push.apply(drySummaryProducts, $rootScope.transactionsList[i].products);
                isDryExist = true;
                if ($rootScope.transactionsList[i].id !== 0 && $rootScope.transactionsList[i].id !== null && $rootScope.transactionsList[i].id !== undefined) { idDry = $rootScope.transactionsList[i].id; hasId = true }


            } else {
                finalTranList.push($rootScope.transactionsList[i]);
            }
        }

        if (isDryExist) {
            var dryObj = {
                id: idDry,
                hasId: hasId,
                qty: dryTotalQty,
                employeeId: localStorage.getItem("employeeId"),
                priceLL: dryTotalPriceLL,
                priceDollar: dryTotalPriceDollar,
                productType: "Dry",
                products: drySummaryProducts
            }

            finalTranList.push(dryObj);
        }
        $rootScope.transactionsList = finalTranList;
    }

    function getTransactionsIds() {

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {


            if ($rootScope.transactionsList[i].hasId === true) continue;

            $rootScope.showLoader = true;
            var transactionType = null;

            if ($rootScope.transactionsList[i].productType === "Dry") transactionType = "DRY";
            if ($rootScope.transactionsList[i].productType === "Fuel") transactionType = "WET";
            if ($rootScope.transactionsList[i].productType === "Car wash") transactionType = "CAR_WASH";
            if ($rootScope.transactionsList[i].productType === "Service") transactionType = "SERVICE";

                $http({
                    method: "POST",
                    url: "/api/Request/getTransactionId",
                    data: { sessionId: localStorage.getItem('session_id'), transType: transactionType }
                }).then(function (response) {

                    console.log(response);
                    $rootScope.showLoader = false;

                    if (response !== null && response !== undefined) {

                        if (response.data !== null && response.data !== undefined) {

                            var result = JSON.parse(response.data);

                            if (result.isSuccessStatusCode) {

                                console.log(result.resultData);
                                $rootScope.transactionsList[i].id = result.resultData;
                                $rootScope.transactionsList[i].hasId = true;
                                localStorage.setItem("transList", JSON.stringify($rootScope.transactionsList));

                            } else {
                                //swal("Oops", "Failed getting product id", "");
                            }

                        } else {
                            //swal("Oops", "Failed getting product id", "");
                        }

                    } else {
                        //swal("Oops", "Failed getting product id", "");
                    }


                }, function (error) {
                    //swal("Oops", "eee", "error");
                    $rootScope.showLoader = false;
                });
        }

    }

    $rootScope.calculateTotal = function () {

        fixTransList();
        getTransactionsIds();

        var totalLL = 0;
        var totalDollar = 0;
        var isExist = false;

        localStorage.setItem("transList", JSON.stringify($rootScope.transactionsList));

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].employeeId === localStorage.getItem("employeeId")) {
                isExist = true;
                totalLL += parseFloat($rootScope.transactionsList[i].priceLL);
                totalDollar += parseFloat($rootScope.transactionsList[i].priceDollar);
            }
        }
        totalLeb = parseFloat(totalLL).toFixed(2);
        totalDol = totalDollar;
        $scope.transTotalLebanese = parseFloat(totalLL).toFixed(2);
        $scope.transTotalDollar = "$" + parseFloat(totalDollar).toFixed(2);
        if (isExist) $rootScope.totalLabelDryAndWet = "showTotalLabelDryAndWet";
        console.log(totalLL);
        console.log(totalDollar);
    }

    var transJson = JSON.parse(localStorage.getItem("transList"));
    if (transJson !== undefined && transJson !== null && transJson !== "") {
        //add for loop 3al transJson to show just transactions for current user
        $rootScope.transactionsList = transJson;
        console.log($rootScope.transactionsList);
        if ($rootScope.transactionsList.length > 0) $rootScope.calculateTotal();
    }


    $scope.myFilter = function (item) {
        return item.employeeId === localStorage.getItem("employeeId");
    };


    $scope.displayEditTransactionsPopup = function () {

        if (localStorage.getItem("isCurrentEmployeeHasOpenShift") !== "true") {
            swal($filter('translate')('noOpenShift'), "", "warning");
            return;
        }

        if ($rootScope.transactionsList.length > 0) {

            var modalInstance;

            modalInstance = $uibModal.open({
                animate: true,
                templateUrl: '/Pages/POSAttendant/Main/Views/editTransactionsPopup.html',
                controller: 'editTransactionsPopupController',
                scope: $scope,
                windowClass: 'show edit-modal-window',
                resolve: {
                    data: function () {
                        return { wetName: '' };
                    }
                }
            });

            modalInstance.result.then(function (Result) {
                //when $uibModalInstance.close() fct executed
              

            }, function () {
                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
            });

            modalInstance.opened.then(function () {
                //alert('hi');
            });

        } else {
            swal($filter('translate')('noTrans'), "", "warning");
        }
    };

    $scope.displayReceiptPopup = function () {
        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Main/Views/createReceiptPopup.html',
            controller: 'createReceiptPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { id:"1" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed
            $rootScope.transactionsList = [];
            $scope.transTotalLebanese = "";
            $scope.transTotalDollar = "";
            $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

        modalInstance.opened.then(function () {
            //alert('hi');
        });
    }

    $scope.displayWetWayOfPaymentPopup = function () {

        if (localStorage.getItem("isCurrentEmployeeHasOpenShift") !== "true") {
            swal($filter('translate')('noOpenShift'), "", "warning");
            return;
        }

        if ($rootScope.transactionsList.length > 0) {

            var modalInstance;

            modalInstance = $uibModal.open({
                animate: true,
                templateUrl: '/Pages/POSAttendant/Main/Views/wetWayOfPaymentPopup.html',
                controller: 'wetWayOfPaymentPopupController',
                scope: $scope,
                windowClass: 'show',
                resolve: {
                    data: function () {
                        return { totalLL: totalLeb, totalDollar: totalDol, employeeName: $scope.employeeName, employeeId: localStorage.getItem("employeeId") };
                    }
                }
            });

            modalInstance.result.then(function (Result) {
                //when $uibModalInstance.close() fct executed
                if (Result === 'Succeeded') {
                    $rootScope.transactionsList = [];
                    localStorage.setItem("transList", JSON.stringify($rootScope.transactionsList));
                    $scope.transTotalLebanese = "";
                    $scope.transTotalDollar = "";
                    $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
                }

            }, function () {
                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
            });

            modalInstance.opened.then(function () {
                //alert('hi');
            });
        } else {
            swal("There are no transactions to be paid!", "", "warning");
        }

    };

    $scope.displayOilChangePopup = function () {

        if (localStorage.getItem("isCurrentEmployeeHasOpenShift") !== "true") {
            swal($filter('translate')('noOpenShift'), "", "warning");
            return;
        }

            var modalInstance;

            modalInstance = $uibModal.open({
                animate: true,
                templateUrl: '/Pages/POSAttendant/Dry/Views/oilChangePopup.html',
                controller: 'oilChangePopupController',
                scope: $scope,
                windowClass: 'show',
                resolve: {
                    data: function () {
                        return { item: "1" };
                    }
                }
            });

            modalInstance.result.then(function (Result) {
                //when $uibModalInstance.close() fct executed

            }, function () {
                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
            });

            modalInstance.opened.then(function () {
                //alert('hi');
            });

    };


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

                        if (localStorage.getItem("openedShifts") !== null && localStorage.getItem("openedShifts") !== "" && localStorage.getItem("openedShifts") !== undefined) {
                            var openedShifts = JSON.parse(localStorage.getItem("openedShifts"));
                            var existOpen = false;
                            var isBlockUI = false;
                            for (var g = 0; g < openedShifts.length; g++) {
                                if (openedShifts[g].employeeId === localStorage.getItem("employeeId")) { existOpen = true; isBlockUI = openedShifts[g].blockUI; break; }
                            }
                            if (existOpen) {
                                localStorage.setItem("isCurrentEmployeeHasOpenShift", "true");
                                if (isBlockUI === "true") {
                                    var oldDollarRate = localStorage.getItem('oldDollarRate');
                                    var newDollarRate = localStorage.getItem('dollarRate');
                                    if (modalInstanceRate !== null) modalInstanceRate.dismiss();
                                    OpenDollarRateChangedPopup(oldDollarRate, newDollarRate);
                                }
                            } else {
                                localStorage.setItem("isCurrentEmployeeHasOpenShift", "false");
                            }
                        } else {
                            localStorage.setItem("isCurrentEmployeeHasOpenShift", "false");
                        }


                        $rootScope.profileName = $scope.employeeName.slice(0, 2).toUpperCase();

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

    getCurrentUser();


    //$common_helper.createRequest("GET", "/FPOS/rest/user/getCurrentUser")
    //    .then(function (response) {
    //        console.log(response.data);

    //        if (response.data !== null && response.data !== undefined && response.data !== "") {
    //            $scope.employeeName = response.data.name;
    //            $scope.employeeId = response.data.id;
    //            $rootScope.profileName = $scope.employeeName.slice(0, 2).toUpperCase();
    //        } else {
    //            swal("Failed getting user info", "", "error");
    //        }
    //    });

    $scope.openShiftPopup = function () {


        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/Request/checkIfEmployeeHasOpenSession",
            data: { sessionId: localStorage.getItem('session_id'), employeeId: localStorage.getItem("employeeId") }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        console.log(result.resultData);
                        if (result.resultData) {
                            swal($filter('translate')('AlreadyOpenShift'), "", "warning");

                        } else {

                            var modalInstance;

                            modalInstance = $uibModal.open({
                                animate: true,
                                templateUrl: '/Pages/POSAttendant/ShiftAndSession/Views/openShiftPopup.html',
                                controller: 'openShiftPopupController',
                                scope: $scope,
                                windowClass: 'show',
                                resolve: {
                                    data: function () {
                                        return { id: "1" };
                                    }
                                }
                            });

                            modalInstance.result.then(function (Result) {
                                //when $uibModalInstance.close() fct executed

                            }, function () {
                                //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
                            });
                        }

                    } else {
                        swal($filter('translate')('failedCheckOpenShift'), "", "error");
                    }

                } else {
                    swal($filter('translate')('failedCheckOpenShift'), "", "error");
                }

            } else {
                swal($filter('translate')('failedCheckOpenShift'), "", "error");
            }


        }, function (error) {
                swal($filter('translate')('failedCheckOpenShift'), "", "error");
            $rootScope.showLoader = false;
        });



    }

    $scope.closeShiftPopup = function () {

        if (localStorage.getItem("isCurrentEmployeeHasOpenShift") !== "true") {
            swal($filter('translate')('noOpenShift'), "", "warning");
            return;
        }

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/ShiftAndSession/Views/closeShiftPopup.html',
            controller: 'closeShiftPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { id: "1" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

        modalInstance.opened.then(function () {
            //alert('hi');
        });
    }

/*Calculator*/

    var isQtyFocus = false;
    var isDiscountFocus = false;


    const calculator = {
        dryQtyValue: '0',
        dryDiscountValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {

        if (isQtyFocus) {
            const { dryQtyValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.dryQtyValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.dryQtyValue = dryQtyValue === '0' ? digit : dryQtyValue + digit;
            }
        }

        if (isDiscountFocus) {
            const { dryDiscountValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.dryDiscountValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.dryDiscountValue = dryDiscountValue === '0' ? digit : dryDiscountValue + digit;
            }
        }
        
    }

    function resetCalculator() {
        calculator.dryQtyValue = '0';
        calculator.dryDiscountValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function inputDecimal(dot) {

        if (isQtyFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.dryQtyValue.includes(dot)) {
                // Append the decimal point
                calculator.dryQtyValue += dot;
            }
        }

        if (isDiscountFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.dryDiscountValue.includes(dot)) {
                // Append the decimal point
                calculator.dryDiscountValue += dot;
            }
        }
    }

    function updateDisplay() {

        if (isQtyFocus) {
            $rootScope.dryItemsList[$rootScope.indexKey].qtyItem = calculator.dryQtyValue;
            $rootScope.calculateTotalDry(calculator.dryQtyValue, $rootScope.dryItemsList[$rootScope.indexKey].discountItem, $rootScope.dryItemsList[$rootScope.indexKey].price, $rootScope.indexKey, $rootScope.dryItemsList[$rootScope.indexKey].maxQtyItem);
        }

        if (isDiscountFocus) {
            $rootScope.dryItemsList[$rootScope.indexKey].discountItem = calculator.dryDiscountValue;
            $rootScope.calculateTotalDry($rootScope.dryItemsList[$rootScope.indexKey].qtyItem, calculator.dryDiscountValue, $rootScope.dryItemsList[$rootScope.indexKey].price, $rootScope.indexKey);
        }
    }

    $rootScope.dryAddDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }

    $rootScope.clearAllDry = function () {
        resetCalculator();
        //$rootScope.dryItemsList[$rootScope.indexKey].qtyItem = calculator.dryQtyValue;
        //$rootScope.dryItemsList[$rootScope.indexKey].discountItem = calculator.dryDiscountValue;
    }

    $rootScope.dryClearFocusedField = function () {

        if (isQtyFocus) {
            //calculator.dryQtyValue = '0';
            calculator.dryQtyValue = calculator.dryQtyValue.slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isDiscountFocus) {
            //calculator.dryDiscountValue = '0';
            calculator.dryDiscountValue = calculator.dryDiscountValue.slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }
        updateDisplay();
    }

    //$rootScope.clearQty = function () {
    //    resetCalculator();
    //    $rootScope.dryItemsList[$rootScope.indexKey].qtyItem = '0';

    //}

    //$rootScope.clearDiscount = function () {
    //    resetCalculator();
    //    $rootScope.dryItemsList[$rootScope.indexKey].discountItem = '0';
    //}

    $rootScope.dryAddNumber = function (number) {
        inputDigit(number);
        updateDisplay();
    }

    $rootScope.DryQtyFieldFocus = function (key) {
        $rootScope.indexKey = key;
        isQtyFocus = true;
        isDiscountFocus = false;
    }

    $rootScope.DryDiscountFieldFocus = function (key) {
        $rootScope.indexKey = key;
        isQtyFocus = false;
        isDiscountFocus = true;
        //for (let i = 0; i < $rootScope.DryDiscountFieldFocusList.length; i++) {
        //    if (key === i) { DryDiscountFieldFocusList[key] = true; }
        //    else { DryDiscountFieldFocusList[key] = false; }
        //}
    }

    $rootScope.DryQtyFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.dryQtyValue = v;
        }
    }

    $rootScope.DryDiscountFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.dryDiscountValue = v;
        }
    }


}]);


