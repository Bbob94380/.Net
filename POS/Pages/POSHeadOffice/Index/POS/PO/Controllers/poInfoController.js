
rootHOModule.controller("poInfoController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter) {

    $scope.type = $stateParams.type; //getting fooVal

    console.log($scope.receipt);
   
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

}]);