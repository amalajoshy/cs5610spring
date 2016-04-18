/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .directive('emitLastRepeaterElement', function () {
            return function (scope) {
                if (scope.$last) {
                    //alert("i am the last");
                    scope.$emit('LastRepeaterElement');
                }
            };
        });
}());