


rootHOModule.controller("rootHOCtrl", ["$scope", "$rootScope", "$http", "$translate", "$location", function ($scope, $rootScope, $http, $translate, $location) {

    $scope.notifications = [];


    if (localStorage.getItem('languageHO') === 'en') {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languageHO=en";
    } else if (localStorage.getItem('languageHO') === 'ar') {
        $scope.selectedLanguage = "AR";
        $translate.use('ar');
        document.cookie = "languageHO=ar";
    } else {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languageHO=en";
    }


    $scope.goToArabicLayout = function (lang) {
        localStorage.setItem('languageHO', 'ar');
        document.cookie = "languageHO=ar";
        $scope.selectedLanguage = "AR";
        $translate.use('ar');
        window.location.href = "/HO/IndexHOAr";
    }

    $scope.goToEnglishLayout = function (lang) {
        localStorage.setItem('languageHO', 'en');
        document.cookie = "languageHO=en";
        $scope.selectedLanguage = "EN";
        window.location.href = "/HO/IndexHOEn";
    }


    //$rootScope.dollarRate = 100000;
    $rootScope.dollarRate = localStorage.getItem('dollarRateHO');
    if ($rootScope.dollarRate === null || $rootScope.dollarRate === undefined || $rootScope.dollarRate === "") $rootScope.dollarRate = 0;


    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.SignOut = function () {

        $http({
            method: "POST",
            url: "/api/HOApi/SignOutHO"
        }).then(function (response) {

            localStorage.setItem('session_id_ho', '');
            window.location.href = '/HO/LoginHOEn';

        }, function (error) {
            //swal("Oops", "Login Failed!", "error");
        });

    };

    $('.navbarTopSM a').click(function (e) {
        e.preventDefault();
        $(".navbarTopSM a").removeClass('activeMenuItemSM');
        $(this).addClass('activeMenuItemSM');
    });

    var currentPageTemplate = $location.path();
    if (currentPageTemplate.includes("/HO_Index_Dashboard")) {
        $(".navDashItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate.includes("/HO_Index_POS")) {
        $(".navPOSItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate.includes("/HO_Index_Inventory")) {
        $(".navFMSItem").addClass('activeMenuItemSM');
    }

    if (localStorage.getItem("notificationsHO") !== null && localStorage.getItem("notificationsHO") !== undefined && localStorage.getItem("notificationsHO") !== "") {
        $scope.notifications = JSON.parse(localStorage.getItem("notificationsHO"));
    }


    var ws = new WebSocket("ws://localhost:8080/FPOS/sendingNotifications");

    ws.onopen = function () {
        console.log("connection established...");
    };


    ws.onmessage = function (evt) {
        var received_msg = evt.data;

        if (received_msg !== null && received_msg !== undefined) {
            var result = JSON.parse(received_msg);

            if (result.type === "CurrencyRatio") {

                $rootScope.$apply(function () {

                    var oldDollarRate = localStorage.getItem('dollarRateHO');
                    console.log(oldDollarRate);

                    if (oldDollarRate !== result.currencyRatio) {
                        $rootScope.dollarRate = result.currencyRatio;
                        localStorage.setItem('dollarRateHO', result.currencyRatio);

                        $scope.notifications.push({
                            title: "Dollar rate has changed",
                            image: "",
                            date: ""
                        });

                        localStorage.setItem("notificationsHO", JSON.stringify($scope.notifications));

                    }

                });

            }

        }
    };

    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };


}]);
