
rootHOModule.controller("createDOController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter) {

    var item = $stateParams.item; //getting fooVal

    $scope.truck = item.truck;
    $scope.createdPO = item.createdPO;
    $scope.driverName = item.driverName;
    $scope.driverId = item.driverId;
    $scope.deliveryDate = item.deliveryDate;
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
                        "productVolume": "",
                        "subTankId": ""
                    }
                ]
            }
        );
    };  

    $scope.selectedWetChanged = function (selectedWet, subtank) {
        subtank.wetProductId = selectedWet.id;
    }; 

    $scope.selectedSubtankChanged = function (selectedSubtank, subtank) {
        subtank.subTankId = selectedSubtank.subTankId;
    }; 




    $scope.addNewSubtank = function (index) {

        $scope.counter = $scope.counter + 1;

        $scope.stationsAdded[index].addStationDetails.push(
            {
                "id": $scope.counter,
                "wetProductId": "",
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

                        $scope.stationsAddedToPO.push($scope.stationsAdded[index]);
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

        var stationIds = [];

        for (var i = 0; i < $scope.stationsAddedToPO.length; i++) {

            stationIds.push($scope.stationsAddedToPO[i].stationId);
        }


        var doObj = {
            creator: localStorage.getItem("employeeName"),
            po_id: $scope.createdPO.id,
            truckId: $scope.truck.truckId,
            driverId: $scope.driverId,
            deliveryDate: $scope.deliveryDate,
            status: "INITIATED",
            stationIds: stationIds
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

                        $scope.hideCreateDOBtn = false;
                        //$scope.createdPO = result.resultData;
                        swal("DO created successfully", "", "success");

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