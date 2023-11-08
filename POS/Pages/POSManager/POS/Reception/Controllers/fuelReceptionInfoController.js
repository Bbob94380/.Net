
rootModule.controller("fuelReceptionInfoController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService) {

    $scope.reception = $stateParams.item; //getting fooVal

    console.log($scope.reception);

    if ($scope.reception === undefined || $scope.reception === null || $scope.reception === "") {
        $scope.reception = JSON.parse(localStorage.getItem("itemReceptionInfoData"));
    } else {
        localStorage.setItem("itemReceptionInfoData", JSON.stringify($scope.reception));
    }


    for (var i = 0; i < $scope.reception.receivedSubTanks.length; i++) {

        for (var j = 0; j < $scope.reception.tanksToBeFilled.length; j++) {

            if ($scope.reception.tanksToBeFilled[j].subTankNumbers.includes($scope.reception.receivedSubTanks[i].subTankNumber)) {
                $scope.reception.receivedSubTanks[i].tank = $scope.reception.tanksToBeFilled[j];
                break;
            }

        }

    }


    $scope.chkStatus = false;
    $scope.showhideprop = false;
    $scope.transList = [];
    $scope.imagesList = [];


    function getReceptionById() {

        // $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getReceptionById",
            data: { sessionId: localStorage.getItem('session_id_sm'), receptionId: $scope.reception.id }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        if (result.resultData !== undefined && result.resultData !== null && result.resultData !== "") {

                            $scope.receptionData = result.resultData;
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

    //getReceptionById();

  
}]);