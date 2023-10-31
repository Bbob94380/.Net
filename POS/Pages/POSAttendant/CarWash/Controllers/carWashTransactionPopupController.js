
posAttendantRootModule.controller('carWashTransactionPopupController', function ($scope, $rootScope, $http, $uibModalInstance, data) {


    //Initialization
    $scope.carWashOptionsList = [];
    $scope.washSubCategoriesId = [];
    $scope.totalDollar = 0;
    $scope.totalLL = 0;
    console.log(data.carWashType);

    $scope.carWashType = data.carWashType;
    //$scope.carWashTypePriceLL = data.carWashTypePriceLL;
    //$scope.carWashTypePriceDollar = data.carWashTypePriceDollar;

    $scope.totalDollar = 0;
    $scope.totalLL = 0;

    $scope.addCarWashOption = function (id, name, priceLL, priceDollar) {

        $scope.carWashOptionsList.push({ option: name, priceMc: priceLL, priceSc: priceDollar})
        $scope.washSubCategoriesId.push(id)

        $scope.totalDollar += priceDollar;
        $scope.totalLL += priceLL;

    }

    $scope.clearWashTable = function () {
        $scope.carWashOptionsList = [];
        $scope.totalDollar =0;
        $scope.totalLL = 0;
    }

    $scope.next = function () {
        var carWashResultObj = {
            id: 0,
            currencyRatio: localStorage.getItem("dollarRate"),
            vehiceType: $scope.carWashType,
            washSubCategoriesId: $scope.washSubCategoriesId,
            priceLL: $scope.totalLL,
            priceDollar: $scope.totalDollar,
            productType: "Car wash"
        }
        $scope.$parent.transactionsList.push(carWashResultObj);
        $scope.$parent.calculateTotal();
        $uibModalInstance.close('Succeeded');
    }


    $scope.getWashOptionCategories = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getWashOptionCategories",
            data: { sessionId: localStorage.getItem('session_id')}
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.optionsList = result.resultData;

                    } else {
                        swal("Failed getting car was options", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal("Failed getting car was options", "Please try again", "error");
                }

            } else {
                swal("Failed getting car was options", "Please try again", "error");
            }


        }, function (error) {
            swal("Failed getting car was options", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getWashOptionCategories();
});