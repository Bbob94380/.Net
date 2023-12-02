
rootModule.controller("moneyDeliveryIndexController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $common_helper) {

    $scope.showNoData = true;


    $common_helper.createRequest("GET", "/FPOS/rest/moneyDeliv/findAll").then(function (response) {
        $scope.mds = response.data;

        if ($scope.mds !== null) {
            if ($scope.mds.length > 0) {
                $scope.showNoData = false;
            } else {
                $scope.showNoData = true;
            }
        } else {
            $scope.showNoData = true;
        }


    });
    $scope.goToMoneyForm = function (type) {
        $timeout(function () {
            $state.go('pos.moneyDeliveryForm');
        });
    };

    $scope.goToMoneyHistory = function (type) {
        $timeout(function () {
            $state.go('pos.moneyDeliveryHistory');
        });
    };
    $scope.viewMoneyDelivery = function (mdObject) {
        $timeout(function () {
            $state.go('pos.moneyDeliveryView', {
                mdObjectId: mdObject.id
            });
        })

    };

}]);


