/* global angular */

(function () {
    'use strict';

    angular.module('app.directives')

        .directive('listItem', function () {
            return {
                restrict: 'E',
                template: '<li>{{value}}</li>',

                link: function (scope, el, attr) {
                    scope.value = attr.value;
                }
            };
        });

})();

