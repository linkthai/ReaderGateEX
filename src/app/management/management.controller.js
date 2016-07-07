(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ManagementController', ManagementController)
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
  function ManagementController($location, $routeParams, $scope, $timeout, bookService) {
    var vm = this;
    vm.seriesName = "title";

    $scope.files = [];

    vm.menuItems = [{
      name: "Infomation",
      icon: "people"
    }, {
      name: "Bookmark",
      icon: "people"
    }, {
      name: "Message",
      icon: "people"
    }, {
      name: "Management",
      icon: "people"
    }];

    var arr = bookService.getValue();
    var selectingSeries = arr[0];

    var LocalStorageManager = {
      setValue: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      },
      getValue: function(key) {
        try {
          return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {

        }
      }
    };

    if (selectingSeries != null) {
      LocalStorageManager.setValue("selectingSeries", selectingSeries);
    }
    else {
      if (LocalStorageManager.getValue("selectingSeries") != null)
        selectingSeries = LocalStorageManager.getValue("selectingSeries");
    }

    vm.seriesName = selectingSeries._title;

    vm.flag = false;
    $scope.editSeries = function() {
      vm.flag = true;
      $timeout(function () {
          $scope.addSeries();
      }, 10);
    }

    $scope.updateInfo = function() {
      var auth = firebase.auth();
      var database = firebase.database();

      var _title = $scope._title;
      var _genres = $scope._genres;
      var _author = $scope._author;
      var _description = $scope._description;

      var stt;
      if ($scope.isComplete == true) {
        stt = "Completed";
      }
      else {
        stt = "Ongoing";
      }

      var postData = {
        "_title": _title,
        "_genres": _genres,
        "_author": _author,
        "_description": _description,
        "_cover": "N/A",
        "_bookId": $routeParams.param1,
        "_status": stt,
        "_views": selectingSeries._views
      }

      var updates = {};
      updates['/series/' + $routeParams.param1] = postData;
      database.ref().update(updates);

      alert("New series successfully added");
      return $routeParams.param1;
    }

    $scope.addInfo = function() {
      var auth = firebase.auth();
      var database = firebase.database();

      var _title = $scope._title;
      var _genres = $scope._genres;
      var _author = $scope._author;
      var _description = $scope._description;

      var newPostKey = database.ref().child('series').push().key;

      var postData = {
        "_title": _title,
        "_genres": _genres,
        "_author": _author,
        "_description": _description,
        "_cover": "N/A",
        "_bookId": newPostKey,
        "_status": "Ongoing",
        "_views": 0
      }
      var updates = {};
      updates['/series/' + newPostKey] = postData;
      database.ref().update(updates);

      alert("New series successfully added");

      return newPostKey;
    }

    $scope.bookId;

    $scope.addSeries = function() {
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      var database = firebase.database();
      var files = $scope.files;
      var title = $scope._title;

      alert(vm.flag);
      if (!vm.flag)
        $scope.bookId = $scope.addInfo();
      else {
          $scope.bookId = $scope.updateInfo();
          vm.flag = false;
      }

      var bookId = $scope.bookId;

      var metadata = {
        contentType: 'image/jpeg'
      };

      // Create a reference to the file to delete
      var desertRef = storageRef.child(bookId + '/cover');

      // Delete the file
      desertRef.delete().then(function() {
        console.log("File deleted successfully");
      }).catch(function(error) {
        console.log("Failed to delete file");
      });

      console.log(files);
      var uploadTask = storageRef.child(bookId + '/cover/' + files.name).put(files._file, metadata);

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

          var auth = firebase.auth();
          var database = firebase.database();

          database.ref('series/' + $scope.bookId).on('value', function(snapshot) {
              var postData = snapshot.val();
              postData._cover = downloadURL;
              var updates = {};
              updates['/series/' + $scope.bookId] = postData;
              database.ref().update(updates);
          });
        });
    };

    $scope.upload = function() {
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      var database = firebase.database();
      var files = $scope.files;
      var chapter = $scope._chapter;
      var chapterName = $scope._chapterName;
      var bookId = $routeParams.param1;

      var metadata = {
        contentType: 'image/jpeg'
      };

      var chapterId = 'C' + chapter;
      database.ref('chapters/' + bookId + '/chapter_' + chapter + '/').set({
        "_name": chapterName,
        "_chapterId": chapterId
      });

      var idx = 0;

      // Create a reference to the file to delete
      var desertRef = storageRef.child(bookId + '/' + chapter);

      // Delete the file
      desertRef.delete().then(function() {
        console.log("File deleted successfully");
      }).catch(function(error) {
        console.log("Failed to delete file");
      });

      database.ref('latest_update/').push({
        "_bookId" : bookId,
        "_title" : vm.seriesName,
        "_chapterId" : chapterId,
        "_chapterName" : chapterName
      });

      angular.forEach(files, function(value, key) {
        var uploadTask = storageRef.child(bookId + '/' + chapter + '/' + value.name).put(value._file, metadata);

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
            var fileName = uploadTask.snapshot.metadata.name;
            console.log('URL: ' + downloadURL);

            database.ref('pages/' + bookId + '/' + chapterId + '/' + 'page ' + idx).set({
              "url": downloadURL,
              "fileName": fileName
            });
          });
      });
    };

    //Get latest updates function, limit to 30 last childs
    vm.latest = [];
    function getLatestUpdate() {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref("latest_update/").limitToLast(30).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.latest.push(childData);
        });
      });
    }
    getLatestUpdate();

  }
})();
