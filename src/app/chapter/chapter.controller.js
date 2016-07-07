(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ChapterController', ChapterController);

  /** @ngInject */
  function ChapterController($location, $routeParams, $scope, $timeout, bookService) {
    var vm = this;

    vm.titleId = $routeParams.param1;
    vm.chap = $routeParams.param2;
    vm.name = $routeParams.param3;

    vm.go = function(path) {
      $location.path('archive/' + vm.titleId + '/' + path);
    };

    vm.chapList = [];
    function getChaptersBySeries(seriesId) {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('chapters/' + seriesId).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          console.log(childData);
          vm.chapList.push({
            data: childData,
            name: childData._name
          })
        });
      });
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
        $timeout(function () {
            $scope.$apply();
        }, 100);
      });
    }
    findSelectedChapter(vm.titleId , vm.chap);

  }
})();
