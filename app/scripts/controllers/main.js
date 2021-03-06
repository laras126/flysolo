'use strict';

/**
 * @ngdoc function
 * @name flysoloAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flysoloAngApp
 */

app.controller('AppCtrl', function($scope,Foursquare, $log, CLIENT_ID, $location) {
  var match = $location.path().match(/access_token=(.*)/)
  $scope.userId       = 'self'
  $scope.client_id    = CLIENT_ID
  $scope.redirect_uri = encodeURIComponent(location.origin+location.pathname)
  $scope.access_token = match && match[1] || ''

  $scope.clear = function () {
    $scope.userId=null
    $scope.venueId=null
    $scope.ll=null
    $scope.checkinId=null
  }

  $scope.getUser = function (userId) {
    $scope.data =  Foursquare.Users.get({
      userId: userId
    },function (data) {
      $scope.user = data.response.user
    })
  }
  $scope.getUserLists = function (userId) {
    $scope.data = Foursquare.Users.lists({
      userId: userId
    })
  }
  $scope.searchVenues = function (ll) {
    $scope.data = Foursquare.Venues.search({ll:ll})
  }
  $scope.getVenue = function (venueId) {
    $scope.data = Foursquare.Venues.get({
      venueId:venueId
    })
  }
  $scope.addCheckin = function (venueId,broadcast) {
    $scope.data = Foursquare.Checkins.add({
      venueId:venueId,
      broadcast:broadcast
    })
  }
  $scope.getCheckin = function (checkinId) {
    $scope.data = Foursquare.Checkins.get({
      checkinId:checkinId
    })
  }

  $scope.search = function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      $scope.$apply(function () {
        $scope.pos  = pos
        $scope.data = Foursquare.search(pos) 
      })
    })
  }

  $scope.getList = function (listId) {
    $scope.data = Foursquare.Lists.get({
      listId:listId
    })
  }
  $scope.addList = function (name) {
    $scope.data = Foursquare.Lists.add({
      name:name
    })
  }
});
