/* global angular */

var adrem = {};

angular.module('app.services')

    .factory('client', function ($http) {
        'use strict';

        const that = {
            init: function () {
                return $http.get('text.res.json')
                    .then(res => {
                        adrem.res=res.data;
                        return res.data;
                    });
            }
        };

        return that;
    });
