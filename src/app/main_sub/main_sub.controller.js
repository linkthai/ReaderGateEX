(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('MainSubController', MainSubController);
	


  /** @ngInject */
  function MainSubController($rootScope, $scope, $location) {
    var vm = this;

    vm.text = '';
    vm.title = '';
    vm.newRelease = [];
    vm.mostPopular = [];
    vm.latestUpdate = [];
       
    vm.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
    vm.alphabet.splice(0, 0, "All");
       
    $scope.$on('$viewContentLoaded', function() {
      window.scrollTo(0, 0);
    });

    function selectItem(item) {
      vm.title = item.name;
    }

    vm.goToSortArchive = function(index, path) {
      $rootScope.selectedSortIndex = index;
      $location.path(path);
    }

    vm.goToTitleNewRelease = function(num) {
      $location.path('/archive/' + vm.newRelease[num].bookId);
    }
    vm.goToTitleMostPopular = function(num) {
      $location.path('/archive/' + vm.mostPopular[num].bookId);
    }
    
    $scope.getNewRelease = function() {
      vm.newRelease.length = 0;
      var database = firebase.database();

      database.ref('series/').limitToLast(6).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.newRelease.push({
            genres: childData._genres,
            author: childData._author,
            bookId: childData._bookId,
            title: childData._title,
            cover: childData._cover,
               desc: childData._description
          });
        });
           
           vm.newRelease.reverse();
      });

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();
          if (--i) myLoop(i)
        }, 50)
      })(100);
    }

    $scope.getMostPopular = function() {
      vm.mostPopular.length = 0;
      var database = firebase.database();

      database.ref('series/').limitToLast(4).orderByChild('_views').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.mostPopular.push({
            genres: childData._genres,
            author: childData._author,
            bookId: childData._bookId,
            title: childData._title,
            cover: childData._cover
          });
        });
      });

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();
          if (--i) myLoop(i)
        }, 50)
      })(100);
    }

    $scope.getLatestUpdate = function() {
      vm.latestUpdate.length = 0;
      var database = firebase.database();

      database.ref("latest_update/").limitToLast(15).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.latestUpdate.splice(0, 0, childData);
        });
      });
      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();
          if (--i) myLoop(i)
        }, 50)
      })(100);
    }

    $scope.getNewRelease();
    $scope.getMostPopular();
    $scope.getLatestUpdate();

    vm.go = function(title, seriesId, chap, name) {
      vm.increaseViews(seriesId);
         
             localStorage.setItem("SeriesTitle", title);
             localStorage.setItem("pageLayout", "All pages");
      $location.path('/archive/' + seriesId + '/' + chap + '/' + name);
    };

    vm.increaseViews = function(seriesId) {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('series/' + seriesId).once('value', function(snapshot) {
          var postData = snapshot.val();
          postData._views = postData._views + 1;
          var updates = {};
          updates['/series/' + seriesId] = postData;
          database.ref().update(updates);
      });
    }
    
     vm.initSlider = function () {
            // wait till load event fires so all resources are available
            $('#custom_carousel').on('slide.bs.carousel', function (evt) {
         
      $('#custom_carousel .controls li.active').removeClass('active');
      $('#custom_carousel .controls li:eq('+$(evt.relatedTarget).index()+')').addClass('active');
    });
      };

      vm.initSlider();
  }
})();
