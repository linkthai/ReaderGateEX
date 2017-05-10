(function () {
    'use strict';

    angular
        .module('readerGate')
        .controller('ChapterController', ChapterController);

    /** @ngInject */
    function ChapterController($location, $routeParams, $scope, $timeout, bookService) {
        var vm = this;
        vm.isFirst = false;
        vm.isLast = false;
        vm.layout = localStorage.getItem("pageLayout");

        vm.title = localStorage.getItem("SeriesTitle");

        vm.currentIdx = 1;
        vm.currentPage = null;

        pageLayoutHandle();
        
        Array.prototype.next = function () {
            if (!((this.current + 1) in this)) return false;
            return this[++this.current];
        };

        Array.prototype.prev = function () {
            if (!((this.current - 1) in this)) return false;
            return this[--this.current];
        };

        vm.goPrev = function () {
            if (vm.layout == "All pages") {
                if (vm.selectedChapter.pos - 1 >= 0) {
                    vm.selectedChapter = vm.chapList[vm.selectedChapter.pos - 1];
                    $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
                }
            } else if (vm.layout == "One page") {
                if (vm.currentIdx > 1) {
                    vm.currentIdx--;
                    vm.currentPage = $scope.chapPages[vm.currentIdx - 1];
                    vm.selectedPage = vm.pageList[vm.currentIdx - 1];
                } else {
                    if (vm.selectedChapter.pos - 1 >= 0) {
                        localStorage.setItem("pageLayout", vm.layout);
                        vm.selectedChapter = vm.chapList[vm.selectedChapter.pos - 1];
                        $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
                    }
                }
            }
        }

        vm.goNext = function () {
            if (vm.layout == "All pages") {
                if (vm.selectedChapter.pos + 1 < vm.chapList.length) {
                    vm.selectedChapter = vm.chapList[vm.selectedChapter.pos + 1];
                    $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
                }
            } else if (vm.layout == "One page") {
                if (vm.currentIdx < $scope.chapPages.length) {
                    vm.currentIdx++;
                    vm.currentPage = $scope.chapPages[vm.currentIdx - 1];
                    vm.selectedPage = vm.pageList[vm.currentIdx - 1];
                } else {
                    if (vm.selectedChapter.pos + 1 < vm.chapList.length) {
                        localStorage.setItem("pageLayout", vm.layout);
                        vm.selectedChapter = vm.chapList[vm.selectedChapter.pos + 1];
                        $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
                    }
                }
            }
        }

        vm.titleId = $routeParams.param1;
        vm.chap = $routeParams.param2;
        vm.name = $routeParams.param3;

        $scope.$on('$viewContentLoaded', function () {
            window.scrollTo(0, 0);
        });

        vm.go = function (chap, name) {
            localStorage.setItem("pageLayout", vm.layout);
            $location.path('/archive/' + vm.titleId + '/' + chap + '/' + name);
        };

        vm.toPage = function (page) {
            console.log(page);
            vm.currentIdx = page;
            vm.currentPage = $scope.chapPages[vm.currentIdx - 1];
        }

        vm.backToSeries = function () {
            $location.path('/archive/' + vm.titleId + '/');
        };

        vm.chapList = new Array();
        vm.pageList = new Array();
        vm.selectedChapter;
        vm.selectedPage;

        function getChaptersBySeries(seriesId) {
            var auth = firebase.auth();
            var database = firebase.database();

            var idx = 0;
            database.ref('chapters/' + seriesId).on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    var optionMap = {
                        data: childData
                        , pos: idx
                        , name: childData._name
                    }
                    if (childData._chapterId == vm.chap)
                        vm.selectedChapter = optionMap;
                    vm.chapList.push(optionMap);
                    idx++;
                });
            });

            setTimeout(function () {
                var index = vm.chapList.indexOf(vm.selectedChapter);

                if (index === 0)
                    vm.isFirst = true;

                if (index === vm.chapList.length - 1)
                    vm.isLast = true;

                changeChapterButton();

                if (vm.layout == "One page") {
                    vm.currentPage = $scope.chapPages[vm.currentIdx - 1];
                }
                $scope.$apply();
            }, 3000);
        }
        getChaptersBySeries(vm.titleId);



        $scope.chapPages = [];

        function changeChapterButton() {
            var prevButton = document.getElementById("previousButton");
            var nextButton = document.getElementById("nextButton");

            if (vm.isFirst) {
                if (!prevButton.classList.contains('disabled'))
                    prevButton.classList.add('disabled');
            } else {
                if (prevButton.classList.contains('disabled'))
                    prevButton.classList.remove('disabled');
            }

            if (vm.isLast) {
                if (!nextButton.classList.contains('disabled'))
                    nextButton.classList.add('disabled');
            } else {
                if (nextButton.classList.contains('disabled'))
                    nextButton.classList.remove('disabled');
            }
        };

        function pageLayoutHandle() {
            console.log(vm.layout);
            
            var allPagesNav = document.getElementById("allPagesNav");
            var onePageNav = document.getElementById("onePageNav");

            var allPagesImg = document.getElementById("allPagesImg");
            var onePageImg = document.getElementById("onePageImg");

               console.log(onePageNav.classList);
            if (vm.layout == "All pages") {

                allPagesNav.classList.remove('hide-content');
                onePageNav.classList.add('hide-content');

                allPagesImg.classList.remove('hide-content');
                onePageImg.classList.add('hide-content');

            } else if (vm.layout == "One page") {

                onePageNav.classList.remove('hide-content');
                allPagesNav.classList.add('hide-content');

                onePageImg.classList.remove('hide-content');
                allPagesImg.classList.add('hide-content');
            }
        }

        function findSelectedChapter(seriesId, chapterId) {
            var auth = firebase.auth();
            var databaseRef = firebase.database().ref('pages/' + seriesId + '/' + chapterId);

            databaseRef.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    $scope.chapPages.push(childData.url);
                });

                function naturalCompare(a, b) {
                    var ax = []
                        , bx = [];

                    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
                        ax.push([$1 || Infinity, $2 || ""])
                    });
                    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
                        bx.push([$1 || Infinity, $2 || ""])
                    });

                    while (ax.length && bx.length) {
                        var an = ax.shift();
                        var bn = bx.shift();
                        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                        if (nn) return nn;
                    }
                    return ax.length - bx.length;
                }

                $scope.chapPages = $scope.chapPages.sort(naturalCompare);

                var cnt = 1;
                for (var i = 0; i < $scope.chapPages.length; i++) {
                    var opt = {
                        value: cnt
                    };

                    if (i == 0) {
                        vm.selectedPage = opt;
                    }
                    vm.pageList.push(opt);
                    cnt++;
                }

                $timeout(function () {
                    $scope.$apply();
                }, 100);
            });
        }
        findSelectedChapter(vm.titleId, vm.chap);

        vm.onePageLayout = function () {
            vm.layout = "One page";
            localStorage.setItem("pageLayout", "One page");

            vm.currentPage = $scope.chapPages[vm.currentIdx - 1];

            console.log(vm.layout);
            pageLayoutHandle();
            changeChapterButton();
        };

        vm.allPagesLayout = function () {
            vm.layout = "All pages";
            localStorage.setItem("pageLayout", "All pages");

            console.log(vm.layout);
            pageLayoutHandle();
            changeChapterButton();
        };

        window.onclick = function (event) {
            var dropdown;
            if (vm.layout == "All pages")
                dropdown = document.getElementById("layoutDropdown1");
            else if (vm.layout == "One page")
                dropdown = document.getElementById("layoutDropdown2");

            if (event.target.matches('.dropdown-toggle')) {
                if (dropdown.classList.contains('open')) {
                    dropdown.classList.remove('open');
                } else dropdown.classList.add('open');
            } else {
                dropdown.classList.remove('open');
            }
        }
    }
})();