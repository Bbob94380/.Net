
rootHOModule.controller('fuelTransactionInfoPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    console.log(data.transactionItem);
    $scope.transactionItem = data.transactionItem;

    //events

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});