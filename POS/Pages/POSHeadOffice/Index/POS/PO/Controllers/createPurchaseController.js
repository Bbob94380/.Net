
rootHOModule.controller("createPurchaseController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "$timeout", "$state", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, $timeout, $state) {

    $scope.type = $stateParams.type; //getting fooVal

    $scope.isNbOfTruckDisabled = true;
    $scope.isSubTankHide = true;
    $scope.hideCreateDOBtn = true;

    $scope.salesManagerName = localStorage.getItem("employeeName");

    $scope.addMoreTrucks = function () {

        var modalInstance;

        var suppId = $scope.selectedSupplier.id;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSHeadOffice/Index/POS/Truck/Views/createNewTruckPopup.html',
            controller: 'createNewTruckPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { truckItem: "bb", supplier: $scope.selectedSupplier };
                }
            }
        });

        modalInstance.result.then(function (result) {
            //when $uibModalInstance.close() fct executed

            if (result === true) {

                for (var i = 0; i < $scope.suppliersList.length; i++) {
                    if ($scope.suppliersList[i].id === suppId) {
                        $scope.suppliersList[i].numOfTrucks += 1;
                        $scope.numberOfTrucksOfSelectedSupplier = $scope.suppliersList[i].numOfTrucks;
                    }
                }
            }

        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });
    };

    $scope.createNewDO = function (index) {

        var payload = {
            driverName: $scope.driverName,
            driverId: $scope.driverId,
            truck: $scope.trucks[index],
            //deliveryDate: $scope.trucks[index].deliveryDate,
            createdPO: $scope.createdPO,
            //subTanks: $scope.trucksList.subTanks
        }

        $state.go('HO_Index_POS.createDO', {
            item: payload
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

        $scope.creationDate = formattedToday;
        $scope.creationTime = today.toLocaleTimeString();

    }

    getCurrentDateAndTime();


    $scope.getAllSuppliers = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/GetAllSuppliersAsync",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.suppliersList = result.resultData;
                        console.log($scope.suppliersList);


                    } else {
                        swal("Oops", "No suppliers found", "");
                    }

                } else {
                    swal("Oops", "No suppliers found", "");
                }

            } else {
                swal("Oops", "Failed getting suppliers", "");
            }


        }, function (error) {
            swal("Oops", "Failed getting suppliers", "");
            $rootScope.showLoader = false;
        });

    };

    $scope.getAllSuppliers();


    $scope.getAllTrucks = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/GetAllTrucksAsync",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.trucksList = result.resultData;
                        console.log($scope.trucksList);

                    } else {
                        //swal("Oops", "No suppliers found", "");
                    }

                } else {
                    //swal("Oops", "No suppliers found", "");
                }

            } else {
                //swal("Oops", "Failed getting suppliers", "");
            }


        }, function (error) {
            //swal("Oops", "Failed getting suppliers", "");
            $rootScope.showLoader = false;
        });

    };

    $scope.getAllTrucks();

    $scope.getAllDrivers = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/GetAllDriversAsync",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.driversList = result.resultData;

                    } else {
                        swal("Oops", "No drivers found", "");
                    }

                } else {
                    swal("Oops", "No drivers found", "");
                }

            } else {
                swal("Oops", "Failed getting drivers", "");
            }


        }, function (error) {
            swal("Oops", "Failed getting drivers", "");
            $rootScope.showLoader = false;
        });

    };

    $scope.getAllDrivers();

    $scope.getAllWetProducts = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getAllWetProductTypes",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.wetProductsList = result.resultData;

                    } else {
                        swal("Oops", "No drivers found", "");
                    }

                } else {
                    swal("Oops", "No drivers found", "");
                }

            } else {
                swal("Oops", "Failed getting drivers", "");
            }


        }, function (error) {
            swal("Oops", "Failed getting drivers", "");
            $rootScope.showLoader = false;
        });

    };

    $scope.getAllWetProducts();


    //$scope.getTrucksBySupplierId = function (supplierId) {

    //    $rootScope.showLoader = true;
    //    $http({
    //        method: "POST",
    //        url: "/api/HOApi/findBySupplierId",
    //        data: { sessionId: localStorage.getItem('session_id_ho'), supplierId: supplierId }
    //    }).then(function (response) {

    //        console.log(response);
    //        $rootScope.showLoader = false;

    //        if (response !== null && response !== undefined) {

    //            if (response.data !== null && response.data !== undefined) {

    //                var result = JSON.parse(response.data);

    //                if (result.isSuccessStatusCode) {

    //                    if (result.resultData !== null && result.resultData !== "" && result.resultData !== undefined) {
    //                        $scope.numberOfTrucksOfSelectedSupplier = result.resultData.length;
    //                        console.log($scope.numberOfTrucksOfSelectedSupplier);
    //                        $scope.isNbOfTruckDisabled = false;
    //                    }


    //                } else {
    //                    swal("Oops", "No drivers found", "");
    //                }

    //            } else {
    //                swal("Oops", "No drivers found", "");
    //            }

    //        } else {
    //            swal("Oops", "Failed getting drivers", "");
    //        }


    //    }, function (error) {
    //        swal("Oops", "Failed getting drivers", "");
    //        $rootScope.showLoader = false;
    //    });

    //};


    $scope.trucks = [];

    $scope.numberOfTrucksChanged = function (numberOfTrucks) {

        $scope.isSubTankHide = true;

        if (parseInt(numberOfTrucks) > parseInt($scope.numberOfTrucksOfSelectedSupplier)) {
            swal("The maximum number of trucks for this supplier is : " + $scope.numberOfTrucksOfSelectedSupplier, "", "warning");
            $scope.numberOfTrucks = 0;
            $scope.trucks = [];
            return;
        }

        $scope.trucks = [];

        for (var i = 0; i < numberOfTrucks; i++) {
            $scope.trucks.push(
                {
                    "driverId": "",
                    "truckId": "",
                    "plateNumber": "",
                    "cheseNumber": "",
                    //"deliveryDate": "",
                    "subTanksNumber": "",
                    "status": "Initiated",
                    "supplierId": "",
                    "supplierName": "",
                    "numOfTrucks": "",
                    "poFuelAmountsDetail": [],
                }
            );
        }

    };  


    $scope.selectedSupplierChanged = function (supplier) {
        $scope.supplierAddress = supplier.address;
        $scope.supplierId = supplier.id;
        $scope.supplierName = supplier.companyName;

        $scope.numberOfTrucksOfSelectedSupplier = supplier.numOfTrucks;
        $scope.isNbOfTruckDisabled = false;

        $scope.numberOfTrucks = 0;
        $scope.trucks = [];
        //$scope.getTrucksBySupplierId(supplier.id);
    };  

    $scope.selectedWetChanged = function (wet,subtank) {
        subtank.wetProductId = wet.id;
        subtank.wetProductName = wet.name;
    }; 

    $scope.selectedDriverChanged = function (driver, truckItem) {
        truckItem.driverId = driver.id;
        $scope.driverName = driver.name;
        $scope.driverId = driver.id;
    }; 

    $scope.selectedTruckChanged = function (truck, index) {

        for (var i = 0; i < truck.subTanks.length; i++) {
            truck.subTanks[i].wetProductId = "";
            truck.subTanks[i].productVolume = "";
            truck.subTanks[i].subTankId = truck.subTanks[i].subTankNum; // hone la2en bel api create po bel fuel amount field m2asoud bel subTankId l number
        }
        $scope.isSubTankHide = false;
        $scope.trucks[index].truckId = truck.id;
        $scope.trucks[index].driverId = "";
        $scope.trucks[index].selectedDriver = null;
        $scope.trucks[index].poFuelAmountsDetail = truck.subTanks;
        $scope.trucks[index].plateNumber = truck.plateNumber;
        $scope.trucks[index].cheseNumber = truck.cheseNumber;
        //$scope.trucks[index].deliveryDate = truck.deliveryDate;
        $scope.trucks[index].transportPartyNumber = truck.transportPartyNumber;
        $scope.trucks[index].subTanksNumber = truck.subTanks.length;
    };  



    //$scope.addNewTruck = function () {

    //    $scope.trucks.push(
    //        {
    //            "driverId": "",
    //            "truckId": "",
    //            "plateNumber": "",
    //            "cheseNumber": "",
    //            "subTanksNumber": "",
    //            "status": "Initiated",
    //            "supplierId": "",
    //            "supplierName": "",
    //            "numOfTrucks": "",
    //            "fuelAmounts": [],
    //        }
    //    );
    //};

    //$scope.removeTruck = function (id) {

    //    var index = -1;
    //    var comArr = eval($scope.trucks);
    //    for (var i = 0; i < comArr.length; i++) {
    //        if (comArr[i].truckId === id) {
    //            index = i;
    //            break;
    //        }
    //    }
    //    $scope.trucks.splice(index, 1);
    //};

    $scope.createPO = function () {


        var poObj = {
            creator: localStorage.getItem("employeeName"),
            supplierId: $scope.supplierId,
            supplierName: $scope.supplierName,
            status: "INITIATED",
            numOfTrucks: $scope.numberOfTrucks,
            poDetail: $scope.trucks,
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/createPOAsync",
            data: { sessionId: localStorage.getItem('session_id_ho'), createPO: poObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.hideCreateDOBtn = false;
                        $scope.createdPO = result.resultData;
                        swal("PO created successfully", "", "success");

                    } else {
                        swal("Oops", "PO creation failed", "");
                    }

                } else {
                    swal("Oops", "PO creation failed", "");
                }

            } else {
                swal("Oops", "PO creation failed", "");
            }


        }, function (error) {
                swal("Oops", "PO creation failed", "");
            $rootScope.showLoader = false;
        });

    };



    //$scope.addNewSubTank = function (index) {
    //    var newItemNo = $scope.trucks[index].fuelAmounts.length + 1;

    //    $scope.trucks[index].fuelAmounts.push(
    //        {
    //            "id": newItemNo,
    //            "wetProductId": "",
    //            "productVolume": "",
    //            "subTankId": "",
    //            "size": "",
    //            "topSize": "",
    //            "downSize": "",
    //        }
    //    );
    //};

    //$scope.removeSubTank = function (indexTruck, id) {

    //    var index = -1;
    //    var comArr = eval($scope.trucks[indexTruck].fuelAmounts);
    //    for (var i = 0; i < comArr.length; i++) {
    //        if (comArr[i].id === id) {
    //            index = i;
    //            break;
    //        }
    //    }
    //    $scope.trucks[indexTruck].fuelAmounts.splice(index, 1);
    //};

}]);