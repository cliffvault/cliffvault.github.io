'use strict';

angular.module('appTmp.platform', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/platform', {
    templateUrl: 'views/platform/add.html',
    controller: 'PlatformCtrl'
  });
}])


// PlatformCtrl
appTmp.controller('PlatformCtrl', function($scope, $http, $location, $filter, DataCollection, growl) {
	
	// Platform
	function getPlatforms() {
		DataCollection.getPlatforms()
			  .success(function (res) {               
				   $scope.listPlatforms = res;	
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getPlatforms();
	
	
	// Add new Platform
	$scope.addPlatformFormSubmit = function() {
		
			 var data = $.param( $scope.newPlatform );
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.post(apiUrl+'api/public/addPlatform', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 $scope.listPlatforms.unshift({d_platform: $scope.newPlatform.d_platform});
						 $scope.newPlatform = {};
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Platform already exist");
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
         });
		 
	} //End addPlatformFormSubmit
	
	
	// Save Edited Platform
	$scope.editPlatform = function(new_platform, $data) {
			var pf_id = $data;
			var data = { 'pf_id': pf_id, 'd_platform': new_platform };
			$http.put(apiUrl+'api/public/editPlatform', data).success(function (data, status) {
				if (data.success == "true") {
					// For getting all Platforms
				} else if (data.success == "exist") {
				    growl.error(new_platform+' already exist');
					getPlatforms();
				}
			});
	 };
	
	
});
// End PlatformCtrl

	
