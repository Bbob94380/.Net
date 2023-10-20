rootModule.controller("receiptsInfoController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService) {

    $scope.receipt = $stateParams.item; //getting fooVal

    console.log($scope.receipt);

    $scope.totalTrans = 0;

    if ($scope.receipt.transactions === undefined || $scope.receipt.transactions === null) return;

    for (var i = 0; i < $scope.receipt.transactions.length; i++) {
        $scope.totalTrans = $scope.totalTrans +  $scope.receipt.transactions[i].total;
    }

}]);


