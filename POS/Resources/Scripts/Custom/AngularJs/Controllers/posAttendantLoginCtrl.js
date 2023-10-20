


posAttendantRootModule.controller("posAttendantLoginCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", function ($scope, $sce, $rootScope, $http, $translate) {

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
    localStorage.setItem('language', 'en');
    $translate.use('en');


    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }


    $scope.loginBtn = function () {

        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/Request/LoginAsync",
            data: { email: "admin@gsm.com", password: "odoo123" }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode && result.resultData.sessionId !== null) {

                    localStorage.setItem('session_id', result.resultData.sessionId);
                    localStorage.setItem('isEmployeeLoggedIn', "true");
                    //localStorage.setItem('username', result.resultData.sessionId);
                    if (localStorage.getItem('language') === 'en') {
                        window.location.href = "/Attendant/IndexAttendantEn#!/main2";
                        $translate.use('en');
                    } else if (localStorage.getItem('language') === 'ar') {
                        window.location.href = "/Attendant/IndexAttendantAr#!/main2";
                        $translate.use('ar');
                    } else {
                        window.location.href = "/Attendant/IndexAttendantEn#!/main2";
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
