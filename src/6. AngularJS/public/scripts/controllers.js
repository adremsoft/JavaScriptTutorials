/* global angular */

angular.module('app.controllers')
    .controller('appCtrl', function ($scope, client) {
        'use strict';
        const ctrl = this;

        ctrl.loaded = false;
        ctrl.taskList = [];

        ctrl.addTask = function() {
            if (ctrl.taskName != null) {
                ctrl.taskList.push(ctrl.taskName);
            }
        };

        client.init()
            .then((res) => {
                ctrl.loaded = true;
                ctrl.res = res;
            });

    });
