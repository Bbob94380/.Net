
posAttendantRootModule.controller('editTransactionsPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {

    $scope.showTotal = true;


    $scope.myFilter3 = function (item) {
        return item.employeeId === localStorage.getItem("employeeId");
    };



    $scope.deleteTransFuel = function (transId, productType) {


        for (var i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId && $rootScope.transactionsList[i].productType === productType) {
                $rootScope.transactionsList.splice(i, 1);
            }
        }

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) { $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet"; $scope.showTotal = false; }

    }

    $scope.deleteTransCar = function (transId, productType, carId) {

        for (var i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId && $rootScope.transactionsList[i].productType === productType) {

                    for (var j = 0; j < $rootScope.transactionsList[i].carWashOptionsList.length; j++) {
                        var item = $rootScope.transactionsList[i].carWashOptionsList[j];
                            if(item.id === carId) {
                                $rootScope.transactionsList[i].carWashOptionsList.splice(j, 1);
                                break;
                             }
                }

                if ($rootScope.transactionsList[i].carWashOptionsList.length <= 0) {
                    $rootScope.transactionsList.splice(i, 1);
                }

                    break;

            }
         }

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) { $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet"; $scope.showTotal = false; }

    }

    $scope.deleteTransDry = function (transId, productType, dryId) {

        for (var i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId && $rootScope.transactionsList[i].productType === productType) {

                for (var j = 0; j < $rootScope.transactionsList[i].products.length; j++) {
                    var item = $rootScope.transactionsList[i].products[j];
                    if (item.id === dryId) {
                        $rootScope.transactionsList[i].products.splice(j, 1);
                        break;
                    }
                }

                if ($rootScope.transactionsList[i].products.length <= 0) {
                    $rootScope.transactionsList.splice(i, 1);
                }

                break;

            }
        }

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) { $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet"; $scope.showTotal = false; }

    }

    $scope.deleteTransService = function (transId, productType, serviceId) {

        for (var i = 0; i < $rootScope.transactionsList.length; i++) {
            if ($rootScope.transactionsList[i].id === transId && $rootScope.transactionsList[i].productType === productType) {

                for (var j = 0; j < $rootScope.transactionsList[i].selectedServicesList.length; j++) {
                    var item = $rootScope.transactionsList[i].selectedServicesList[j];
                    if (item.id === serviceId) {
                        $rootScope.transactionsList[i].selectedServicesList.splice(j, 1);
                        break;
                    }
                }

                if ($rootScope.transactionsList[i].selectedServicesList.length <= 0) {
                    $rootScope.transactionsList.splice(i, 1);
                }

                break;

            }
        }

        $rootScope.calculateTotal();

        if ($rootScope.transactionsList.length === 0) { $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet"; $scope.showTotal = false; }

    }

    $scope.deleteAllTrans = function () {
        var d = [];

        for (var j = 0; j < $rootScope.transactionsList.length; j++) {
            if ($rootScope.transactionsList[j].employeeId !== localStorage.getItem("employeeId")) {
                d.push($rootScope.transactionsList[j]);
            }
        }

        $rootScope.transactionsList = d;

        $rootScope.calculateTotal();
        $rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";
        $scope.showTotal = false;
    }

    $scope.cancel = function () {
        $uibModalInstance.close(true)
    }

    $scope.cancel = function () {
        $uibModalInstance.close(true)
    }

    $scope.done = function () {
        $uibModalInstance.close(true)
    }

});