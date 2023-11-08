
rootHOModule.controller("viewDOController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter) {

    $scope.truck = $stateParams.item; //getting fooVal

    if ($scope.truck === undefined || $scope.truck === null || $scope.truck === "") {
        $scope.truck = JSON.parse(localStorage.getItem("truckData"));
    } else {
        localStorage.setItem("truckData", JSON.stringify($scope.truck));
    }


    console.log($scope.truck);

    $scope.stations = [];
    var counter = 0;

    function getDOById() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getDOById",
            data: { sessionId: localStorage.getItem('session_id_ho'), doId: $scope.truck.doId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.do = result.resultData;


                        for (var i = 0; i < $scope.do.stationIds.length; i++) {
                            getFuelAmounts($scope.do.stationIds[i], $scope.truck.doId);
                        }



                        console.log($scope.do);



                    } else {
                        swal("Oops", "Failed getting DO info", "");
                    }

                } else {
                    swal("Oops", "Failed getting DO info", "");
                }

            } else {
                swal("Oops", "Failed getting DO info", "");
            }


        }, function (error) {
                swal("Oops", "Failed getting DO info", "");
            $rootScope.showLoader = false;
        });

    };

    getDOById();


    function getFuelAmounts(stationId, doId) {


        var obj = {
            do_id: doId,
            station_id: stationId,
        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getFuelAmounts",
            data: { sessionId: localStorage.getItem('session_id_ho'), fuelAmount: obj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        var station = {
                            id: stationId,
                            subTanks: result.resultData
                        }

                        $scope.stations.push(station);
                        getStationById(counter, $scope.stations[counter].id);
                        counter++;

                    } else {
                        swal("Oops", "Failed getting POs", "");
                    }

                } else {
                    swal("Oops", "Failed getting POs", "");
                }

            } else {
                swal("Oops", "Failed getting POs", "");
            }


        }, function (error) {
            swal("Oops", "Failed getting POs", "");
            $rootScope.showLoader = false;
        });

    };


    $scope.getAllWetProductTypes = function () {

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

                        for (var i = 0; i < $scope.stations.length; i++) {

                            for (var j = 0; j < $scope.stations[i].subTanks.length; j++) {

                                var subtank = $scope.stations[i].subTanks[j];

                                for (var z = 0; z < $scope.wetProductsList.length; z++) {

                                    if (subtank.wetProductId === $scope.wetProductsList[z].id) { subtank.wetProductName = $scope.wetProductsList[z].name }

                                }
                            }

                        }

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


    function getStationById(index, stationId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getStationById",
            data: { sessionId: localStorage.getItem('session_id_ho'), stationId: stationId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.stations[index].stationName = result.resultData.stationName;
                        $scope.stations[index].stationNumber = result.resultData.stationNumber;
                        $scope.stations[index].stationManagerName = result.resultData.stationManagerName;
                        $scope.stations[index].location = result.resultData.location;

                        $scope.getAllWetProductTypes();

                        //getFuelAmounts(index, stationId, $scope.truck.doId)

                    } else {
                        swal("Oops", "Failed getting station info", "");
                    }

                } else {
                    swal("Oops", "Failed getting station info", "");
                }

            } else {
                swal("Oops", "Failed getting station info", "");
            }


        }, function (error) {
                swal("Oops", "Failed getting station info", "");
            $rootScope.showLoader = false;
        });

    };

}]);