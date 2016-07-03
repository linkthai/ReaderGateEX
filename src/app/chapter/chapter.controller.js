(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ChapterController', ChapterController);

  /** @ngInject */
  function ChapterController($location, $routeParams, $scope, bookService) {
    var vm = this;
    var arr = bookService.getValue();
    var chapter = arr[0];
    var book = arr[1];

    vm.titleId = $routeParams.param1;
    vm.vol = $routeParams.param2;
    vm.chap = $routeParams.param3;

    var LocalStorageManager = {
      setValue: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      },
      getValue: function(key) {
        try {
          return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {

        }
      }
    };

    if (chapter != null && LocalStorageManager.getValue("selectingChapter") == null) {
      LocalStorageManager.setValue("selectingChapter", chapter);
    }
    else {
      if (chapter == null && LocalStorageManager.getValue("selectingChapter") != null)
        chapter = LocalStorageManager.getValue("selectingChapter");
    }

    if (book != null && LocalStorageManager.getValue("selectingSeries") == null) {
      LocalStorageManager.setValue("selectingSeries", book);
    }
    else {
      if (book == null && LocalStorageManager.getValue("selectingSeries") != null)
        book = LocalStorageManager.getValue("selectingSeries");
    }

    console.log(chapter);
    console.log(book);

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
            vol: 1,
            name: childData._name
          })
        });
      });
    }
    getChaptersBySeries(book._bookId);

    $scope.chapPages = [];
    function findSelectedChapter(seriesId, chapterId) {
      var auth = firebase.auth();
      var databaseRef = firebase.database().ref('pages/' + seriesId + '/' + chapterId);

      databaseRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          $scope.chapPages.push(childData);
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
        $scope.$apply();
      });
    }
    findSelectedChapter(book._bookId, chapter._chapterId);

  }
})();
