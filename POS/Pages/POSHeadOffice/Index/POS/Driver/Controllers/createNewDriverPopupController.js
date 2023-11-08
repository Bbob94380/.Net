

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

	$scope.imagesList = [];

	$scope.uploadFile = function (files, index) {

		var base64 = getBase64(files[0], index);
		console.log(base64);
	};


	function getBase64(file, index) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {

			base64String = reader.result.replace("data:", "")
				.replace(/^.+,/, "");

			var imgObj = {
				fileName: file.name,
				size: file.size,
				contentType: file.type,
				base64encoded: base64String
			}

			$scope.imagesList[index] = imgObj;

			console.log($scope.imagesList);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}


	$scope.createDriver = function() {


		if ($scope.driverName === null || $scope.driverName === undefined || $scope.driverName === "" ||
			$scope.selectedSupplier === null || $scope.selectedSupplier === undefined || $scope.selectedSupplier === "" ||
			$scope.phoneNumber === null || $scope.phoneNumber === undefined || $scope.phoneNumber === "" ||
			$scope.licenseNumber === null || $scope.licenseNumber === undefined || $scope.licenseNumber === "" ||
			$scope.driverAddress === null || $scope.driverAddress === undefined || $scope.driverAddress === "") {

			swal("Please fill all fields", "", "warning");
			return;
		}


		if ($scope.imagesList.length <=0) {

			swal("Please fill add at least one image", "", "warning");
			return;
		}


		var driverObj = {
			creator: localStorage.getItem("employeeName"),
			name: $scope.driverName,
			supplierId: $scope.selectedSupplier.id,
			phoneNum: $scope.phoneNumber,
			drivingLisenceNum: $scope.licenseNumber,
			address: $scope.driverAddress,
			driverFiles: $scope.imagesList
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