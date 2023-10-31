
posAttendantRootModule.controller('searchDryBarcodePopupController', function ($scope, $rootScope, $document, $http, $uibModalInstance, data) {

    var isQtyFocus = false;
    var isBarcodeFocus = false;

    $scope.displayBarcodeResult = "11318678641564";
    $scope.displayQtyResult = "";
    $scope.product = {};
    $scope.showImage = false;

    //Initialization
    $scope.wetName = data.wetName;

    //events
    $scope.$watch("displayBarcodeResult", function (newValue = '', oldValue = '') {

        if (newValue === '' || newValue === undefined || newValue === null) {
            $scope.clearAll();
        }
    });


    $scope.getProductBarcode = function () {

        if ($scope.displayBarcodeResult === undefined || $scope.displayBarcodeResult === null ||
            $scope.displayBarcodeResult === '0' || $scope.displayBarcodeResult === 0 || $scope.displayBarcodeResult === "") {

            sweetAlert("Please fill at least one field", "", "warning");
            return;
        } else {


           // $rootScope.showLoader = true;

            $http({
                method: "POST",
                url: "/api/Request/FindByBarcodeAsync",
                data: { sessionId: localStorage.getItem('session_id'), barcode: $scope.displayBarcodeResult }
            }).then(function (response) {
                console.log(response);
                //$rootScope.showLoader = false;

                $scope.product.image = ""
                $scope.showImage = false;

                if (response !== null && response !== undefined) {

                    if (response.data !== null && response.data !== undefined) {

                        var result = JSON.parse(response.data);

                        if (result.isSuccessStatusCode) {

                            $scope.product = result.resultData;
                            $scope.showImage = true;
                            $scope.product.image = "https://picsum.photos/200/300";

                        } else {
                            swal("Oops", "Failed getting product", "");
                        }

                    } else {
                        swal("Oops", "Product not found", "");
                    }

                } else {
                    swal("Oops", "Failed getting product", "");
                }


            }, function (error) {
                    swal("Oops", "Failed getting product", "");
                //$rootScope.showLoader = false;
            });


        }

    };


    $scope.done = function () {

        if ($scope.displayBarcodeResult === undefined || $scope.displayBarcodeResult === null || $scope.displayBarcodeResult === "" || $scope.displayBarcodeResult === 0 || $scope.displayBarcodeResult === "0") {

            swal("Please fill the barcode field", "", "warning");

        } else {

            if ($scope.displayQtyResult === undefined || $scope.displayQtyResult === null || $scope.displayQtyResult === "" || $scope.displayQtyResult === 0 || $scope.displayQtyResult === "0") {

                swal("Please fill the quantity field", "", "warning");

            } else {
                $rootScope.dryItemClicked($scope.product, parseInt($scope.displayQtyResult));
                $uibModalInstance.dismiss();
            }
        }

    }



    const calculator = {
        displayBarcodeResult: '0',
        displayQtyResult: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {

        if (isBarcodeFocus) {
            const { displayBarcodeValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayBarcodeValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayBarcodeValue = displayBarcodeValue === '0' ? digit : displayBarcodeValue + digit;
            }
        }

        if (isQtyFocus) {
            const { displayQtyValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayQtyValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayQtyValue = displayQtyValue === '0' ? digit : displayQtyValue + digit;
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
        calculator.displayBarcodeValue = '0';
        calculator.displayQtyValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function inputDecimal(dot) {

        if (isBarcodeFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayBarcodeValue.includes(dot)) {
                // Append the decimal point
                calculator.displayBarcodeValue += dot;
            }
        }

        if (isQtyFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayQtyValue.includes(dot)) {
                // Append the decimal point
                calculator.displayQtyValue += dot;
            }
        }
    }

    function updateDisplay() {
        if (isBarcodeFocus) {
            $scope.displayBarcodeResult = calculator.displayBarcodeValue;
        }
        if (isQtyFocus) {
            $scope.displayQtyResult = calculator.displayQtyValue;
        }
    }

    $scope.addDecimal = function (dot) {
        inputDecimal(dot);
        updateDisplay();
    }

    $scope.clearAll = function () {
        resetCalculator();
        $scope.displayBarcodeResult = calculator.displayBarcodeValue;
        $scope.displayQtyResult = calculator.displayQtyValue;
    }

    $scope.ClearFocusedField = function () {

        if (isBarcodeFocus) {
            calculator.displayBarcodeValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        if (isQtyFocus) {
            calculator.displayQtyValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }
        updateDisplay();
    }

    $scope.clearQty = function () {
        resetCalculator();
        $scope.displayBarcodeResult = '0';
        $scope.displayQtyResult = '0';

    }

    $scope.addNumber = function (number) {
        inputDigit(number);
        updateDisplay();
    }

    $scope.BarcodeFocus = function () {
        isBarcodeFocus = true;  
        isQtyFocus = false;
    }

    $scope.QtyFocus = function () {
        isQtyFocus = true;
        isBarcodeFocus = false;     
    }

    $scope.BarcodeBlur = function (v) {

        if (v != undefined || v != null) {
            calculator.displayBarcodeValue = v;
        }
    }

    $scope.QtyBlur = function (v) {

        if (v != undefined || v != null) {
            calculator.displayQtyValue = v;
        }
    }

});