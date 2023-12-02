


rootModule.controller('showDryDetailPopupController', function ($scope, $rootScope, $http, $filter, $uibModalInstance, data) {


	$scope.dry = data.transactionItem;
	

	console.log($scope.dry);



});