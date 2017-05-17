'use strict';


angular.module('appTmp.register', ['ngRoute']);

appTmp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'vm'
  });
});



// LoginCtrl
appTmp.controller('RegisterCtrl', function(UserService, $scope, $http, $route, $routeParams, $location, $rootScope, FlashService, $translate) {
                                
    $scope.currentPath = $location.path();
    
    $('body').addClass('activeLogin');
    $('.site-navbar, .site-menubar, .site-footer').hide();
   
    
    // For background poster
    $scope.loginBgImages = [
        'resources/images/register/img1.jpg',
        'resources/images/register/img2.jpg',
        'resources/images/register/img3.jpg'
    ];
    
    
    var vm = this;

    vm.register = register;

    function register() {
       vm.dataLoading = true;
       UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success($translate.instant('REGISTER_SUCCESS'), true);
                        $location.path('/login');
                    } else {
                        FlashService.Error($translate.instant('REGISTER_ERROR'));
                        vm.dataLoading = false;
                    }
            });
    }
    
    
    
    /*
      $http.get($scope.apiUrl+'api/public/todos')
       .then(function(res){
       $scope.test = res.data;
    });
    */
    
          
});
    



  