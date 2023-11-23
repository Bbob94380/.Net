
posAttendantRootModule.controller('oilChangePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data, $filter) {

 

    //Initialization
    $scope.selectedServicesList = [];
    $scope.customersList = [];
    $scope.dryList = [];
    $scope.boolList = [true,false];
    $scope.isExistCustomer = true;
    $scope.showCarField = true;

    for (var i = 0; i < $rootScope.transactionsList.length; i++) {
        if ($rootScope.transactionsList[i].productType === "Dry") $scope.dryList = $rootScope.transactionsList[i].products;
    }

    $scope.addService = function (item) {

        if (item.hasStyle === true) {
            item.styleClass = "";
            item.hasStyle = false;
            $scope.selectedServicesList = removeObjectWithId($scope.selectedServicesList, item.id);
        } else {
            item.styleClass = "serviceGreen";
            item.hasStyle = true;
            $scope.selectedServicesList.push(item);
        }

        //$scope.selectedServicesList.push(item);
        console.log($scope.selectedServicesList);
    }

    function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
            arr.splice(objWithIdIndex, 1);
        }

        return arr;
    }

    //$scope.carSelected = function (customerCar) {

    //    $scope.carPlate2 = customerCar.carPlate;
    //    $scope.plateNumber2 = customerCar.plateNumber;
    //    console.log(customerCar);
    //}


    $scope.getActiveServices = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getActiveServices",
            data: { sessionId: localStorage.getItem('session_id')}
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.servicesList = result.resultData;

                    } else {
                        swal($filter('translate')('failedGetServices'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('failedGetServices'), "", "error");
                }

            } else {
                swal($filter('translate')('failedGetServices'), "", "error");
            }


        }, function (error) {
                swal($filter('translate')('failedGetServices'), "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getActiveServices();

    $scope.getAllCustomers = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getAllCustomers",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData !== undefined && result.resultData !== null) { 

                            $scope.customersList.push({
                                id: -1,
                                name: $filter('translate')('createNewCustomer')
                            });

                            for (var i = 0; i < result.resultData.length; i++  ) {
                                var customer = result.resultData[i];
                                customer.name = customer.firstName + " " + customer.middleName + " " + customer.lastName;
                                $scope.customersList.push(customer);
                            }
                        }
                       

                    } else {
                        //swal("Failed getting customers", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting services", "Please try again", "error");
                }

            } else {
                //swal("Failed getting services", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting services", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getAllCustomers();

    function getCurrentDateAndTime() {

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        $scope.creationDate = formattedToday;

    }

    getCurrentDateAndTime();

    $scope.createCustomer = function () {


        if ($scope.firstName === null || $scope.firstName === undefined || $scope.firstName === "" ||
            $scope.lastName === null || $scope.lastName === undefined || $scope.lastName === "" ||
            $scope.middleName === null || $scope.middleName === undefined || $scope.middleName === "" ||
            $scope.displayCounterResult[1] === null || $scope.displayCounterResult[1] === undefined || $scope.displayCounterResult[1] === "" || $scope.displayCounterResult[1] === "0" || $scope.displayCounterResult[1] === 0 ||
            $scope.customer.hasAmanaCard === null || $scope.customer.hasAmanaCard === undefined || $scope.customer.hasAmanaCard === "" ||
            $scope.displayCounterResult[3] === null || $scope.displayCounterResult[3] === undefined || $scope.displayCounterResult[3] === "" || $scope.displayCounterResult[3] === "0" || $scope.displayCounterResult[3] === 0 ||
            $scope.displayCounterResult[4] === null || $scope.displayCounterResult[4] === undefined || $scope.displayCounterResult[4] === "" || $scope.displayCounterResult[4] === "0" || $scope.displayCounterResult[4] === 0 ||
            $scope.displayCounterResult[2] === null || $scope.displayCounterResult[2] === undefined || $scope.displayCounterResult[2] === "" || $scope.displayCounterResult[2] === "0" || $scope.displayCounterResult[2] === 0 ||
            $scope.address === null || $scope.address === undefined || $scope.address === "") {

            swal($filter('translate')('fillAllRequiredFields'), "", "warning");
            return;
        }


        var cars = [];
        var car = {
            carPlate: $scope.displayCounterResult[3],
            plateNumber: $scope.displayCounterResult[4],
            type: $scope.displayCounterResult[2]
        }

        cars.push(car);

        var createCustomer = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            middleName: $scope.middleName,
            address: $scope.address,
            mobileNum: $scope.displayCounterResult[1],
            hasAmanaCard: $scope.customer.hasAmanaCard,
            cars: cars
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/createCustomer",
            data: { sessionId: localStorage.getItem('session_id'), createCustomer: createCustomer }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData !== undefined && result.resultData !== null) {
                            result.resultData.name = result.resultData.firstName + " " + result.resultData.middleName + " " + result.resultData.lastName;
                            $scope.customersList.unshift(result.resultData);
                            $scope.customer = result.resultData;
                            $scope.customerCar = result.resultData;
                            $scope.showCarField = false;
                            $scope.isExistCustomer = true;
                            $scope.displayCounterResult[3] = '0';
                            $scope.displayCounterResult[4] = '0';
                            $scope.displayCounterResult[5] = 0;
                            $scope.displayCounterResult[6] = 0;
                            swal($filter('translate')('customerCreatedSuccessfully'), "", "success");
                        }

                    } else {
                        swal($filter('translate')('failedCreatingCustomer'), "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('failedCreatingCustomer'), "Please try again", "error");
                }

            } else {
                swal($filter('translate')('failedCreatingCustomer'), "Please try again", "error");
            }


        }, function (error) {
                swal($filter('translate')('failedCreatingCustomer'), "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.customerChanged = function (customer) {

        if (customer.id === -1) {
            $scope.isExistCustomer = false;
            $scope.showCarField = true;
            $scope.displayCounterResult[3] = '0';
            $scope.displayCounterResult[4] = '0';
            $scope.displayCounterResult[5] = 0;
            $scope.displayCounterResult[6] = 0;
            $scope.displayCounterResult[1] = 0;
            $scope.customer.hasAmanaCard = false;
            return;
        } else {
            $scope.showCarField = false;
            $scope.isExistCustomer = true;
            $scope.displayCounterResult[1] = customer.mobileNum;
            $scope.displayCounterResult[5] = 0;
            $scope.displayCounterResult[6] = 0;
            $scope.displayCounterResult[3] = '0';
            $scope.displayCounterResult[4] = '0';
        }
    }

    $scope.customerCarChanged = function (customerCar) {

        $scope.displayCounterResult[3] = customerCar.carPlate;
        $scope.displayCounterResult[4] = customerCar.plateNumber;

    }


    $scope.done = function () {


        if ($scope.customer === null || $scope.customer === undefined || $scope.customer === "" ||
            $scope.dueDate === null || $scope.dueDate === undefined || $scope.dueDate === "" ||
            $scope.displayCounterResult[5] === null || $scope.displayCounterResult[5] === undefined || $scope.displayCounterResult[5] === "" || $scope.displayCounterResult[5] === "0" || $scope.displayCounterResult[5] === 0 ||
            $scope.customer.hasAmanaCard === null || $scope.customer.hasAmanaCard === undefined || $scope.customer.hasAmanaCard === "" ||
            $scope.displayCounterResult[6] === null || $scope.displayCounterResult[6] === undefined || $scope.displayCounterResult[6] === "" || $scope.displayCounterResult[6] === "0" || $scope.displayCounterResult[6] === 0 ||
            $scope.displayCounterResult[3] === null || $scope.displayCounterResult[3] === undefined || $scope.displayCounterResult[3] === "" || $scope.displayCounterResult[3] === "0" || $scope.displayCounterResult[3] === 0 ||
            $scope.displayCounterResult[4] === null || $scope.displayCounterResult[4] === undefined || $scope.displayCounterResult[4] === "" || $scope.displayCounterResult[4] === "0" || $scope.displayCounterResult[4] === 0) {

            swal($filter('translate')('fillAllRequiredFields'), "", "warning");
            return;
        }


        var servicesIds = [];
        var netTotalMc = 0;
        var netTotalSc = 0;

        for (var i = 0; i < $scope.selectedServicesList.length; i++) {
            servicesIds.push($scope.selectedServicesList[i].id);
            netTotalMc += $scope.selectedServicesList[i].priceMc;
            netTotalSc += $scope.selectedServicesList[i].priceSc;
        }

        var customerServiceTransaction = {
            id: 0,
            customerId: $scope.customer.id,
            currencyRatio: localStorage.getItem("dollarRate"),
            netTotalMc: netTotalMc,
            netTotalSc: netTotalSc,
            priceLL: netTotalMc,
            priceDollar: netTotalSc,
            servicesIds: servicesIds,
            qty: servicesIds.length,
            productType: "Service",
            currentMileagePerKm: $scope.displayCounterResult[5],
            newMileagePerKm: $scope.displayCounterResult[6],
            nextServiceDue: $scope.dueDate
        };

        $rootScope.transactionsList.push(customerServiceTransaction);
        $scope.$parent.calculateTotal();
        $uibModalInstance.close('Succeeded');
    }


    /*Calulator logic*/

    var isFieldFocus = [];
    var displayCounterValue = [];
    $scope.displayCounterResult = [];


    for (var j = 0; j < 10; j++) {
        isFieldFocus[j] = false;
        displayCounterValue[j] = '0';
        $scope.displayCounterResult[j] = '0';
    }

    const calculator = {
        displayCounterValue: displayCounterValue,
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


    }

    function inputDecimal(dot) {

        if (isFieldFocus[$scope.indexArray]) {
            // If the `displayValue` does not contain a decimal point
            if (!calculator.displayCounterValue[$scope.indexArray].includes(dot)) {
                // Append the decimal point
                calculator.displayCounterValue += dot;
            }
        }

    }

    function updateDisplay() {
        if (isFieldFocus[$scope.indexArray]) {
            $scope.displayCounterResult[$scope.indexArray] = calculator.displayCounterValue[$scope.indexArray];
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

    }


    $scope.CounterBlur = function (v) {

        if (v !== undefined || v !== null) {
            calculator.displayCounterValue[$scope.indexArray] = v;
        }
    }


});