(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('TitleController', TitleController);

  /** @ngInject */
  function TitleController($location, $routeParams, $window, bookService) {
    var vm = this;
    var books = bookService.getValue();
    var book = books[0];

    vm.titleId = $routeParams.param1;
    vm.vol = $routeParams.param2;
    vm.chap = $routeParams.param3;
    vm.nextEnabled = true;
    vm.previousEnabled = true;

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

    if (book != null && LocalStorageManager.getValue("selectingSeries") == null) {
      LocalStorageManager.setValue("selectingSeries", book);
    }
    else {
      if (book == null && LocalStorageManager.getValue("selectingSeries") != null)
        book = LocalStorageManager.getValue("selectingSeries");
    }

    vm.go = function(vol, chap, data) {
      bookService.addValue(data);
      bookService.addValue(book);
      $location.path('/archive/' + vm.titleId + '/' + vol + '/' + chap);
    };

    vm.changeVol = function() {
      vm.go(vm.selectedChapter.vol, vm.selectedChapter.chap);
    }

    vm.editSeries = function() {
      $location.path('/edit-series/' + vm.titleId);
      //$window.location.reload();
    }

    vm.addChapter = function() {
      bookService.addValue(book);
      $location.path('/add-chapter/' + vm.titleId);
    }

    vm.title = book._title;
    vm.genres = book._genres;
    vm.author = book._author;
    vm.cover = book._cover;
    vm.description = book._description;
    vm.status = 'Incomplete';
    vm.views = 213123;

    vm.chapList = [];
    function getChaptersBySeries(seriesId) {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('chapters/' + seriesId).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.chapList.push({
            data: childData,
            vol: 1,
            name: childData._name
          })
        });
      });
    }
    getChaptersBySeries(book._bookId);
  }
})();
