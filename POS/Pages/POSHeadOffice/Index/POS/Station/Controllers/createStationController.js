
rootHOModule.controller("createStationController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "$timeout", "$state", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter,$timeout, $state) {

 

    $scope.counter = 1;
    $scope.counterTank = 1;
    $scope.counterDispenser = 1;
    $scope.Dispenser = 1;


    $scope.wetProductAdded = [{
        "id": 1,
        "wetProductId": "",
        "wetProductCode": "",
        "qty": ""
    }];


    $scope.tanksAdded = [{
        "id": 1,
        "tankNumber": "",
        "height": "",
        "volume": "",
        "waterHeight": "",
        "waterVolume": "",
        "extensionHeight": "",
        "extensionRadius": "",
        "wetProduct": "",
        "qty": "",
        "temperature": "",
        "Comp": "",
    }];

    $scope.dispensersAdded = [{
        "id": 1,
        "dispenserId": "",
        "dispenserName": "",
        "qty": "",
        "dispenserTanks": [],
        "nuzzles": [
            {
                "nuzzleId": "",
                "mode": "",
                "wetProduct": "",
                "littres": "",
                "hasTank": false,
                "tank": ""
            }
        ],
    }];


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
                        console.log($scope.wetProductsList);

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

    $scope.selectedWetProductChanged = function (wet, item) {
        item.wetProductId = wet.id;
        item.wetProductCode = wet.productCode;
    }; 

    $scope.dispenserTankCheckBoxChanged = function (dispenser, isChecked, tank) {
        if (isChecked) {
            dispenser.dispenserTanks.push(tank);
        } else {
            var index = -1;
            for (var i = 0; i < dispenser.dispenserTanks.length; i++) {
                if (dispenser.dispenserTanks[i].id === tank.id) {
                    index = i;
                    break;
                }
            }
            dispenser.dispenserTanks.splice(index, 1);
        }

        console.log($scope.dispensersAdded);
    }; 


    $scope.nuzzleTankCheckBoxChanged = function (nuzzle, tank) {
            nuzzle.tank = tank;
  

        console.log($scope.dispensersAdded);
    }; 

    $scope.addNewWetProduct = function () {

        $scope.counter = $scope.counter + 1;

        $scope.wetProductAdded.push(
            {
                "id": $scope.counter,
                "wetProductId": "",
                "wetProductName": "",
                "qty": ""
            }
        );
    };  

    $scope.removeWetProduct = function (id) {

        var index = -1;
        var comArr = eval($scope.wetProductAdded);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.wetProductAdded.splice(index, 1);
    };

    $scope.addNewTank = function () {

        $scope.counterTank = $scope.counterTank + 1;

        $scope.tanksAdded.push(
            {
                "id": $scope.counterTank,
                "tankNumber": "",
                "height": "",
                "volume": "",
                "waterHeight": "",
                "waterVolume": "",
                "extensionHeight": "",
                "extensionRadius": "",
                "wetProduct": "",
                "qty": "",
                "temperature": "",
                "Comp": "",
            }
        );
    };

    $scope.removeTank = function (id) {

        var index = -1;
        var comArr = eval($scope.tanksAdded);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.tanksAdded.splice(index, 1);
        $scope.removeDispensersTank(id);
    };

    $scope.removeDispensersTank = function (id) {

        var index = -1;
        var found = false;
        var comArr = eval($scope.dispensersAdded);

        for (var i = 0; i < comArr.length; i++) {
            found = false;
            for (var j = 0; j < comArr[i].dispenserTanks.length; j++) {
                if (comArr[i].dispenserTanks[j].id === id) {
                    index = j;
                    found = true;
                    break;
                }
            }
            if (found)comArr[i].dispenserTanks.splice(index, 1);
        }

        console.log($scope.dispensersAdded);
    };

    $scope.addNewDispenser = function () {

        $scope.counterDispenser = $scope.counterDispenser + 1;

        $scope.dispensersAdded.push(
            {
                "id": $scope.counterDispenser,
                "dispenserId": "",
                "dispenserName": "",
                "qty": "",
                "dispenserTanks": [],
                "nuzzles": [{
                    "nuzzleId": "",
                    "mode": "",
                    "wetProduct": "",
                    "littres": "",
                    "hasTank": false,
                    "tank": ""
                }],
            }
        );
    };

    $scope.removeDispenser = function (id) {

        var index = -1;
        var comArr = eval($scope.dispensersAdded);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.dispensersAdded.splice(index, 1);
    };

    $scope.nuzzleNumberChanged = function (dispenser, nuzzleNumber) {

        if (nuzzleNumber !== undefined && nuzzleNumber !== null && nuzzleNumber !== "") {

            var current = dispenser.nuzzles.length;
            var counter = 0;

            if (current < parseInt(nuzzleNumber)) {
                counter = parseInt(nuzzleNumber) - current;

                for (var i = 0; i < counter; i++) {
                    dispenser.nuzzles.push({
                        "nuzzleId": "",
                        "mode": "",
                        "wetProduct": "",
                        "littres": ""
                    });
                }

            } else if (current > parseInt(nuzzleNumber)) {
                counter = current - parseInt(nuzzleNumber);

                for (var j = 0; j < counter; j++) {
                    dispenser.nuzzles.pop();
                }
            }
        } else {
            dispenser.nuzzles = [];

        }
       

        
    };


    $scope.createStation = function () {

        var stationIds = [];

        for (var i = 0; i < $scope.wetProductAddedToPO.length; i++) {

            stationIds.push($scope.wetProductAddedToPO[i].stationId);
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