
rootModule.config(["$translateProvider", function ($translateProvider) {

    var en_translations = {
        "receipts": "Receipts",
        "history": "History",
        "createnewreceipt": "Create New Receipt",
        "search": "Search",
    }

    var ar_translations = {
        "receipts": "إيصالات",
        "history": "سجل",
        "createnewreceipt": "إنشاء إيصال جديد",
        "search": "بحث",
    }


    $translateProvider.translations('en', en_translations);
    $translateProvider.translations('ar', ar_translations);

    $translateProvider.preferredLanguage('en');

}]);

