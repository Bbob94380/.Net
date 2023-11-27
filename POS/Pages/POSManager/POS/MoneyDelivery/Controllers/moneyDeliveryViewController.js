
rootModule.controller("moneyDeliveryViewController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "commonHelper", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService, $common_helper) {

    $rootScope.showLoader = true;

    $scope.LBP_VALUES = [
        "100000", "50000", "20000", "10000", "5000", "1000"
    ];
    $scope.USD_VALUES = [
        "100", "50", "20", "10", "5", "1"
    ];

    $scope.mdObjectId = $stateParams.mdObjectId;

    $common_helper.createRequest("GET", "/FPOS/rest/moneyDeliv/find/" + $scope.mdObjectId).then(function (response) {
        $scope.delivery = response.data;
        console.log("Delivery = ", $scope.delivery);
        console.log("type of lbp_Amounts = ", typeof ($scope.delivery.lbp_Amounts));
        for (const weight in response.data.lbp_Amounts) {
            var count = response.data.lbp_Amounts[weight];
            /*weight = weight.slice(0, weight.length - 2);*/
            /*console.log("Weight = ", weight);
            console.log("Count = ", count);
            $("input[weight='" + weight + "']")[0].value = count;*/
        }
        $rootScope.showLoader = false;
    });

    $scope.goBack = function () {
        history.back();
    }

}]);