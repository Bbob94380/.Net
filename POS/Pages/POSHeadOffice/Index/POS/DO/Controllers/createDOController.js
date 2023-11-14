
rootHOModule.controller("createDOController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "$timeout", "$state", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter,$timeout, $state) {

    var item = $stateParams.item; //getting fooVal

    if (item === undefined || item === null || item === "") {
        item = JSON.parse(localStorage.getItem("newDOItemData"));
    } else {
        localStorage.setItem("newDOItemData", JSON.stringify(item));
    }


    $scope.truck = item.truck;
    $scope.createdPO = item.createdPO;
    $scope.driverName = item.driverName;
    $scope.supplierName = item.supplierName;
    $scope.driverId = item.driverId;
    $scope.deliveryDate = "";
    $scope.counter = 1;
    $scope.stationsAddedToPO = [];


    $scope.stationsAdded = [{
        "po_id": $scope.createdPO.id,
        "truck_id": $scope.truck.truckId,
        "stationId": "",
        "addStationDetails": [
            {
                "id": 1,
                "wetProductId": "",
                "wetProductName": "",
                "productVolume": "",
                "subTankId": ""
            }
        ]
    }];

    console.log(item);

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

    $scope.getAllStations = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getAllStations",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.stationsList = result.resultData;

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

    $scope.getAllStations();


    $scope.selectedStationChanged = function (selectedStation, index) {

        $scope.stationsAdded[index].stationId = selectedStation.id;

    }; 

    $scope.addStation = function () {

        $scope.stationsAdded.push(
            {
                "po_id": $scope.createdPO.id,
                "truck_id": $scope.truck.truckId,
                "stationId": "",
                "addStationDetails": [
                    {
                        "id": 1,
                        "wetProductId": "",
                        "wetProductName": "",
                        "productVolume": "",
                        "subTankId": ""
                    }
                ]
            }
        );
    };  

    //$scope.selectedWetChanged = function (selectedWet, subtank) {
    //    subtank.wetProductId = selectedWet.id;
    //}; 

    $scope.selectedSubtankChanged = function (subtank) {

        var counter = 0;

        for (var i = 0; i < $scope.stationsAdded.length; i++) {
            for (var x = 0; x < $scope.stationsAdded[i].addStationDetails.length; x++) {
                var subtankObj = $scope.stationsAdded[i].addStationDetails[x];
                if (subtankObj.subTankId === subtank.subTankId) { counter++; }
            }
        }

        if (counter > 1) {
            swal("Subtank number already chosen", "", "warning");
            subtank.subTankId = "";
            subtank.wetProductName = "";
            subtank.wetProductId = "";
        } else {

            for (var j = 0; j < $scope.truck.poFuelAmountsDetail.length; j++) {
                var truck = $scope.truck.poFuelAmountsDetail[j];
                if (truck.subTankNum === subtank.subTankId) {
                    subtank.wetProductName = truck.wetProductName;
                    subtank.wetProductId = truck.wetProductId;
                }
            }
        }

    }; 




    $scope.addNewSubtank = function (index) {

        $scope.counter = $scope.counter + 1;

        $scope.stationsAdded[index].addStationDetails.push(
            {
                "id": $scope.counter,
                "wetProductId": "",
                "wetProductName": "",
                "productVolume": "",
                "subTankId": ""
            }
        );
    };  

    $scope.removeStation = function (id) {

        var index = -1;
        var comArr = eval($scope.stationsAdded);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].stationId === id) {
                index = i;
                break;
            }
        }
        $scope.stationsAdded.splice(index, 1);

        var index2 = -1;
        for (var j = 0; j < $scope.stationsAddedToPO.length; j++) {
            if ($scope.stationsAddedToPO[j].stationId === id) {
                index2 = j;
                break;
            }
        }
        $scope.stationsAddedToPO.splice(index2, 1);

    };

    $scope.removeSubtank = function (indexSt, id) {

        var index = -1;
        var comArr = eval($scope.stationsAdded[indexSt].addStationDetails);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.stationsAdded[indexSt].addStationDetails.splice(index, 1);
    };




    $scope.addStationToPO = function (index) {


        var found = false;

        for (var i = 0; i < $scope.stationsAdded[index].addStationDetails.length; i++ ) {
            var subtank = $scope.stationsAdded[index].addStationDetails[i];
            if (subtank.wetProductId === "" || subtank.wetProductId === null) { swal("Please fill all fields", "", "warning"); found = true; break;}
            if (subtank.productVolume === "" || subtank.productVolume === null) { swal("Please fill all fields", "", "warning"); found = true; break;}
            if (subtank.subTankId === "" || subtank.subTankId === null) { swal("Please fill all fields", "", "warning"); found = true; break;}
            
        }

        if (found) {
            return;
        }

        $rootScope.showLoader = true;
        $http({
            method: "PUT",
            url: "/api/HOApi/addStationToPOAsync",
            data: { sessionId: localStorage.getItem('session_id_ho'), addStationToPO: $scope.stationsAdded[index] }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        var found = false;
                        for (var i = 0; i < $scope.stationsAddedToPO.length; i++) {

                            if ($scope.stationsAddedToPO[i].stationId === $scope.stationsAdded[index].stationId) { found = true; }
                        }

                        if (!found) $scope.stationsAddedToPO.push($scope.stationsAdded[index]);


                        swal("Station added successfully", "", "success");

                    } else {
                        swal("Oops", "Operation failed", "");
                    }

                } else {
                    swal("Oops", "Operation failed", "");
                }

            } else {
                swal("Oops", "Operation failed", "");
            }


        }, function (error) {
                swal("Oops", "Operation failed", "");
            $rootScope.showLoader = false;
        });

    };


    $scope.createDO = function () {


        if ($scope.stationsAddedToPO === null || $scope.stationsAddedToPO === undefined || $scope.stationsAddedToPO === "") {
            swal("Please add at least one station to po", "", "warning");
            return;
        }

        if ($scope.stationsAddedToPO.length <= 0) {
            swal("Please add at least one station to po", "", "warning");
            return;
        }

        var stationIds = [];

        for (var i = 0; i < $scope.stationsAddedToPO.length; i++) {

            stationIds.push($scope.stationsAddedToPO[i].stationId);
        }


        var doObj = {
            creator: localStorage.getItem("employeeName"),
            po_id: $scope.createdPO.id,
            truckId: $scope.truck.truckId,
            driverId: $scope.driverId,
            driverName: $scope.driverName,
            supplierName: $scope.supplierName,
            deliveryDate: $scope.deliveryDate,
            status: "INITIATED",
            stationIds: stationIds,
            //files: $scope.imagesList
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/createDOAsync",
            data: { sessionId: localStorage.getItem('session_id_ho'), createDO: doObj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("DO created successfully", "", "success");

                        $timeout(function () {
                            $state.go('HO_Index_POS.purchaseinfo', {
                                item: $scope.createdPO
                            });
                        })

                    } else {
                        swal("Oops", "DO creation failed", "");
                    }

                } else {
                    swal("Oops", "DO creation failed", "");
                }

            } else {
                swal("Oops", "DO creation failed", "");
            }


        }, function (error) {
                swal("Oops", "DO creation failed", "");
            $rootScope.showLoader = false;
        });

    };
}]);