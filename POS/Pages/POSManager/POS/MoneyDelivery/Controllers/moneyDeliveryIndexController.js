
rootModule.controller("moneyDeliveryIndexController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $common_helper) {
    $common_helper.createRequest("GET", "/FPOS/rest/moneyDeliv/findAll").then(function (response) {
        $scope.mds = response.data;
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


