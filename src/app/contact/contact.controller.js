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
      var database = firebase.database();
      var files = $scope.files;
      var book = $scope._book;
      var chapter = $scope._chapter;
      var chapterName = $scope._chapterName;

      var metadata = {
        contentType: 'image/jpeg'
      };

      var chapterId = book + 'C' + chapter;
      database.ref('chapters/' + book + '/chapter_' + chapter + '/').set({
        "_name": chapterName,
        "_chapterId": chapterId
      });

      var idx = 0;
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
            idx = idx + 1;
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;

            console.log('URL: ' + downloadURL);

            //database.ref('chapters/' + book + '/chapter ' + chapter + '/' + 'page ' + idx).set(downloadURL);
            database.ref('pages/' + book + '/' + chapterId + '/' + 'page ' + idx).set(downloadURL);
          });
      });
    };

    $scope.createSeries = function() {
      var auth = firebase.auth();
      var database = firebase.database();
      var _book = $scope._book;
      var _genres = $scope._genres;
      var _author = $scope._author;
      var _status = $scope._status;
      var _description = $scope._description;
      var _views = $scope._views;
      var _coverUrl = "adadads";

      var postData = {
        "_name": _book,
        "_genres": _genres,
        "_author": _author,
        "_status": _status,
        "_description": _description,
        "_cover": _coverUrl,
        "_views": _views
      }

      database.ref('series/' + _book).set(postData);
    }

    $scope.getAllSeries = function() {
      var auth = firebase.auth();
      var database = firebase.database();
      var book = $scope._book;

      $scope.seriesInfo = [];
      database.ref('series/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          $scope.seriesInfo.push(childData);
        });
      });
    }

    $scope.getChaptersBySeries = function(seriesName) {
      var auth = firebase.auth();
      var database = firebase.database();

      $scope.chaptersInfo = [];
      database.ref('chapters/' + seriesName).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          $scope.chaptersInfo.push(childData);
        });
      });
    }

    $scope.getPagesByChapter = function(seriesName, chapterId) {
      var auth = firebase.auth();
      var databaseRef = firebase.database().ref('pages/' + seriesName + '/' + chapterId);

      $scope.pages = [];
      databaseRef.on('value', function(snapshot) {
          var data = snapshot.val();
          var length = snapshot.numChildren();
          for (var i = 1; i <= length; i++) {
            $scope.pages.push(data['page ' + i]);
          }
      });
    }
  }
})();
