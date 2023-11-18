
posAttendantRootModule.controller('wetWayOfPaymentPopupController', function ($uibModal, $scope, $rootScope, $http, $uibModalInstance, data, $document) {


    $scope.displayCouponPopup = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Main/Views/couponPopup.html',
            controller: 'couponPopupController',
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


    //Initialization
    $scope.totalLL = data.totalLL + " L.L";
    $scope.totalDollar = data.totalDollar + "$";

    $scope.paymentTypes = ["Cash", "LOCAL", "NOUR"];

    $scope.showCashFields = false;
    $scope.showCardFields = false;
    $scope.showNourCardFields = false;
    $scope.showCashFields2 = false;
    $scope.showCardFields2 = false;
    $scope.showNourCardFields2 = false;

    $scope.totalPayDollar = 0;
    $scope.totalPayLL = 0;

   
    //events

    function showCashFieldBydefault() {
        $scope.checked = true;
        $scope.selectedPaymentType = "Cash";
        $scope.showCashFields = true;
        $scope.showCardFields = false;
        $scope.showNourCardFields = false;
    }

    showCashFieldBydefault();

    $scope.params = {};

    $scope.showPassword = false;
    $scope.showPassword2 = false;
    $scope.showPassword3 = false;
    $scope.showPassword4 = false;

    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    }
    $scope.toggleShowPassword2 = function () {
        $scope.showPassword2 = !$scope.showPassword2;
    }
    $scope.toggleShowPassword3 = function () {
        $scope.showPassword3 = !$scope.showPassword3;
    }
    $scope.toggleShowPassword4 = function () {
        $scope.showPassword4 = !$scope.showPassword4;
    }


    var firstCashDollar = 0;
    var firstCashLL = 0;
    var firstCardDollar = 0;
    var firstNourCardDollar = 0;
    var secondCashDollar = 0;
    var secondCashLL = 0;
    var secondCardDollar = 0;
    var secondNourCardDollar = 0;

    console.log($rootScope.transactionsList);

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

                        $rootScope.employeeName = result.resultData.name;
                        $rootScope.employeeId = result.resultData.id;

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


    function getTransactionMainId() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetTransactionMainId",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $rootScope.mainTransId = result.resultData;

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

    getTransactionMainId();

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


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.firstPaymentTypeChanged = function (firstPaymentType) {
        if (firstPaymentType === "LOCAL") {
            $scope.showCashFields = false;
            $scope.showCardFields = true;
            $scope.showNourCardFields = false;
            $scope.totalPayDollar = $scope.totalPayDollar - (firstCashDollar + firstNourCardDollar);
            $scope.totalPayLL = $scope.totalPayLL - firstCashLL;
            firstCashDollar = 0;
            firstCashLL = 0;
            $scope.dollarCashFirst = 0;
            $scope.lebaneseCashFirst = 0;
            firstNourCardDollar = 0;
            $scope.dollarNourCardFirst = 0;
            $scope.codeNourCardFirst = 0;
        }

        if (firstPaymentType === "NOUR") {
            $scope.showCashFields = false;
            $scope.showCardFields = false;
            $scope.showNourCardFields = true;
            $scope.totalPayDollar = $scope.totalPayDollar - (firstCashDollar + firstCardDollar);
            $scope.totalPayLL = $scope.totalPayLL - firstCashLL;
            firstCashDollar = 0;
            firstCashLL = 0;
            $scope.dollarCashFirst = 0;
            $scope.lebaneseCashFirst = 0;
            firstCardDollar = 0;
            $scope.dollarCardFirst = 0;
            $scope.codeCardFirst = 0;
        }

        if (firstPaymentType === "Cash") {
            $scope.showCashFields = true;
            $scope.showCardFields = false;
            $scope.showNourCardFields = false;
            $scope.totalPayDollar = $scope.totalPayDollar - (firstCardDollar + firstNourCardDollar);
            firstCardDollar = 0;
            $scope.dollarCardFirst = 0;
            $scope.codeCardFirst = 0;
            firstNourCardDollar = 0;
            $scope.dollarNourCardFirst = 0;
            $scope.codeNourCardFirst = 0;

        }
    };

    $scope.secondPaymentTypeChanged = function (secondPaymentType) {
        if (secondPaymentType === "LOCAL") {
            $scope.showCashFields2 = false;
            $scope.showCardFields2 = true;
            $scope.showNourCardFields2 = false;
            $scope.totalPayDollar = $scope.totalPayDollar - (secondCashDollar + secondNourCardDollar);
            $scope.totalPayLL = $scope.totalPayLL - secondCashLL;
            secondCashDollar = 0;
            secondCashLL = 0;
            secondNourCardDollar = 0;
            $scope.dollarCashSecond = 0;
            $scope.lebaneseCashSecond = 0;
            $scope.dollarNourCardSecond = 0;
            $scope.codeNourCardSecond = 0;
        }

        if (secondPaymentType === "NOUR") {
            $scope.showCashFields2 = false;
            $scope.showCardFields2 = false;
            $scope.showNourCardFields2 = true;
            $scope.totalPayDollar = $scope.totalPayDollar - (secondCashDollar + secondCardDollar);
            $scope.totalPayLL = $scope.totalPayLL - secondCashLL;
            secondCashDollar = 0;
            secondCashLL = 0;
            secondCardDollar = 0;
            $scope.dollarCashSecond = 0;
            $scope.lebaneseCashSecond = 0;
            $scope.dollarCardSecond = 0;
            $scope.codeCardSecond = 0;
        }


        if (secondPaymentType === "Cash") {
            $scope.showCashFields2 = true;
            $scope.showCardFields2 = false;
            $scope.showNourCardFields2 = false;
            $scope.totalPayDollar = $scope.totalPayDollar - (secondCardDollar + secondNourCardDollar);
            secondCardDollar = 0;
            secondNourCardDollar = 0;
            $scope.dollarCardSecond = 0;
            $scope.codeCardSecond = 0;
            $scope.dollarNourCardSecond = 0;
            $scope.codeNourCardSecond = 0;
        }
    };


    $scope.calculateTotalOfCashAndCard = function (currency, value, field) {

        if (field === "firstCashDollar") {
            firstCashDollar = parseFloat(value === "" ? '0' : value);
        }

        if (field === "firstCashLL") {
            firstCashLL = parseFloat(value === "" ? '0' : value);
        }

        if (field === "firstCardDollar") {
            firstCardDollar = parseFloat(value === "" ? '0' : value);
        }

        if (field === "firstNourCardDollar") {
            firstNourCardDollar = parseFloat(value === "" ? '0' : value);
        }

        if (field === "secondCashDollar") {
            secondCashDollar = parseFloat(value === "" ? '0' : value);
        }

        if (field === "secondCashLL") {
            secondCashLL = parseFloat(value === "" ? '0' : value);
        }

        if (field === "secondCardDollar") {
            secondCardDollar = parseFloat(value === "" ? '0' : value);
        }

        if (field === "secondNourCardDollar") {
            secondNourCardDollar = parseFloat(value === "" ? '0' : value);
        }

        $scope.totalPayDollar = firstCashDollar + firstCardDollar + firstNourCardDollar + secondCashDollar + secondCardDollar + secondNourCardDollar;
        $scope.totalPayLL = firstCashLL + secondCashLL;
    };

    $scope.$watch("checked", function (newValue = '', oldValue = '') {
        if (!newValue) {
            if ($scope.selectedPaymentType === "LOCAL") {

                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarCardFirst);
                firstCardDollar = 0;
                $scope.dollarCardFirst = 0;
                $scope.codeCardFirst = 0;
            }

            if ($scope.selectedPaymentType === "NOUR") {

                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarNourCardFirst);
                firstNourCardDollar = 0;
                $scope.dollarNourCardFirst = 0;
                $scope.codeNourCardFirst = 0;
            }

            if ($scope.selectedPaymentType === "Cash") {

                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarCashFirst);
                $scope.totalPayLL = $scope.totalPayLL - parseFloat($scope.lebaneseCashFirst);
                firstCashDollar = 0;
                firstCashLL = 0;
                $scope.dollarCashFirst = 0;
                $scope.lebaneseCashFirst = 0;
            }
        }
    });

    $scope.$watch("checked2", function (newValue = '', oldValue = '') {
        if (!newValue) {
            if ($scope.selectedSecondPaymentType === "LOCAL") {
                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarCardSecond);
                secondCardDollar = 0;
                $scope.dollarCardSecond = 0;
                $scope.codeCardSecond = 0;

            }

            if ($scope.selectedSecondPaymentType === "NOUR") {
                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarNourCardSecond);
                secondNourCardDollar = 0;
                $scope.dollarNourCardSecond = 0;
                $scope.codeNourCardSecond = 0;

            }

            if ($scope.selectedSecondPaymentType === "Cash") {
                $scope.totalPayDollar = $scope.totalPayDollar - parseFloat($scope.dollarCashSecond);
                $scope.totalPayLL = $scope.totalPayLL - parseFloat($scope.lebaneseCashSecond);
                secondCashDollar = 0;
                secondCashLL = 0;
                $scope.dollarCashSecond = 0;
                $scope.lebaneseCashSecond = 0;
            }
        }
    });

    $scope.payDone = function () {
        //$uibModalInstance.close('Succeeded');

        console.log($scope.checked);

        if ((firstCashLL === undefined || firstCashLL === null || firstCashLL === 0) && 
            (secondCashLL === undefined || secondCashLL === null || secondCashLL === 0) &&
            (firstCashDollar === undefined || firstCashDollar === null || firstCashDollar === 0) &&
            (secondCashDollar === undefined || secondCashDollar === null || secondCashDollar === 0) &&
            (firstCardDollar === undefined || firstCardDollar === null || firstCardDollar === 0) && 
            (secondCardDollar === undefined || secondCardDollar === null || secondCardDollar === 0) &&
            (firstNourCardDollar === undefined || firstNourCardDollar === null || firstNourCardDollar === 0) &&
            (secondNourCardDollar === undefined || secondNourCardDollar === null || secondNourCardDollar === 0)) {

            swal("Oops", "Please enter your payment method information", "warning");
            return;

        }


        if ($scope.checked && $scope.selectedPaymentType !== undefined && $scope.selectedPaymentType !== null) {

            if ((firstCashLL === undefined || firstCashLL === null || firstCashLL === 0) &&
                (firstCashDollar === undefined || firstCashDollar === null || firstCashDollar === 0) &&
                (firstCardDollar === undefined || firstCardDollar === null || firstCardDollar === 0) &&
                (firstNourCardDollar === undefined || firstNourCardDollar === null || firstNourCardDollar === 0)) {

                swal("Oops", "Please enter your payment method information", "warning");
                return;

            }

        } else if ($scope.checked2 && $scope.selectedSecondPaymentType !== undefined && $scope.selectedSecondPaymentType !== null) {

            if ((secondCashLL === undefined || secondCashLL === null || secondCashLL === 0) &&
                (secondCashDollar === undefined || secondCashDollar === null || secondCashDollar === 0) &&
                (secondCardDollar === undefined || secondCardDollar === null || secondCardDollar === 0) &&
                (secondNourCardDollar === undefined || secondNourCardDollar === null || secondNourCardDollar === 0)) {

                swal("Oops", "Please enter your payment method information", "warning");
                return;

            }

        }

        var saleInvoice = {};
        var saleDetails = [];
        var saleTransactions = [];
        var carWashes = [];
        var customerServiceTransaction = {};

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Dry") {

                for (let j = 0; j < $rootScope.transactionsList[i].products.length; j++) {

                    var dryObj = {
                        productId: $rootScope.transactionsList[i].products[j].id,
                        productName: $rootScope.transactionsList[i].products[j].name,
                        quantity: $rootScope.transactionsList[i].products[j].qtyItem,
                        priceMc: $rootScope.transactionsList[i].products[j].price * parseFloat(localStorage.getItem('dollarRate')),
                        priceSc: $rootScope.transactionsList[i].products[j].price,
                        discountPercent: $rootScope.transactionsList[i].products[j].discountItem,
                        netTotalMc: $rootScope.transactionsList[i].products[j].totalIt * parseFloat(localStorage.getItem('dollarRate')),
                        netTotalSc: $rootScope.transactionsList[i].products[j].totalIt
                    }

                    saleDetails.push(dryObj);

                }

                saleInvoice = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar,
                    saleDetails: saleDetails
                }

                break;
            }
        }


        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Fuel") {

                var fuelObj = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    wetProductId: $rootScope.transactionsList[i].wetId,
                    dispensedVolume: $rootScope.transactionsList[i].qty,
                    gas: $rootScope.transactionsList[i].gas,
                    priceMc: $rootScope.transactionsList[i].priceMcOfLitre,
                    priceSc: $rootScope.transactionsList[i].priceScOfLitre,
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar
                 }

                saleTransactions.push(fuelObj);
            }
        }

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Car wash") {

                var carObj = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar,
                    vehiceType: "CAR",
                    washSubCategoriesId: $rootScope.transactionsList[i].washSubCategoriesId
                }

                carWashes.push(carObj);
            }
        }

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Service") {

                customerServiceTransaction = $rootScope.transactionsList[i];
                break;
            }
        }

        var firstCardType = null;
        var secondCardType = null;
        var firstCardCurrency = null;
        var secondCardCurrency = null;
        var firstCardDollarValue = null;
        var secondCardDollarValue = null;
        var firstCardCodeValue = null;
        var secondCardCodeValue = null;


        if ($scope.selectedPaymentType !== "Cash" && $scope.selectedPaymentType !== undefined && $scope.selectedPaymentType !== null && $scope.selectedPaymentType !== "") {
            firstCardType = $scope.selectedPaymentType;
            firstCardCurrency = "USD";
            if ($scope.selectedPaymentType === "LOCAL") { firstCardDollarValue = firstCardDollar; firstCardCodeValue = $scope.codeCardFirst;   }
            if ($scope.selectedPaymentType === "NOUR") { firstCardDollarValue = firstNourCardDollar; firstCardCodeValue = $scope.codeNourCardFirst;  }
        }

        if ($scope.selectedSecondPaymentType !== "Cash" && $scope.selectedSecondPaymentType !== undefined && $scope.selectedSecondPaymentType !== null && $scope.selectedSecondPaymentType !== "") {
            secondCardType = $scope.selectedSecondPaymentType;
            secondCardCurrency = "USD";
            if ($scope.selectedSecondPaymentType === "LOCAL") { secondCardDollarValue = secondCardDollar; secondCardCodeValue = $scope.codeCardSecond; }
            if ($scope.selectedSecondPaymentType === "NOUR") { secondCardDollarValue = secondNourCardDollar; secondCardCodeValue = $scope.codeNourCardSecond; }
        }

        var createTransObj = {
            id: $rootScope.mainTransId,
            creator: $rootScope.employeeName,
            netTotalMc: data.totalLL,
            netTotalSc: data.totalDollar,
            cachAmountMc: firstCashLL + secondCashLL,
            cachAmountSc: firstCashDollar + secondCashDollar,
            invoiceAmountMc: firstCashLL + secondCashLL,
            invoiceAmountSc: firstCashDollar + secondCashDollar + firstCardDollar + secondCardDollar + firstNourCardDollar + secondNourCardDollar,
            firstCardId: firstCardCodeValue,
            firstCardType: firstCardType,
            firstCardTypeAmount: firstCardDollarValue,
            firstCardCurrency: firstCardCurrency,
            secondCardId: secondCardCodeValue,
            secondCardType: secondCardType,
            secondCardTypeAmount: secondCardDollarValue,
            secondCardCurrency: secondCardCurrency,
            currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
            saleInvoice: saleInvoice,
            saleTransactions: saleTransactions,
            carWashes: carWashes,
            customerServiceTransaction: customerServiceTransaction
        }


        console.log(JSON.stringify(createTransObj));


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/createTransactionAsync",
            data: { sessionId: localStorage.getItem('session_id'), createTransObj: createTransObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("Great", "The payment process was completed successfully", "success");
                        $uibModalInstance.close('Succeeded');

                    } else {
                        swal("Payment failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Payment failed", "Please try again", "error");
                }

            } else {
                swal("Payment failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Payment failed", "Please try again", "error");
            $rootScope.showLoader = false;
                console.log(error);
        });


    }

    $scope.createRecipetForOneTransaction = function () {
        //$uibModalInstance.close('Succeeded');

        console.log($scope.checked);

        if ((firstCashLL === undefined || firstCashLL === null || firstCashLL === 0) &&
            (secondCashLL === undefined || secondCashLL === null || secondCashLL === 0) &&
            (firstCashDollar === undefined || firstCashDollar === null || firstCashDollar === 0) &&
            (secondCashDollar === undefined || secondCashDollar === null || secondCashDollar === 0) &&
            (firstCardDollar === undefined || firstCardDollar === null || firstCardDollar === 0) &&
            (secondCardDollar === undefined || secondCardDollar === null || secondCardDollar === 0) &&
            (firstNourCardDollar === undefined || firstNourCardDollar === null || firstNourCardDollar === 0) &&
            (secondNourCardDollar === undefined || secondNourCardDollar === null || secondNourCardDollar === 0)) {

            swal("Oops", "Please enter your payment method information", "warning");
            return;

        }


        if ($scope.checked && $scope.selectedPaymentType !== undefined && $scope.selectedPaymentType !== null) {

            if ((firstCashLL === undefined || firstCashLL === null || firstCashLL === 0) &&
                (firstCashDollar === undefined || firstCashDollar === null || firstCashDollar === 0) &&
                (firstCardDollar === undefined || firstCardDollar === null || firstCardDollar === 0) &&
                (firstNourCardDollar === undefined || firstNourCardDollar === null || firstNourCardDollar === 0)) {

                swal("Oops", "Please enter your payment method information", "warning");
                return;

            }

        } else if ($scope.checked2 && $scope.selectedSecondPaymentType !== undefined && $scope.selectedSecondPaymentType !== null) {

            if ((secondCashLL === undefined || secondCashLL === null || secondCashLL === 0) &&
                (secondCashDollar === undefined || secondCashDollar === null || secondCashDollar === 0) &&
                (secondCardDollar === undefined || secondCardDollar === null || secondCardDollar === 0) &&
                (secondNourCardDollar === undefined || secondNourCardDollar === null || secondNourCardDollar === 0)) {

                swal("Oops", "Please enter your payment method information", "warning");
                return;

            }

        }

        var saleInvoice = {};
        var saleDetails = [];
        var saleTransactions = [];
        var carWashes = [];
        var customerServiceTransaction = {};

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Dry") {

                for (let j = 0; j < $rootScope.transactionsList[i].products.length; j++) {

                    var dryObj = {
                        productId: $rootScope.transactionsList[i].products[j].id,
                        productName: $rootScope.transactionsList[i].products[j].name,
                        quantity: $rootScope.transactionsList[i].products[j].qtyItem,
                        priceMc: $rootScope.transactionsList[i].products[j].price * parseFloat(localStorage.getItem('dollarRate')),
                        priceSc: $rootScope.transactionsList[i].products[j].price,
                        discountPercent: $rootScope.transactionsList[i].products[j].discountItem,
                        netTotalMc: $rootScope.transactionsList[i].products[j].totalIt * parseFloat(localStorage.getItem('dollarRate')),
                        netTotalSc: $rootScope.transactionsList[i].products[j].totalIt
                    }

                    saleDetails.push(dryObj);

                }

                saleInvoice = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar,
                    saleDetails: saleDetails
                }

                break;
            }
        }


        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Fuel") {

                var fuelObj = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    wetProductId: $rootScope.transactionsList[i].wetId,
                    dispensedVolume: $rootScope.transactionsList[i].qty,
                    gas: $rootScope.transactionsList[i].gas,
                    priceMc: $rootScope.transactionsList[i].priceMcOfLitre,
                    priceSc: $rootScope.transactionsList[i].priceScOfLitre,
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar
                }

                saleTransactions.push(fuelObj);
            }
        }

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Car wash") {

                var carObj = {
                    id: $rootScope.transactionsList[i].id,
                    currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
                    netTotalMc: $rootScope.transactionsList[i].priceLL,
                    netTotalSc: $rootScope.transactionsList[i].priceDollar,
                    vehiceType: "CAR",
                    washSubCategoriesId: $rootScope.transactionsList[i].washSubCategoriesId
                }

                carWashes.push(carObj);
            }
        }

        for (let i = 0; i < $rootScope.transactionsList.length; i++) {

            if ($rootScope.transactionsList[i].productType === "Service") {

                customerServiceTransaction = $rootScope.transactionsList[i];
                break;
            }
        }

        var firstCardType = null;
        var secondCardType = null;
        var firstCardCurrency = null;
        var secondCardCurrency = null;
        var firstCardDollarValue = null;
        var secondCardDollarValue = null;
        var firstCardCodeValue = null;
        var secondCardCodeValue = null;


        if ($scope.selectedPaymentType !== "Cash" && $scope.selectedPaymentType !== undefined && $scope.selectedPaymentType !== null && $scope.selectedPaymentType !== "") {
            firstCardType = $scope.selectedPaymentType;
            firstCardCurrency = "USD";
            if ($scope.selectedPaymentType === "LOCAL") { firstCardDollarValue = firstCardDollar; firstCardCodeValue = $scope.codeCardFirst;}
            if ($scope.selectedPaymentType === "NOUR") { firstCardDollarValue = firstNourCardDollar; firstCardCodeValue = $scope.codeNourCardFirst;}
        }

        if ($scope.selectedSecondPaymentType !== "Cash" && $scope.selectedSecondPaymentType !== undefined && $scope.selectedSecondPaymentType !== null && $scope.selectedSecondPaymentType !== "") {
            secondCardType = $scope.selectedSecondPaymentType;
            secondCardCurrency = "USD";
            if ($scope.selectedSecondPaymentType === "LOCAL") { secondCardDollarValue = secondCardDollar; secondCardCodeValue = $scope.codeCardSecond; }
            if ($scope.selectedSecondPaymentType === "NOUR") { secondCardDollarValue = secondNourCardDollar; secondCardCodeValue = $scope.codeNourCardSecond; }
        }

        var createTransObj = {
            id: $rootScope.mainTransId,
            creator: $rootScope.employeeName,
            netTotalMc: data.totalLL,
            netTotalSc: data.totalDollar,
            cachAmountMc: firstCashLL + secondCashLL,
            cachAmountSc: firstCashDollar + secondCashDollar,
            invoiceAmountMc: firstCashLL + secondCashLL,
            invoiceAmountSc: firstCashDollar + secondCashDollar + firstCardDollar + secondCardDollar + firstNourCardDollar + secondNourCardDollar,
            firstCardId: firstCardCodeValue,
            firstCardType: firstCardType,
            firstCardTypeAmount: firstCardDollarValue,
            firstCardCurrency: firstCardCurrency,
            secondCardId: secondCardCodeValue,
            secondCardType: secondCardType,
            secondCardTypeAmount: secondCardDollarValue,
            secondCardCurrency: secondCardCurrency,
            currencyRatio: parseFloat(localStorage.getItem('dollarRate')),
            saleInvoice: saleInvoice,
            saleTransactions: saleTransactions,
            carWashes: carWashes,
            customerServiceTransaction: customerServiceTransaction
        }


        console.log(JSON.stringify(createTransObj));


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/createRecipetForOneTransaction",
            data: { sessionId: localStorage.getItem('session_id'), createTransObj: createTransObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("Great", "The payment process was completed successfully", "success");
                        $uibModalInstance.close('Succeeded');

                    } else {
                        swal("Payment failed", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Payment failed", "Please try again", "error");
                }

            } else {
                swal("Payment failed", "Please try again", "error");
            }


        }, function (error) {
            swal("Payment failed", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });


    }

    /*Calulator logic*/
    var isFirstCashDollarFieldFocus = false;
    var isFirstCashLebaneseFieldFocus = false;
    var isFirstCardDollarFieldFocus = false;
    var isFirstCardCodeFieldFocus = false;
    var isFirstNourCardDollarFieldFocus = false;
    var isFirstNourCardCodeFieldFocus = false;
    var isSecondCashDollarFieldFocus = false;
    var isSecondCashLebaneseFieldFocus = false;
    var isSecondCardDollarFieldFocus = false;
    var isSecondCardCodeFieldFocus = false;
    var isSecondNourCardDollarFieldFocus = false;
    var isSecondNourCardCodeFieldFocus = false;

    const calculator = {
        displayFirstCashDollarValue: '0',
        displayFirstCashLebaneseValue: '0',
        displayFirstCardDollarValue: '0',
        displayFirstCardCodeValue: '0',
        displayFirstNourCardDollarValue: '0',
        displayFirstNourCardCodeValue: '0',
        displaySecondCashDollarValue: '0',
        displaySecondCashLebaneseValue: '0',
        displaySecondCardDollarValue: '0',
        displaySecondCardCodeValue: '0',
        displaySecondNourCardDollarValue: '0',
        displaySecondNourCardCodeValue: '0',
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

        if (isFirstCardDollarFieldFocus) {
            const { displayFirstCardDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstCardDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstCardDollarValue = displayFirstCardDollarValue === '0' ? digit : displayFirstCardDollarValue + digit;
            }
        }

        if (isFirstCardCodeFieldFocus) {
            const { displayFirstCardCodeValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstCardCodeValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstCardCodeValue = displayFirstCardCodeValue === '0' ? digit : displayFirstCardCodeValue + digit;
            }
        }

        if (isFirstNourCardDollarFieldFocus) {
            const { displayFirstNourCardDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstNourCardDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstNourCardDollarValue = displayFirstNourCardDollarValue === '0' ? digit : displayFirstNourCardDollarValue + digit;
            }
        }

        if (isFirstNourCardCodeFieldFocus) {
            const { displayFirstNourCardCodeValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayFirstNourCardCodeValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayFirstNourCardCodeValue = displayFirstNourCardCodeValue === '0' ? digit : displayFirstNourCardCodeValue + digit;
            }
        }

        if (isSecondCashDollarFieldFocus) {
            const { displaySecondCashDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondCashDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondCashDollarValue = displaySecondCashDollarValue === '0' ? digit : displaySecondCashDollarValue + digit;
            }
        }

        if (isSecondCashLebaneseFieldFocus) {
            const { displaySecondCashLebaneseValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondCashLebaneseValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondCashLebaneseValue = displaySecondCashLebaneseValue === '0' ? digit : displaySecondCashLebaneseValue + digit;
            }
        }

        if (isSecondCardDollarFieldFocus) {
            const { displaySecondCardDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondCardDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondCardDollarValue = displaySecondCardDollarValue === '0' ? digit : displaySecondCardDollarValue + digit;
            }
        }

        if (isSecondCardCodeFieldFocus) {
            const { displaySecondCardCodeValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondCardCodeValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondCardCodeValue = displaySecondCardCodeValue === '0' ? digit : displaySecondCardCodeValue + digit;
            }
        }

        if (isSecondNourCardDollarFieldFocus) {
            const { displaySecondNourCardDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondNourCardDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondNourCardDollarValue = displaySecondNourCardDollarValue === '0' ? digit : displaySecondNourCardDollarValue + digit;
            }
        }

        if (isSecondNourCardCodeFieldFocus) {
            const { displaySecondNourCardCodeValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displaySecondNourCardCodeValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displaySecondNourCardCodeValue = displaySecondNourCardCodeValue === '0' ? digit : displaySecondNourCardCodeValue + digit;
            }
        }

    }


    function resetCalculator() {
        calculator.displayFirstCashDollarValue = '0';
        calculator.displayFirstCashLebaneseValue = '0';
        calculator.displayFirstCardDollarValue = '0';
        calculator.displayFirstCardCodeValue = '0';
        calculator.displayFirstNourCardDollarValue = '0';
        calculator.displayFirstNourCardCodeValue = '0';
        calculator.displaySecondCashDollarValue = '0';
        calculator.displaySecondCashLebaneseValue = '0';
        calculator.displaySecondCardDollarValue = '0';
        calculator.displaySecondCardCodeValue = '0';
        calculator.displaySecondNourCardDollarValue = '0';
        calculator.displaySecondNourCardCodeValue = '0';
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

        if (isFirstCardDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstCardDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstCardDollarValue += dot;
            }
        }

        if (isFirstCardCodeFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstCardCodeValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstCardCodeValue += dot;
            }
        }

        if (isFirstNourCardDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstNourCardDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstNourCardDollarValue += dot;
            }
        }

        if (isFirstNourCardCodeFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayFirstNourCardCodeValue.includes(dot)) {
                // Append the decimal point
                calculator.displayFirstNourCardCodeValue += dot;
            }
        }

        if (isSecondCashDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondCashDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondCashDollarValue += dot;
            }
        }

        if (isSecondCashLebaneseFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondCashLebaneseValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondCashLebaneseValue += dot;
            }
        }

        if (isSecondCardDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondCardDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondCardDollarValue += dot;
            }
        }

        if (isSecondCardCodeFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondCardCodeValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondCardCodeValue += dot;
            }
        }

        if (isSecondNourCardDollarFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondNourCardDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondNourCardDollarValue += dot;
            }
        }

        if (isSecondNourCardCodeFieldFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displaySecondNourCardCodeValue.includes(dot)) {
                // Append the decimal point
                calculator.displaySecondNourCardCodeValue += dot;
            }
        }

    }

    function updateDisplay() {
        if (isFirstCashDollarFieldFocus) {
            $scope.dollarCashFirst = calculator.displayFirstCashDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displayFirstCashDollarValue, 'firstCashDollar');
        }

        if (isFirstCashLebaneseFieldFocus) {
            $scope.lebaneseCashFirst = calculator.displayFirstCashLebaneseValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displayFirstCashLebaneseValue, 'firstCashLL');
        }

        if (isFirstCardDollarFieldFocus) {
            $scope.dollarCardFirst = calculator.displayFirstCardDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displayFirstCardDollarValue, 'firstCardDollar');
        }

        if (isFirstCardCodeFieldFocus) {
            $scope.codeCardFirst = calculator.displayFirstCardCodeValue;
        }

        if (isFirstNourCardDollarFieldFocus) {
            $scope.dollarNourCardFirst = calculator.displayFirstNourCardDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displayFirstNourCardDollarValue, 'firstNourCardDollar');
        }

        if (isFirstNourCardCodeFieldFocus) {
            $scope.codeNourCardFirst = calculator.displayFirstNourCardCodeValue;
        }

        if (isSecondCashDollarFieldFocus) {
            $scope.dollarCashSecond = calculator.displaySecondCashDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displaySecondCashDollarValue, 'secondCashDollar');
        }

        if (isSecondCashLebaneseFieldFocus) {
            $scope.lebaneseCashSecond = calculator.displaySecondCashLebaneseValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displaySecondCashLebaneseValue, 'secondCashLL');
        }

        if (isSecondCardDollarFieldFocus) {
            $scope.dollarCardSecond = calculator.displaySecondCardDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displaySecondCardDollarValue, 'secondCardDollar');
        }

        if (isSecondCardCodeFieldFocus) {
            $scope.codeCardSecond = calculator.displaySecondCardCodeValue;
        }

        if (isSecondNourCardDollarFieldFocus) {
            $scope.dollarNourCardSecond = calculator.displaySecondNourCardDollarValue;
            $scope.calculateTotalOfCashAndCard('', calculator.displaySecondNourCardDollarValue, 'secondNourCardDollar');
        }

        if (isSecondNourCardCodeFieldFocus) {
            $scope.codeNourCardSecond = calculator.displaySecondNourCardCodeValue;
        }

        //console.log(calculator.displayValue);
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }

    $scope.clearAll = function () {
        resetCalculator();
        $scope.dollarCashFirst = calculator.displayFirstCashDollarValue;
        $scope.lebaneseCashFirst = calculator.displayFirstCashLebaneseValue;
        $scope.dollarCardFirst = calculator.displayFirstCardDollarValue;
        $scope.codeCardFirst = calculator.displayFirstCardCodeValue;
        $scope.dollarNourCardFirst = calculator.displayFirstNourCardDollarValue;
        $scope.codeNourCardFirst = calculator.displayFirstNourCardCodeValue;
        $scope.dollarCashSecond = calculator.displaySecondCashDollarValue;
        $scope.lebaneseCashSecond = calculator.displaySecondCashLebaneseValue;
        $scope.dollarCardSecond = calculator.displaySecondCardDollarValue;
        $scope.codeCardSecond = calculator.displaySecondCardCodeValue;
        $scope.dollarNourCardSecond = calculator.displaySecondNourCardDollarValue;
        $scope.codeNourCardSecond = calculator.displaySecondNourCardCodeValue;
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

        if (isFirstCardDollarFieldFocus) {
            calculator.displayFirstCardDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isFirstCardCodeFieldFocus) {
            calculator.displayFirstCardCodeValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isFirstNourCardDollarFieldFocus) {
            calculator.displayFirstNourCardDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isFirstNourCardCodeFieldFocus) {
            calculator.displayFirstNourCardCodeValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondCashDollarFieldFocus) {
            calculator.displaySecondCashDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondCashLebaneseFieldFocus) {
            calculator.displaySecondCashLebaneseValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondCardDollarFieldFocus) {
            calculator.displaySecondCardDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondCardCodeFieldFocus) {
            calculator.displaySecondCardCodeValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondNourCardDollarFieldFocus) {
            calculator.displaySecondNourCardDollarValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isSecondNourCardCodeFieldFocus) {
            calculator.displaySecondNourCardCodeValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        updateDisplay();
    }

    $scope.clearDollarCashFirstField = function () {
        resetCalculator();
        $scope.dollarCashFirst = '0';
    }

    $scope.clearLebaneseCashFirstField = function () {
        resetCalculator();
        $scope.lebaneseCashFirst = '0';
    }

    $scope.clearCodeCardFirstField = function () {
        resetCalculator();
        $scope.codeCardFirst = '0';
    }

    $scope.clearDollarCardFirstField = function () {
        resetCalculator();
        $scope.dollarCardFirst = '0';
    }

    $scope.clearCodeNourCardFirstField = function () {
        resetCalculator();
        $scope.codeNourCardFirst = '0';
    }

    $scope.clearDollarNourCardFirstField = function () {
        resetCalculator();
        $scope.dollarNourCardFirst = '0';
    }

    $scope.clearDollarCashSecondField = function () {
        resetCalculator();
        $scope.dollarCashSecond = '0';
    }

    $scope.clearLebaneseCashSecondField = function () {
        resetCalculator();
        $scope.lebaneseCashSecond = '0';
    }

    $scope.clearCodeCardSecondField = function () {
        resetCalculator();
        $scope.codeCardSecond = '0';
    }

    $scope.clearDollarCardSecondField = function () {
        resetCalculator();
        $scope.dollarNourCardSecond = '0';
    }

    $scope.clearCodeNourCardSecondField = function () {
        resetCalculator();
        $scope.codeNourCardSecond = '0';
    }

    $scope.clearDollarNourCardSecondField = function () {
        resetCalculator();
        $scope.dollarNourCardSecond = '0';
    }

    $scope.addNumber = function (number) {
        inputDigit(number);
        updateDisplay();
    }

    $scope.FirstCashDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = true;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.FirstCashLebaneseFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = true;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.FirstCardDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = true;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.FirstCardCodeFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = true;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.FirstNourCardDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = true;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.FirstNourCardCodeFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = true;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondCashDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = true;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondCashLebaneseFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = true;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondCardDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = true;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondCardCodeFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = true;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondNourCardDollarFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = true;
        isSecondNourCardCodeFieldFocus = false;
    }

    $scope.SecondNourCardCodeFieldFocus = function () {
        isFirstCashDollarFieldFocus = false;
        isFirstCashLebaneseFieldFocus = false;
        isFirstCardDollarFieldFocus = false;
        isFirstCardCodeFieldFocus = false;
        isFirstNourCardDollarFieldFocus = false;
        isFirstNourCardCodeFieldFocus = false;
        isSecondCashDollarFieldFocus = false;
        isSecondCashLebaneseFieldFocus = false;
        isSecondCardDollarFieldFocus = false;
        isSecondCardCodeFieldFocus = false;
        isSecondNourCardDollarFieldFocus = false;
        isSecondNourCardCodeFieldFocus = true;
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
    $scope.FirstCardDollarFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayFirstCardDollarValue = v;
        }
    }
    $scope.FirstCardCodeFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayFirstCardCodeValue = v;
        }
    }
    $scope.FirstNourCardDollarFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayFirstNourCardDollarValue = v;
        }
    }
    $scope.FirstNourCardCodeFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayFirstNourCardCodeValue = v;
        }
    }
    $scope.SecondCashDollarFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondCashDollarValue = v;
        }
    }
    $scope.SecondCashLebaneseFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondCashLebaneseValue = v;
        }
    }
    $scope.SecondCardDollarFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondCardDollarValue = v;
        }
    }
    $scope.SecondCardCodeFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondCardCodeValue = v;
        }
    }
    $scope.SecondNourCardDollarFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondNourCardDollarValue = v;
        }
    }
    $scope.SecondNourCardCodeFieldBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displaySecondNourCardCodeValue = v;
        }
    }

});