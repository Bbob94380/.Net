rootHOModule.controller("poHistoryController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$filter", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $filter) {

	$("#CustomSearchTextField").on('keyup', function () {
		$('#dataTableId').dataTable().fnFilter(this.value);
	});

	let minDate, maxDate;

	// Custom filtering function which will search data in column four between two values
	DataTable.ext.search.push(function (settings, data, dataIndex) {
		let min = minDate.val();
		let max = maxDate.val();
		let date = new Date(data[3]);

		if (
			(min === null && max === null) ||
			(min === null && date <= max) ||
			(min <= date && max === null) ||
			(min <= date && date <= max)
		) {
			return true;
		}
		return false;
	});

	// Create date inputs
	minDate = new DateTime('#min', {
		format: 'MMMM Do YYYY'
	});
	maxDate = new DateTime('#max', {
		format: 'MMMM Do YYYY'
	});


	// Refilter the table
	document.querySelectorAll('#min, #max').forEach((el) => {
		el.addEventListener('change', () => $('#dataTableId').dataTable().fnFilter(this.value));
	});

	$scope.ReceiptsList =
		[
			{
				id: '1',
				category: 'Dry',
				nbOfTrans: 890,
				date: '1/4/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '2',
				category: 'Fuel',
				nbOfTrans: 0,
				date: '1/5/2023',
				wop: 'card',
				currency: "Lebanese",
				total: "55400"
			},
			{
				id: '3',
				category: 'Dry',
				nbOfTrans: 777667,
				date: '1/14/2023',
				wop: 'cash',
				currency: "dollar",
				total: "545"
			},
			{
				id: '4',
				category: 'Dry',
				nbOfTrans: 666,
				date: '1/12/2023',
				wop: 'cash',
				currency: "Lebanese",
				total: "6546"
			},
			{
				id: '5',
				category: 'Car wash',
				nbOfTrans: 777,
				date: '1/17/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '6',
				category: 'Car wash',
				nbOfTrans: 222,
				date: '1/19/2023',
				wop: 'cash',
				currency: "Lebanese",
				total: "20000"
			},
			{
				id: '7',
				category: 'Fuel',
				nbOfTrans: 888,
				date: '1/21/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '8',
				category: 'Fuel',
				nbOfTrans: 32432,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '9',
				category: 'Fuel',
				nbOfTrans: 3213,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '10',
				category: 'Fuel',
				nbOfTrans: 432432,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '11',
				category: 'Fuel',
				nbOfTrans: 96796,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '12',
				category: 'Fuel',
				nbOfTrans: 757867,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			},
			{
				id: '13',
				category: 'Fuel',
				nbOfTrans: 8678,
				date: '1/27/2023',
				wop: 'cash',
				currency: "dollar",
				total: "20000"
			}

		];

}]);


