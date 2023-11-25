

var posAttendantRootModule = angular.module("posAttendantRootModule", ["ui.bootstrap", "ui.router","pascalprecht.translate"]);

posAttendantRootModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main2');

    $stateProvider
        .state("main2", {
            url: "/main2",
            templateUrl: "/Pages/POSAttendant/Main/Views/main2.html",
            controller: "main2Controller"
        })
        .state("main2.wetMenu", {
            url: "/wetMenu",
            templateUrl: "/Pages/POSAttendant/Fuel/Views/wetMenu.html",
            controller: "wetMenuController",
        })
        .state("main2.dryMenu", {
            url: "/dryMenu",
            templateUrl: "/Pages/POSAttendant/Dry/Views/dryMenu.html",
            controller: "dryMenuController",
        })
        .state("main2.carWashMenu", {
            url: "/carWashMenu",
            templateUrl: "/Pages/POSAttendant/CarWash/Views/carWashMenu.html",
            controller: "carWashMenuController",
        })
        .state("main2.all", {
            url: "",
            templateUrl: "/Pages/POSAttendant/CarWash/Views/carWashMenu.html",
            controller: "carWashMenuController",
        })
}]);


posAttendantRootModule.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);





posAttendantRootModule.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;

    if ($rootScope.online) {
        $rootScope.image_wifi = "wifi_online.png";

    } else {
        $rootScope.image_wifi = "wifi_offline.png";
    }

    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
            //alert('offline');

            $rootScope.image_wifi = "wifi_offline.png";

            Toastify({

                text: "You're offline",

                duration: 3000,

                style: {
                    background: "linear-gradient(to right, #eb8686, #D80404)",
                },
            }).showToast();
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
            //alert('online');

            $rootScope.image_wifi = "wifi_online.png";

            Toastify({

                text: "You're online now",

                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },

            }).showToast();

        });
    }, false);
});


