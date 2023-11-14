
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
        "total2": "Total",
        "editBtn": "Edit",
        "search": "Search",
        "product": "Product",
        "qty": "Quantity",
        "priceLL": "Price(LL)",
        "priceDollar": "Price($)",
        "amount": "AMOUNT",
        "transId": "TRANS.ID",
        "totalAll": "TOTAL",
        "LL": "L.L",
        "$": "$",
        "Litre": "L",
        "All": "All",
        "totalInLL": "Total in Lebanese Lira",
        "totalInDollar": "Total in Dollar",
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
        "total2": "المجموع",
        "editBtn": "تعديل",
        "search": "بحث",
        "product": "المنتج",
        "qty": "الكمية",
        "priceLL": "السعر(ل.ل)",
        "priceDollar": "السعر($)",
        "amount": "الكمية",
        "transId": "رقم العملية",
        "totalAll": "المجموع الكلي",
        "LL": "ل.ل",
        "$": "$",
        "Litre": "ليتر",
        "All": "الكل",
        "totalInLL": "المجموع(ل.ل)",
        "totalInDollar": "المجموع($)",
    }


    $translateProvider.translations('en', en_translations);
    $translateProvider.translations('ar', ar_translations);

    $translateProvider.preferredLanguage('en');

}]);

