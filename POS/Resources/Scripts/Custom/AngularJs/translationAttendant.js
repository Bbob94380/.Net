
posAttendantRootModule.config(["$translateProvider", function ($translateProvider) {

    var en_translations = {
        "carwash": "Car Wash",
        "dryproduct": "Dry Product",
        "wetproduct": "Wet Product",
        "pay": "Pay",
        "oilChange": "Change Oil",
        "createreceipt": "Create Receipt",
        "openshift": "Open Shift",
        "closeshift": "Close Shift",
        "refund": "Refund",
        "fuel95": "Fuel 95",
        "fuel98": "Fuel 98",
        "reddiesel": "Red Diesel",
        "greendiesel": "Green Diesel",
        "itemid": "ITEM ID",
        "itemname": "ITEM NAME",
        "quantity": "QUANTITY",
        "discount": "DISCOUNT",
        "price": "PRICE",
        "total": "TOTAL",
    }

    var ar_translations = {
        "carwash": "غسيل السيارات",
        "dryproduct": "منتج جاف",
        "wetproduct": "منتج رطب",
        "pay": "ادفع",
        "oilChange": "تغيير الزيت",
        "createreceipt": "إنشاء إيصال",
        "openshift": "بدء الوردية",
        "closeshift": "اغلاق الوردية",
        "refund": "استرداد",
        "fuel95": "بنزين 95",
        "fuel98": "بنزين 98",
        "reddiesel": "مازوت أحمر",
        "greendiesel": "مازوت أخضر",
        "itemid": "معرف المنتج",
        "itemname": "اسم المنتج",
        "quantity": "الكمية",
        "discount": "حسم",
        "price": "سعر",
        "total": "المجموع",
    }


    $translateProvider.translations('en', en_translations);
    $translateProvider.translations('ar', ar_translations);

    $translateProvider.preferredLanguage('en');

}]);

