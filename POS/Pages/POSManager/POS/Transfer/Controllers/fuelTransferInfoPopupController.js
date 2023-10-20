
rootModule.controller('fuelTransferInfoPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    //Initialization
    console.log(data.transactionItem);

    //events

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.selectOptions = ["Mobile",
        "Office",
        "Home"
    ];

    $scope.choices = [{ "id": 1, "type": "Mobile", "name": "" },
    { "id": 2, "type": "Mobile", "name": "" }];

    $scope.index = $scope.choices.length;

    $scope.addNewChoice = function () {
        var newItemNo = ++$scope.index;
        $scope.choices.push({ 'id': newItemNo, "type": "Mobile", "name": newItemNo });
    };

    $scope.removeChoice = function (id) {

        var index = -1;
        var comArr = eval($scope.choices);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.choices.splice(index, 1);
    };

});