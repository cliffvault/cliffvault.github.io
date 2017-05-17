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
  'pascalprecht.translate',
  'validation.match',
  'angular-matchheight',
  'google.places',
  'angular-growl',
  'angularMoment',
  'uiSwitch',
//  'angular-sanitize',
  'textAngular',
  '720kb.datepicker',
  'oitozero.ngSweetAlert',
  'ng-file-input',
  'ang-drag-drop',
  'angularModalService',
  'timer',
  'appTmp.AuthService',
  'appTmp.FlashService',
  'appTmp.UserService',
  'appTmp.login',
  'appTmp.register',
  'appTmp.dashboard',
  'appTmp.employee',
  'appTmp.role',
  'appTmp.designation',
  'appTmp.department',
  'appTmp.platform',
  'appTmp.project',
  'appTmp.task',
  'appTmp.view1',
  'appTmp.view2',
  'appTmp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);


appTmp.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});


appTmp.run(function(amMoment) {
    amMoment.changeLocale('en');
});


appTmp.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(5000);
  growlProvider.globalPosition('bottom-center');
}]);




appTmp.run(['$rootScope', '$route', '$location', '$cookieStore', '$http', 'growl', 'SweetAlert', function($rootScope, $route, $location, $cookieStore, $http, growl, SweetAlert) {
	
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {        
       // redirect to login page if not logged in and trying to access a restricted page
       var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
		
       var loggedIn = $rootScope.globals.currentUser;
		
		if ( loggedIn == null ) {
			console.log('Welcome to Cliffvault');
		} else {
			// Checking the role of loggedin user
		    var loggedUsername = loggedIn.username;		
			$rootScope.loggedUsername = loggedUsername;
		    $http.get(apiUrl+'api/public/users/'+loggedUsername)
				  .then(function(res){
					  $rootScope.UserRole = res.data.role;
					  $rootScope.UserMail = res.data.created_by;
		    });
		}
		
       if (restrictedPage && !loggedIn) {
            $location.path('/login');
       } 
    });
	
    
}]);




// Service for Collecting all intial datas
appTmp.factory('DataCollection', ['$http', function ($http) {

    var DataCollection = {};

	// For Employees
    DataCollection.getEmployee = function () {
        return $http.get(apiUrl+'api/public/employees');
    };
	
	// For Roles
	DataCollection.getRoles = function () {
        return $http.get(apiUrl+'api/public/roles');
    };
	
	// For Designations
	DataCollection.getDesignations = function () {
        return $http.get(apiUrl+'api/public/designations');
    };
	
	// For Platforms
	DataCollection.getPlatforms = function () {
        return $http.get(apiUrl+'api/public/platforms');
    };
	
	// For Departments
	DataCollection.getDepartments = function () {
        return $http.get(apiUrl+'api/public/departments');
    };
	
	// For Blood groups
	DataCollection.getBloodgroups = function () {
        return $http.get(apiUrl+'api/public/bloodgroups');
    };
	
	// For Status
	DataCollection.getStatus = function () {
        return $http.get(apiUrl+'api/public/status');
    };
	
	// For Projects
	DataCollection.getProjects = function () {
        return $http.get(apiUrl+'api/public/getProject');
    };
	
	// For Clients
	DataCollection.getClients = function () {
        return $http.get(apiUrl+'api/public/getClient');
    };
	
	// For Tasks
	DataCollection.getTasks = function () {
        return $http.get(apiUrl+'api/public/getTask');
    };
	
	// For SubTasks
	DataCollection.getSubTasks = function () {
        return $http.get(apiUrl+'api/public/getSubTask');
    };
	
	// For SubTasks
	DataCollection.getTaskAttachments = function () {
        return $http.get(apiUrl+'api/public/getTaskAttachment');
    };
	
	
    DataCollection.addStudent = function (stud) {
        return $http.post(urlBase + '/AddStudent', stud);
    };
	
    return DataCollection;

}]);



// Directive for check unique username
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
                                    if (val === data.uname) {
                                        scope.takenErrorMsg = true;
                                    } else {
                                        scope.takenErrorMsg = false;
                                    }
                                });                                
                        });
                    });
                }
            }
    }]);


// Directive for file upload
appTmp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

// Service for file upload
appTmp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);



// Service for Task Timer Data collection
appTmp.factory('timerDataService', function(){
  return {
	  
    timerData: {
	  timerRunning: '',
	  timerResume: '',
	  timerPause: '',
	  timerStop: '',
	  timerPausePlay: '',
	  manuallTimeAdding: '',
	  timerToggle: false,
      id: '',
      task_id: '',
      task: '',
	  project_name: '',
	  estimated_time: '',
	  logged_time: '',
	  totalTime: '',
	  newTotalTime: '',
	  loggedSeconds: ''
    }
    // Other methods or objects can go here
	
  };
});




// MainCtrl
appTmp.controller('MainCtrl', function($scope, $http, $route, $routeParams, $filter, $location, $translate, AuthenticationService, $rootScope, DataCollection, SweetAlert, timerDataService) {
    
    $('body').show();
    
    $scope.apiUrl = 'http://dev.syntrio.in/cliffvault/';
    $scope.imageUrl = 'http://dev.syntrio.in/cliffvault/app/resources/images/';
    $scope.taskAttachmentUrl = 'http://dev.syntrio.in/cliffvault/app/resources/task-attachments/';
    
    $scope.currentPath = $location.path();
    
    $scope.Math = window.Math;

      // Langauage selection
      var ctrl = this;
      ctrl.language = 'en';
      ctrl.languages = ['en', 'es'];
      ctrl.updateLanguage = function() {
          $translate.use(ctrl.language);
      };
    
	
		// Role / Permissions
		$rootScope.IsCompany = function(){
			return $scope.UserRole == "1";
		}

		$rootScope.IsAdmin = function(){
			return $scope.UserRole == "2";
		}

		$rootScope.IsPm = function(){
			return $scope.UserRole == "3";
		}

		$rootScope.IsTm = function(){
			return $scope.UserRole == "4";
		}

		$rootScope.IsHr = function(){
			return $scope.UserRole == "5";
		}
		
	
		/*
      // Collecting all intial datas
	  $scope.getData = function(){
	  	   // For Employees
           $http.get(apiUrl+'api/public/employees')
              .then(function(res){
                  $scope.listEmployee = res.data;
           });
	   };
       // setInterval($scope.getData, 1000);
       $scope.getData();
		*/
		
		
		// Functions for Task Timer
		$scope.timerData = timerDataService.timerData;
	
	
		$scope.timerData.timerRunning = false;
		$scope.timerData.timerPause = true;
		$scope.timerData.timerStop = true;
	
	
		// Fetching current time from Timer
		$scope.$on('timer-tick', function (event, data) {
			if ($scope.timerData.timerRunning === true) {
				$scope.timerData.logged_time = data;
				$scope.timerData.loggedSeconds = moment.duration($scope.timerData.logged_time, "HH:mm:ss").asSeconds();
				$scope.timerData.newTotalTime = moment("1900-01-01 00:00:00").add(parseInt($scope.timerData.totalTime) + parseInt($scope.timerData.loggedSeconds), 'seconds').format("HH:mm:ss");
				
//				console.log("total - " + $scope.timerData.newTotalTime);
				
			}
		});
		

	
	
		$scope.startTimer = function (subTaskId) {
			$scope.$broadcast('timer-start');
			$scope.timerData.timerRunning = true;
			$scope.timerData.timerResume = true;
			$scope.timerData.timerPause = false;
			$scope.timerData.timerStop = false;
			$scope.timerData.totalTime = moment.duration($scope.timerData.totalTime, "HH:mm:ss").asSeconds();
			
//			console.log("time now-" + $scope.timerData.totalTime);
			
			//console.log($scope.timerData);
		}
		
		
		
		$scope.resumeTimer = function () {
			$scope.$broadcast('timer-resume');
			$scope.timerData.timerResume = true;
			$scope.timerData.timerPause = false;
			$scope.timerData.timerStop = false;
			
		}
		
		
		$scope.pauseTimer = function(id) {
			$scope.$broadcast('timer-stop');
			$scope.timerData.timerResume = false;
			$scope.timerData.timerPause = true;
			var data = $.param({
				id: id,
				total_time: moment.duration($scope.timerData.newTotalTime, "HH:mm:ss").asSeconds(),
				status: 1
			});
			var headers = {	'Content-Type': 'application/x-www-form-urlencoded'	};

			$http.put(apiUrl + 'api/public/totaltime', data, {
				headers: headers
			}).success(function (data, status) {
				
				//$scope.timerData.totalTime = moment.duration($scope.timerData.newTotalTime, "HH:mm:ss").asSeconds();
				
				//$scope.timerData.totalTime = $scope.timerData.newTotalTime;
				
				//console.log($scope.timerData.totalTime);

			}).error(function (data) {
				growl.error("Error, please try again!");
			});
			
		};
		
	
	
		$scope.stopTimer = function (task_id, task_name) {
			
			$scope.$broadcast('timer-stop');
			$scope.timerData.timerRunning = true;
			$scope.timerData.timerPause = true;
			
			SweetAlert.swal({
			   title: "Logged Hours - "+$scope.timerData.newTotalTime,
			   text: "For "+task_name,
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Resolve",
			   cancelButtonText: "No, cancel!",
			   closeOnConfirm: true,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {		
				   
				    var data = $.param({
						id: task_id,
						total_time: moment.duration($scope.timerData.newTotalTime, "HH:mm:ss").asSeconds(),
						status: 2
					});
		
					var headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};

					$http.put(apiUrl + 'api/public/totaltime', data, {
						headers: headers
					}).success(function (data, status) {
					    $scope.$broadcast('timer-clear');
					    $scope.timerData.timerToggle=false;
						$scope.timerData.timerRunning = false;
						
						// Reload Route
						$route.reload();
						
						
					}).error(function (data) {
						growl.error("Error, please try again!");
					});			
				   
			   } else {
				  SweetAlert.swal("Cancelled", "You can continue on "+task_name+" :)", "error");
				   	  $scope.timerData.timerResume = false;
					  $scope.timerData.timerPause = true;	
			   }
			});
			
			
		};
		
		
	//$scope.startTime = Date.now() - 60000;
		
	/*
		$scope.$on('timer-tick', function (event, data) {
			if ($scope.timerRunning === true) {
				$scope.$apply($scope.test);
				console.log($scope.seconds);
			}
		});
	*/
		
		
		
    
});


