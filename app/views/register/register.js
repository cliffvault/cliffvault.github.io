'use strict';


angular.module('appTmp.register', ['ngRoute']);

appTmp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register/register.html',
    controller: 'RegisterCtrl'
  });
});



// LoginCtrl
appTmp.controller('RegisterCtrl', function($scope, $http, $route, $routeParams, $location, $rootScope, FlashService) {
                                
    $scope.currentPath = $location.path();
    
    $('body').addClass('activeLogin');
    $('.site-navbar, .site-menubar, .site-footer').hide();
   
    
    
    var vm = this;

    vm.register = register;

    function register() {
       vm.dataLoading = true;
       UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
    }
    
    
    
   
          
});
    