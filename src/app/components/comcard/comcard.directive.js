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
      bindToController: true,
      scope: {
        bookGenres: '@bookGenres',
        bookTitle: '@bookTitle',
        bookCover: '@bookCover',
        bookAuthor: '@bookAuthor',
        bookCover: '@bookCover'
      }
    }
    return directive;

    function ComcardController($scope, $attrs) {
      var vm = this;

      vm.bookCover = 'assets/images/death-note.jpg';

    }

  }

})();
