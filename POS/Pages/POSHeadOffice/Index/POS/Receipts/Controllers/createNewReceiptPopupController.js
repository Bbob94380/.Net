
rootHOModule.directive('newreceiptTable', function ($timeout) {
	return {
		restrict: 'A',
		link: function () {
			$timeout(function () {
				$("#dataTableNewReceiptId").DataTable({
					"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
					pageLength: 5,
					"dom": "lrtip",
					pagingType: "full_numbers"
				});
			});
		}
	}
});

rootHOModule.controller('createNewReceiptPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data) {


	function getAllTransactions() {

		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/SmApi/getTransactionsWithoutReceiptWithinTwoDays",
			data: { sessionId: localStorage.getItem('session_id_ho') }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {


						var dt = $("#dataTableNewReceiptId").DataTable();
						dt.destroy();

						angular.element(document).ready(function () {
							dataTable = $('#dataTableNewReceiptId');
							$("#dataTableNewReceiptId").DataTable({
								"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
								pageLength: 5,
								"dom": "lrtip",
								pagingType: "full_numbers"
							});
						});


						$scope.transList = [];
						var isDollarPaid = false;
						var isLLPaid = false;
						var isCardPaid = false;
						var isCashPaid = false;

						if (result.resultData !== null && result.resultData !== undefined) {
							for (let j = 0; j < result.resultData.length; j++) {

								var trans = result.resultData[j];

								if (trans.firstCardTypeAmount !== 0 || trans.firstCardTypeAmount !== 0) {
									isCardPaid = true;

									if (trans.firstCardCurrency === "USD") {
										isDollarPaid = true;
									}

									if (trans.firstCardCurrency === "LBP") {
										isLLPaid = true;
									}
								}

								if (trans.secondCardTypeAmount !== 0 && trans.secondCardTypeAmount !== null) {
									isCardPaid = true;

									if (trans.secondCardCurrency === "USD") {
										isDollarPaid = true;
									}

									if (trans.secondCardCurrency === "LBP") {
										isLLPaid = true;
									}
								}

								if ((trans.cachAmountMc !== 0 && trans.cachAmountMc !== null) || (trans.cachAmountSc !== 0 && trans.cachAmountSc !== null)) {
									isCashPaid = true;

									if (trans.cachAmountMc !== 0) {
										isLLPaid = true;
									}

									if (trans.cachAmountSc !== 0) {
										isDollarPaid = true;
									}
								}


								if (isCardPaid && isCashPaid) {
									trans.wop = "Cash and card";
								} else if (isCardPaid) {
									trans.wop = "Card";
								} else if (isCashPaid) {
									trans.wop = "Cash";
								} else {
									trans.wop = "";
								}

								if (isDollarPaid && isLLPaid) {
									trans.currency = "Lebanese Lire and dollar";
								} else if (isDollarPaid) {
									trans.currency = "Dollar";
								} else if (isLLPaid) {
									trans.currency = "Lebanese Lire";
								} else {
									trans.currency = "";
								}
							}// end for loop

							$scope.transList = result.resultData;
						}

					} else {
						swal("Oops", "Failed getting refunds", "");
					}

				} else {
					swal("Oops", "No refunds found", "");
				}

			} else {
				swal("Oops", "Failed getting refunds", "");
			}


		}, function (error) {
			swal("Oops", "eee", "error");
			$rootScope.showLoader = false;
		});

	};

	getAllTransactions();

	


	$scope.listOfAddedTransToReceipt = [];
	var totalDollar = 0;
	var totalLebanese = 0;
	$scope.isHide = true;

	$scope.addTransToReceipt = function (item) {

		var isFind = false;

		for (let i = 0; i < $scope.listOfAddedTransToReceipt.length; i++) {
			if ($scope.listOfAddedTransToReceipt[i].id === item.id) {
				isFind = true;
			}
		}

		if (isFind) {
			sweetAlert("Transaction is already added", "", "warning");
		} else {
			$scope.listOfAddedTransToReceipt.push(item);

			$scope.totalReceipt = 0;
			totalDollar = 0;
			totalLebanese = 0;
			for (let i = 0; i < $scope.listOfAddedTransToReceipt.length; i++) {
				totalLebanese = totalLebanese + $scope.listOfAddedTransToReceipt[i].netTotalMc;
				totalDollar = totalDollar + $scope.listOfAddedTransToReceipt[i].netTotalSc;
			}
			$scope.totalReceipt = totalLebanese + " L.L/" + totalDollar + " $";

			$scope.isHide = false;	
		}

		
	}

	$scope.removeTransFromReceipt = function (itemId) {

		const indexOfObject = $scope.listOfAddedTransToReceipt.findIndex(object => {
			return object.id === itemId;
		});

		$scope.listOfAddedTransToReceipt.splice(indexOfObject, 1);

		$scope.totalReceipt = 0;
		totalDollar = 0;
		totalLebanese = 0;
		for (let i = 0; i < $scope.listOfAddedTransToReceipt.length; i++) {
			totalLebanese = totalLebanese + $scope.listOfAddedTransToReceipt[i].netTotalMc;
			totalDollar = totalDollar + $scope.listOfAddedTransToReceipt[i].netTotalSc;
		}
		$scope.totalReceipt = totalLebanese + " L.L/" + totalDollar + " $";

		if ($scope.listOfAddedTransToReceipt.length > 0) { $scope.isHide = false; }
		else { $scope.isHide = true; }
	}

	$scope.clearAll = function (itemId) {

		$scope.listOfAddedTransToReceipt= []

		$scope.totalReceipt = 0;
		$scope.isHide = true;
	}


	$scope.createReceipt = function() {

		var Ids = [];

		for (var i = 0; i < $scope.listOfAddedTransToReceipt.length; i++){

			Ids.push($scope.listOfAddedTransToReceipt[i].id);
		}



		$rootScope.showLoader = true;
		$http({
			method: "POST",
			url: "/api/SmApi/createRecipetForMoreThanTransaction",
			data: { sessionId: localStorage.getItem('session_id_ho'), transactionsIds: Ids }
		}).then(function (response) {

			console.log(response);
			$rootScope.showLoader = false;

			if (response !== null && response !== undefined) {

				if (response.data !== null && response.data !== undefined) {

					var result = JSON.parse(response.data);

					if (result.isSuccessStatusCode) {

						$scope.$parent.refreshReceiptsGrid();
						$uibModalInstance.close();
						swal("Created successfully", "", "success");


					} else {
						swal("Oops", "Creation process failed", "");
					}

				} else {
					swal("Oops", "Creation process failed", "");
				}

			} else {
				swal("Oops", "Creation process failed", "");
			}


		}, function (error) {
			swal("Oops", "eee", "error");
			$rootScope.showLoader = false;
		});

	};

	

});