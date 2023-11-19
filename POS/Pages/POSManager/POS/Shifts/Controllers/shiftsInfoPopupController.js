
rootModule.controller('shiftsInfoPopupController', function ($scope, $rootScope, $uibModal, $http, $uibModalInstance, data) {

    $scope.shiftObj = data.shift


        for (var j = 0; j < $scope.shiftObj.moneyAmounts.length; j++) {

            var money = $scope.shiftObj.moneyAmounts[j];

            if (money.hasOwnProperty("currencyCardUsd")) {

                if (money.currencyCardUsd !== null && money.currencyCardUsd !== undefined) {
                    money.isDollar = true;
                    money.isLL = false;
                }
            }

            if (money.hasOwnProperty("currencyCardLbp")) {
                if (money.currencyCardLbp !== null && money.currencyCardLbp !== undefined) {
                    money.isDollar = false;
                    money.isLL = true;
                }
            }

        }


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

                        for (var i = 0; i < $scope.shiftObj.nozzleCounter.length; i++) {

                            var nozzle = $scope.shiftObj.nozzleCounter[i];

                                for (var z = 0; z < $scope.wetProductsList.length; z++) {

                                    if (nozzle.wetProductId === $scope.wetProductsList[z].id) { nozzle.wetProductName = $scope.wetProductsList[z].name }

                                }

                        }


                    } else {
                        //swal("Oops", "No drivers found", "");
                    }

                } else {
                }

            } else {
            }


        }, function (error) {
            swal("Oops", "Failed getting drivers", "");
            $rootScope.showLoader = false;
        });

    };

    $scope.getAllWetProductTypes();


    function getStationManagerName() {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getStationManagerName",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.stationManagerName = result.resultData;

                    } else {
                        //swal("Failed getting station manager name", "Please try again", "error");
                        //console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting station manager name", "Please try again", "error");
                }

            } else {
                //swal("Failed getting station manager name", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting station manager name", "Please try again", "error");
            //$rootScope.showLoader = false;
            console.log(error);
        });

    };

    getStationManagerName();
});