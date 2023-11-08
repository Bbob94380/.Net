
rootModule.controller("fuelReceptionStartFillingController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService) {

    $scope.reception = $stateParams.item; 

    if ($scope.reception === undefined || $scope.reception === null || $scope.reception === "") {
        $scope.reception = JSON.parse(localStorage.getItem("itemReceptionFillingData"));
    } else {
        localStorage.setItem("itemReceptionFillingData", JSON.stringify($scope.reception));
    }


    console.log($scope.reception);

    //$scope.tanksToBeFilled = [{
    //    "tankId": "",
    //    "subTankNumbers": [],
    //    "volumeBeforeReception": 0,
    //    "volumeSoldDuringReception": 0,
    //    "estVolAfterReception": 0,
    //    "actualVolAfterReception": 0,
    //    "qantitiesDifferenceReason": ""
    //}
    //];


    $scope.chkStatus = false;
    $scope.showhideprop = false;
    $scope.transList = [];
    $scope.imagesList = [];

    //$scope.missingAmount = [];
    //$scope.showhideprop2 = [false];

    //$scope.showHideDivMissing  = function (index) {
    //    if ($scope.missingAmount[index]) {
    //        $scope.showhideprop2[index] = true;
    //    }
    //    else {
    //        $scope.showhideprop2[index] = false;
    //    }
    //}

    $scope.showHideDiv= function () {
        if ($scope.chkStatus) {
            $scope.showhideprop = true;
        }
        else {
            $scope.showhideprop = false;
        }
    }

    $scope.getAllTanks = function () {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getAllTanks",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
           // $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.tanks = result.resultData;

                        //if (tanks !== null && tanks !== undefined && tanks !== "")
                        //for (var i = 0; i < tanks.length; i++) {

                        //    $scope.tankNumbers.push(tanks[i].tankNumber);
                        //}

                    } else {
                        //swal("Oops", "No drivers found", "");
                    }

                } else {
                    //swal("Oops", "No drivers found", "");
                }

            } else {
               // swal("Oops", "Failed getting drivers", "");
            }


        }, function (error) {
            //swal("Oops", "Failed getting drivers", "");
            //$rootScope.showLoader = false;
        });

    };

    $scope.getAllTanks();


    $scope.getNConfTypes = function () {

        //$rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/SmApi/getNConfTypes",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.NConfTypes = result.resultData;

                    } else {
                       // swal("Oops", "No drivers found", "");
                    }

                } else {
                   // swal("Oops", "No drivers found", "");
                }

            } else {
               // swal("Oops", "Failed getting drivers", "");
            }


        }, function (error) {
            //swal("Oops", "Failed getting drivers", "");
            //$rootScope.showLoader = false;
        });

    };

    $scope.getNConfTypes();


    function getAllTransactions() {

       // $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/GetAllTransactionsAsync",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData !== undefined && result.resultData !== null && result.resultData !== "") {

                            for (var i = 0; i < result.resultData.length; i++) {
                                $scope.transList.push.apply($scope.transList, result.resultData[i].saleTransactions);

                            }

                        }

                    } else {
                        //swal("Oops", "Failed getting transactions", "");
                    }

                } else {
                    //swal("Oops", "No transactions found", "");
                }

            } else {
               // swal("Oops", "Failed getting transactions", "");
            }


        }, function (error) {
           // swal("Oops", "Failed getting transactions", "error");
            //$rootScope.showLoader = false;
        });

    };

    getAllTransactions();

    $scope.sealTypes = [true,false];

    $scope.conformities = [{ "id": 1, "reason": "", "desc": "" },
        { "id": 2, "reason": "", "desc": "" }];

    $scope.index = $scope.conformities.length;

    $scope.addNewChoice = function () {
        var newItemNo = ++$scope.index;
        $scope.conformities.push({ 'id': newItemNo, "reason": "", "desc": "" });
    };

    $scope.removeChoice = function (id) {

        var index = -1;
        var comArr = eval($scope.conformities);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.conformities.splice(index, 1);
    };

    $scope.tankNumberSelected = function (tankId, subTankId, addedAmount) {

        var volume = 0;

        for (var i = 0; i < $scope.tanks.length; i++) {
            if ($scope.tanks[i].id === tankId) volume = $scope.tanks[i].volume;
        }


        for (var z = 0; z < $scope.reception.fuelAmounts.length; z++) {

            var subtank = $scope.reception.fuelAmounts[z];

            if ($scope.reception.fuelAmounts[z].subTankId === subTankId) {
                subtank.volumeBeforeReception = volume;
                subtank.estVolAfterReception = volume + parseFloat(addedAmount);

            }
        }

    }

    $scope.validateTankAddedAmount = function (addedAmount, subTankVolume, subTankId, beforeAmount) {

        var subtank;

        if (beforeAmount === undefined || beforeAmount === null) beforeAmount = 0;

        for (var z = 0; z < $scope.reception.fuelAmounts.length; z++) {

            if ($scope.reception.fuelAmounts[z].subTankId === subTankId) {
                subtank = $scope.reception.fuelAmounts[z];
            }
        }


        if (parseFloat(addedAmount) > parseFloat(subTankVolume)) {
            swal("Added amount should not be greater than subtank volume", "", "warning");
            subtank.volumeSoldDuringReception = 0;
            subtank.estVolAfterReception = subtank.volumeSoldDuringReception + parseFloat(beforeAmount);

        } else {
            subtank.estVolAfterReception = parseFloat(addedAmount) + parseFloat(beforeAmount);
        }

    }


    $scope.uploadFile = function (files, index) {

        var base64 = getBase64(files[0], index);
        console.log(base64);
    };


    function getBase64(file, index) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {

            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            var imgObj = {
                fileName: file.name,
                size: file.size,
                contentType: file.type,
                base64encoded: base64String
            }

            $scope.imagesList[index] = imgObj;

            console.log($scope.imagesList);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    $scope.createReception = function () {

        var nonConf_DescriptionObj = {};

        for (var i = 0; i < $scope.conformities.length; i++) {
            var key = $scope.conformities[i].reason;
            nonConf_DescriptionObj[key] = $scope.conformities[i].desc;
        }


        var receivedSubTanks = [];
        var tanksIds = [];

        for (var j = 0; j < $scope.reception.fuelAmounts.length; j++) {

            var item = $scope.reception.fuelAmounts[j];
            tanksIds.push(item.tankId);

            var transId = null
            if (item.fuel_below_indicator === true) { transId = item.selectedTrans.id}

            receivedSubTanks.push({
                wetProductId: item.wetProductId,
                subTankNumber: item.subTankId,
                volume: item.productVolume,
                quantity: item.productVolume,
                //quantityOBS: 520.2,
                nonConformityExists: $scope.chkStatus,
                seal_on_subTank_cover: item.seal_on_subTank_cover,
                seal_on_valve: item.seal_on_valve,
                subTankID_on_valve: item.subTankID_on_valve,
                fuel_below_indicator: item.fuel_below_indicator,
                fillingPayedByDriver: item.fillingPayedByDriver,
                ncFillingTransactionId: transId
            });
        }


        var tanksToBeFilled = [];

        for (var x = 0; x < tanksIds.length; x++) {

            var tank = {};
            tank.tankId = tanksIds[x];
            tank.subTankNumbers = [];
            tank.addedAmouunt = 0;
            tank.actualVolAfterReception = 0;
            tank.estVolAfterReception = 0;
            tank.missingAmount = 0;

            for (var z = 0; z < $scope.reception.fuelAmounts.length; z++) {

                var subTank = $scope.reception.fuelAmounts[z];

                if (tanksIds[x] === subTank.tankId) {
                    tank.subTankNumbers.push(subTank.subTankId);
                    tank.volumeBeforeReception = parseFloat(subTank.volumeBeforeReception);
                    tank.addedAmouunt += parseFloat(subTank.volumeSoldDuringReception);
                    if (item.fuel_below_indicator === true) tank.missingAmount += parseFloat(subTank.selectedTrans.dispensedVolume);
                }
            }

            tank.estVolAfterReception= tank.volumeBeforeReception + tank.addedAmouunt;
            if (item.fuel_below_indicator === true) {
                tank.actualVolAfterReception = tank.estVolAfterReception + tank.missingAmount; // hayde ba3den bada tenjeb men l pts
            } else {
                tank.actualVolAfterReception = tank.estVolAfterReception; // hayde ba3den bada tenjeb men l pts
            }

            tanksToBeFilled.push(tank);

            //tanksToBeFilled.push({
            //    "tankId": "",
            //    "subTankNumbers": [],
            //    "volumeBeforeReception": 0,
            //    "volumeSoldDuringReception": 0,
            //    "estVolAfterReception": 0,
            //    "actualVolAfterReception": 0,
            //    "qantitiesDifferenceReason": ""
            //});

        }


        var obj = {
            creator: $scope.reception.creator,
            do_id: $scope.reception.do_id,
            stationDo_id: $scope.reception.id,
            supplierName: $scope.reception.supplierName,
            driverName: $scope.driverName,
            truckNonConformityExists: $scope.chkStatus,
            nonConf_Description: nonConf_DescriptionObj,
            receptionDate: $scope.reception.deliveryDate,
            status: "FILLING",
            receivedSubTanks: receivedSubTanks,
            tanksToBeFilled: tanksToBeFilled,
            files: $scope.imagesList
        }

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/createReceptionAsync",
            data: { sessionId: localStorage.getItem('session_id_sm'), createReception: obj }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        swal("Reception created successfully", "", "success");

                    } else {
                        swal("Oops", "Reception creation failed", "");
                    }

                } else {
                    swal("Oops", "Reception creation failed", "");
                }

            } else {
                swal("Oops", "Reception creation failed", "");
            }


        }, function (error) {
                swal("Oops", "Reception creation failed", "");
            $rootScope.showLoader = false;
        });


    }

}]);