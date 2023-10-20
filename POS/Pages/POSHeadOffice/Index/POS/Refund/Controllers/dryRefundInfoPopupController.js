
rootHOModule.controller('dryRefundInfoPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    console.log(data.transactionItem);

    //events

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});