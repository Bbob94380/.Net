

rootHOModule.controller('createNewSupplierPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data) {


	$scope.createSupplier = function() {

		var supplierObj = {
			creator: localStorage.getItem("employeeName"),
			companyName: $scope.supplierName,
			address: $scope.supplierAddress,
			phoneNumber: $scope.phoneNumber,
			secondPhoneNumber: $scope.secondPhoneNumber,
			contactPerson: $scope.contactPerson,
			contactEmail: $scope.contactEmail,
			website: $scope.website,
			registrationNumber: $scope.registrationNumber
		}


		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/HOApi/createSupplierAsync",
			data: { sessionId: localStorage.getItem('session_id_ho'), createSupplier: supplierObj }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.$parent.getAllSuppliers();
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