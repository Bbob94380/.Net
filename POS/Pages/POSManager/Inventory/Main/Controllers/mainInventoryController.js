rootModule.controller("mainInventoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", function ($scope, $state, $timeout, $uibModal, $http, $rootScope) {

    const DISPENSER_FILTER = Object.freeze({
        ALL: Symbol("ALL"),
        FILLING: Symbol("FILLING"),
        OFFLINE: Symbol("OFFLINE"),
        IDLE: Symbol("IDLE")
    });

    const TANK_FILTER = Object.freeze({
        ALL: Symbol("ALL"),
        LOW: Symbol('LOW'),
        MEDIUM: Symbol('MEDIUM'),
        HIGH: Symbol('HIGH')
    });

    $scope.isLoading = true;
    $scope.dispenserFilter = DISPENSER_FILTER.ALL;
    $scope.tankFilter = TANK_FILTER.ALL;
    $scope.skeletons = [1, 2, 3, 4, 5];

    $scope.goToHistoryPage = function () {
        $timeout(function () {
            $state.go('inventoryGeneralReport');
        })
    };

    $scope.dispenserFilterFunc = function (val) {
        $timeout(function () {
            $scope.$apply(function () {
                $scope.dispenserFilter = DISPENSER_FILTER[val];
                if (val === 'ALL') {
                    $scope.pumpStates = $scope.totalPumpStates;
                } else {
                    $scope.pumpStates = $scope.totalPumpStates.filter(pump => pump.status === $scope.dispenserFilter.description)
                }

            });
        });
    };

    function filterTanks(tank) {
        if ($scope.TANK_FILTER === TANK_FILTER.LOW && tank.fillingPercentage <= 33) {
            return true;
        }
        if ($scope.TANK_FILTER === TANK_FILTER.HIGH && tank.fillingPercentage > 66) {
            return true;
        }
        if ($scope.TANK_FILTER === TANK_FILTER.MEDIUM && tank.fillingPercentage < 66 && tank.fillingPercentage >= 33) {
            return true;
        }
        return false;
    }

    $scope.tankFilterImg = function (tank) {
        if (tank.fillingPercentage <= 33) {
            return 'low';
        }
        if (tank.fillingPercentage > 66) {
            return 'full';
        }
        return 'medium';
    };

    $scope.tankFilterFunc = function (val) {
        $timeout(function () {
            $scope.$apply(function () {
                $scope.tankFilter = TANK_FILTER[val];
                if (val === 'ALL') {
                    $scope.tanks = $scope.totalTanks;
                } else {
                    $scope.tanks = $scope.totalTanks.filter(filterTanks)
                }

            });
        });
    };

    $rootScope.$on('fmsStateSm', function (event, data) {
        $scope.isLoading = false;
        if (data && data.fmsState) {
            $scope.$apply(function () {
                $scope.totalPumpStates = data.fmsState.pumpStates;
                if (!$scope.dispenserFilter || $scope.dispenserFilter == DISPENSER_FILTER.ALL) {
                    $scope.pumpStates = $scope.totalPumpStates;
                } else {
                    $scope.pumpStates = $scope.totalPumpStates.filter(pump => pump.status === $scope.dispenserFilter.description)
                }
                // ------
                $scope.totalTanks = data.fmsState.tankMeasurements;
                if (!$scope.tankFilter || $scope.tankFilter == TANK_FILTER.ALL) {
                    $scope.tanks = $scope.totalTanks;
                } else {
                    $scope.tanks = $scope.totalTanks.filter(filterTanks);
                }
            });
        }
    });

}]);


