angular.module('ez.clickOutside', [])
.directive('ezClickOutside', [
  '$document',
  '$parse',
  function(
    $document,
    $parse
  ) {
    return {
      link: function(scope, $el, attrs) {
        var el = $el[0];

        var bindClick = function() {
          setTimeout(function() {
            $document.one('click', function(e) {
              if (el.contains(e.target)) {
                bindClick();
              } else {
                scope.$apply(function() {
                  var res = $parse(attrs.ezClickOutside)(scope, {$event: e});

                  if (res === false) {
                    bindClick();
                  }
                });
              }
            });
          });
        };

        bindClick();
      }
    };
  }
]);
