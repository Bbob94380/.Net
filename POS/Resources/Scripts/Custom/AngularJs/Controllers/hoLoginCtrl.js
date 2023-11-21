


rootHOModule.controller("hoLoginCtrl", ["$scope", "$sce", "$rootScope", "$http", "$translate", function ($scope, $sce, $rootScope, $http, $translate) {


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
                        document.cookie = "languageHO=en";
                    } else if (localStorage.getItem('languageHO') === 'ar') {
                        window.location.href = "/HO/MainScreenHOAr";
                        $translate.use('ar');
                        document.cookie = "languageHO=ar";
                    } else {
                        window.location.href = "/HO/MainScreenHOEn";
                        $translate.use('en');
                        document.cookie = "languageHO=en";
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
