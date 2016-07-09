(function() {
    'use strict';

    angular
      .module('readerGate')
      .controller('ChapterController', ChapterController);

    /** @ngInject */
    function ChapterController($location, $routeParams, $scope, $timeout, bookService) {
      var vm = this;
      vm.isFirst = false;
      vm.isLast = false;

      Array.prototype.next = function() {
        if (!((this.current + 1) in this)) return false;
        return this[++this.current];
      };

      Array.prototype.prev = function() {
        if (!((this.current - 1) in this)) return false;
        return this[--this.current];
      };

      vm.goPrev = function() {
        if (vm.selectedChapter.pos - 1 >= 0) {
          vm.selectedChapter = vm.chapList[vm.selectedChapter.pos - 1];
          $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
        }
      }

      vm.goNext = function() {
        if (vm.selectedChapter.pos + 1 < vm.chapList.length) {
          vm.selectedChapter = vm.chapList[vm.selectedChapter.pos + 1];
          $location.path('/archive/' + vm.titleId + '/' + vm.selectedChapter.data._chapterId + '/' + vm.selectedChapter.name);
        }
      }

      vm.titleId = $routeParams.param1;
      vm.chap = $routeParams.param2;
      vm.name = $routeParams.param3;

      $scope.$on('$viewContentLoaded', function() {
        window.scrollTo(0, 0);
      });

      vm.go = function(chap, name) {
        $location.path('/archive/' + vm.titleId + '/' + chap + '/' + name);
      };

      vm.chapList = new Array();
      vm.selectedChapter;

      function getChaptersBySeries(seriesId) {
        var auth = firebase.auth();
        var database = firebase.database();

        var idx = 0;
        database.ref('chapters/' + seriesId).on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var optionMap = {
              data: childData,
              pos: idx,
              name: childData._name
            }
            if (childData._chapterId == vm.chap)
              vm.selectedChapter = optionMap;
            vm.chapList.push(optionMap);
            idx++;
          });
        });

          setTimeout(function() {
            var index = vm.chapList.indexOf(vm.selectedChapter);
            if (index === 0)
              vm.isFirst = true;

            if (index === vm.chapList.length - 1)
              vm.isLast = true;
            console.log(index);
            $scope.$apply();
          }, 1);
    }
    getChaptersBySeries(vm.titleId);



    $scope.chapPages = [];

    function findSelectedChapter(seriesId, chapterId) {
      var auth = firebase.auth();
      var databaseRef = firebase.database().ref('pages/' + seriesId + '/' + chapterId);

      databaseRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          $scope.chapPages.push(childData.url);
        });

        function naturalCompare(a, b) {
          var ax = [],
            bx = [];

          a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
            ax.push([$1 || Infinity, $2 || ""])
          });
          b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
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
        $timeout(function() {
          $scope.$apply();
        }, 100);
      });
    }
    findSelectedChapter(vm.titleId, vm.chap);

  }
})();
