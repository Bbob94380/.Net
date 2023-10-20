
rootModule.controller("eodFormController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope) {

   

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

    $scope.shiftFuelClicked = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftFuelPopup.html',
            controller: 'shiftFuelPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { transactionItem: "11" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

    }


    $scope.goToShiftCash = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftCashPopup.html',
            controller: 'shiftCashPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { transactionItem: "11" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });
    }

    $scope.goToShiftMoneyType = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSManager/POS/EOD/Views/shiftMoneyTypePopup.html',
            controller: 'shiftMoneyTypePopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { transactionItem: "11" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });


    }

}]);