﻿
posAttendantRootModule.config(["$translateProvider", function ($translateProvider) {

    var en_translations = {
        "carwash": "Car Wash",
        "carwashTrans": " Car wash",
        "dryproduct": "Dry Product",
        "wetproduct": "Wet Product",
        "pay": "Pay",
        "oilChange": "Services",
        "createreceipt": "Create Receipt",
        "openshift": "Start a New Shift",
        "closeshift": "End Shift",
        "refund": "Refund",
        "fuel95": "Fuel 95",
        "fuel98": "Fuel 98",
        "reddiesel": "Red Diesel",
        "greendiesel": "Green Diesel",
        "car": "Car",
        "range": "Range",
        "bus": "Bus",
        "truck": "Truck",
        "motorcycle": "Motorcycle",
        "other": "Other",
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
        "Litre": " L",
        "All": "All",
        "totalInLL": "Total in Lebanese Lira",
        "totalInDollar": "Total in Dollar",
        "carType": "Car Type",
        "carWashOption": "Car Wash Option",
        "done": "DONE",
        "add": "Add",
        "clear": "CLEAR",
        "barcode": "Barcode",
        "quantity2": "Quantity",
        "transId2": "Transaction ID",
        "employeeName": "Employee Name",
        "employeeId": "Employee ID",
        "creationDate": "Creation Date",
        "creationTime": "Creation Time",
        "transactions": "TRANSACTIONS",
        "firstWayOfPayment": "First way of payment",
        "secondWayOfPayment": "Second way of payment",
        "paymentType": "Payment Type",
        "dollarUsd": "Dollar USD",
        "LebaneseLL": "Lebanese L.L",
        "dollar": "Dollar",
        "code": "Code",
        "createReceiptAndPrint": "CREATE RECEIPT & PRINT",
        "coupon": "COUPON",
        "cancel": "CANCEL",
        "deleteAll": "Delete All",
        "delete": "delete",
        "customerName": "Customer Name",
        "firstName": "First Name",
        "middleName": "Middle Name",
        "lastName": "Last Name",
        "address": "Address",
        "phone": "Phone Number",
        "amanaMember": "Amana Member",
        "customerCar": "Customer Car",
        "carPlate": "Car Plate",
        "plateNumber": "Plate Number",
        "oldKM": "Old KM",
        "newKM": "New KM",
        "currentDate": "Current Date",
        "dueDate": "Due Date",
        "createNewCustomer": "Create new customer",
        "oilSection": "OIL SECTION",
        "oilServices": "OIL SERVICES",
        "itemId": "ITEM ID",
        "itemName": "ITEM NAME",
        "UsedInService": "UsedInService",
        "customerSection": "CUSTOMER SECTION",
        "dollarRate": "Dollar Rate",
        "stationManager": "Station Manager",
        "nozzleNumber": "Nozzle Number",
        "fuelType": "Fuel Type",
        "nuzzleCounter": "Nuzzle-Counter",
        "problemInCounter": "PROBLEM IN COUNTERS",
        "openShift": "OPEN SHIFT",
        "save": "SAVE",
        "oldNuzzleCounter": "Old Nuzzle-Counter",
        "newNuzzleCounter": "New Nuzzle-Counter",
        "getSalesSummary": "Get Sales Summary",
        "type": "Type",
        "LITERS": "LITERS",
        "numberOfCars": "NUMBER OF CARS",
        "numberOfItems": "NUMBER OF ITEMS",
        "numberOfServices": "NUMBER OF SERVICES",
        "usdClass": "USD CLASS",
        "lbpClass": "LBP CLASS",
        "postPaid": "Post Paid",
        "COUNT": "COUNT",
        "Refunds": "Refunds",
        "Calibration": "Calibration",
        "Sessions": "Sessions",
        "session": "session",
        "startCounter": "Start Counter",
        "closeCounter": "Close Counter",
        "usdOverall": "USD Overall",
        "lbpOverall": "LBP Overall",
        "closeShift": "CLOSE SHIFT",
        "logOut": "Log out",
        "lockScreen": "Lock Screen",
        "signInAccount": "Sign In to Your Account",
        "login": "Login",
        "usernameOrEmail": "Username or Email",
        "password": "Password",
        "useCode": "Please use your code",
        "code2": "code",
        "dollarChanged": "Dollar Rate is Changed",
        "closeSession": "CLOSE SESSION",
        "systemBlocked": "Close the session to continue",
        "previousDollarRate": "Previous Dollar Rate",
        "totalLiterAmount": "Total Liter Amount",
        "PriceinDollar": "Price in Dollar",
        "priceInLebanese": "Price in Lebanese",
        "currencyType": "Currency Type",
        "VALIDATED": "VALIDATED BY THE STATION MANAGER",
        "items": " item(s)",
        "service(s)": " service(s)",
        "carWashOptionNotFound": "Please add at least one car wash option",
        "fillAllRequiredFields": "Please fill all required fields",
        "fillBarcodeField": "Please fill the barcode field",
        "fillQuantityField": "Please fill the quantity field",

    }

    var ar_translations = {
        "carwash": "غسيل السيارات",
        "carwashTrans": " غسيل",
        "dryproduct": "منتج جاف",
        "wetproduct": "منتج رطب",
        "pay": "ادفع",
        "oilChange": "الخدمات",
        "createreceipt": "إنشاء إيصال",
        "openshift": "بدء دوام جديد",
        "closeshift": "إنهاء الدوام",
        "refund": "ارداد المال",
        "fuel95": "بنزين 95",
        "fuel98": "بنزين 98",
        "reddiesel": "مازوت أحمر",
        "greendiesel": "مازوت أخضر",
        "car": "سيارة",
        "range": "رنج",
        "bus": "باص",
        "truck": "شاحنة",
        "motorcycle": "موتوسيكل",
        "other": "نوع آخر",
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
        "transId": "رمز التعريف",
        "totalAll": "المجموع الكلي",
        "LL": "ل.ل",
        "$": "$",
        "Litre": " ليتر",
        "All": "الكل",
        "totalInLL": "المجموع(ل.ل)",
        "totalInDollar": "المجموع($)",
        "carType": "نوع المركبة",
        "carWashOption": "خيار غسيل المركبة",
        "done": "تم",
        "add": "إضافة",
        "clear": "مسح",
        "barcode": "باركود",
        "transId2": "رقم تعريف الاتصال",
        "quantity2": "الكمية",
        "employeeName": "اسم الموظف",
        "employeeId": "رمز تعريف الموظف",
        "creationDate": "تاريخ الإنشاء",
        "creationTime": "وقت الإنشاء",
        "transactions": "العمليات",
        "firstWayOfPayment": "طريقة الدفع الأولى",
        "secondWayOfPayment": "طريقة الدفع الثانية",
        "paymentType": "نوع الدفع",
        "dollarUsd": "بالدولار الأمريكي",
        "LebaneseLL": "بالليرة اللبنانية",
        "dollar": "دولار",
        "code": "الكود",
        "createReceiptAndPrint": "طباعة الايصال",
        "coupon": "قسيمة",
        "cancel": "أغلق",
        "deleteAll": "مسح الكل",
        "delete": "مسح ",
        "customerName": "اسم العميل",
        "firstName": "الاسم",
        "middleName": "اسم الأب",
        "lastName": "اسم العائلة",
        "address": "العنوان",
        "phone": "رقم الموبايل",
        "amanaMember": "عضو الأمانة",
        "customerCar": "نوع السيارة",
        "carPlate": "لوحة السيارة",
        "plateNumber": "رقم لوحة السيارة",
        "oldKM": "العداد القديم(كم)",
        "newKM": "العداد الجديد (كم)",
        "currentDate": "التاريخ الحالي",
        "dueDate": "تاريخ الاستحقاق",
        "createNewCustomer": "إنشاء عميل جديد",
        "oilSection": "قسم الزيت",
        "itemId": "رقم التعريف",
        "itemName": "السلعة",
        "UsedInService": "مستعملة في الخدمة",
        "customerSection": "قسم العميل",
        "dollarRate": "سعر الصرف",
        "stationManager": "مدير المحطة",
        "nozzleNumber": "رقم المضخة",
        "fuelType": "نوع الوقود",
        "nuzzleCounter": "عداد المزود",
        "problemInCounter": "يوجد مشكلة في العدادت",
        "openShift": "بدء الوردية",
        "save": "حفظ",
        "oldNuzzleCounter": "العداد القديم",
        "newNuzzleCounter": "العداد الجديد",
        "getSalesSummary": "ملخص المبيعات",
        "type": "نوع",
        "oilServices": "خدمات الزيت",
        "LITERS": "ليتر",
        "numberOfCars": "عدد المركبات",
        "numberOfItems": "عدد السلع",
        "numberOfServices": "عدد الخدمات",
        "usdClass": "فئات الدولار الأمريكي",
        "lbpClass": "فئات الليرة اللبنانية",
        "postPaid": "المدفوعات الآجلة",
        "COUNT": "العدد",
        "Refunds": "المبالغ المستردة",
        "Calibration": "معايرة",
        "Sessions": "الجلسات",
        "startCounter": "بدء العداد",
        "closeCounter": "إغلاق العداد",
        "usdOverall": "بالدولار الامريكي",
        "lbpOverall": "بالليرة اللبنانية",
        "closeShift": "إغلاق الوردية",
        "logOut": "تسجيل خروج",
        "lockScreen": "اقفل الشاشة",
        "signInAccount": "سجل الدخول إلى حسابك",
        "login": "سجل الدخول",
        "usernameOrEmail": "اسم المستخدم أو البريد الالكتروني",
        "password": "كلمة المرور",
        "useCode": "أدخل الرمز السري",
        "code2": "الرمز",
        "dollarChanged": "لقد تغير سعر صرف الدولار",
        "closeSession": "أغلق الفترة",
        "systemBlocked": "أغلق الفترة للاستمرار",
        "previousDollarRate": "سعر صرف الدولار السابق",
        "totalLiterAmount": "كمية الليتر الاجمالي",
        "PriceinDollar": "السعر بالدولار",
        "priceInLebanese": "السعر باللبناني",
        "currencyType": "العملة",
        "VALIDATED": "موافق عليها من قبل مدير المحطة",
        "items": " منتج",
        "service(s)": " خدمة",
        "carWashOptionNotFound": "يُرجى اختيار نوع الغسيل",
        "fillAllRequiredFields": "يرجى ملء كافة الحقول الالزامية",
        "fillBarcodeField": "يُرجى ملء حقل الباركود",
        "fillQuantityField": "يُرجى ملء حقل الكمية",
    }


    $translateProvider.translations('en', en_translations);
    $translateProvider.translations('ar', ar_translations);

    $translateProvider.preferredLanguage('en');

}]);

