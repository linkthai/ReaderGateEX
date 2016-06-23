(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('TitleController', TitleController);

  /** @ngInject */
  function TitleController(toastr, $location, $routeParams) {
    var vm = this;
    vm.titleId = $routeParams.param1;

    function showToastr(text) {
      toastr.info(text);
      vm.classAnimation = '';
    }

    vm.go = function(path) {
      $location.path('archive/' + vm.titleId + '/' + path);
    };

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

    vm.volumeList = [
      {
        vol: 1,
        name: 'Intro'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      },
      {
        vol: 2,
        name: 'A new day'
      }
    ];

  }
})();
