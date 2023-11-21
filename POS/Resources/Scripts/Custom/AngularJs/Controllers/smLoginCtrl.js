


rootModule.controller("smLoginCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", function ($scope, $sce, $rootScope, $http, $translate) {

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
    $translate.use('en');


    $rootScope.trustUrlSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };


    $scope.loginBtn = function (username, password) {


        if ((username === undefined || username === null || username === "") && (password === undefined || password === null || password === "")) {
            swal("Please fill the username and password fields", "", "warning");
            return;
        }


        if (username === undefined || username === null || username === "") {
            swal("Please fill the username field", "", "warning");
            return;
        }

        if (password === undefined || password === null || password === "") {
            swal("Please fill the password field", "", "warning");
            return;
        } else {

            //if (password.trim().length !== 6) {
            //    swal("Password should be just 6 digit", "", "warning");
            //    return;
            //}

        }

        $rootScope.showLoader = true;

        $http({
            method: "POST",
            url: "/api/SmApi/LoginAsyncSM",
            //data: { email: "admin@gsm.com", password: "odoo123" }
            data: { email: username, password: password }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                var result = JSON.parse(response.data);

                if (result.isSuccessStatusCode && result.resultData.sessionId !== null) {

                    localStorage.setItem('session_id_sm', result.resultData.sessionId);
                    //localStorage.setItem('username', result.resultData.sessionId);
                    if (localStorage.getItem('languageSM') === 'en') {
                        window.location.href = "/SM/IndexEn#!/pos";
                        $translate.use('en');
                        document.cookie = "languageSM=en";
                        localStorage.setItem("activeItemDash", "");
                    } else if (localStorage.getItem('languageSM') === 'ar') {
                        window.location.href = "/SM/IndexAr#!/pos";
                        $translate.use('ar');
                        document.cookie = "languageSM=ar";
                        localStorage.setItem("activeItemDash", "");
                    } else {
                        window.location.href = "/SM/IndexEn#!/pos";
                        localStorage.setItem("activeItemDash", "");
                        localStorage.setItem('language', 'en');
                        $translate.use('en');
                        document.cookie = "languageSM=en";
                    }

                } else {
                    localStorage.setItem('session_id_sm', '');
                    swal("Oops", "Login failed", "");
                }

            } else {
                localStorage.setItem('session_id_sm', '');
                swal("Oops", "Login failed", "");
            }

        }, function (error) {
                localStorage.setItem('session_id_sm', '');
            swal("Oops", "Login failed", "");
            $rootScope.showLoader = false;
        });

    };

}]);
