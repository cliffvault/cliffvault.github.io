'use strict';

// Declare app level module which depends on views, and components
var appTmp = angular.module('appTmp', [
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute',
  'ngFitText',
  'ng-backstretch',
  'ngCookies',
  'ui',  
  'angularScreenfull',
  'ngImgCrop',
  'xeditable',
  'validation.match',
  'appTmp.AuthService',
  'appTmp.FlashService',
  'appTmp.UserService',
  'appTmp.login',
  'appTmp.register',
  'appTmp.dashboard',
  'appTmp.employee',
  'appTmp.view1',
  'appTmp.view2',
  'appTmp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/login'});
}]);


appTmp.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});


appTmp.run(['$rootScope', '$route', '$location', '$cookieStore', '$http', function($rootScope, $route, $location, $cookieStore, $http) {
    
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['Content-Type'] = 'application/json'
    
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {        
       
       // redirect to login page if not logged in and trying to access a restricted page
       var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
       var loggedIn = $rootScope.globals.currentUser;
       if (restrictedPage && !loggedIn) {
            $location.path('/login');
       } 
        
    });
    
}]);


// MainCtrl
appTmp.controller('MainCtrl', function($scope, $http, $route, $routeParams, $location) {
    
    $('body').show();
    
    $scope.apiUrl = 'http://dev.syntrio.in/cliffvault/';
    
    $scope.currentPath = $location.path();
    
    $scope.Math = window.Math;
    
});