


posAttendantRootModule.controller("posAttendantRootCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", function ($scope, $sce, $rootScope, $http, $translate) {

    $scope.goToArabicLayout = function (lang) {
        localStorage.setItem('language', 'ar');
        window.location.href = "/Attendant/IndexAttendantAr#!/main2";
    }

    $scope.goToEnglishLayout = function (lang) {
        localStorage.setItem('language', 'en');
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
            window.location.href = '/Attendant/LoginAttendantEn';

        }, function (error) {
            //swal("Oops", "Login Failed!", "error");
        });

    };

    $scope.lockScreen = function () {
        $rootScope.OpenEmployeeLoginPopup();

    };


}]);
