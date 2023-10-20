
posAttendantRootModule.controller('oilChangePopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {


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
            $scope.selectedServicesList = removeObjectWithId(item.id);
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
                        swal("Failed getting services", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting services", "Please try again", "error");
                }

            } else {
                swal("Failed getting services", "Please try again", "error");
            }


        }, function (error) {
                swal("Failed getting services", "Please try again", "error");
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
                            for (var i = 0; i < result.resultData.length; i++  ) {
                                var customer = result.resultData[i];
                                customer.name = customer.firstName + " " + customer.middleName + " " + customer.lastName;
                                $scope.customersList.push(customer);
                            }
                        }
                        $scope.customersList.push({
                            id: -1,
                            name: "Create new customer"
                        });

                    } else {
                        swal("Failed getting customers", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting services", "Please try again", "error");
                }

            } else {
                swal("Failed getting services", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting services", "Please try again", "error");
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

        var cars = [];
        var car = {
            carPlate: $scope.customerCar.carPlate,
            plateNumber: $scope.customerCar.plateNumber,
            type: $scope.customerCarText
        }

        cars.push(car);

        var createCustomer = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            middleName: $scope.middleName,
            address: $scope.customer.address,
            mobileNum: $scope.customer.mobileNum,
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
                            $scope.customersList.push(result.resultData);
                            $scope.customer = result.resultData;
                            swal("Customer created successfully", "", "success");
                        }

                    } else {
                        swal("Failed getting customers", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting services", "Please try again", "error");
                }

            } else {
                swal("Failed getting services", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting services", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.customerChanged = function (customerId) {

        if (customerId === -1) {
            $scope.isExistCustomer = false;
            $scope.showCarField = true;
            return;
        }

        $scope.showCarField = false;
        $scope.isExistCustomer = true;

    }


    $scope.done = function () {

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
            currentMileagePerKm: $scope.oldKM,
            newMileagePerKm: $scope.newKM,
            nextServiceDue: $scope.dueDate
        };

        $rootScope.transactionsList.push(customerServiceTransaction);
        $scope.$parent.calculateTotal();
        $uibModalInstance.close('Succeeded');
    }

});