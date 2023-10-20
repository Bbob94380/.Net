
rootModule.controller("fuelReceptionStartFillingController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService) {

    $scope.receptionId = $stateParams.item; //getting fooVal

    $scope.tanksToBeFilled = [{
        "tankId": "",
        "subTankNumbers": [],
        "volumeBeforeReception": 0,
        "volumeSoldDuringReception": 0,
        "estVolAfterReception": 0,
        "actualVolAfterReception": 0,
        "qantitiesDifferenceReason": ""
    }
    ];

    $scope.tankNumbers = [1,2,3,4,5,6]; // should replaced by an api to get these values


    $scope.chkStatus = false;
    $scope.showhideprop = false;
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

    $scope.subtanks = [];

   function getReceptionById() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getReceptionById",
            data: { sessionId: localStorage.getItem('session_id_sm'), receptionId: $scope.receptionId }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData !== null && result.resultData !== "" && result.resultData !== undefined) {
                            $scope.reception = result.resultData;
                            $scope.getAllWetProductTypes();
                        }


                    } else {
                        swal("Oops", "No reception found", "");
                    }

                } else {
                    swal("Oops", "Failed getting reception", "");
                }

            } else {
                swal("Oops", "Failed getting reception", "");
            }


        }, function (error) {
                swal("Oops", "Failed getting reception", "");
            $rootScope.showLoader = false;
        });

    };

    getReceptionById();

    $scope.getAllWetProductTypes = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getAllWetProductTypes",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.wetProductsList = result.resultData;


                        for (var i=0; i < $scope.reception.receivedSubTanks.length; i++) {

                            var subtank = $scope.reception.receivedSubTanks[i];

                                for (var z = 0; z < $scope.wetProductsList.length; z++) {

                                    if (subtank.wetProductId === $scope.wetProductsList[z].id) {
                                        subtank.wetProductName = $scope.wetProductsList[z].name
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

    $scope.getNConfTypes = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getNConfTypes",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.NConfTypes = result.resultData;

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

    //$scope.getNConfTypes();

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


    $scope.createReception = function () {

        var obj = {
            creator: $scope.reception.creator,
            delivOrderID: $scope.reception.delivOrderID,
            supplierName: $scope.reception.supplierName,
            driverName: $scope.driverName,
            truckNonConformityExists: $scope.chkStatus,
            nonConf_Description : "",
            receptionDate: $scope.reception.receptionDate,
            status: "FILLING",
            receivedSubTanks: $scope.reception.receivedSubTanks,
            tanksToBeFilled: $scope.tanksToBeFilled,
        }

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/createReception",
            data: { sessionId: localStorage.getItem('session_id_sm'), createReception: obj }
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


    }

}]);