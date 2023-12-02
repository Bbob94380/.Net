
rootModule.controller("receptionController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", function ($scope, $state, $timeout, $uibModal, $http, $rootScope) {

    $rootScope.receptionsList = [];
    $rootScope.stationDOsList = [];
    var DOList = [];
    $scope.showNoData = true;

    //localStorage.setItem("notifications", "");
    //localStorage.setItem("stationDOs", "");


    if (localStorage.getItem("stationDOs") !== null && localStorage.getItem("stationDOs") !== undefined && localStorage.getItem("stationDOs") !== "") DOList = JSON.parse(localStorage.getItem("stationDOs"));
    if (DOList !== null && DOList !== undefined && DOList !== "") $rootScope.stationDOsList = DOList;

    function rootFilter() {

        var itemSelector = ".item";
        var $checkboxes = $('.filter-item');
        var $container = $('#receptionItems').isotope({ itemSelector: itemSelector, filter: '.example' });

        //Ascending order
        var responsiveIsotope = [[480, 4], [720, 6]];
        var itemsPerPageDefault = 5;
        var itemsPerPage = defineItemsPerPage();
        var currentNumberPages = 1;
        var currentPage = 1;
        var currentFilter = '*';
        var filterAttribute = 'data-filter';
        var filterValue = "";
        var pageAttribute = 'data-page';
        var pagerClass = 'isotope-pager';

        // update items based on current filters    
        function changeFilter(selector) { $container.isotope({ filter: selector }); }

        //grab all checked filters and goto page on fresh isotope output
        function goToPage(n) {
            currentPage = n;
            var selector = itemSelector;
            var exclusives = [];
            // for each box checked, add its value and push to array
            $checkboxes.each(function (i, elem) {
                if (elem.checked) {
                    selector += (currentFilter != '*') ? '.' + elem.value : '';
                    exclusives.push(selector);
                }
            });
            // smash all values back together for 'and' filtering
            filterValue = exclusives.length ? exclusives.join('') : '*';

            // add page number to the string of filters
            var wordPage = currentPage.toString();
            filterValue += ('.' + wordPage);

            changeFilter(filterValue);
        }

        // determine page breaks based on window width and preset values
        function defineItemsPerPage() {
            var pages = itemsPerPageDefault;

            for (var i = 0; i < responsiveIsotope.length; i++) {
                if ($(window).width() <= responsiveIsotope[i][0]) {
                    pages = responsiveIsotope[i][1];
                    break;
                }
            }
            return pages;
        }

        function setPagination() {

            var SettingsPagesOnItems = function () {
                var itemsLength = $container.children(itemSelector).length;
                var pages = Math.ceil(itemsLength / itemsPerPage);
                var item = 1;
                var page = 1;
                var selector = itemSelector;
                var exclusives = [];


                // for each box checked, add its value and push to array
                $checkboxes.each(function (i, elem) {
                    if (elem.checked) {
                        selector += (currentFilter != '*') ? '.' + elem.value : '';
                        exclusives.push(selector);
                    }
                });
                // smash all values back together for 'and' filtering
                filterValue = exclusives.length ? exclusives.join('') : '*';
                // find each child element with current filter values
                $container.children(filterValue).each(function () {
                    // increment page if a new one is needed
                    if (item > itemsPerPage) {
                        page++;
                        item = 1;
                    }
                    // add page number to element as a class
                    wordPage = page.toString();

                    var classes = $(this).attr('class').split(' ');
                    var lastClass = classes[classes.length - 1];
                    // last class shorter than 4 will be a page number, if so, grab and replace
                    if (lastClass.length < 4) {
                        $(this).removeClass();
                        classes.pop();
                        classes.push(wordPage);
                        classes = classes.join(' ');
                        $(this).addClass(classes);
                    } else {
                        // if there was no page number, add it
                        $(this).addClass(wordPage);
                    }
                    item++;
                });
                currentNumberPages = page;
            }();

            // create page number navigation
            var CreatePagers = function () {

                var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);

                $isotopePager.html('');
                if (currentNumberPages > 1) {
                    for (var i = 0; i < currentNumberPages; i++) {
                        var $pager = $('<a href="javascript:void(0);" class="pager" ' + pageAttribute + '="' + (i + 1) + '"></a>');
                        $pager.html(i + 1);

                        $pager.click(function () {
                            var page = $(this).eq(0).attr(pageAttribute);
                            goToPage(page);
                        });
                        $pager.appendTo($isotopePager);
                    }
                }
                $container.after($isotopePager);
            }();
        }
        // remove checks from all boxes and refilter
        function clearAll() {
            $checkboxes.each(function (i, elem) {
                if (elem.checked) {
                    elem.checked = null;
                }
            });
            currentFilter = '*';
            setPagination();
            goToPage(1);
        }

        setPagination();
        goToPage(1);

        //event handlers
        $checkboxes.change(function () {

            if ($(this).is(':checked')) {
                $('.filter-item:checked').not($(this)).each(function () {
                    $(this).prop('checked', false);
                    $(this).trigger('change');
                });
            };

            var filter = $(this).attr(filterAttribute);
            currentFilter = filter;
            $("#clear-filters").css({ "backgroundColor": "#fff", "color": "black" });
            setPagination();
            goToPage(1);

            var counter = 0;

            for (var i = 0; i < $checkboxes.length; i++) {
                var box = $checkboxes[i];
                if (!box.checked) counter++;
            }

            if (counter === 2) {
                $("#clear-filters").css({ "backgroundColor": "#D80404", "color": "white" });
            }
        });

        $('#clear-filters').click(function () {
            clearAll();
            $("#clear-filters").css({ "backgroundColor": "#D80404", "color": "white" });
        });


        //$(window).resize(function () {
        //    itemsPerPage = defineItemsPerPage();
        //    setPagination();
        //    goToPage(1);
        //});

    }


    $scope.getAllWetProductTypes = function () {

        //$rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/Request/getAllWetProductTypes",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.wetProductsList = result.resultData;


                    } else {
                        //swal("Oops", "No drivers found", "");
                    }

                } else {
                    //swal("Oops", "No drivers found", "");
                }

            } else {
                //swal("Oops", "Failed getting drivers", "");
            }


        }, function (error) {
            //swal("Oops", "Failed getting drivers", "");
            //$rootScope.showLoader = false;
        });

    };

    $scope.getAllWetProductTypes();

    function getAllReception() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/SmApi/getAllReception",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        var list = result.resultData;

                        for (var i = 0; i < list.length; i++) {

                            var statusStyle = "";

                            if (list[i].status === "FILLING") statusStyle = "reception-item-status-filling";
                            if (list[i].status === "DELIVERED") statusStyle = "reception-item-status-delivered";

                            $rootScope.receptionsList.push({
                                hideFillingBtn: true,
                                statusStyle: statusStyle,
                                item: list[i],
                                id: list[i].id,
                                supplierName: list[i].supplierName,
                                driverName: list[i].driverName,
                                status: list[i].status,
                                fuelAmounts: list[i].receivedSubTanks,
                                creationDate: list[i].creationDate,
                                creator: list[i].creator,
                                deliveryDate: list[i].receptionDate,
                            });
                        }

                        for (var j = 0; j < $rootScope.receptionsList.length; j++) {

                            for (var z = 0; z < $rootScope.receptionsList[j].fuelAmounts.length; z++) {

                                for (var x = 0; x < $scope.wetProductsList.length; x++) {

                                    if ($rootScope.receptionsList[j].fuelAmounts[z].wetProductId === $scope.wetProductsList[x].id) {
                                        $rootScope.receptionsList[j].fuelAmounts[z].wetProductType = $scope.wetProductsList[x].name;
                                    }
                                }
                            }

                        }

                        $rootScope.receptionsList.push.apply($rootScope.receptionsList, $rootScope.stationDOsList);

                        if ($rootScope.receptionsList.length > 0) {
                            $scope.showNoData = false;
                        }

                        setTimeout(function () {
                            rootFilter();
                        }, 1);

                    } else {
                        //swal("Oops", "Failed getting receptions", 
                        $scope.showNoData = true;
                    }

                } else {
                    //swal("Oops", "Failed getting receptions", "");
                    $scope.showNoData = true;
                }

            } else {
                //swal("Oops", "Failed getting receptions", "");
                $scope.showNoData = true;
            }


        }, function (error) {
                //swal("Oops", "Failed getting receptions", 
                $rootScope.showLoader = false;
                $scope.showNoData = true;
        });

    };

    getAllReception();

    $scope.goToReceptionPage = function (reception) {

        if (reception.hideFillingBtn !== true) {

            $timeout(function () {
                $state.go('pos.createReception', {
                    item: reception
                });
            })

        } else {

            $timeout(function () {
                $state.go('pos.receptionInfo', {
                    item: reception.item
                });
            })
        }
    };


    $scope.goToHistoryPage = function () {

        $timeout(function () {
            $state.go('pos.receptionHistory', {
                item: null
            });
        })

    };


}]);


