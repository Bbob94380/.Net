
rootHOModule.controller("purchaseInfoController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "$timeout", "$state", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, $timeout, $state) {

    var item = $stateParams.item; //getting fooVal

    if (item === undefined || item === null || item === "") {
        item = JSON.parse(localStorage.getItem("itemData"));
    } else {
        localStorage.setItem("itemData", JSON.stringify(item));
    }


    console.log(item);
    //$scope.truck = item.truck;


    function getPObyId() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getPObyId",
            data: { sessionId: localStorage.getItem('session_id_ho'), poId: item.id }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.po = result.resultData;
                        $scope.getAllWetProductTypes();
                        getDOsById($scope.po.id);

                        for (var i = 0; i < $scope.po.poDetail.length; i++) {
                            getDriverById(i, $scope.po.poDetail[i].driverId);
                        }

                        for (var i = 0; i < $scope.po.poDetail.length; i++) {
                            getTruckById(i, $scope.po.poDetail[i].truckId);
                        }

                        console.log($scope.po);



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

    getPObyId();


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

                        for (var i = 0; i < $scope.po.poDetail.length; i++) {

                            for (var j = 0; j < $scope.po.poDetail[i].poFuelAmountsDetail.length; j++) {

                                var subtank = $scope.po.poDetail[i].poFuelAmountsDetail[j];

                                for (var z = 0; z < $scope.wetProductsList.length; z++) {

                                    if (subtank.wetProductId === $scope.wetProductsList[z].id) { subtank.wetProductName = $scope.wetProductsList[z].name }

                                }

                            }

                        }

                        calculateTotalFuelPurchases();

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

    function calculateTotalFuelPurchases() {

        $scope.total = [];

        for (var i = 0; i < $scope.po.poDetail.length; i++) {

            var truck = $scope.po.poDetail[i];

            for (var j = 0; j < truck.poFuelAmountsDetail.length; j++) {
                var subtank = truck.poFuelAmountsDetail[j];

                var found = false;

                for (var z = 0; z < $scope.total.length; z++) {
                    if ($scope.total[z].type === subtank.wetProductName) {
                        $scope.total[z].amount = $scope.total[z].amount + subtank.productVolume;
                        found = true;
                    }
                }

                if (!found) $scope.total.push({ type: subtank.wetProductName, amount: subtank.productVolume  });
            }
        }

    }


    function getDriverById(index, driverId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getDriverbyId",
            data: { sessionId: localStorage.getItem('session_id_ho'), driverId: driverId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.po.poDetail[index].driverName = result.resultData.name;

                    }

                } else {
                }

            } else {
                swal("Oops", "Failed getting POs", "");
            }


        }, function (error) {
            swal("Oops", "Failed getting POs", "");
            $rootScope.showLoader = false;
        });

    };


    function getTruckById(index, truckId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getTruckById",
            data: { sessionId: localStorage.getItem('session_id_ho'), truckId: truckId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.po.poDetail[index].plateNumber = result.resultData.plateNumber;
                        $scope.po.poDetail[index].cheseNumber = result.resultData.cheseNumber;
                        $scope.po.poDetail[index].transportPartyNumber = result.resultData.transportPartyNumber;


                        for (var i = 0; i < $scope.po.poDetail.length; i++) {

                            for (var z = 0; z < $scope.po.poDetail[i].poFuelAmountsDetail.length; z++) {
                                for (var j = 0; j < result.resultData.subTanks.length; j++) {
                                    if ($scope.po.poDetail[i].poFuelAmountsDetail[j].subTankId === result.resultData.subTanks[j].subTankNum) {
                                        $scope.po.poDetail[i].poFuelAmountsDetail[j].subTankNum = result.resultData.subTanks[j].subTankNum;
                                        $scope.po.poDetail[i].poFuelAmountsDetail[j].subTankSize = result.resultData.subTanks[j].subTankSize;
                                        $scope.po.poDetail[i].poFuelAmountsDetail[j].subTankUpSize = result.resultData.subTanks[j].subTankUpSize;
                                        $scope.po.poDetail[i].poFuelAmountsDetail[j].subTankDownSize = result.resultData.subTanks[j].subTankDownSize;
                                    }
                                }
                            }

                            
                        }

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


    function getDOsById(poId) {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getDOsById",
            data: { sessionId: localStorage.getItem('session_id_ho'), poId: poId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.listOfDOs = result.resultData;

                        for (var i = 0; i < $scope.po.poDetail.length; i++) {

                            $scope.po.poDetail[i].hasDO = false;

                            for (var j = 0; j < $scope.listOfDOs.length; j++) {
                                if ($scope.po.poDetail[i].truckId === $scope.listOfDOs[j].truckId) {
                                    $scope.po.poDetail[i].hasDO = true;
                                    $scope.po.poDetail[i].doId = $scope.listOfDOs[j].id;
                                }
                            }
                        }

                        console.log($scope.po.poDetail);

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



    $scope.employeeName = localStorage.getItem("employeeName");

    $scope.viewDOPage = function (index) {

        $timeout(function () {

            $state.go('HO_Index_POS.viewdo', {
                item: $scope.po.poDetail[index]
            });
        })

    };

    $scope.createNewDO = function (i) {

        var payload = {
            driverName: $scope.po.poDetail[i].driverName,
            driverId: $scope.po.poDetail[i].driverId,
            truck: $scope.po.poDetail[i],
            deliveryDate: "",
            createdPO: $scope.po,
            //subTanks: $scope.trucksList.subTanks
        }

        $state.go('HO_Index_POS.createDO', {
            item: payload
        });
    }

}]);