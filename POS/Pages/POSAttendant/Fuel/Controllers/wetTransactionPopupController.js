
posAttendantRootModule.controller('wetTransactionPopupController', function ($scope, $document, $http, $uibModalInstance, data) {

    var isQtyFocus = false;
    var isPriceFocus = false;
    var isPriceDollarFocus = false;


    //Initialization
    console.log(data);
    $scope.wetName = data.wetName;
    $scope.wetId = data.wetId;
    $scope.wetType = data.type;
    $scope.priceMcOfLitre = data.priceMc;
    $scope.priceScOfLitre = data.priceSc;
    $scope.dollarRate = parseInt(localStorage.getItem("dollarRate"));
    $scope.disableField = false;
    $scope.isGas = false;

    if ($scope.wetType === "GAZ10" || $scope.wetType === "GAZ12" || $scope.wetType === "GAZ_EMPTY") {
        $scope.disableField = true;
        $scope.isGas = true;
    }

    //events
    //$scope.$watch("displayQtyResult", function (newValue = '', oldValue = '') {

    //    if (newValue === '' || newValue === undefined || newValue === null) {
    //        $scope.clearAll();
    //    } else {
    //        $scope.displayPriceResult = parseFloat(newValue) * $scope.priceMcOfLitre;
    //        $scope.displayPriceDollarResult = parseFloat(newValue) * $scope.priceScOfLitre;
    //    }
        

    //});

    //$scope.$watch("displayPriceResult", function (newValue = '', oldValue = '') {

    //    if (newValue === '' || newValue === undefined || newValue === null) {
    //        $scope.clearAll();
    //    } else {
    //        $scope.displayQtyResult = parseFloat(newValue) / $scope.priceMcOfLitre;
    //        $scope.displayPriceDollarResult = parseFloat(newValue) / $scope.dollarRate;
    //    }

    //});

    //$scope.$watch("displayPriceDollarResult", function (newValue = '', oldValue = '') {

    //    if (newValue === '' || newValue === undefined || newValue === null) {
    //        $scope.clearAll();
    //    } else {
    //        $scope.displayPriceResult = parseFloat(newValue) * $scope.dollarRate;
    //        $scope.displayQtyResult = parseFloat(newValue) / $scope.priceScOfLitre;
    //    }


    //});

    $scope.ValueChanged = function (newValue,type) {

        if (newValue === '' || newValue === undefined || newValue === null) {
            $scope.clearAll();
        } else {

            if (type === "qty") {

                $scope.displayPriceResult = parseFloat(newValue) * $scope.priceMcOfLitre;
                $scope.displayPriceDollarResult = parseFloat(newValue) * $scope.priceScOfLitre;

            } else if (type === "LL") {

                $scope.displayQtyResult = parseFloat(newValue) / $scope.priceMcOfLitre;
                $scope.displayPriceDollarResult = parseFloat(newValue) / $scope.dollarRate;

            } else if (type === "dollar") {

                $scope.displayPriceResult = parseFloat(newValue) * $scope.dollarRate;
                $scope.displayQtyResult = parseFloat(newValue) / $scope.priceScOfLitre;

            }

            
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
        
        var dd;
        var ll;

        if (($scope.displayPriceDollarResult === undefined || $scope.displayPriceDollarResult === null ||
            $scope.displayPriceDollarResult === '0' || $scope.displayPriceDollarResult === 0 || $scope.displayPriceDollarResult === "") &&
            ($scope.displayPriceResult === undefined || $scope.displayPriceResult === null ||
            $scope.displayPriceResult === '0' || $scope.displayPriceResult === 0 || $scope.displayPriceResult === "") &&
            ($scope.displayQtyResult === undefined || $scope.displayQtyResult === null ||
            $scope.displayQtyResult === '0' || $scope.displayQtyResult === 0 || $scope.displayQtyResult === "")) {

            sweetAlert("Please fill at least one field", "", "warning");
            return;
        }

        if ($scope.displayPriceDollarResult === undefined || $scope.displayPriceDollarResult === null || $scope.displayPriceDollarResult === "") {
            dd=0
        } else {
            dd = parseFloat($scope.displayPriceDollarResult)
        }

        if ($scope.displayPriceResult === undefined || $scope.displayPriceResult === null || $scope.displayPriceResult === "") {
            ll = 0
        } else {
            ll = parseFloat($scope.displayPriceResult)
        }

        var fuelResultObj = {
            id: 0,
            qty: $scope.displayQtyResult,
            priceLL: ll,
            priceDollar: dd,
            productType: "Fuel",
            wetId: $scope.wetId,
            gas: $scope.isGas,
            priceMcOfLitre: $scope.priceMcOfLitre,
            priceScOfLitre: $scope.priceScOfLitre,
        }
        $scope.$parent.transactionsList.push(fuelResultObj);
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

   

    function handleOperator(nextOperator) {

        if (isQtyFocus) {

            const { firstOperand, displayQtyValue, operator } = calculator
            const inputValue = parseFloat(displayQtyValue);

            if (operator && calculator.waitingForSecondOperand) {
                calculator.operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                calculator.firstOperand = inputValue;
            } else if (operator) {
                const currentValue = firstOperand || 0;
                const result = performCalculation[operator](currentValue, inputValue);

                calculator.displayQtyValue = String(result);
                calculator.firstOperand = result;
            }

            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
        }

        if (isPriceFocus) {

            const { firstOperand, displayPriceValue, operator } = calculator
            const inputValue = parseFloat(displayPriceValue);

            if (operator && calculator.waitingForSecondOperand) {
                calculator.operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                calculator.firstOperand = inputValue;
            } else if (operator) {
                const currentValue = firstOperand || 0;
                const result = performCalculation[operator](currentValue, inputValue);

                calculator.displayPriceValue = String(result);
                calculator.firstOperand = result;
            }

            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
        }

        if (isPriceDollarFocus) {

            const { firstOperand, displayPriceDollarValue, operator } = calculator
            const inputValue = parseFloat(displayPriceDollarValue);

            if (operator && calculator.waitingForSecondOperand) {
                calculator.operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                calculator.firstOperand = inputValue;
            } else if (operator) {
                const currentValue = firstOperand || 0;
                const result = performCalculation[operator](currentValue, inputValue);

                calculator.displayPriceDollarValue = String(result);
                calculator.firstOperand = result;
            }

            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
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
            $scope.ValueChanged($scope.displayQtyResult, "qty");
        }

        if (isPriceFocus) {
            $scope.displayPriceResult = calculator.displayPriceValue;
            $scope.ValueChanged($scope.displayPriceResult, "LL");
        }

        if (isPriceDollarFocus) {
            $scope.displayPriceDollarResult = calculator.displayPriceDollarValue;
            $scope.ValueChanged($scope.displayPriceDollarResult, "dollar");
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