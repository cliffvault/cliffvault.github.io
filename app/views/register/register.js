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
appTmp.controller('RegisterCtrl', function(UserService, $scope, $http, $route, $routeParams, $location, $rootScope, FlashService) {
                                
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
                        FlashService.Success('Welcome! You are successfully registered, please login to continue', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error('Your account creation request failed, please try again later');
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
    




  appTmp.directive('ngUnique', ['$http', function (async) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    elem.on('blur', function (evt) {
                        scope.$apply(function () {                   
                            var val = elem.val();
                            //var req = { "username": val }
                            var ajaxConfiguration = { method: 'GET', url: apiUrl+'api/public/users/'+val };
                            async(ajaxConfiguration)
                                .success(function(data, status, headers, config) {                                    
                                    //ctrl.$setValidity('unique', data.username);                                
                                    if (val === data.username) {
                                        scope.takenErrorMsg = 'Username already exists';
                                    } else {
                                         scope.takenErrorMsg = '';
                                    }
                                });                                
                        });
                    });
                }
            }
    }]);