(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ContactController', ContactController)
    .directive('ngFileModel', ['$parse', function($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.ngFileModel);
          var isMultiple = attrs.multiple;
          var modelSetter = model.assign;
          element.bind('change', function() {
            var values = [];
            angular.forEach(element[0].files, function(item) {
              var value = {
                // File Name
                name: item.name,
                //File Size
                size: item.size,
                //File URL to view
                url: URL.createObjectURL(item),
                // File Input Value
                _file: item
              };
              values.push(value);
            });
            scope.$apply(function() {
              if (isMultiple) {
                modelSetter(scope, values);
              } else {
                modelSetter(scope, values[0]);
              }
            });
          });
        }
      };
    }]);

  /** @ngInject */
  function ContactController($scope) {
    $scope.files = [];
    $scope.upload = function() {
      alert($scope.files.length + " files selected ... Write your Upload Code");
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      var files = $scope.files;
      var book = $scope.book;
      var chapter = $scope.chapter;

      var metadata = {
        contentType: 'image/jpeg'
      };

      angular.forEach(files, function(value, key) {
        var uploadTask = storageRef.child(book + '/' + chapter + '/' + value.name).put(value._file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          function(error) {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log('URL: ' + downloadURL);
          });
      });
    };
  }
})();
