

var rootModule = angular.module("rootModule", ["ui.bootstrap", "ui.router","pascalprecht.translate"]);

rootModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "/Pages/POSManager/Dashboard/Main/Views/mainDashboard.html",
            controller: "mainDashboardController"
        })
        .state("pos", {
            url: "/pos",
            templateUrl: "/Pages/POSManager/POS/Main/Views/mainPOS.html",
            controller: "mainPOSController"
        })
        .state("pos.transaction", {
            url: "/transaction",
            templateUrl: "/Pages/POSManager/POS/Transaction/Views/transaction.html",
            controller: "transactionController",
        })
        .state("pos.refund", {
            url: "/refund",
            templateUrl: "/Pages/POSManager/POS/Refund/Views/refund.html",
            controller: "refundController"
        })
        .state("pos.refundHistory", {
            url: "/refundHistory",
            templateUrl: "/Pages/POSManager/POS/Refund/Views/refundHistory.html",
            controller: "refundHistoryController"
        })
        .state("pos.transfer", {
            url: "/transfer",
            templateUrl: "/Pages/POSManager/POS/Transfer/Views/transfer.html",
            controller: "transferController"
        })
        .state("pos.transferHistory", {
            url: "/transferHistory",
            templateUrl: "/Pages/POSManager/POS/Transfer/Views/transferHistory.html",
            controller: "transferHistoryController"
        })
        .state("pos.reception", {
            url: "/reception",
            templateUrl: "/Pages/POSManager/POS/Reception/Views/Reception.html",
            controller: "receptionController"
        })
        .state("pos.transactionAndSales", {
            url: "/transactionAndSales",
            templateUrl: "/Pages/POSManager/POS/TransactionAndSales/Views/transactionAndSales.html",
            controller: "transactionAndSalesController"
        })
        .state("pos.receipts", {
            url: "/receipts",
            templateUrl: "/Pages/POSManager/POS/Receipts/Views/receipts.html",
            controller: "receiptsController"
        })
        .state("pos.receiptInfo", {
            url: "/receiptInfo",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Receipts/Views/receiptsInfo.html",
            controller: "receiptsInfoController"
        })
        .state("pos.receptionInfo", {
            url: "/receptionInfo",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Reception/Views/fuelReceptionInfo.html",
            controller: "fuelReceptionInfoController"
        })
        .state("pos.receptionHistory", {
            url: "/receptionHistory",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Reception/Views/receptionHistory.html",
            controller: "receptionHistoryController"
        })
        .state("pos.createReception", {
            url: "/createReception",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Reception/Views/fuelReceptionStartFilling.html",
            controller: "fuelReceptionStartFillingController"
        })
        .state("pos.receiptHistory", {
            url: "/receiptHistory",
            templateUrl: "/Pages/POSManager/POS/Receipts/Views/receiptsHistory.html",
            controller: "receiptsHistoryController"
        })
        .state("pos.generator", {
            url: "/generator",
            templateUrl: "/Pages/POSManager/POS/Generator/Views/generator.html",
            controller: "generatorController"
        })
        .state("pos.generatorHistory", {
            url: "/generatorHistory",
            templateUrl: "/Pages/POSManager/POS/Generator/Views/generatorHistory.html",
            controller: "generatorHistoryController"
        })
        .state("pos.generatorInvoices", {
            url: "/generatorInvoices",
            templateUrl: "/Pages/POSManager/POS/Generator/Views/generatorInvoices.html",
            controller: "generatorInvoicesController"
        })
        .state("pos.nuzzle", {
            url: "/nuzzle",
            templateUrl: "/Pages/POSManager/POS/Nuzzle/Views/nuzzle.html",
            controller: "nuzzleController"
        })
        .state("pos.eod", {
            url: "/eod",
            templateUrl: "/Pages/POSManager/POS/EOD/Views/eod.html",
            controller: "eodController"
        })
        .state("pos.eodForm", {
            url: "/eodForm",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/EOD/Views/eodForm.html",
            controller: "eodFormController"
        })
        .state("pos.shifts", {
            url: "/shifts",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Shifts/Views/shifts.html",
            controller: "shiftsController"
        })
        .state("pos.shiftHistory", {
            url: "/shiftHistory",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/Shifts/Views/shiftsHistory.html",
            controller: "shiftsHistoryController"
        })
        .state("pos.moneyDeliveryIndex", {
            url: "/moneyDeliveryIndex",
            templateUrl: "/Pages/POSManager/POS/MoneyDelivery/Views/moneyDeliveryIndex.html",
            controller: "moneyDeliveryIndexController"
        })
        .state("pos.moneyDeliveryForm", {
            url: "/moneyForm",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/MoneyDelivery/Views/moneyDeliveryForm.html",
            controller: "moneyDeliveryFormController"
        })
        .state("pos.moneyDeliveryHistory", {
            url: "/moneyHistory",
            params: {
                item: null
            },
            templateUrl: "/Pages/POSManager/POS/MoneyDelivery/Views/moneyDeliveryHistory.html",
            controller: "moneyDeliveryHistoryController"
        })
        .state("pos.moneyDeliveryView", {
            url: "/moneyView/{mdObjectId}",
            templateUrl: "/Pages/POSManager/POS/MoneyDelivery/Views/moneyDeliveryView.html",
            controller: "moneyDeliveryViewController"
        })
        .state("pos.invoice", {
            url: "/invoice",
            templateUrl: "/Pages/POSManager/POS/Invoice/Views/invoice.html",
            controller: "invoiceController"
        })
        .state("inventory", {
            url: "/inventory",
            templateUrl: "/Pages/POSManager/Inventory/Main/Views/mainInventory.html",
            controller: "mainInventoryController"
        })
}]);


rootModule.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


rootModule.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
            alert('offline');
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
            alert('online');
        });
    }, false);
});