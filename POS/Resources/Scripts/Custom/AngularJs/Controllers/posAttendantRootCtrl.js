


posAttendantRootModule.controller("posAttendantRootCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", "$location", function ($scope, $sce, $rootScope, $http, $translate, $location) {


    if (localStorage.getItem('language') === "ar") {
        $scope.selectedLanguage = "AR";
        $translate.use('ar');
        document.cookie = "languagePOS=ar";
    } else if (localStorage.getItem('language') === "en") {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languagePOS=en";
    } else {
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        document.cookie = "languagePOS=en";
    }


    $scope.goToArabicLayout = function (lang) {
        localStorage.setItem('language', 'ar');
        document.cookie = "languagePOS=ar";
        $scope.selectedLanguage = "AR";
        $translate.use('ar');
        window.location.href = "/Attendant/IndexAttendantAr#!/main2";
    }

    $scope.goToEnglishLayout = function (lang) {
        localStorage.setItem('language', 'en');
        document.cookie = "languagePOS=en";
        $scope.selectedLanguage = "EN";
        $translate.use('en');
        window.location.href = "/Attendant/IndexAttendantEn#!/main2";
    }

    $rootScope.dollarRate = 0;


    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.SignOut = function () {

        $http({
            method: "POST",
            url: "/api/Request/attendantSignOut"
        }).then(function (response) {

            localStorage.setItem('session_id', '');

            //$rootScope.transactionsList = [];
            //localStorage.setItem("transList", JSON.stringify($rootScope.transactionsList));
            //$rootScope.totalLabelDryAndWet = "hideTotalLabelDryAndWet";

            window.location.href = '/Attendant/LoginAttendantEn';

        }, function (error) {
            //swal("Oops", "Login Failed!", "error");
        });

    };

    $scope.lockScreen = function () {
        $rootScope.OpenEmployeeLoginPopup();

    };


}]);
