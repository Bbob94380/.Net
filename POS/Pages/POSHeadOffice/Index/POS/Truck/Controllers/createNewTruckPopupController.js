

rootHOModule.controller('createNewTruckPopupController', function ($scope, $rootScope, $stateParams, $http, $filter, $uibModalInstance, data) {

	$scope.supplierParam = data.supplier;

	$scope.disableSupplier = false;


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

	if ($scope.supplierParam === "" || $scope.supplierParam === undefined) {
		$scope.getAllSuppliers();
		$scope.disableSupplier = false;
	} else {
		$scope.selectedSupplier = $scope.supplierParam;
		$scope.disableSupplier = true;
	}

	$scope.subtanks = [{ "subTankNum": "", "subTankSize": "", "subTankUpSize": "", "subTankDownSize": ""}];

	$scope.index = $scope.subtanks.length;

	$scope.addNewChoice = function () {
		var newItemNo = ++$scope.index;
		$scope.subtanks.push({ "subTankNum": "", "subTankSize": "", "subTankUpSize": "", "subTankDownSize": "" });
	};

	$scope.removeChoice = function (id) {

		var index = -1;
		var comArr = eval($scope.subtanks);
		for (var i = 0; i < comArr.length; i++) {
			if (comArr[i].id === id) {
				index = i;
				break;
			}
		}
		$scope.subtanks.splice(index, 1);
	};

	$scope.createTruck = function() {

		var truckObj = {
			creator: localStorage.getItem("employeeName"),
			supplierId: $scope.selectedSupplier.id,
			plateNumber: $scope.plateNumber,
			transportPartyNumber: $scope.transportNumber,
			engineNumber: $scope.engineNumber,
			cheseNumber: $scope.cheseNumber,
			height: $scope.height,
			width: $scope.width,
			depth: $scope.depth,
			subTanks: $scope.subtanks
		}


		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/createTruckAsync",
			data: { sessionId: localStorage.getItem('session_id_ho'), createTruck: truckObj }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.$parent.getAllTrucks();
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