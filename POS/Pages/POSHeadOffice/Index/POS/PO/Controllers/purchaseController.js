
rootHOModule.controller("purchaseController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", function ($scope, $state, $timeout, $uibModal, $http, $rootScope) {

    function rootFilter() {

        var itemSelector = ".item";
        var $checkboxes = $('.filter-item');
        var $container = $('#purchaseItems').isotope({ itemSelector: itemSelector, filter: '.example' });

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

    function getAllRefunds() {

        $rootScope.showLoader = true;
        $http({
            method: "POST",
            url: "/api/HOApi/getAllPOs",
            data: { sessionId: localStorage.getItem('session_id_ho') }
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.poList = result.resultData;

                        setTimeout(function () {
                            rootFilter();
                        }, 1);

                    } else {
                        swal("Oops", "Failed getting POs", "");
                    }

                } else {
                    swal("Oops", "Failed getting POs", "");
                }

            } else {
                swal("Oops", "Failed getting POs", "");
            }


        }, function (error) {
                swal("Oops", "Failed getting POs", "");
            $rootScope.showLoader = false;
        });

    };

    getAllRefunds();

    $scope.goCreateNewPurchasePage = function () {

        $timeout(function () {
            $state.go('HO_Index_POS.createpurchase');
        })

    };

    $scope.goToPurchaseInfo = function (payload) {

        $timeout(function () {
            $state.go('HO_Index_POS.purchaseinfo', {
                item: payload
            });
        })

    };

}]);


