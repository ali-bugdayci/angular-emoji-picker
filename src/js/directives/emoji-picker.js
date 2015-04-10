angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', 'vkEmojiStorage', function (emojiGroups, storage) {
    var RECENT_LIMIT = 36;

    try {
      angular.module('ui.bootstrap.popover');
      var templateUrl = 'template/emoji-picker/button-bootstrap.html';
    } catch(e) {
      try {
        angular.module('mgcrea.ngStrap.popover');
        var templateUrl = 'template/emoji-picker/button-strap.html';
      } catch(e) {
        var templateUrl = '../src/templates/emoji-button.html';
      }
    }

    return {
      restrict: 'A',
      templateUrl: templateUrl,
      scope: {
        model: '=emojiPicker',
        placement: '@placement',
        title: '@title'
      },
      link: function($scope, element, attrs) {
        var recentLimit = parseInt(attrs.recentLimit, 10) || RECENT_LIMIT;

        $scope.groups = emojiGroups.groups;
        $scope.selectedGroup = emojiGroups.groups[0];
        $scope.selectedGroup.emoji = storage.getFirst(recentLimit);

        $scope.append = function (emoji) {
          $scope.model += [' :', emoji, ':'].join('');
          storage.store(emoji);
        };

        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, '-');
        };

        $scope.changeGroup = function (group) {
          $scope.selectedGroup = group;

          if ($scope.selectedGroup.name === 'recent') {
            $scope.selectedGroup.emoji = storage.getFirst(recentLimit);
          }
        }
      }
    };
  }
]);