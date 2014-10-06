'use strict';

/**
 * @ngdoc function
 * @name flysoloAngApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flysoloAngApp
 */
angular.module('flysoloAngApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
