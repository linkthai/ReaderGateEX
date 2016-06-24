(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ChapterController', ChapterController);

  /** @ngInject */
  function ChapterController($location, $routeParams) {
    var vm = this;
    vm.titleId = $routeParams.param1;
    vm.vol = $routeParams.param2;
    vm.chap = $routeParams.param3;

    vm.go = function(path) {
      $location.path('archive/' + vm.titleId + '/' + path);
    };

    vm.volumeList = [
      {
        vol: 1,
        chap: 1,
        name: 'Intro'
      },
      {
        vol: 1,
        chap: 2,
        name: 'A new day'
      },
      {
        vol: 1,
        chap: 3,
        name: 'One more'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      },
      {
        vol: 2,
        chap: 4,
        name: 'A new day'
      }
    ];

  }
})();
