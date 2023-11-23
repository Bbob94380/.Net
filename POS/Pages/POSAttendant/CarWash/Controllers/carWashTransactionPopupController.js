
posAttendantRootModule.controller('carWashTransactionPopupController', function ($scope, $rootScope, $filter, $http, $uibModalInstance, data) {


    //Initialization
    $scope.carWashOptionsList = [];
    $scope.washSubCategoriesId = [];
    $scope.totalDollar = 0;
    $scope.totalLL = 0;
    console.log(data.carWashType);

    $scope.carWashType = data.carWashType;
    $scope.carTypeLang = data.carTypeLang;
    //$scope.carWashTypePriceLL = data.carWashTypePriceLL;
    //$scope.carWashTypePriceDollar = data.carWashTypePriceDollar;

    $scope.totalDollar = 0;
    $scope.totalLL = 0;

    $scope.addCarWashOption = function (id, name, priceLL, priceDollar, item) {
            
        if (item.hasStyle === true) {
            item.styleClass = "";
            item.hasStyle = false;
            $scope.carWashOptionsList = removeObjectWithId($scope.carWashOptionsList, id);

            const index = $scope.washSubCategoriesId.indexOf(id);
            if (index > -1) { // only splice array when item is found
                $scope.washSubCategoriesId.splice(index, 1); // 2nd parameter means remove one item only
            }

            $scope.totalDollar = $scope.totalDollar - priceDollar;
            $scope.totalLL = $scope.totalLL - priceLL;

        } else {
            item.styleClass = "serviceGreen";
            item.hasStyle = true;
            $scope.carWashOptionsList.push({ id: id, option: name, priceMc: priceLL, priceSc: priceDollar })
            $scope.washSubCategoriesId.push(id);

            $scope.totalDollar += priceDollar;
            $scope.totalLL += priceLL;
        }

    }

    function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
            arr.splice(objWithIdIndex, 1);
        }

        return arr;
    }

    $scope.clearWashTable = function () {
        $scope.carWashOptionsList = [];
        $scope.washSubCategoriesId = [];
        $scope.totalDollar =0;
        $scope.totalLL = 0;

        for (var i = 0; i < $scope.optionsList.length; i++) {
            $scope.optionsList[i].styleClass = "";
            $scope.optionsList[i].hasStyle = false;
        }
    }

    $scope.next = function () {

        if ($scope.washSubCategoriesId !== null && $scope.washSubCategoriesId !== undefined && $scope.washSubCategoriesId !== "") {
            if ($scope.washSubCategoriesId.length <= 0) {
                swal($filter('translate')('carWashOptionNotFound'), "", "warning");
                return;
            }
        } else {
            swal($filter('translate')('carWashOptionNotFound'), "", "warning");
            return;
        }

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
                        console.log($scope.optionsList);

                    } else {
                        swal($filter('translate')('failedgetCarWashOptions'), "", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    swal($filter('translate')('failedgetCarWashOptions'), "", "error");
                }

            } else {
                swal($filter('translate')('failedgetCarWashOptions'), "", "error");
            }


        }, function (error) {
                swal($filter('translate')('failedgetCarWashOptions'), "", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    $scope.getWashOptionCategories();
});