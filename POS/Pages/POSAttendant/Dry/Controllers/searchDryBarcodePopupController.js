
posAttendantRootModule.controller('searchDryBarcodePopupController', function ($scope, $rootScope, $document, $http, $uibModalInstance, data, $filter) {

    var isQtyFocus = false;
    var isBarcodeFocus = false;
    var isPriceFocus = false;

    $scope.displayBarcodeResult = "";
    $scope.isFieldDisabled = true;
    $scope.isLoading = false;
    $scope.isLoading2 = false;
    $scope.displayQtyResult = "";
    $scope.displayPriceResult = "";
    $scope.product = {};
    $scope.productItem = { sale_price: 0};
    $scope.showImage = false;
    $scope.showScrollBar = false;
    $scope.dollarRate = parseInt(localStorage.getItem("dollarRate"));
    $scope.totalIt = 0;
    $scope.dryProductsList = [];
    $scope.itemClickedStyle = [];


    const calculator = {
        displayBarcodeResult: '0',
        displayQtyResult: '0',
        displayPriceValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };


    //events
    $scope.$watch("displayBarcodeResult", function (newValue = '', oldValue = '') {

        if (newValue === '' || newValue === undefined || newValue === null) {
            $scope.clearAll();
        }
    });



    $scope.getProductByName = function () {


        // $rootScope.showLoader = true;

        calculator.displayQtyValue = '0';
        calculator.displayPriceValue = '0';
        $scope.displayQtyResult = '0';
        $scope.displayPriceResult = '0';
        $scope.displayBarcodeResult = '0';
        $scope.totalIt = 0;
        $scope.productItem = { sale_price: 0};
        $scope.itemClickedStyle = [];
        $scope.isFieldDisabled = true;

        $scope.isLoading = true;

        $http({
            method: "POST",
            url: "/api/Request/findbyName",
            data: { sessionId: localStorage.getItem('session_id'), productName: $scope.dryProductName }
        }).then(function (response) {
            console.log(response);
            //$rootScope.showLoader = false;

            //$scope.product.image = "";
            $scope.showImage = false;
            $scope.showScrollBar = false;
            $scope.isLoading = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.dryProductsList = result.resultData;
                        $scope.showScrollBar = true;

                        if ($scope.dryProductsList !== null && $scope.dryProductsList !== undefined && $scope.dryProductsList !== "") {
                            if ($scope.dryProductsList.length === 1) {
                                $scope.productItem = $scope.dryProductsList[0];
                            }
                        }

                    } else {
                        //swal("Oops", "Failed getting product", "");
                    }

                } else {
                    //swal("Oops", "Product not found", "");
                }

            } else {
                //swal("Oops", "Failed getting product", "");
            }


        }, function (error) {
            //swal("Oops", "Failed getting product", "");
            //$rootScope.showLoader = false;
        });


    };

    $scope.getProductBarcode = function () {

        if ($scope.displayBarcodeResult === undefined || $scope.displayBarcodeResult === null ||
            $scope.displayBarcodeResult === '0' || $scope.displayBarcodeResult === 0 || $scope.displayBarcodeResult === "") {

            swal("Please fill at least one field", "", "warning");
            return;
        } else {

            $scope.dryProductName = "";
            calculator.displayQtyValue = '0';
            calculator.displayPriceValue = '0';
            $scope.displayQtyResult = '0';
            $scope.displayPriceResult = '0';
            $scope.totalIt = 0;
            $scope.productItem = { sale_price: 0 };
            $scope.itemClickedStyle = [];
            $scope.isFieldDisabled = true;
            $scope.isLoading2 = true;

           // $rootScope.showLoader = true;

            $http({
                method: "POST",
                url: "/api/Request/FindByBarcodeAsync",
                data: { sessionId: localStorage.getItem('session_id'), barcode: $scope.displayBarcodeResult }
            }).then(function (response) {
                console.log(response);
                //$rootScope.showLoader = false;

                $scope.isLoading2 = false;

                $scope.showImage = false;
                $scope.showScrollBar = false;

                if (response !== null && response !== undefined) {

                    if (response.data !== null && response.data !== undefined) {

                        var result = JSON.parse(response.data);

                        if (result.isSuccessStatusCode) {

                            $scope.product = result.resultData;
                            $scope.showImage = true;
                            //$scope.product.image = "https://picsum.photos/200/300";

                            if ($scope.product !== null && $scope.product !== undefined && $scope.product !== "") {
                                $scope.productItem = $scope.product;
                                $scope.isFieldDisabled = false;
                            }

                        } else {
                            //swal("Oops", "Failed getting product", "");
                        }

                    } else {
                        //swal("Oops", "Product not found", "");
                    }

                } else {
                    //swal("Oops", "Failed getting product", "");
                }


            }, function (error) {
                    //swal("Oops", "Failed getting product", "");
                //$rootScope.showLoader = false;
            });


        }

    };



    $scope.dryClicked = function (item, index) {

        if ($scope.itemClickedStyle[index] !== "itemClickedStyle") {

            $scope.isFieldDisabled = false;
            
            $scope.productItem = item;
            $scope.itemClickedStyle[index] = "itemClickedStyle";
            $scope.totalIt = 0;
            calculator.displayQtyValue = '0';
            calculator.displayPriceValue = '0';
            $scope.displayPriceResult = '0';
            $scope.displayQtyValue = '0';


            $scope.clearQty();

            for (var i = 0; i < $scope.itemClickedStyle.length; i++) {
                if (i !== index) {
                    $scope.itemClickedStyle[i] = "";
                }
            }
        }
    }

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

    $scope.done = function () {

        if (($scope.displayBarcodeResult === undefined || $scope.displayBarcodeResult === null || $scope.displayBarcodeResult === "" || $scope.displayBarcodeResult === 0 || $scope.displayBarcodeResult === "0") && 
            ($scope.dryProductName === undefined || $scope.dryProductName === null || $scope.dryProductName === "")) {

            swal($filter('translate')('fillBarcodeOrNameField'), "", "warning");

        } else {

            if ($scope.displayQtyResult === '0' || $scope.displayQtyResult === 0 || $scope.displayQtyResult === ""
                || $scope.displayQtyResult === null || $scope.displayQtyResult === undefined) {

                swal("Please fill the qty field", "", "warning");
                return;
            }

            if ($scope.displayPriceResult === undefined || $scope.displayPriceResult === null || $scope.displayPriceResult === "") {
                $scope.displayPriceResult = 0;
            }

            var products = [];

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

        }

    }





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

        if (isPriceFocus) {
            const { displayPriceValue, waitingForSecondOperand } = calculator;

            if (waitingForSecondOperand === true) {
                calculator.displayPriceValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayPriceValue = displayPriceValue === '0' ? digit : displayPriceValue + digit;
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
        calculator.displayPriceValue = '0';
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

        if (isPriceFocus) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayPriceValue.includes(dot)) {
                // Append the decimal point
                calculator.displayPriceValue += dot;
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
            $scope.getProductBarcode();
        }
        if (isQtyFocus) {
            $scope.displayQtyResult = calculator.displayQtyValue;
            $scope.ValueChanged2($scope.displayQtyResult, $scope.displayPriceResult, "qty");
        }

        if (isPriceFocus) {
            $scope.displayPriceResult = calculator.displayPriceValue;
            $scope.ValueChanged2($scope.displayQtyResult, $scope.displayPriceResult, "discount");
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
        $scope.displayPriceResult = calculator.displayPriceValue;
    }

    $scope.ClearFocusedField = function () {

        if (isBarcodeFocus) {
            //calculator.displayBarcodeValue = '0';
            calculator.displayBarcodeValue = calculator.displayBarcodeValue.slice(0, -1);
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

        if (isQtyFocus) {
            //calculator.displayQtyValue = '0';
            calculator.displayQtyValue = calculator.displayQtyValue.slice(0, -1);
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
        $scope.displayPriceResult = '0';
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

    $scope.PriceFocus = function () {
        isQtyFocus = false;
        isPriceFocus = true;
        isPriceDollarFocus = false;
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

    $scope.PriceBlur = function (v) {
        if (v != undefined || v != null) {
            calculator.displayPriceValue = v;
        }
    }

});