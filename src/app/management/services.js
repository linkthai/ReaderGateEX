(function() {
  'use strict';

  angular
    .module('readerGate')
    .service('bookService', function() {
      var values = [];

      var addValue = function(newObj) {
        values.push(newObj);
      };

      var getValue = function() {
        return values;
      };

      return {
        addValue: addValue,
        getValue: getValue
      };
    });
})();
