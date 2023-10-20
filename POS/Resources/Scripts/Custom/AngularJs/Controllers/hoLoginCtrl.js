


rootHOModule.controller("hoLoginCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", function ($scope, $sce, $rootScope, $http, $translate) {

    //if the language changed at level of login page
    //$scope.goToArabicLayout = function (lang) {
    //    localStorage.setItem('language', 'ar');
    //    window.location.href = "/Home/IndexAttendantAr#!/main2";
    //    $translate.use(lang);
    //}

    //$scope.goToEnglishLayout = function (lang) {
    //    localStorage.setItem('language', 'en');
    //    window.location.href = "/Home/IndexAttendantEn#!/main2";
    //    $translate.use(lang);
    //}

    //add here the default language
    localStorage.setItem('languageHO', 'en');
    $translate.use('en');


    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }


    $scope.loginBtn = function () {

        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/HOApi/LoginAsyncHO",
            data: { email: "admin@gsm.com", password: "odoo123" }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode && result.resultData.sessionId !== null) {

                    localStorage.setItem('session_id_ho', result.resultData.sessionId);
                    //localStorage.setItem('username', result.resultData.sessionId);
                    if (localStorage.getItem('languageHO') === 'en') {
                        window.location.href = "/HO/MainScreenHOEn";
                        $translate.use('en');
                    } else if (localStorage.getItem('languageHO') === 'ar') {
                        window.location.href = "/HO/MainScreenHOAr";
                        $translate.use('ar');
                    } else {
                        window.location.href = "/HO/MainScreenHOEn";
                        $translate.use('en');
                    }

                } else {
                    swal("Oops", "Login failed", "");
                }

            } else {
                swal("Oops", "Login failed", "");
            }

        }, function (error) {
            swal("Oops", "Login failed", "");
            $rootScope.showLoader = false;
        });

    };

}]);
