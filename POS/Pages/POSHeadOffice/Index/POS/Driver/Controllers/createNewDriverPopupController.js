

rootHOModule.controller('createNewDriverPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data) {


	$scope.getAllSuppliers = function () {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/GetAllSuppliersAsync",
			data: { sessionId: localStorage.getItem('session_id_ho') }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.suppliersList = result.resultData;


					} else {
						swal("Oops", "No suppliers found", "");
					}

				} else {
					swal("Oops", "No suppliers found", "");
				}

			} else {
				swal("Oops", "Failed getting suppliers", "");
			}


		}, function (error) {
			swal("Oops", "Failed getting suppliers", "");
			$rootScope.showLoader = false;
		});

	};

	$scope.getAllSuppliers();


	$scope.createDriver = function() {

		var driverObj = {
			creator: localStorage.getItem("employeeName"),
			name: $scope.driverName,
			supplierId: $scope.selectedSupplier.id,
			phoneNum: $scope.phoneNumber,
			drivingLisenceNum: $scope.licenseNumber,
			address: $scope.driverAddress
		}


		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/createDriverAsync",
			data: { sessionId: localStorage.getItem('session_id_ho'), createDriver: driverObj }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.$parent.getAllDrivers();
						$uibModalInstance.close();
						swal("Created successfully", "", "success");

					} else {
						swal("Oops", "Creation failed", "");
					}

				} else {
					swal("Oops", "Creation failed", "");
				}

			} else {
				swal("Oops", "Creation failed", "");
			}


		}, function (error) {
				swal("Oops", "Creation failed", "");
			$rootScope.showLoader = false;
		});

	};


});