
rootModule.controller('shiftsInfoPopupController', function ($scope, $rootScope, $uibModal, $http, $uibModalInstance, data) {



    $scope.getSalesSummary = function () {

        var nozzleCounters = [];


        for (var i = 0; i < $scope.nuzzlesList.length; i++) {

            var nozzleCounterObj = {
                nozzleNumber: $scope.nuzzlesList[i].number,
                oldNozzleCounter: $scope.displayCounterResult[i],
                newNozzleCounter: $scope.displayNewCounterResult[i]
            }

            nozzleCounters.push(nozzleCounterObj);

        }


        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getSalesSummary",
            data: { sessionId: localStorage.getItem('session_id'), nozzleCounters: nozzleCounters }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.salesSummary = result.resultData;
                        $scope.hideSummary = false;

                    } else {
                        swal("Failed getting sales summary", "Please try again", "error");
                        console.log(result.errorMsg);
                        $scope.hideSummary = true;
                    }

                } else {
                    swal("Failed getting sales summary", "Please try again", "error");
                    $scope.hideSummary = true;
                }

            } else {
                swal("Failed getting sales summary", "Please try again", "error");
                $scope.hideSummary = true;
            }


        }, function (error) {
            swal("Shift creation failed", "Please try again", "error");
            $scope.hideSummary = true;
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

   


    $scope.MoneyAdded = function () {

        $scope.TotalLBPAdded = 0;
        $scope.TotalUSDAdded = 0;
        var currency = "";
        var value = 0;

        for (var i = 0; i < $scope.displayMoneyResult.length; i++) {

            if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5) currency = "USD";
            if (i === 6 || i === 7 || i === 8 || i === 9 || i === 10 || i === 11) currency = "LBP";

            if (i === 0) value = 100;
            if (i === 1) value = 50;
            if (i === 2) value = 20;
            if (i === 3) value = 10;
            if (i === 4) value = 5;
            if (i === 5) value = 1;
            if (i === 6) value = 100000;
            if (i === 7) value = 50000;
            if (i === 8) value = 20000;
            if (i === 9) value = 10000;
            if (i === 10) value = 5000;
            if (i === 11) value = 1000;

            if (currency === "USD") {

                if ($scope.displayMoneyResult[i] === undefined || $scope.displayMoneyResult[i] === null || $scope.displayMoneyResult[i] === "") $scope.displayMoneyResult[i] = '0';
                $scope.TotalUSDAdded += value * parseInt($scope.displayMoneyResult[i]);
            }

            if (currency === "LBP") {
                if ($scope.displayMoneyResult[i] === undefined || $scope.displayMoneyResult[i] === null || $scope.displayMoneyResult[i] === "") $scope.displayMoneyResult[i] = '0';
                $scope.TotalLBPAdded += value * parseInt($scope.displayMoneyResult[i]);
            }
        }

    }


});