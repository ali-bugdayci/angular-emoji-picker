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
    }

    $scope.post1 = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    }

    $scope.post2 = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    };

    $scope.post3 = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    };
  }
]);
