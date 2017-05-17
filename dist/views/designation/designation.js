'use strict';

angular.module('appTmp.designation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/designation', {
    templateUrl: 'views/designation/add.html',
    controller: 'DesignationCtrl'
  });
}])


// RoleCtrl
appTmp.controller('DesignationCtrl', function($scope, $http, $location, $filter, DataCollection, growl) {
	
	// Designations
	function getDesignations() {
		DataCollection.getDesignations()
			  .success(function (res) {               
				   $scope.listDesignations = res;	
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getDesignations();
	
	
	// Add new Designation
	$scope.addDesignationFormSubmit = function() {
		
			 var data = $.param( $scope.newDesignation );
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.post(apiUrl+'api/public/addDesignation', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 $scope.listDesignations.unshift({designation: $scope.newDesignation.designation});
						 $scope.newDesignation = {};
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Designation already exist");
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
         });
		 
	} //End addDesignationFormSubmit
	
	
	// Save Edited Designation
	$scope.editDesignation = function(new_designation, $data) {
			var id = $data;
			var data = { 'id': id, 'designation': new_designation };
			$http.put(apiUrl+'api/public/editDesignation', data).success(function (data, status) {
				if (data.success == "true") {
					// For getting all roles
				} else if (data.success == "exist") {
				    growl.error("Designation already exist");
					getDesignations();
				}
			});
	 };
	
	
});
// End RoleCtrl

	
