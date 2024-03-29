﻿rootHOModule.controller("transactionController", ["$scope", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListServiceHO", function ($scope, $uibModal, $http, $rootScope, $filter, filterTableListServiceHO) {

	$scope.sortType = '-date';
	// the table will first be sorted by 'sortType' and then by 'secondSortType'
	// followed by 'thirdSortType'
	$scope.secondSortType = 'category';
	$scope.thirdSortType = 'currency';
	// set the default search/filter term
	$scope.filterTable = '';

	// get the people data
	$scope.peopleArray = peopleFactory();
	//console.log($scope.dataArray);

	// pagination settings
	$scope.currentPage = 1;
	// max size of the pagination bar
	$scope.maxPaginationSize = 5;
	$scope.itemsPerPage = 5;

	// update the beginning and end points for shown people
	// this will be called when the user changes page in the pagination bar
	$scope.updatePageIndexes = function () {
		$scope.firstIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
		$scope.lastIndex = $scope.currentPage * $scope.itemsPerPage;
	};
	$scope.updatePageIndexes();

	// return 1 if the element is filtered
	// used to hide elements that do not match the search filter
	$scope.filterSort = function (element) {
		if ($filter('filter')([element], $scope.filterTable).length > 0) {
			return 1;
		}
		return 2;
	};

	// string manipulation functions
	// primarily used for sorting the table
	function matchFirstChar(c, string) {
		return (string.charAt(0) === c);
	}

	function removeFirstChar(string) {
		return string.slice(1);
	}

	function removeDash(label) {
		if (matchFirstChar('-', label)) {
			return removeFirstChar(label);
		}
		return label;
	}
	function addDash(label) {
		if (!matchFirstChar('-', label)) {
			return '-' + label;
		}
		return label;
	}

	// formatting functions
	// for displaying table headers and tooltips
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function makeReadableLabel(label) {
		var formatted = label;
		switch (label) {
			case 'firstName':
				formatted = 'first name';
				break;
			case 'lastName':
				formatted = 'last name';
		}
		return formatted;
	}

	// sort functions
	// add or remove '-' to sort up or down
	$scope.sortReverse = function (set) {
		set = set || false;
		if (set || !matchFirstChar('-', $scope.sortType)) {
			$scope.sortType = addDash($scope.sortType);
		} else {
			$scope.sortType = removeDash($scope.sortType);
		}
	};

	// sort a column with a single data attribute
	$scope.singleSort = function (label) {
		if ($scope.sortType === label) {
			$scope.sortReverse();
		} else {
			$scope.sortType = label;
		}
	};

	// sort a column with two data attributes
	// example: first name and last name
	$scope.doubleSort = function (label1, label2) {
		if ($scope.sortType === ('-' + label1)) {
			$scope.sortType = label2;
		} else if ($scope.sortType === ('-' + label2)) {
			$scope.sortType = label1;
		} else if ($scope.sortType !== label1 && $scope.sortType !== label2) {
			$scope.sortType = label1;
		} else {
			$scope.sortReverse();
		}
	};

	// boolean functions for detecting how a column is sorted
	// used for the up and down carets next to each column header
	$scope.sortDescend = function (label1, label2) {
		label2 = label2 || '';
		return ($scope.sortType === label1 || $scope.sortType === label2);
	};

	$scope.sortAscend = function (label1, label2) {
		label2 = label2 || '';
		return ($scope.sortType === ('-' + label1) || $scope.sortType === ('-' + label2));
	};

	// show a tooltip displaying how a column is sorted
	$scope.sortTooltip = function (label1, label2) {
		label2 = label2 || '';

		var order = 'descending';
		if (matchFirstChar('-', $scope.sortType)) {
			order = 'ascending';
		}

		var baseSortType = removeDash($scope.sortType);
		if (label1 === baseSortType || label2 === baseSortType) {
			return capitalizeFirstLetter((makeReadableLabel(baseSortType)) + ' ' + order);
		}
		return 'Sort by ' + makeReadableLabel(label1) + ' or ' + makeReadableLabel(label2);
	};

	// data manipulation
	// functions for adding data attributes
	// we use these to add string attributes so that the user can filter the data more easily
	addFormattedDate = function (attributeToAdd, attributeToRead, dataArray) {
		var monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];
		var tempDate;
		for (var i = 0; i < dataArray.length; i++) {
			tempDate = new Date(dataArray[i][attributeToRead]);
			// will add string in the format 'September 29'
			dataArray[i][attributeToAdd] = monthNames[tempDate.getMonth()] + ' ' + tempDate.getDate() + ', ' + tempDate.getFullYear();
		}
	}

	addFormattedDate('formattedDate', 'date', $scope.peopleArray);


// returns an array of random people
// data generation is slow,
// this is what causes the delay when loading the page
// in reality, this factory would connect
// to a database and return that data
function peopleFactory() {

		// return random first name
		generateCategory = function () {
			var categories = ["Dry",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash",
				"Fuel",
				"Car wash", "Car wash"
			];
			return categories[Math.floor(Math.random() * categories.length)];
		};

		// return random last name
		generateAmount = function () {
			var amounts = ["2",
				"10",
				"15",
				"20",
				"50",
				"60",
				"670", "370", "390", "470", "570", "670", "770", "870", "970", "910", "770", "670", "170", "720"];
			return amounts[Math.floor(Math.random() * amounts.length)];
		};

		// randome date
		generateDate = function () {
			return new Date(Math.round(Math.random() * 100) + 1900,
				Math.round(Math.random() * 12),
				Math.round(Math.random() * 28));
		};

		// return random food
		generateWOP = function () {
			var wop = ["cash",
				"card",
				"bon", "cash",
				"card",
				"bon", "cash",
				"card",
				"bon", "cash",
				"card",
				"bon", "cash",
				"card",
				"bon", "cash",
				"card",
				"bon", "cash",
				"card"];
			return wop[Math.floor(Math.random() * wop.length)];
		};

		// return random food
		generateCurrency = function () {
			var currency = ["LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar", "LL",
				"dollar"];
			return currency[Math.floor(Math.random() * currency.length)];
		};


		// return random food
		generateTotal = function () {
			var total = ["50000",
				"10000",
				"20000", "30000", "40000", "50000",
				"40000", "50000", "40000", "50000", "40000", "50000", "40000", "50000", "40000", "50000", "40000", "50000",
				"40000", "50000"];
			return total[Math.floor(Math.random() * total.length)];
		};


		buildPerson = function () {
			return {
				category: generateCategory(),
				amount: generateAmount(),
				date: generateDate(),
				wop: generateWOP(),
				currency: generateCurrency(),
				total: generateTotal()
			};
		}

		createPeopleArray = function (num) {
			var peopleArray = [];
			for (var i = 0; i < num; i++) {
				peopleArray.push(buildPerson());
			}
			return peopleArray;
		}

		return createPeopleArray(20);

	}


	//Open transaction info popup
	$scope.openTransactionInfoPopup = function (transactionItem) {

		var modalInstance;

		if (transactionItem.category === "Fuel") {

			modalInstance = $uibModal.open({
				animate: true,
				templateUrl: '/Pages/POSManager/POS/Transaction/Views/fuelTransactionInfoPopup.html',
				controller: 'fuelTransactionInfoPopupController',
				scope: $scope,
				windowClass: 'show',
				resolve: {
					data: function () {
						return { transactionItem: transactionItem };
					}
				}
			});

			modalInstance.result.then(function (Result) {
				//when $uibModalInstance.close() fct executed


			}, function () {
				//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
			});

		} else if (transactionItem.category === "Dry") {

			modalInstance = $uibModal.open({
				animate: true,
				templateUrl: '/Pages/POSManager/POS/Transaction/Views/dryTransactionInfoPopup.html',
				controller: 'dryTransactionInfoPopupController',
				scope: $scope,
				windowClass: 'show',
				resolve: {
					data: function () {
						return { transactionItem: transactionItem };
					}
				}
			});

			modalInstance.result.then(function (Result) {
				//when $uibModalInstance.close() fct executed


			}, function () {
				//enter when modal dismissed (wehn $uibModalInstance.dismiss() is executed)
			});

		}
	};

}]);


