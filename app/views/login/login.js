'use strict';


angular.module('appTmp.login', ['ngRoute']);

appTmp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  });
});



// LoginCtrl
appTmp.controller('LoginCtrl', function($scope, $http, $route, $routeParams, $location, AuthenticationService, FlashService) {
                                
    $scope.currentPath = $location.path();
    
    $('body').addClass('activeLogin');
    $('.site-navbar, .site-menubar, .site-footer').hide();
   
    
    var vm = this;

    vm.login = login;

    (function initController() {
         // reset login status
         AuthenticationService.ClearCredentials();
    })();

    function login() {
        
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/dashboard');
                    $('.site-navbar, .site-menubar, .site-footer').show();
                } else {
                    FlashService.Error(response.message);
                    console.log(response.message);
                    vm.dataLoading = false;
                }
            })
        }
    
    
   
          
});
    