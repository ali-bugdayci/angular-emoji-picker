'use strict';

angular.module('vkEmojiDefaultExample', [
  'ngMaterial',
  'ngMessages',
  'vkEmojiPicker'
]).controller('EmojiController', [
  '$scope', function ($scope) {
    $scope.post = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    };

    $scope.messageCaretPosition = -1;

    $scope.messagePreventBlur = function () {
      $scope.messageCaretPosition = document.getElementById('message').selectionStart;
    }

    $scope.onSelectedEmoji = function () {
      document.querySelectorAll("#emojiPickerSelector i")[0].click();
      if ($scope.messageCaretPosition > -1) 
        $scope.messageCaretPosition += 2;
    }
  }
]);
