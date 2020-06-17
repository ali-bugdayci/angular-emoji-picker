angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', 'vkEmojiStorage', 'vkEmojiTransforms', function (emojiGroups, storage, vkEmojiTransforms) {
    var RECENT_LIMIT = 54;
    var DEFAULT_OUTPUT_FORMAT = '';
    var templateUrl = 'templates/emoji-button-bootstrap.html';

    try {
      angular.module('ui.bootstrap.popover');
    } catch (e) {
      try {
        angular.module('mgcrea.ngStrap.popover');
        templateUrl = 'templates/emoji-button-strap.html';
      } catch (e) {
        templateUrl = 'templates/emoji-button.html';
      }
    }

    return {
      restrict: 'A',
      templateUrl: templateUrl,
      scope: {
        model: '=emojiPicker',
        emojiPicker: '@',
        placement: '@',
        title: '@',
        onChangeFunc: '=',
        containerId: '@',
        caretPosition: '@',
        blacklist: '@',
        pin: '@'
      },
      link: function ($scope, element, attrs) {
        $scope.caretPosition = -1;

        $scope.applyEmojisBlacklist = function (to) {
          var hasRecentBan = false;
          var banEmojisName = attrs.blacklist.match(/([a-zA-Z0-1]+)/gmi);

          angular.forEach($scope.groups, function (group, groupKey) {
            var newGroup = group.emoji;
            angular.forEach(banEmojisName, function (banEmojiName, banEmojiNameKey) {
              pos = group.emoji.indexOf(banEmojiName);
              if (pos > -1) {
                newGroup.splice(pos, 1);

                if (groupKey === 0) {
                  hasRecentBan = true;
                }
              }
            });
            $scope.groups[groupKey].emoji = newGroup;
          });

          if (hasRecentBan) {
            $scope.groups[0].emoji = [];
            storage.clear();
          }
        };

        var recentLimit = parseInt(attrs.recentLimit, 10) || RECENT_LIMIT;
        var outputFormat = attrs.outputFormat || DEFAULT_OUTPUT_FORMAT;

        $scope.groups = emojiGroups.groups;
        $scope.selectedGroup = emojiGroups.groups[0];
        $scope.selectedGroup.emoji = storage.getFirst(recentLimit);

        if (attrs.blacklist && typeof(attrs.blacklist) != 'undefined' && attrs.blacklist != '') {
          $scope.applyEmojisBlacklist();
        }

        $scope.clearCaretPosition = function () {
          $scope.caretPosition = -1;
        };

        $scope.append = function (emoji) {
          if ($scope.model == null) {
            $scope.model = '';
          }

          if ($scope.caretPosition > -1) {
            var text = $scope.model;
            var emojiChar = formatSelectedEmoji(emoji, outputFormat).trim();
            $scope.model = text.substring(0, $scope.caretPosition)
              + emojiChar
              + text.substring($scope.caretPosition, text.length);
            $scope.caretPosition += 2;

          } else {
            $scope.model += formatSelectedEmoji(emoji, outputFormat);
            $scope.model = $scope.model.trim();
          }

          storage.store(emoji);

          fireOnChangeFunc();
        };

        $scope.remove = function () {
          if (angular.isDefined($scope.model)) {
            var words = $scope.model.split(' ');
            words.pop();
            $scope.model = words.join(' ').trim();

            fireOnChangeFunc();
          }
        };

        $scope.hidePopover = function($event) {
          $scope.$$childHead.isOpen = false;
          angular.element($event.target).parent().parent().parent().parent().parent().remove();
          return false;
        };


        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, '-');
        };

        $scope.changeGroup = function (group) {
          $scope.selectedGroup = group;

          if ($scope.selectedGroup.name === 'recent') {
            $scope.selectedGroup.emoji = storage.getFirst(recentLimit);
          }
        };

        $scope.$on('$destroy', function () {
          element.remove();
        });

        function formatSelectedEmoji(emoji, type) {
          emoji = [' :', emoji, ':'].join('');
          if (type == 'unicode') {
            return vkEmojiTransforms.emojify(emoji);
          } else {
            return emoji;
          }
        }

        function fireOnChangeFunc() {
          if ($scope.onChangeFunc && typeof $scope.onChangeFunc === 'function') {
            setTimeout($scope.onChangeFunc);
          }
        }

        var container = document.querySelector('[ng-model="' + $scope.emojiPicker + '"]');
        container.addEventListener('blur', function(event) {
          $scope.caretPosition = container.selectionStart;
        });
      }
    };
  }
]);
