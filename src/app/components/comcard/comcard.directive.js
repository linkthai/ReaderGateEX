(function() {
  'use strict';

  angular
    .module('readerGate')
    .directive('comCard', comCard);

  /** @ngInject */
  function comCard() {
    var directive = {
      restrict: 'AEC',
      templateUrl: 'app/components/comcard/comcard.html',
      controller: ComcardController,
      controllerAs: 'vm',
      bindToController: true

    }
    return directive;

    function ComcardController() {
      var vm = this;

      vm.id = '';
      vm.name = '';
      vm.genres = '';
      vm.author = '';
      vm.cover = '';

      vm.name = 'Death Note';
      vm.genres = 'Drama, Manga, Mystery, Psychological, Shounen, Supernatural, Tragedy';
      vm.author = 'Ohba Tsugumi, OBATA Takeshi';
      vm.cover = 'assets/images/death-note.jpg';
    }

  }

})();
