posAttendantRootModule.controller("dryMenuController", ["$scope", "$uibModal", "$http", "$timeout", "$rootScope", "$filter", function ($scope, $uibModal, $http, $timeout, $rootScope, $filter) {

    var dryItemsList = [];
    $scope.totalItems = [];
    $scope.totalLL = 0;
    $scope.totalIt = [];


    $scope.totalLabelDry = "hideTotalLabelDry";
    $scope.ButtonsDry = "hideButtonsDry";

    $scope.searchProductByBarcode = function () {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Dry/Views/searchDryBarcodePopup.html',
            controller: 'searchDryBarcodePopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { wetName: "1" };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

        modalInstance.opened.then(function () {
            //alert('hi');
        });
    }

    function getCategoriesDetails() {

        var $opts = {};

        if (localStorage.getItem('language') === 'en') {
             $opts = {
                variableWidth: false,
                loop: false,
                infinite: false,
                dots: false,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 3,
                rtl: false
            }
        } else if (localStorage.getItem('language') === 'ar') {
             $opts = {
                variableWidth: false,
                loop: false,
                infinite: false,
                dots: false,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 3,
                 rtl: true,
                 cssEase: 'linear',
            }
        }

        console.log(localStorage.getItem('session_id'));

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/GetDryProductsAsync",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.dryProducts = result.resultData;
                        
                        var allDryProductsList = [];
                        $scope.allDryProducts = [];
                        for (let i = 0; i < $scope.dryProducts.length; i++) {

                            for (let j = 0; j < $scope.dryProducts[i].products.length; j++) {

                                allDryProductsList.push($scope.dryProducts[i].products[j]);

                            }
                        }


                        const firstHalf1 = allDryProductsList.slice(0, allDryProductsList.length / 2);
                        const secondHalf1 = allDryProductsList.slice(allDryProductsList.length / 2);
                        $scope.allDryProducts.products1 = firstHalf1;
                        $scope.allDryProducts.products2 = secondHalf1;


                        for (let i = 0; i < $scope.dryProducts.length; i++) {

                            const firstHalf = $scope.dryProducts[i].products.slice(0, $scope.dryProducts[i].products.length / 2);
                            const secondHalf = $scope.dryProducts[i].products.slice($scope.dryProducts[i].products.length / 2);

                            $scope.dryProducts[i].products1 = firstHalf;
                            $scope.dryProducts[i].products2 = secondHalf;

                        }


                        $timeout(function () {

                            $('.your-class').slick($opts);

                            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                                $('.your-class').slick('setPosition');
                            })
                            $rootScope.showLoader = false;
                        }, 50);

                    } else {
                        swal($filter('translate')('failedgetDryProducts'), "", "error");
                    }

                } else {
                    swal($filter('translate')('failedgetDryProducts'), "", "error");
                }

            } else {
                swal($filter('translate')('failedgetDryProducts'), "", "error");
            }



        }, function (error) {
                swal($filter('translate')('failedgetDryProducts'), "", "error");
                $rootScope.showLoader = false;
        });

    };

    getCategoriesDetails();


    $rootScope.dryItemClicked = function (productItem, addedQty) {

        var modalInstance;

        modalInstance = $uibModal.open({
            animate: true,
            templateUrl: '/Pages/POSAttendant/Dry/Views/dryPopup.html',
            controller: 'dryPopupController',
            scope: $scope,
            windowClass: 'show',
            resolve: {
                data: function () {
                    return { productItem: productItem };
                }
            }
        });

        modalInstance.result.then(function (Result) {
            //when $uibModalInstance.close() fct executed


        }, function () {
            //enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
        });

    }

    //$rootScope.dryItemClicked = function (productItem, addedQty) {

    //    $scope.totalLabelDry = "showTotalLabelDry";
    //    $scope.ButtonsDry = "showButtonsDry";


    //    var itemToAdd = { id: productItem.id, name: productItem.name, discountItem: 0, qtyItem: addedQty, maxQtyItem: productItem.quantity, price: productItem.sale_price, totalIt: 0 };
    //    itemToAdd.totalIt = itemToAdd.qtyItem * itemToAdd.price;

    //    dryItemsList.push(itemToAdd)
    //    $rootScope.dryItemsList = dryItemsList;

    //    $scope.totalDollar = 0;
    //    $scope.totalLL = 0;

    //    for (let i = 0; i < $rootScope.dryItemsList.length; i++) {
    //        $scope.totalDollar += $rootScope.dryItemsList[i].totalIt;
    //    }
    //    $scope.totalLL = $scope.totalDollar * parseFloat(localStorage.getItem('dollarRate'));
    //    $scope.totalLL = $scope.totalLL + " "+ $filter('translate')('LL');
    //    $scope.totalDollar = "$" + $scope.totalDollar;
    //}


    $rootScope.calculateTotalDry = function (qtyItem, discountItem, price, key, maxQty) {

        if (parseInt(qtyItem) > maxQty) {
            alert("The quantity available for this product is only " + maxQty);
            qtyItem = 1;
        }

        $rootScope.dryItemsList[key].totalIt = qtyItem * price - (qtyItem * price * discountItem / 100)
        $rootScope.dryItemsList[key].qtyItem = qtyItem;

        $scope.totalDollar = 0;
        $scope.totalLL = 0;
        for (let i = 0; i < $rootScope.dryItemsList.length; i++) {
            $scope.totalDollar += $rootScope.dryItemsList[i].totalIt;
        }
        $scope.totalLL = $scope.totalDollar * parseFloat(localStorage.getItem('dollarRate'));
        $scope.totalLL = $scope.totalLL + " L.L";
        $scope.totalDollar = "$" + $scope.totalDollar;
    }

    $scope.addBtn = function () {
        var dryTranList = [];
        var dryTotalQty = 0;
        var dryTotalPriceLL = 0;
        var dryTotalPriceDollar = 0;


        for (let i = 0; i < $rootScope.dryItemsList.length; i++) {


            if ($rootScope.dryItemsList[i].qtyItem === 0 || $rootScope.dryItemsList[i].qtyItem === "0" || $rootScope.dryItemsList[i].qtyItem === undefined || $rootScope.dryItemsList[i].qtyItem === null || $rootScope.dryItemsList[i].qtyItem === "") {
                swal($filter('translate')('addItemQty'), "", "warning");
                return;
            }


            dryTotalQty += parseInt($rootScope.dryItemsList[i].qtyItem);
            dryTotalPriceLL = parseInt(dryTotalPriceLL) + (parseInt($rootScope.dryItemsList[i].totalIt) * parseFloat(localStorage.getItem('dollarRate')));
            dryTotalPriceDollar += parseInt($rootScope.dryItemsList[i].totalIt);
        }

        dryTranList.push(
            {
                id: 0,
                qty: dryTotalQty,
                priceLL: dryTotalPriceLL,
                priceDollar: dryTotalPriceDollar,
                productType: "Dry",
                employeeId: localStorage.getItem("employeeId"),
                products: $rootScope.dryItemsList
            }
        )


        $rootScope.transactionsList.push.apply($rootScope.transactionsList, dryTranList);
        $rootScope.calculateTotal();
        $rootScope.clearDryBtn();
    }

    $rootScope.clearDryBtn = function () {
        dryItemsList = [];
        $rootScope.dryItemsList = [];
        $rootScope.clearAllDry();
        $scope.totalDollar = 0;
        $scope.totalLL = 0;
        $scope.totalLabelDry = "hideTotalLabelDry";
        $scope.ButtonsDry = "hideButtonsDry";
    }



    //$scope.$watch('totalIt', function (newValue, oldValue) {
    //    $scope.totalLL = 0;

    //    for (let i = 0; i < $scope.dryItemsList.length; i++) {
    //        $scope.totalLL += $scope.dryItemsList[i].totalItem;
    //    }
    //})


}]);


