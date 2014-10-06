'use strict';

/**
 * @ngdoc overview
 * @name flysoloAngApp
 * @description
 * # flysoloAngApp
 *
 * Main module of the application.
 */
// angular
//   .module('flysoloAngApp', [
//     'ngAnimate',
//     'ngCookies',
//     'ngResource',
//     'ngRoute',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/index.html',
//         controller: 'MainCtrl'
//       })
//       .when('/app', {
//         templateUrl: 'views/app.html',
//         controller: 'AppCtrl'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });

var app = angular
  .module('flysoloAngApp', ['ngFoursquare', 'ngRoute'])
  .constant('CLIENT_ID','CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW')
  .config(function ($routeProvider,FoursquareProvider) {
    $routeProvider
      .when('/app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        resolve : {
          token: function ($location) {
            var match = $location.path().match(/access_token=(.*)/)
            if(match){
              FoursquareProvider.token = match[1]
            }
          }
        }
        ,templateUrl: 'views/app.html'
        ,controller:'AppCtrl'
      })
  })

