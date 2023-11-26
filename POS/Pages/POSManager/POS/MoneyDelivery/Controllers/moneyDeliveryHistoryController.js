
rootModule.controller("moneyDeliveryHistoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "commonHelper", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $common_helper) {
    $common_helper.createRequest("GET", "/FPOS/rest/moneyDeliv/history").then(function (response) {
        $scope.mds = response.data;
    });

    $scope.viewMoneyDelivery = function (mdObject) {
        $timeout(function () {
            $state.go('pos.moneyDeliveryView', {
                mdObjectId: mdObject.id
            });
        })

    };

}]);


