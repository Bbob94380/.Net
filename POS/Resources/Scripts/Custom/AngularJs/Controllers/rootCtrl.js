


rootModule.controller("rootCtrl", ["$scope", "$rootScope", "$http", "$translate", "$location", "$state", function ($scope, $rootScope, $http, $translate, $location, $state) {

    $scope.notifications = [];


    if (localStorage.getItem('languageSM') === 'en') {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languageSM=en";
    } else if (localStorage.getItem('languageSM') === 'ar') {
        $scope.selectedLanguage = "AR";
        $translate.use('ar');
        document.cookie = "languageSM=ar";
    } else {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languageSM=en";
    }


    $scope.goToArabicLayout = function (lang) {
        localStorage.setItem('languageSM', 'ar');
        document.cookie = "languageSM=ar";
        $translate.use('ar');
        $scope.selectedLanguage = "AR";
        window.location.href = "/SM/IndexAr";
        //window.location.href = "/SM/IndexAr#!/main2";
    }

    $scope.goToEnglishLayout = function (lang) {
        localStorage.setItem('languageSM', 'en');
        document.cookie = "languageSM=en";
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        window.location.href = "/SM/IndexEn";
    }



    //$rootScope.dollarRate = 100000;
    $rootScope.dollarRate = localStorage.getItem('dollarRateSM');
    if ($rootScope.dollarRate === null || $rootScope.dollarRate === undefined || $rootScope.dollarRate === "") $rootScope.dollarRate = 0;
    

    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.SignOut = function () {

        $http({
            method: "POST",
            url: "/api/SmApi/SignOutSM"
        }).then(function (response) {

            localStorage.setItem('session_id_sm', '');
            localStorage.setItem("activeItemDash", "");
            window.location.href = '/SM/LoginSMEn';

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
    console.log(currentPageTemplate);
    if (currentPageTemplate.includes("/dashboard")) {
        $(".navDashItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate.includes("/pos")) {
        $(".navPOSItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate.includes("/inventory")) {
        $(".navFMSItem").addClass('activeMenuItemSM');
    }


    if (localStorage.getItem("notifications") !== null && localStorage.getItem("notifications") !== undefined && localStorage.getItem("notifications") !== "") {
        $scope.notifications = JSON.parse(localStorage.getItem("notifications"));
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

                    var oldDollarRate = localStorage.getItem('dollarRateSM');
                    console.log(oldDollarRate);

                    if (oldDollarRate !== result.currencyRatio) {
                        $rootScope.dollarRate = result.currencyRatio;
                        localStorage.setItem('dollarRateSM', result.currencyRatio);

                        $scope.notifications.push({
                            title: "Dollar rate has changed",
                            image: "",
                            date: ""
                        });

                        localStorage.setItem("notifications", JSON.stringify($scope.notifications));

                    }

                });

            } else if (result.type === "StationDeliveryOrder") {


                $rootScope.$apply(function () {
                    console.log(result.stationDo);
                    result.stationDo.isDO = true;
                    result.stationDo.statusStyle = "reception-item-status";
                    var DOList = [];

                    if (localStorage.getItem("stationDOs") !== null && localStorage.getItem("stationDOs") !== undefined && localStorage.getItem("stationDOs") !== "") {
                        DOList = JSON.parse(localStorage.getItem("stationDOs"));
                    }
                    DOList.push(result.stationDo);
                    localStorage.setItem("stationDOs", JSON.stringify(DOList));

                    $scope.notifications.push({
                        title: "You have an delivery order",
                        image: "",
                        date: ""
                    });

                    localStorage.setItem("notifications", JSON.stringify($scope.notifications));

                    //$window.location.reload();
                    $state.reload();

                });
            }

        }
    };

    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };



    $scope.getCheckedInUsers = function () {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getCheckedInUsers",
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    //if (result.isSuccessStatusCode) {

                    //    $scope.employeesList = result.resultData;

                    //} else {
                    //    swal("Failed getting car was options", "Please try again", "error");
                    //    console.log(result.errorMsg);
                    //}

                    $scope.employeesList = [
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        },
                        {
                            employee: "admin@gsm.com"
                        }

                    ];

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

    $scope.getCheckedInUsers();

}]);
