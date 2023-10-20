


rootHOModule.controller("rootHOCtrl", ["$scope", "$rootScope", "$http", "$translate", "$location", function ($scope, $rootScope, $http, $translate, $location) {

    $scope.goToArabicLayout = function (lang) {
        localStorage.setItem('languageHO', 'ar');
        $scope.addActiveWord = 'flag-icon-de';
        window.location.href = "/HO/IndexHOAr";
        //window.location.href = "/SM/IndexAr#!/main2";
    }

    $scope.goToEnglishLayout = function (lang) {
        localStorage.setItem('languageHO', 'en');
        $scope.addActiveWord = 'flag-icon-us';
        window.location.href = "/HO/IndexHOEn";
    }


    if (localStorage.getItem('languageHO') === 'en') {
        $translate.use('en');
        $scope.addActiveWord = 'flag-icon-us';
    } else if (localStorage.getItem('languageHO') === 'ar') {
        $translate.use('ar');
        $scope.addActiveWord = 'flag-icon-de';
    } else {
        $translate.use('en');
        $scope.addActiveWord = 'flag-icon-us';
    }

    $rootScope.dollarRate = 100000;


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
    if (currentPageTemplate === "/dashboard") {
        $(".navDashItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate === "/pos") {
        $(".navPOSItem").addClass('activeMenuItemSM');
    } else if (currentPageTemplate === "/inventory") {
        $(".navFMSItem").addClass('activeMenuItemSM');
    }


}]);
