posAttendantRootModule.controller("wetMenuController", ["$scope", "$uibModal", "$http", "$rootScope", function ($scope, $uibModal, $http, $rootScope) {

	$rootScope.dryItemsList = [];


    function getWetProductTypes() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getAllWetProductTypes",
            data: { sessionId: localStorage.getItem('session_id') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.wetProductTypes = result.resultData;

                        for (var i = 0; $scope.wetProductTypes.length; i++) {

                            if (localStorage.getItem('language') === 'en') {

                                if ($scope.wetProductTypes[i].type === "BENZENE95") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "BENZENE98") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "DIESEL1") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "DIESEL2") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "GAZ12") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "GAZ10") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;
                                if ($scope.wetProductTypes[i].type === "GAZ_EMPTY") $scope.wetProductTypes[i].nameLang = $scope.wetProductTypes[i].name;

                            } else if (localStorage.getItem('language') === 'ar') {

                                if ($scope.wetProductTypes[i].type === "BENZENE95") $scope.wetProductTypes[i].nameLang = "بنزين 95";
                                if ($scope.wetProductTypes[i].type === "BENZENE98") $scope.wetProductTypes[i].nameLang = "بنزين 98";
                                if ($scope.wetProductTypes[i].type === "DIESEL1") $scope.wetProductTypes[i].nameLang = "ديزل أخضر";
                                if ($scope.wetProductTypes[i].type === "DIESEL2") $scope.wetProductTypes[i].nameLang = "ديزل أحمر";
                                if ($scope.wetProductTypes[i].type === "GAZ12") $scope.wetProductTypes[i].nameLang = "غاز 12 كلغ";
                                if ($scope.wetProductTypes[i].type === "GAZ10") $scope.wetProductTypes[i].nameLang = "غاز 10 كلغ";
                                if ($scope.wetProductTypes[i].type === "GAZ_EMPTY") $scope.wetProductTypes[i].nameLang = "غاز";
                            }
                        }

                    } else {
                        $rootScope.showLoader = false;
                        swal("Failed getting wet product types", "Please try again", "error");
                        console.log(result.errorMsg);
                    }

                } else {
                    $rootScope.showLoader = false;
                    swal("Failed getting wet product types", "Please try again", "error");
                }

            } else {
                $rootScope.showLoader = false;

                swal("Failed getting wet product types", "Please try again", "error");
            }


        }, function (error) {
                swal("Failed getting wet product types", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    getWetProductTypes();


    $scope.displayWetTransactionPopup = function (wetName, wetId, priceMc, priceSc, type) {

		var modalInstance;

		modalInstance = $uibModal.open({
			animate: true,
			templateUrl: '/Pages/POSAttendant/Fuel/Views/wetTransactionPopup.html',
			controller: 'wetTransactionPopupController',
			scope: $scope,
			windowClass: 'show',
			resolve: {
				data: function () {
                    return { wetId: wetId, wetName: wetName, priceMc: priceMc, priceSc: priceSc, type: type };
				}
			}
		});

		modalInstance.result.then(function (Result) {
			//when $uibModalInstance.close() fct executed


		}, function () {
			//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
		});

		modalInstance.opened.then(function () {
			//alert('hi');
		});


	};

	

}]);


