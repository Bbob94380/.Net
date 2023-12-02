
posAttendantRootModule.controller('dryPopupController', function ($scope, $document, $http, $uibModalInstance, data) {

    var isQtyFocus = false;
    var isPriceFocus = false;
    var isPriceDollarFocus = false;


    //Initialization
    $scope.productItem = data.productItem;
    $scope.dollarRate = parseInt(localStorage.getItem("dollarRate"));
    $scope.disableField = false;
    $scope.totalIt = 0;


    $scope.ValueChanged2 = function (addedQty, discount, type) {

        if (addedQty === null || addedQty === undefined || addedQty === "") addedQty = 0;
        if (discount === null || discount === undefined || discount === "") discount = 0;

        if (type === "qty") {

            if (parseInt(addedQty) > $scope.productItem.quantity) {
                alert("The quantity available for this product is only " + $scope.productItem.quantity);
                addedQty = Math.floor(addedQty / 10);   
            }

            $scope.totalIt = parseInt(addedQty) * parseInt($scope.productItem.sale_price) - (parseInt(addedQty) * parseFloat($scope.productItem.sale_price) * parseFloat(discount) / 100);
            $scope.displayQtyResult = addedQty;

        } else if (type === "discount") {
            $scope.totalIt = parseInt(addedQty) * parseInt($scope.productItem.sale_price) - (parseInt(addedQty) * parseFloat($scope.productItem.sale_price) * parseFloat(discount) / 100);

        }
    }

    //$scope.PriceChanged = function (newValue) {

    //    if (newValue === '' || newValue === undefined || newValue === null) {
    //        $scope.clearAll();
    //    } else {
    //        $scope.displayPriceResult = parseFloat(newValue) * $scope.priceMcOfLitre;
    //        $scope.displayPriceDollarResult = parseFloat(newValue) * $scope.priceScOfLitre;
    //    }
    //}

    //$scope.DollarChanged = function (newValue) {

    //    if (newValue === '' || newValue === undefined || newValue === null) {
    //        $scope.clearAll();
    //    } else {
        //$scope.displayPriceResult = parseFloat(newValue) * $scope.dollarRate;
        //$scope.displayQtyResult = parseFloat(newValue) / $scope.priceScOfLitre;
    //    }
    //}


   

    $scope.next = function () {
        
        var products = [];



        if ($scope.displayQtyResult === '0' || $scope.displayQtyResult === 0 || $scope.displayQtyResult === ""
            || $scope.displayQtyResult === null || $scope.displayQtyResult === undefined) {

            sweetAlert("Please fill the qty field", "", "warning");
            return;
        }

        if ($scope.displayPriceResult === undefined || $scope.displayPriceResult === null || $scope.displayPriceResult === "") {
            $scope.displayPriceResult = 0;
        }

        products.push(
            {
                id: $scope.productItem.id,
                name: $scope.productItem.name,
                discountItem: parseFloat($scope.displayPriceResult),
                qtyItem: parseInt($scope.displayQtyResult),
                maxQtyItem: $scope.productItem.quantity,
                price: $scope.productItem.sale_price,
                totalIt: parseFloat($scope.totalIt)
            }
        );

        $scope.$parent.transactionsList.push({
            id: 0,
            qty: $scope.displayQtyResult,
            priceLL: parseFloat($scope.totalIt) * parseFloat(localStorage.getItem('dollarRate')),
            priceDollar: parseFloat($scope.totalIt),
            productType: "Dry",
            employeeId: localStorage.getItem("employeeId"),
            products: products
        });

        $scope.$parent.calculateTotal();
        $uibModalInstance.close('Succeeded');
        //sweetAlert("Transaction is recorded in the summary", "", "success");
    };

/*Calulator logic*/


    const calculator = {
        displayQtyValue: '0',
        displayPriceValue: '0',
        displayPriceDollarValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {

        if (isQtyFocus) {
            const { displayQtyValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayQtyValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayQtyValue = displayQtyValue === '0' ? digit : displayQtyValue + digit;
            }
        }

        if (isPriceFocus) {
            const { displayPriceValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayPriceValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayPriceValue = displayPriceValue === '0' ? digit : displayPriceValue + digit;
            }
        }

        if (isPriceDollarFocus) {
            const { displayPriceDollarValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayPriceDollarValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayPriceDollarValue = displayPriceDollarValue === '0' ? digit : displayPriceDollarValue + digit;
            }
        }

       
    }


    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

        '=': (firstOperand, secondOperand) => secondOperand
    };

    function resetCalculator() {
        calculator.displayQtyValue = '0';
        calculator.displayPriceValue = '0';
        calculator.displayPriceDollarValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function inputDecimal(dot) {

        if (isQtyFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayQtyValue.includes(dot)) {
                // Append the decimal point
                calculator.displayQtyValue += dot;
            }
        }

        if (isPriceFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayPriceValue.includes(dot)) {
                // Append the decimal point
                calculator.displayPriceValue += dot;
            }
        }

        if (isPriceDollarFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayPriceDollarValue.includes(dot)) {
                // Append the decimal point
                calculator.displayPriceDollarValue += dot;
            }
        }
    }

    function updateDisplay() {
        if (isQtyFocus) {
            $scope.displayQtyResult = calculator.displayQtyValue;
            $scope.ValueChanged2($scope.displayQtyResult, $scope.displayPriceResult, "qty");
        }

        if (isPriceFocus) {
            $scope.displayPriceResult = calculator.displayPriceValue;
            $scope.ValueChanged2($scope.displayQtyResult, $scope.displayPriceResult, "discount");
        }

        
        //console.log(calculator.displayValue);
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }

    $scope.clearAll = function () {
        resetCalculator();
        $scope.displayQtyResult = calculator.displayQtyValue;
        $scope.displayPriceResult = calculator.displayPriceValue;
        $scope.displayPriceDollarResult = calculator.displayPriceDollarValue;
    }

    $scope.ClearFocusedField = function () {

        if (isQtyFocus) {
            //calculator.displayQtyValue = '0';
            calculator.displayQtyValue = calculator.displayQtyValue.toString().slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isPriceFocus) {
            //calculator.displayPriceValue = '0';
            calculator.displayPriceValue = calculator.displayPriceValue.toString().slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isPriceDollarFocus) {
            //calculator.displayPriceDollarValue = '0';
            calculator.displayPriceDollarValue = calculator.displayPriceDollarValue.toString().slice(0, -1);
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        updateDisplay();
    }

    $scope.clearQty = function () {
        resetCalculator();
        $scope.displayQtyResult = '0';

    }

    $scope.clearPrice = function () {
        resetCalculator();
        $scope.displayPriceResult= '0';
    }

    $scope.clearPriceDollar = function () {
        resetCalculator();
        $scope.displayPriceDollarResult = '0';
    }

    $scope.addNumber = function (number) {
        inputDigit(number);
        updateDisplay();
    }

    $scope.QtyFocus = function () {
        isQtyFocus = true;
        isPriceFocus = false;
        isPriceDollarFocus = false;        
    }
    $scope.PriceFocus = function () {
        isQtyFocus = false;
        isPriceFocus = true;
        isPriceDollarFocus = false;
    }
    $scope.PriceDollarFocus = function () {
        isQtyFocus = false;
        isPriceFocus = false;
        isPriceDollarFocus = true;
    }

    $scope.QtyBlur = function (v) {

        if (v != undefined || v != null) {
            calculator.displayQtyValue = v;
        }
    }

    $scope.PriceBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayPriceValue = v;
        }
    }
    $scope.PriceDollarBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayPriceDollarValue = v;
        }
    }

      
   // updateDisplay();


    //const keys = $document.find('.calculator-keys2');
    //keys.addEventListener('click', (event) => {
    //    const { target } = event;
    //    if (!target.matches('button')) {
    //        return;
    //    }

    //    if (target.classList.contains('operator')) {
    //        handleOperator(target.value);
    //        updateDisplay();
    //        return;
    //    }

    //    if (target.classList.contains('decimal')) {
    //        inputDecimal(target.value);
    //        updateDisplay();
    //        return;
    //    }

    //    if (target.classList.contains('all-clear')) {
    //        resetCalculator();
    //        updateDisplay();
    //        return;
    //    }

    //    inputDigit(target.value);
    //    updateDisplay();
    //});

});