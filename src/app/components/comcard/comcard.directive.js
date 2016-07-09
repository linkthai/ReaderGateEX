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
      scope: {
        bookGenres: "@",
        bookTitle: "@",
        bookCover: "@",
        bookAuthor: "@"
      },
      bindToController: {
        bookGenres: "@",
        bookTitle: "@",
        bookCover: "@",
        bookAuthor: "@"
      }
    }
    return directive;

    function ComcardController() {
      var vm = this;
    }

  }

})();
