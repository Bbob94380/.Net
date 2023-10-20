
rootModule.controller('createNewfuelRefundPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    $scope.refundTypeValue = "calibration";
    $scope.IsDisabled = false;
    $scope.refundAmount = [];

    $scope.refundTypes = [{
        "id": 1,
        "type": "Calibration Refund"

    }, {
        "id": 2,
        "type": "Dry Product Refund"
        }
    ];


    //events

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

    }

    getCurrentDateAndTime();



    function getCurrentUser() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetCurrentUser",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.employeeName = result.resultData.name;
                        $scope.employeeNameCalib = result.resultData.name;

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


    $scope.refundAmountChanged = function (item, refundAmount, index) {

        if (refundAmount > item.allowedQuantity) {
            $scope.refundAmount[index] = 0;
            swal("This quantity is not allowed", "Allowed quantity is : " + item.allowedQuantity , "warning");

        }

    }

    function getWop() {
        var isCardPaid = false;
        var isCashPaid = false;
        var isDollarPaid = false;
        var isLLPaid = false;
        $scope.dollarPaid = 0;
        $scope.lebanesePaid = 0;

        $scope.total = $scope.saleInvoice.netTotalMc + " L.L/" + $scope.saleInvoice.netTotalSc + " $";


        if ($scope.saleInvoice.firstCardTypeAmount !== 0 && $scope.saleInvoice.firstCardTypeAmount !== null) {
            isCardPaid = true;

            if ($scope.saleInvoice.firstCardCurrency === "USD") {
                isDollarPaid = true;
                $scope.dollarPaid += $scope.saleInvoice.firstCardTypeAmount;
            }

            if ($scope.saleInvoice.firstCardCurrency === "LBP") {
                isLLPaid = true;
                $scope.lebanesePaid += $scope.saleInvoice.firstCardTypeAmount;

            }
        }

        if ($scope.saleInvoice.secondCardTypeAmount !== 0 && $scope.saleInvoice.secondCardTypeAmount !== null) {
            isCardPaid = true;

            if ($scope.saleInvoice.secondCardCurrency === "USD") {
                isDollarPaid = true;
                $scope.dollarPaid += $scope.saleInvoice.secondCardTypeAmount;
            }

            if ($scope.saleInvoice.secondCardCurrency === "LBP") {
                isLLPaid = true;
                $scope.lebanesePaid += $scope.saleInvoice.secondCardTypeAmount;

            }
        }


        if (($scope.saleInvoice.cachAmountMc !== 0 && $scope.saleInvoice.cachAmountMc !== null) || ($scope.saleInvoice.cachAmountSc !== 0 && $scope.saleInvoice.cachAmountSc !== null)) {
            isCashPaid = true;

            if ($scope.saleInvoice.cachAmountMc !== 0) {
                isLLPaid = true;
                $scope.lebanesePaid += $scope.saleInvoice.cachAmountMc;
            }

            if ($scope.saleInvoice.cachAmountSc !== 0) {
                isDollarPaid = true;
                $scope.dollarPaid += $scope.saleInvoice.cachAmountSc;

            }

        }

        if (isCardPaid && isCashPaid) {
            $scope.saleInvoice.wop = "Cash and card";
        } else if (isCardPaid) {
            $scope.saleInvoice.wop = "Card";
        } else if (isCashPaid) {
            $scope.saleInvoice.wop = "Cash";
        } else {
            $scope.saleInvoice.wop = "";
        }


    }


    function getWetProductTypes() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getWetProductTypes",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.wetProductTypes = result.resultData;

                    } else {
                        $rootScope.showLoader = false;
                        swal("Creation process failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    $rootScope.showLoader = false;
                    swal("Creation process failed", "Please try again", "error");
                }

            } else {
                $rootScope.showLoader = false;

                swal("Creation process failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Creation process failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    getWetProductTypes();

    function getRecentTransaction() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getRecentTransaction",
            data: { sessionId: localStorage.getItem('session_id_sm')}
        }).then(function (response) {

            console.log(response);

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.saleTransaction = result.resultData;

                    } else {
                        $rootScope.showLoader = false;
                        swal("Creation process failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    $rootScope.showLoader = false;
                    swal("Creation process failed", "Please try again", "error");
                }

            } else {
                $rootScope.showLoader = false;

                swal("Creation process failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Creation process failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    function findDryProductSaleById(saleId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/findDryProductSaleById",
            data: { sessionId: localStorage.getItem('session_id_sm'), saleId: saleId }
        }).then(function (response) {

            console.log(response);

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.saleInvoice = result.resultData;
                        getWop();
                        getDetailsToBeReturned(saleId);

                    } else {
                        $rootScope.showLoader = false;
                        swal("Creation process failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    $rootScope.showLoader = false;
                    swal("Creation process failed", "Please try again", "error");
                }

            } else {
                $rootScope.showLoader = false;

                swal("Creation process failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Creation process failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    function getDetailsToBeReturned(saleId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getDetailsToBeReturned",
            data: { sessionId: localStorage.getItem('session_id_sm'), saleId: saleId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.saleDetailReturn = result.resultData;
                        //swal("Great", "Created successfully", "success");

                    } else {
                        swal("Creation process failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Creation process failed", "Please try again", "error");
                }

            } else {
                swal("Creation process failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Creation process failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getInfo = function (saleId) {

        if ($scope.refundTypeSelected.id === 2) {

            if (saleId !== null && saleId !== undefined && saleId !== "" && saleId !== 0) {

                findDryProductSaleById(saleId);

            } else {
                swal("Please fill the sale invoice id field", "", "warning");
            }
            

        }
    }

    $scope.refundTypeChanged = function () {

        if ($scope.refundTypeSelected.id === 1) {

            getRecentTransaction();

        }
    }


    $scope.createRefund = function () {

        console.log($scope.refundTypeValue);
        console.log($scope.tankId);

        if ($scope.refundTypeSelected.id === 1) {

            var calibration = {
                creator: $scope.employeeNameCalib,
                saleTransactionId: 12.3 /*$scope.saleTransaction.id*/,
                tankId: $scope.tankNumber,
                wetProductId: 12.4 /*$scope.saleTransaction.wetProductId*/
            }

            $rootScope.showLoader = true;
            $http({
                method: "POST",
                url: "/api/SmApi/createCalibrationAsync",
                data: { sessionId: localStorage.getItem('session_id_sm'), calibration: calibration }
            }).then(function (response) {

                console.log(response);
                $rootScope.showLoader = false;

                if (response !== null && response !== undefined) {

                    if (response.data !== null && response.data !== undefined) {

                        var result = JSON.parse(response.data);

                        if (result.isSuccessStatusCode) {

                            swal("Great", "Created successfully", "success");
                            $uibModalInstance.close('Succeeded');

                        } else {
                            swal("Creation process failed", "Please try again", "error");
                            console.log(result.errorMsg);
                        }

                    } else {
                        swal("Creation process failed", "Please try again", "error");
                    }

                } else {
                    swal("Creation process failed", "Please try again", "error");
                }


            }, function (error) {
                    swal("Creation process failed", "Please try again", "error");
                $rootScope.showLoader = false;
                console.log(error);
            });

        } else if ($scope.refundTypeSelected.id === 2) {

            var saleDetailReturnArray = [];

            for (var i = 0; i < $scope.saleDetailReturn.length; i++) {

                var item = $scope.saleDetailReturn[i];
                item.quantity = $scope.refundAmount[i];
                saleDetailReturnArray.push(item);
            }


            var refundDry = {
                creator: $scope.employeeName,
                customerId: $scope.saleInvoice.customerId,
                saleId: $scope.saleId, 
                firstCardType: $scope.saleInvoice.firstCardType,
                firstCardId: $scope.saleInvoice.firstCardId,
                firstCardCurrency: $scope.saleInvoice.firstCardCurrency,
                currencyRatio: $scope.saleInvoice.currencyRatio,
                firstCardTypeAmount: $scope.saleInvoice.firstCardTypeAmount,
                cachAmountMc: $scope.saleInvoice.cachAmountMc,
                netTotalMc: $scope.saleInvoice.netTotalMc,
                netTotalSc: $scope.saleInvoice.netTotalSc,
                saleDetailReturn: saleDetailReturnArray
            }

            

            $rootScope.showLoader = true;
            $http({
                method: "POST",
                url: "/api/SmApi/createRefundDryAsync",
                data: { sessionId: localStorage.getItem('session_id_sm'), refundDry: refundDry }
            }).then(function (response) {

                console.log(response);
                $rootScope.showLoader = false;

                if (response !== null && response !== undefined) {

                    if (response.data !== null && response.data !== undefined) {

                        var result = JSON.parse(response.data);

                        if (result.isSuccessStatusCode) {

                            swal("Great", "Created successfully", "success");
                            $uibModalInstance.close('Succeeded');

                        } else {
                            swal("Creation process failed", "Please try again", "error");
                            console.log(result.errorMsg);
                        }

                    } else {
                        swal("Creation process failed", "Please try again", "error");
                    }

                } else {
                    swal("Creation process failed", "Please try again", "error");
                }


            }, function (error) {
                swal("Creation process failed", "Please try again", "error");
                $rootScope.showLoader = false;
                console.log(error);
            });
        }

    }





});