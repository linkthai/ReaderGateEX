(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('TitleController', TitleController);

  /** @ngInject */
  function TitleController($location, $routeParams, $window) {
    var vm = this;
    vm.titleId = $routeParams.param1;
    vm.vol = $routeParams.param2;
    vm.chap = $routeParams.param3;
    vm.nextEnabled = true;
    vm.previousEnabled = true;

    vm.go = function(vol, chap) {
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
      $location.path('/add-chapter/' + vm.titleId);
    }

    vm.title = 'Death Note';
    vm.genres = 'Drama, Manga, Mystery, Psychological, Shounen, Supernatural, Tragedy';
    vm.author = 'Ohba Tsugumi, OBATA Takeshi';
    vm.cover = 'assets/images/death-note.jpg';
    vm.description = "An overachieving 12th grader, Yagami Light is an aspiring" +
      " young man who seems destined for success. Unfortunately, his daily habits" +
      " bore his incredible intelligence--So when a strange black notebook falls from" +
      " the heavens during his class, it isn't long before he takes it for himself. " +
      "In his room, he finds, to his horror/fascination, that the Death Note is real, " +
      "and owned by Ryuk, a Shinigami (Death God). Any person's name written in the Death Note " +
      "will die in 40 seconds as long as the person's name is not the same as some one else. " +
      "But if the name is unique, the person will die.... without fail. With this supposed gift of God, " +
      " Light swears upon his grave that he will 'cleanse' the world of the evil and needless people " +
      "that inhabit it, thus creating a utopia for all. With the world's greatest detective, L, hot " +
      " on his tail, will Light's ideals prove too fantastic to realize, or will he succeed bringing " +
      " justice?";
    vm.status = 'Incomplete';
    vm.views = 213123;

    vm.chapList = [{
      vol: 1,
      chap: 1,
      name: 'Intro'
    }, {
      vol: 1,
      chap: 2,
      name: 'A new day'
    }, {
      vol: 1,
      chap: 3,
      name: 'One more'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }, {
      vol: 2,
      chap: 4,
      name: 'A new day'
    }];

    function findSelectedChapter() {

      if (vm.vol == null)
        return;

      for (var i = 0; i < vm.chapList.length; i++) {
        if (vm.chapList[i].vol == vm.vol && vm.chapList[i].chap == vm.chap) {
          vm.selectedChapter = vm.chapList[i];

          if (i == 0)
            vm.previousEnabled = false;
          if (i == vm.chapList.length - 1)
            vm.nextEnabled = false;

          vm.chapPages = [{
            page: 1,
            url: "assets/images/pages/1.png"
          }, {
            page: 2,
            url: "assets/images/pages/2.png"
          }, {
            page: 3,
            url: "assets/images/pages/3.png"
          }, {
            page: 4,
            url: "assets/images/pages/4.png"
          }, {
            page: 5,
            url: "assets/images/pages/5.png"
          }, {
            page: 6,
            url: "assets/images/pages/6.png"
          }, {
            page: 7,
            url: "assets/images/pages/7.png"
          }, {
            page: 8,
            url: "assets/images/pages/8.png"
          }, {
            page: 9,
            url: "assets/images/pages/9.png"
          }, {
            page: 10,
            url: "assets/images/pages/10.png"
          }];
          break;
        }
      }
    }
    findSelectedChapter();

  }
})();
