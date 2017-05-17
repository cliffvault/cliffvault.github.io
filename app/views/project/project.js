'use strict';

angular.module('appTmp.project', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-project', {
    templateUrl: 'views/project/add.html',
    controller: 'ProjectformCtrl'
  })
  .when('/list-project', {
    templateUrl: 'views/project/list.html',
    controller: 'ListProjectsCtrl'
  })
  .when('/edit-project/:id', {
      templateUrl: 'views/project/edit.html',
      controller: 'EditProjectsCtrl'
   });
}])


// ProjectformCtrl
appTmp.controller('ProjectformCtrl', function($rootScope, $scope, $http, $location, $filter, DataCollection, growl) {
	
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
	
	
	// Employees
	function getEmployee() {
        DataCollection.getEmployee()
            .success(function (res) {               
			     $scope.listEmployee = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getEmployee();
	
	
	
	// Clients
	function getClients() {
        DataCollection.getClients()
            .success(function (res) {               
			     $scope.listClient = res;		
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getClients();
		
	
	/*
	// Project
	function getProjects() {
		DataCollection.getProjects()
			  .success(function (res) {               
				   $scope.listProjects = res;	
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getProjects();
	*/
	
	
	// Fetch Project managers from Department
	$scope.fetchPmsFromDep = function() {
		var d_id = $scope.AddProjectFormData.p_department;
	}
	
	
	// Clone Sprints
	
	// http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array

	//console.log($scope.AddProjectFormData.no_of_sprints)
	
	//$scope.cloneNumber = $scope.AddProjectFormData.no_of_sprints;
	$scope.getCloneNumber = function(num) {
		return new Array(num);   
	}
	
	
	// For Expand / Collapse
	$scope.active = false;
	
	
	
	$scope.fillForm = function() {
	
			$scope.AddProjectFormData.client = 2;
			$scope.AddProjectFormData.created_by = 'admin@cliffsupport.com';
			$scope.AddProjectFormData.estimated_end_date = 'Wednesday, March 15, 2017';
			$scope.AddProjectFormData.no_of_sprints	= 2;
			$scope.AddProjectFormData.p_description = '<p>sdf </p>';
			$scope.AddProjectFormData.p_duration = 3;
			$scope.AddProjectFormData.p_name = 'sdf';
			$scope.AddProjectFormData.pm_id	= 2;
			$scope.AddProjectFormData.priority = 'Urgent';
			$scope.AddProjectFormData.project_code = '54';
			/*$scope.AddProjectFormData.sprint_description_[1] = '<p>sdf </p>';
			$scope.AddProjectFormData.sprint_description_[2] = '<p>sdfdsf</p>';
			$scope.AddProjectFormData.sprint_end_date_[1] = 'Thursday, March 2, 2017';
			$scope.AddProjectFormData.sprint_end_date_[2] = 'Wednesday, March 8, 2017';
			$scope.AddProjectFormData.sprint_start_date_[1] = 'Wednesday, March 1, 2017';
			$scope.AddProjectFormData.sprint_start_date_[2]	= 'Wednesday, March 1, 2017';*/
			$scope.AddProjectFormData.status = 'Not Started';
			$scope.AddProjectFormData.type = 'Scrum';
		console.log($scope.AddProjectFormData);
	}
	

	/*
	$scope.$watch('AddProjectFormData.no_of_sprints', function(newVal, oldVal){
		//alert('ooooooooooooops');
	});
	*/
	
	
	// Add new Project
	$scope.addProjectFormSubmit = function() {
		
		
		
			 $scope.dataLoadingGif = true;
		
			 $scope.AddProjectFormData.created_by = $rootScope.UserMail;
		
			console.log($scope.AddProjectFormData);
		
			 var data = $.param( $scope.AddProjectFormData );
		
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.post(apiUrl+'api/public/addProject', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
						 $scope.AddProjectFormData = {};
						 growl.success("Added new project successfully");
						 $scope.dataLoadingGif = false;
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Project code already exist");
						  $scope.dataLoadingGif = false;
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
				 	 $scope.dataLoadingGif = false;
         });
		 
		 
		 
	} //End addProjectFormSubmit
	
	
	
});
// End ProjectformCtrl

	

// ListProjectsCtrl
appTmp.controller('ListProjectsCtrl', function($rootScope, $scope, $http, $location, $routeParams, $filter, DataCollection, growl, SweetAlert) {
	
	
	// Project
	function getProjects() {
		DataCollection.getProjects()
			  .success(function (res) {               
				   $scope.listProjects = res;
				   
				     // Function for pagination
					 $scope.viewbyProj = 5;
					 $scope.totalItemsProj = $scope.listProjects.length;
					 $scope.currentPageProj = 1;
					 $scope.itemsPerPageProj = $scope.viewbyProj;
					 $scope.maxSizeProj = 10; //Number of pager buttons to show

					 $scope.setPageProj = function (pageNo) {
						 $scope.currentPageProj = pageNo;
					 };

					 $scope.pageChangedProj = function () {
						 console.log('Page changed to: ' + $scope.currentPageProj);
					 };

					 $scope.setitemsPerPageProj = function (num) {
						 $scope.itemsPerPageProj = num;
						 $scope.currentPageProj = 1; //reset to first paghe
					 }

				
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getProjects();
	
	
	// Refresh Project List
	$scope.refreshListProject = function() {
		getProjects();
	}
	
	
	//SlidePanel
	$scope.toggleSlidePanel = function(project_id) {
		
		// show slide panel
		$scope.ShowSlide = true;
		
		// Get Current Project
		$scope.currentProject = $filter('filter')($scope.listProjects, {prj_id: project_id},true);
		$scope.currentProject = $scope.currentProject[0];
		
		
	} // End toggleSlidePanel Fn
	
	
	// Close slide panel
	$scope.slidePanelClose = function() {
		$scope.ShowSlide = false;
	}
	
	
	// Delete Project
	$scope.deleteProject = function (idx, project_id, project_code) {
		
		SweetAlert.swal({
		   title: "Are you sure?",
		   text: "Your will not be able to recover this project ("+project_code+") !",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
		   cancelButtonText: "No, cancel plx!",
		   closeOnConfirm: false,
		   closeOnCancel: false }, 
		function(isConfirm){ 
		   if (isConfirm) {			   
			  	$http.delete(apiUrl+'api/public/deleteProject/'+project_id).success(function (data, status) {
					
					if (data.message == "Deleted") {				  
						$scope.listProjects.splice(idx,1);
						SweetAlert.swal("Deleted!", "Project ("+ project_code +") has been deleted.", "success");
		   	    	} else {
						growl.error("Error, please try again!");
					}
					
				})
				.error(function (data) {
					growl.error("Error, please try again!");
				});				
		   } else {
			  SweetAlert.swal("Cancelled", "Project ("+project_code+") is safe :)", "error");
		   }
		});
		
		
		
		/*

            $http.delete(apiUrl+'api/public/deleteProject/'+project_id).success(function (data, status) {
                $scope.ServerResponse = data;
            })
            .error(function (data) {
                growl.error("Error, please try again!");
            });
		*/
     };
	
	
	
});
// End ListProjectsCtrl



// EditProjectsCtrl
appTmp.controller('EditProjectsCtrl', function($rootScope, $route, $scope, $http, $location, $routeParams, $filter, DataCollection, growl, ModalService) {
	
	
	// Project
	function getProjects() {
		DataCollection.getProjects()
			  .success(function (res) {               
				   $scope.listProjects = res;
				   $scope.currentEditProject = $filter('filter')($scope.listProjects, {prj_id: $routeParams.id});
				   $scope.currentEditProject = $scope.currentEditProject[0];
				   // get init data for edit form
				   $scope.editProjectFormData = angular.copy($scope.currentEditProject);
			
			  })
			  .error(function (error) {
				   console.log(error.message);
		});
	}
	getProjects();
	
	
	// Employees
	function getEmployee() {
        DataCollection.getEmployee()
            .success(function (res) {               
			     $scope.listEmployee = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getEmployee();
	
	
	// Clients
	function getClients() {
        DataCollection.getClients()
            .success(function (res) {               
			     $scope.listClient = res;		
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getClients();
	
	
	
	$scope.getCloneNumber = function(num) {
		return new Array(num);   
	}
	
	// Function for add new sprint
	$scope.addNewSprint = function() {
		
		ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "EditProjectsCtrl"
        }).then(function(modal) {
            modal.element.modal();
			/*
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
				console.log($scope.message);
            });
			*/
        });
		
	}
	
	// Post new sprint and close modal
	$scope.closeAddSprintModal = function(proj_id, num_sprint) {
		
		$scope.editProjectSprintFormData.p_id = proj_id;
		$scope.editProjectSprintFormData.sprint_stage = 'Sprint '+(num_sprint+1);
		$scope.editProjectSprintFormData.created_by = $rootScope.UserMail;
		$scope.editProjectSprintFormData.no_of_sprints = (num_sprint+1);
		
		var data = $.param( $scope.editProjectSprintFormData );
		
		var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
        };
		$http.post(apiUrl+'api/public/addSprint', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 //$scope.listPlatforms.unshift({d_platform: $scope.newPlatform.d_platform});
						 //$scope.AddProjectFormData = {};
						 
						 $scope.editProjectSprintFormData = {};
						 getProjects();
						 getEmployee();
						 getClients();
						  
						 growl.success("Successfully Added New Sprint");
						  
						 $route.reload();
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Failed");
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
				
					 //$scope.editProjectFormData.sprint.push({sprint_stage: $scope.editProjectSprintFormData.sprint_stage});
			
					 //console.log($scope.editProjectFormData.sprint);
			
        });
		
		
	};
	
	
	
	
	
	// Edit Project Fn
	$scope.editProjectFormSubmit = function() {
		
			 $scope.dataLoadingGif = true;
		
			 var data = $.param( $scope.editProjectFormData );
		
			 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
             };
			 $http.put(apiUrl+'api/public/editProject', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						  
					  	 //$scope.listPlatforms.unshift({d_platform: $scope.newPlatform.d_platform});
						 //$scope.AddProjectFormData = {};
						 growl.success("Successfully edited");
						 $scope.dataLoadingGif = false;
						  						  
		   	    	  } else if (data.success == "exist") {
						  growl.error("Failed");
						  $scope.dataLoadingGif = false;
					  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
				 	 $scope.dataLoadingGif = false;
         });
		 
	} //End addProjectFormSubmit
	

	
	
});
// End EditProjectsCtrl


