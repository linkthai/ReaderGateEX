(function() {
  'use strict';

  angular
    .module('readerGate')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
