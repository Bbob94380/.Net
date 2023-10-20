

var rootHOModule = angular.module("rootHOModule", ["ui.bootstrap", "ui.router","pascalprecht.translate"]);

rootHOModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("HO_Dashboard", {
            url: "/HO_Dashboard",
            templateUrl: "/Pages/POSManager/Dashboard/Main/Views/mainDashboard.html",
            controller: "mainDashboardController"
        })
        .state("HO_Stations", {
            url: "/HO_Stations",
            templateUrl: "/Pages/POSHeadOffice/MainScreen/Views/stations.html",
            controller: "stationsController"
        })
        .state("HO_Menu", {
            url: "/HO_Menu",
            templateUrl: "/Pages/POSHeadOffice/MainScreen/Views/menu.html",
            controller: "menuController"
        })
        .state("HO_Tracking", {
            url: "/HO_Tracking",
            templateUrl: "/Pages/POSManager/Dashboard/Main/Views/mainDashboard.html",
            controller: "mainDashboardController"
        })
        .state("HO_Index_POS", {
            url: "/HO_Index_POS",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Main/Views/mainPOS.html",
            controller: "mainPOSController"
        })
        .state("HO_Index_Dashboard", {
            url: "/HO_Index_Dashboard",
            templateUrl: "/Pages/POSHeadOffice/Index/Dashboard/Main/Views/mainDashboard.html",
            controller: "mainDashboardController"
        })
        .state("HO_Index_Inventory", {
            url: "/HO_Index_Inventory",
            templateUrl: "/Pages/POSHeadOffice/Index/Inventory/Main/Views/mainInventory.html",
            controller: "mainInventoryController"
        })
        .state("HO_Index_POS.transaction", {
            url: "",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Transaction/Views/transaction.html",
            controller: "transactionController",
        })
        .state("HO_Index_POS.refund", {
            url: "",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Refund/Views/refund.html",
            controller: "refundController"
        })
        .state("HO_Index_POS.driver", {
            url: "/driver",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Driver/Views/driver.html",
            controller: "driverController"
        })
        .state("HO_Index_POS.truck", {
            url: "/truck",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Truck/Views/truck.html",
            controller: "truckController"
        })
        .state("HO_Index_POS.receipts", {
            url: "/receipts",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Receipts/Views/receipts.html",
            controller: "receiptsController"
        })
        .state("HO_Index_POS.receiptInfo", {
            url: "/receiptInfo",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Receipts/Views/receiptsInfo.html",
            controller: "receiptsInfoController"
        })
        .state("HO_Index_POS.supplier", {
            url: "",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/Supplier/Views/supplier.html",
            controller: "supplierController"
        })
        .state("HO_Index_POS.purchase", {
            url: "/purchase",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/PO/Views/purchase.html",
            controller: "purchaseController"
        })
        .state("HO_Index_POS.createpurchase", {
            url: "/createPurchase",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/PO/Views/createPurchase.html",
            controller: "createPurchaseController"
        })
        .state("HO_Index_POS.createDO", {
            url: "/createDO",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSHeadOffice/Index/POS/DO/Views/createDO.html",
            controller: "createDOController"
        })
        .state("HO_Index_POS.poInfo", {
            url: "",
            templateUrl: "/Pages/POSHeadOffice/Index/POS/PO/Views/poInfo.html",
            controller: "poInfoController"
        })
        .state("HO_Index_POS.purchaseinfo", {
            url: "/purchaseinfo",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSHeadOffice/Index/POS/PO/Views/purchaseInfo.html",
            controller: "purchaseInfoController"
        })
        .state("HO_Index_POS.viewdo", {
            url: "/viewdo",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSHeadOffice/Index/POS/DO/Views/viewDO.html",
            controller: "viewDOController"
        })
}]);


rootHOModule.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);







