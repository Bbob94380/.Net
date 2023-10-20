rootHOModule.controller("menuController", ["$scope", "$uibModal", "$http", "$rootScope", function ($scope, $uibModal, $http, $rootScope) {

    $scope.menuItemClicked = function () {
        window.location.href = "/HO/IndexHOEn";
    }
 
}]);


