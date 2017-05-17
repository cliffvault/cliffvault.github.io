'use strict';

angular.module('appTmp.role', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/role', {
    templateUrl: 'views/role/add.html',
    controller: 'RoleCtrl'
  });
}])


// RoleCtrl
appTmp.controller('RoleCtrl', function($scope, $http, $location, $filter, DataCollection, growl) {
	
	// Roles
	function getRoles() {
		DataCollection.getRoles()
			  .success(function (res) {               
				   $scope.listRoles = res;	
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getRoles();
	
	
	// Add new role
	$scope.addRoleFormSubmit = function() {
		
			 var data = $.param( $scope.newRole );
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.post(apiUrl+'api/public/addRole', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 $scope.listRoles.unshift({role: $scope.newRole.role});
						 $scope.newRole = {};
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Role already exist");
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
         });
		 
	} //End addRoleFormSubmit
	
	
	// Save Edited Role
	$scope.editRole = function(new_role, $data) {
			var r_id = $data;
			var data = { 'r_id': r_id, 'role': new_role };
			$http.put(apiUrl+'api/public/editRole', data).success(function (data, status) {
				if (data.success == "true") {
					// For getting all roles
				} else if (data.success == "exist") {
				    growl.error("Role already exist");
					getRoles();
				}
			});
	 };
	
	
});
// End RoleCtrl

	
