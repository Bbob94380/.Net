﻿
rootModule.controller("nuzzleController", ["$scope", "$state", "$timeout", "$uibModal", "$http", "$rootScope", "$q", function ($scope, $state, $timeout, $uibModal, $http, $rootScope, $q) {


    var promise1;
    var promise2;
    $scope.employeesList = [];
    $scope.employeeNuzzlesList = [];
    $scope.availableNuzzlesList = [];

    function rootFilter() {

        var itemSelector = ".item";
        var $checkboxes = $('.filter-item');
        var $container = $('#empProducts').isotope({ itemSelector: itemSelector, filter: '.example' });

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
        links = document.querySelectorAll(".pager")
        links.forEach(function (item) {
            item.addEventListener('click', function () {
                //reset the color of other links
                links.forEach(function (item) {
                    item.style.backgroundColor = '#fff'
                    item.style.color = '#000'
                })
                // apply the style to the link
                this.style.backgroundColor = '#D80404'
                this.style.color = '#fff'
            });
        })
    }

  
    function getCheckedInUsers() {

        $rootScope.showLoader = true;
        promise1 = $http({
            method: "POST",
            url: "/api/Request/getCheckedInUsers",
        }).then(function (response) {

            console.log(response);
            $rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    //if (result.isSuccessStatusCode) {

                    //    $scope.employeesList = result.resultData;

                    //} else {
                    //    swal("Failed getting car was options", "Please try again", "error");
                    //    console.log(result.errorMsg);
                    //}

                    $scope.employeesList = [
                        {
                            employeeId: 1,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 2,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 3,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 4,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 5,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 6,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 7,
                            employeeName: "admin@gsm.com"
                        },
                        {
                            employeeId: 8,
                            employeeName: "admin@gsm.com"
                        }

                    ];

                    setTimeout(function () {
                        rootFilter();
                    }, 1);

                } else {
                    //swal("Failed getting car was options", "Please try again", "error");
                }

            } else {
                //swal("Failed getting car was options", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting car was options", "Please try again", "error");
            $rootScope.showLoader = false;
            console.log(error);
        });

    }

    getCheckedInUsers();


    function findAvailableNozzles() {

        //$rootScope.showLoader = true;
        promise2 = $http({
            method: "POST",
            url: "/api/Request/findAvailableNozzles",
            data: { sessionId: localStorage.getItem('session_id_sm') }
        }).then(function (response) {

            console.log(response);
            //$rootScope.showLoader = false;

            if (response !== null && response !== undefined) {

                if (response.data !== null && response.data !== undefined) {

                    var result = JSON.parse(response.data);

                    if (result.isSuccessStatusCode) {

                        $scope.availableNuzzlesList = result.resultData;
                        console.log($scope.availableNuzzlesList);

                    } else {
                        //swal("Failed getting station manager name", "Please try again", "error");
                        //console.log(result.errorMsg);
                    }

                } else {
                    //swal("Failed getting station manager name", "Please try again", "error");
                }

            } else {
                //swal("Failed getting station manager name", "Please try again", "error");
            }


        }, function (error) {
            //swal("Failed getting station manager name", "Please try again", "error");
            //$rootScope.showLoader = false;
            console.log(error);
        });

    };

    findAvailableNozzles();



    $q.all([promise1, promise2]).then(function (result) {
        dd();
    });


    function dd() {

        var chain = $q.when();
        angular.forEach($scope.employeesList, function (item) {
            chain = chain.then(function () {
                return $http({
                    method: "POST",
                    url: "/api/Request/findNozzlesAccordingToEmployee",
                    data: { sessionId: localStorage.getItem('session_id_sm'), employeeId: item.employeeId }
                }).then(function (response) {

                    if (response !== null && response !== undefined) {

                        if (response.data !== null && response.data !== undefined) {

                            var result = JSON.parse(response.data);

                            if (result.isSuccessStatusCode) {

                                var obj = {
                                    nuzzles : result.resultData,
                                    employee: item,
                                }

                                $scope.employeeNuzzlesList.push(obj);

                            }

                        }

                    }


                }, function (error) {
                    console.log(error);
                });
            });
        });

        // the final chain object will resolve once all the posts have completed.
        chain.then(function () {
            console.log('all done!');

            console.log($scope.employeeNuzzlesList);


            for (var i = 0; i < $scope.availableNuzzlesList.length; i++) {

                var av = $scope.availableNuzzlesList[i];
                av.isAvailable = true;

                for (var j = 0; j < $scope.employeeNuzzlesList.length; j++) {

                    if (av.id === $scope.employeeNuzzlesList[j].id) {
                        av.isAvailable = false;
                        break;
                    }

                }
            }

            $scope.ff = [];
            $scope.mm = [];
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);
            $scope.mm.push($scope.availableNuzzlesList[0]);


            var index = 0;

            for (var z = 0; z < $scope.mm.length; z++) {

                var nuzzles = [];
                var d = {};
                
                nuzzles.push($scope.mm[z]);

                if (z % 4 === 0) {

                    d = {
                        id: index,
                        nuzzles: nuzzles
                    };
                    $scope.ff.push(d);
                    index++;
                }

            }


            

            console.log($scope.ff);


        });

    }

}]);

