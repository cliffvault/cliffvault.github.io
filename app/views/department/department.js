'use strict';

angular.module('appTmp.department', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/department', {
    templateUrl: 'views/department/add.html',
    controller: 'DepartmentCtrl'
  });
}])


// DepartmentCtrl
appTmp.controller('DepartmentCtrl', function($scope, $http, $location, $filter, DataCollection, growl) {
	
	// Department
	function getDepartments() {
		DataCollection.getDepartments()
			  .success(function (res) {               
				   $scope.listDepartments = res;	
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getDepartments();
	
	
	// Add new Department
	$scope.addDepartmentFormSubmit = function() {
		
			 var data = $.param( $scope.newDepartment );
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.post(apiUrl+'api/public/addDepartment', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 $scope.listDepartments.unshift({d_department: $scope.newDepartment.d_department});
						 $scope.newDepartment = {};
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Department already exist");
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
         });
		 
	} //End addDepartmentFormSubmit
	
	
	// Save Edited Department
	$scope.editDepartment = function(new_department, $data) {
			var d_id = $data;
			var data = { 'd_id': d_id, 'd_department': new_department };
			$http.put(apiUrl+'api/public/editDepartment', data).success(function (data, status) {
				if (data.success == "true") {
					// For getting all Departments
				} else if (data.success == "exist") {
				    growl.error(new_department+' already exist');
					getDepartments();
				}
			});
	 };
	
	
});
// End DepartmentCtrl

	
