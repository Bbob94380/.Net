rootHOModule.controller("stationsController", ["$scope", "$timeout", "$state", "$uibModal", "$http", "$rootScope", function ($scope, $timeout, $state, $uibModal, $http, $rootScope) {

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    $scope.filters = [];
    $scope.allStations = [];
    $scope.stationsList = [];

    $scope.filterLocation = function (filter) {
        $timeout(function () {
            $scope.$apply(function () {
                if (filter === 'all') {
                    $scope.stationsList = $scope.allStations;
                } else {
                    $scope.stationsList = $scope.allStations.filter(station => $.trim(station.location) === filter);
                }
            });
        });
    };

    $scope.getAllStations = function () {
        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getAllStations",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {
            console.log(response);
            $rootScope.showLoader = false;
            if (response && response.data) {
                var result = JSON.parse(response.data);
                if (result.isSuccessStatusCode) {
                    $scope.allStations = result.resultData;
                    $scope.stationsList = $scope.allStations
                    $scope.allStations.forEach(function (station) {
                        var location = $.trim(station.location);
                        if (location) $scope.filters.push(location);
                    });
                    $scope.filters = $scope.filters.filter(onlyUnique);
                } else {
                    swal("Oops", "Failed getting suppliers", "");
                }
            } else {
                swal("Oops", "Failed getting suppliers", "");
            }
        }, function (error) {
            swal("Oops", "Failed getting suppliers", "");
            $rootScope.showLoader = false;
        });
    };

    $scope.getAllStations();


    $scope.createNewStation = function () {
        $timeout(function () {
            $state.go('createStationPage');
        })
    };
}]);


