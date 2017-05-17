'use strict';

angular.module('appTmp.task', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/taskboard', {
    templateUrl: 'views/task/taskboard.html',
    controller: 'TaskFormCtrl'
  })
  .when('/list-task', {
    templateUrl: 'views/task/list.html',
    controller: 'ListTasksCtrl'
  })
  .when('/edit-task/:id', {
      templateUrl: 'views/task/edit.html',
      controller: 'EditTaskCtrl'
   });
}])



// Service for Resolve Task Modal
appTmp.factory('resolveDataModalService', function(){
  return {	  
    resolveData: {
	  id: '',
	  subtask: '',
	  manualLoggedTime: ''
    }	
  };
});




// TaskFormCtrl
appTmp.controller('TaskFormCtrl', function($rootScope, $routeParams, $scope, $http, $location, $filter, DataCollection, growl, SweetAlert, ModalService, timerDataService, fileUpload, resolveDataModalService) {
	
	$(document).ready(function(){
		$('[data-toggle="popover"]').popover();   
	});
	
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
				   console.log('Projects loading error, please try again!');
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
	
	
	// Tasks
	function getTasks() {
        DataCollection.getTasks()
            .success(function (res) {               
			     $scope.listTask = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getTasks();
	
	
	// SubTasks
	function getSubTasks() {
        DataCollection.getSubTasks()
            .success(function (res) {               
			     $scope.listSubTask = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getSubTasks();
	
	
	// Task Attachments
	function getTaskAttachments() {
        DataCollection.getTaskAttachments()
            .success(function (res) {               
			     $scope.listTaskAttachments = res;		
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getTaskAttachments();
	
	
	// Function for check project type while select project
	$scope.checkProType = function(prj_id) {
		$scope.currentProjectType = $filter('filter')($scope.listProjects, {prj_id: prj_id});
		$scope.currentProjectType = $scope.currentProjectType[0];
		$scope.addTaskFormData.type = $scope.currentProjectType.type;
	}
	
	
	// Function for add new task button click
	$scope.addTaskToggle = function() {
		$scope.addNewTaskTodoToggle = true;
	}
	
	
	// Add new Task
	$scope.addTaskFormSubmit = function() {		
				
			$scope.addTaskFormData.created_by = $rootScope.UserMail;
		
			console.log($scope.addTaskFormData);
		
			var data = $.param( $scope.addTaskFormData );
		
			var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
		
			$http.post(apiUrl+'api/public/addTask', data, { headers: headers }).success(function(data, status) {
					  if (data.success == "true") {
						 $scope.addTaskFormData = {};
						 growl.success("Added new task successfully");
						 $scope.dataLoadingGif = false;
		   	    	  }
             }).error(function(data) {
                     growl.error("Error, please try again!");
				 	 $scope.dataLoadingGif = false;
         });
		 
		 
	} //End addTaskFormSubmit
	
	
	//SlidePanel
	$scope.toggleSlidePanel = function(task_id) {
		
		// show slide panel
		$scope.ShowSlide = true;
		//$scope.currentTaskEmploySplit = {};
		//$scope.currentTaskEmployeesList = {};
		
		// Get Current Task Details
		$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
		$scope.currentTask = $scope.currentTask[0];
		
		// Get Task Attachments
		$scope.listCurrentTaskAttachments = $filter('filter')($scope.listTaskAttachments, {task_id: task_id},true);
		
		
		// Get Overall Time of tasks
		var allTasksTotalTime = [];
		angular.forEach($scope.currentTask.subtasks, function(value, key) {
			this.push(value.total_time);
		}, allTasksTotalTime);
		
		$scope.allTasksTotalTime = allTasksTotalTime.reduce((p,c) => p + c);
		
		// check allTasksTotalTime is greater than estimated time
		if( $scope.allTasksTotalTime > $scope.currentTask.estimated_time ) {
			var a = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
			$scope.currentTask.allTasksTotalTime = a;
			$('.timeFlowTxt').empty();
			$('.timeFlowTxt').text('Exceeded');
			$scope.exceededEstToggle = true;
		} else {
			var b = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
			b = Math.abs(b);
			$scope.currentTask.allTasksTotalTime = b;
			$('.timeFlowTxt').empty();
			$('.timeFlowTxt').text('Remaining');
			$scope.exceededEstToggle = false;
		}
		
		// Push to currentTask scope
		//$scope.currentTask.allTasksTotalTime = $scope.allTasksTotalTime;
		
		
		// Get Current Sub Task List from Task
		//$scope.listSubTaskFromTask = $filter('filter')($scope.listSubTask, {task_id: task_id},true);
		
		
		
		var tm_id_chk = '["'+$scope.currentTask.tm_id+'"]';
		
		if (tm_id_chk.indexOf(',') != -1) {
			$scope.currentTaskEmploySplit = $scope.currentTask.tm_id.split(',');
			$scope.currentTaskEmploySplit = $scope.currentTaskEmploySplit.map(Number);
		} else {
			$scope.currentTaskEmploySplit = tm_id_chk;
		}
		
		
		//$scope.currentTaskEmployeesList = $filter('filter')($scope.listEmployee, {e_id: 3},true);
		
		//$scope.currentTaskEmployees = angular.copy($scope.currentTask);
		
		
	} // End toggleSlidePanel Fn
	
	
	// Close slide panel
	$scope.slidePanelClose = function() {
		$scope.ShowSlide = false;
	}
	
	
	// Add New Task to TODO List
	$scope.addNewTaskNameTodoForm = function() {
		
		 $scope.dataLoadingGif = true;
		
		 $scope.addNewTaskTodoName.p_id = 1;
		 $scope.addNewTaskTodoName.s_id = 1;
		 $scope.addNewTaskTodoName.created_by = $rootScope.UserMail;
		 $scope.addNewTaskTodoName.priority = 1;
		 $scope.addNewTaskTodoName.status = 1;
		 $scope.addNewTaskTodoName.type = 'Scrum';
		
		 //console.log($scope.addNewTaskTodoName);
		
		
		 var data = $.param( $scope.addNewTaskTodoName );
		
		 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
         };
		 $http.post(apiUrl+'api/public/addTask', data, { headers: headers }).success(function(data, status) {
			 			 $scope.addNewTaskTodoName.id = data.id;			 
			 			 $scope.listTask.push($scope.addNewTaskTodoName);
						 growl.success("Added new Task successfully");
						 $scope.dataLoadingGif = false;
			 			 $scope.addNewTaskTodoName = {};
             }).error(function(data) {
                     growl.error("Error, please try again!");
				 	 $scope.dataLoadingGif = false;
         });
		 
	}
	
	
	// Add New Task to DOING List
	$scope.addNewTaskNameDoingForm = function() {
		
		 $scope.dataLoadingGif = true;
		
		 $scope.addNewTaskDoingName.p_id = 1;
		 $scope.addNewTaskDoingName.s_id = 1;
		 $scope.addNewTaskDoingName.created_by = $rootScope.UserMail;
		 $scope.addNewTaskDoingName.priority = 1;
		 $scope.addNewTaskDoingName.status = 2;
		 $scope.addNewTaskDoingName.type = 'Scrum';
		
		 //console.log($scope.addNewTaskTodoName);
		
		 //high , medium low
		
		
		 var data = $.param( $scope.addNewTaskDoingName );
		
		 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
         };
		 $http.post(apiUrl+'api/public/addTask', data, { headers: headers }).success(function(data, status) {
			 			 $scope.addNewTaskDoingName.id = data.id;			 
			 			 $scope.listTask.push($scope.addNewTaskDoingName);
						 growl.success("Added new Task successfully");
						 $scope.dataLoadingGif = false;
			 			 $scope.addNewTaskDoingName = {};
             }).error(function(data) {
                     growl.error("Error, please try again!");
				 	 $scope.dataLoadingGif = false;
         });
		 
	}
	
	
	// Add Team members to Task
	$scope.addTMtoTask = function(e_id, task_id, tm_id, e_name, task) {
		
			var data = $.param(  { id: task_id, e_id: e_id, tm_id: tm_id } );
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			$http.put(apiUrl + 'api/public/addEmpToTask', data, {
				headers: headers
			}).success(function (data, status) {
				if (data.success == "true") {
					
					// Add new employee to list
					DataCollection.getTasks()
					.success(function (res) {     
						
						$scope.listTask = res;						
						$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
						$scope.currentTask = $scope.currentTask[0];
						
						var tm_id_chk = '["'+$scope.currentTask.tm_id+'"]';

						if (tm_id_chk.indexOf(',') != -1) {
							$scope.currentTaskEmploySplit = $scope.currentTask.tm_id.split(',');
							$scope.currentTaskEmploySplit = $scope.currentTaskEmploySplit.map(Number);
						} else {
							$scope.currentTaskEmploySplit = tm_id_chk;
						}
						
					})
					.error(function (error) {
						console.log(error.message);
					});
					growl.success("Added "+e_name+" to "+task+" successfully");
					
				} else if (data.success == "exist") {
					growl.success("Already exist");
				}
			}).error(function (data) {
				growl.error("Error, please try again!");
			});
		
	}
	
	
	// Delete Team members from Task (Update)
	$scope.removeTmFromTask = function(task_id, e_id, tm_id, e_name, task) {
		
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: e_name+" will be remove from "+task+"!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, remove "+e_name+"!",
			   cancelButtonText: "No, cancel plx!",
			   closeOnConfirm: true,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {		
				   
				    var data = $.param(  { id: task_id, e_id: e_id, tm_id: tm_id } );
		
					var headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};

					$http.put(apiUrl + 'api/public/deleteEmpToTask', data, {
						headers: headers
					}).success(function (data, status) {
						if (data.success == "true") {

							// Refresh employee list
							DataCollection.getTasks()
							.success(function (res) {     

								$scope.listTask = res;						
								$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
								$scope.currentTask = $scope.currentTask[0];

								var tm_id_chk = '["'+$scope.currentTask.tm_id+'"]';

								if (tm_id_chk.indexOf(',') != -1) {
									$scope.currentTaskEmploySplit = $scope.currentTask.tm_id.split(',');
									$scope.currentTaskEmploySplit = $scope.currentTaskEmploySplit.map(Number);
								} else {
									$scope.currentTaskEmploySplit = tm_id_chk;
								}

							})
							.error(function (error) {
								console.log(error.message);
							});
							growl.success("Removed "+e_name+" from "+task+" successfully");

						} else if (data.success == "exist") {
							growl.success("Already exist");
						}
					}).error(function (data) {
						growl.error("Error, please try again!");
					});
				   
								
			   } else {
				  SweetAlert.swal("Cancelled", ""+e_name+" will continue in "+task+" :)", "error");
			   }
			});
		
			
		
	}
	
	
	// Edit Priority of Task
	$scope.changeTaskPriority = function(value, id) {
	  
		 var data = $.param({ id: id, priority: value });		
		 var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
		 $http.put(apiUrl+'api/public/editTaskPriority', data, { headers: headers }).success(function(data, status) {
			 
             }).error(function(data) {
                     growl.error("Error, please try again!");
         });
		
	};
	
	
	
	//$scope.subTaskAddFormData = [];
	// Add SubTask
	$scope.subTaskAddFormSubmit = function(task_id) {
		
			$scope.dataLoadingGif = true;
		
			$scope.subTaskAddFormData.task_id = task_id;
			$scope.subTaskAddFormData.created_by = $rootScope.UserMail;
			
			var data = $.param( $scope.subTaskAddFormData );
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			$http.post(apiUrl + 'api/public/addSubTask', data, {
				headers: headers
			}).success(function (data, status) {
				
				
				if (data.success == "true") {
					
					// Upload function
					var fd = new FormData();
					for (var i in $scope.files) {
						fd.append("uploadedFile[]", $scope.files[i]);
					}
					fd.append("taskid", data.id);
					fd.append("mainTaskid", data.mainTaskid);
					
					$scope.progressVisible = true;
				
					var xhr = new XMLHttpRequest()
					xhr.upload.addEventListener("progress", uploadProgress, false);
					xhr.addEventListener("load", uploadComplete, false);
					xhr.addEventListener("error", uploadFailed, false);
					xhr.addEventListener("abort", uploadCanceled, false);
					xhr.open("POST", apiUrl + 'api/public/addAttachments');
					$scope.progressVisible = true;
					xhr.send(fd);
					
					
					$scope.listSubTask.unshift({ id: data.id, subtask: $scope.subTaskAddFormData.subtask });
					growl.success("Added New Subtask Successfully");
					$scope.subTaskAddFormData = {};
					$scope.dataLoadingGif = false;
					$scope.subTaskFillBoard = false;
					
					$('#fileToUpload').val('');
					$scope.files.length = 0;
					$scope.progressVisible = false;
					
					
						   // Refresh currentTask scope
							DataCollection.getTasks()
										.success(function (res) {               
											 $scope.listTask = res;			
												// Get Current Task Details
												$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
												$scope.currentTask = $scope.currentTask[0];
								
										})
										.error(function (error) {
											console.log(error.message);
										});
					
					
				} else if (data.success == "exist") {
					growl.success("Already exist");
					$scope.dataLoadingGif = false;
				}
			}).error(function (data) {
				growl.error("Error, please try again!");
				$scope.dataLoadingGif = false;
			});

	}
	
	
	
	// Show Subtask Details
	$scope.showSubtask = function(id, maintask) {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
			
			//$scope.currentSubtaskView = $filter('filter')($scope.listSubTask, {id: id});
			//$scope.currentSubtaskView = $scope.currentSubtaskView[0];
			
			//console.log($scope.currentSubtaskView)
			
			$rootScope.currentTaskID = id;
			$rootScope.currentTaskMain = maintask;
			
			
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
	
	
	/*
	$scope.dropSuccessHandler = function($event, index, task_id, task_status, array){
        
		//array.splice(index,1);
		console.log(task_status);
		  
		//console.log($event.target.closest().attr('class'));
		
		//var a = $event.target.attributes.class;
		
		//var b = $(a).closest('ul');
		
		//	console.log(b);
		
    };
      */
	
	
	// Function for Drag and Drop
	$scope.onDrop = function(target, source) {
		
			$scope.loaderInList = true;
		
			var headers = {	'Content-Type': 'application/x-www-form-urlencoded' };
			
			if (target == 1) {
				var data = $.param({ id: source, status: 1 });
			} else if (target == 2) {
				var data = $.param({ id: source, status: 2 });
			} else if (target == 3) {
				var data = $.param({ id: source, status: 3 });
			}
		
			$http.put(apiUrl + 'api/public/changeTaskStatus', data, { headers: headers }).success(function (data, status) {
					if (data.success == "true") {
							// Get tasklist
							DataCollection.getTasks()
							.success(function (res) {
								$scope.listTask = res;			
								$scope.currentTask = $filter('filter')($scope.listTask, {id: source},true);
								$scope.currentTask = $scope.currentTask[0];
								$scope.loaderInList = false;
							})
							.error(function (error) {
								console.log(error.message);
								$scope.loaderInList = false;
							});
						}
				}).error(function (data) {
						growl.error("Error, please try again!");
						$scope.loaderInList = false;
				});
			
        
        
        
    };
	
	
	
	// Function for Edit Estimate Time
	$scope.editEstimateToggle = function(task_id) {
		
  	    $scope.changedEstimatedTimeSec = moment.duration($scope.changedEstimatedTime, "HH:mm:ss").asSeconds();		
		
		if($scope.changedEstimatedTimeSec==0){
			$scope.changedEstimatedTimeValid = true;
		} else {
			var data = $.param({ id: task_id, estimated_time: $scope.changedEstimatedTimeSec });		
			var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
			$http.put(apiUrl+'api/public/editTaskEstTime', data, { headers: headers }).success(function(data, status) {
						 $scope.editEstimateToggleScope = {};
						 $scope.editEstimateToggleScope = false;
						 $scope.changedEstimatedTimeValid = false;
				
				
						 // Refresh currentTask scope
 						 DataCollection.getTasks()
								.success(function (res) {               
									 $scope.listTask = res;			
							 		
							 		    // Get Current Task Details
										$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
										$scope.currentTask = $scope.currentTask[0];

										// Get Overall Time of tasks
										var allTasksTotalTime = [];
										angular.forEach($scope.currentTask.subtasks, function(value, key) {
											this.push(value.total_time);
										}, allTasksTotalTime);

										$scope.allTasksTotalTime = allTasksTotalTime.reduce((p,c) => p + c);
										
							 			// check allTasksTotalTime is greater than estimated time
										if( $scope.allTasksTotalTime > $scope.currentTask.estimated_time ) {
											var a = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
											$scope.currentTask.allTasksTotalTime = a;
											$('.timeFlowTxt').empty();
											$('.timeFlowTxt').text('Exceeded');
											$scope.exceededEstToggle = true;
										} else {
											var b = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
											b = Math.abs(b);
											$scope.currentTask.allTasksTotalTime = b;
											$('.timeFlowTxt').empty();
											$('.timeFlowTxt').text('Remaining');
											$scope.exceededEstToggle = false;
										}
							 
							 
								})
								.error(function (error) {
									console.log(error.message);
								});
						
						
				
				
				 }).error(function(data) {
						 growl.error("Error, please try again!");
			});
		}
		
		 
        
    };
	
	
	// Function for Fetch current task description to editor for ready to edit
	$scope.editTaskDescFetchFn = function(task_id, current_desc) {		
		 $scope.editTaskDescToggle = true;		
		 $scope.editTaskDesc = current_desc;	
	}
	
	
	// Function for Edit Task Description
	$scope.editTaskDescFn = function(task_id) {
		
		 $scope.edtDataLoadingGif = true;
		
		 var data = $.param({ id: task_id, task_des: $scope.editTaskDesc });
		
		 var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
         };
		 $http.put(apiUrl+'api/public/editTaskDescription', data, { headers: headers }).success(function(data, status) {
			 		 $scope.currentTask.task_des = $scope.editTaskDesc;
			 		 $scope.editTaskDesc = {};
			 		 $scope.editTaskDescToggle = false;
			 		 $scope.edtDataLoadingGif = false;
             }).error(function(data) {
                     growl.error("Error, please try again!");
			 		 $scope.editTaskDescToggle = false;
			 		 $scope.edtDataLoadingGif = false;
         });
        
    };
	
	
	// Function for Start Time Tracking
	$scope.startTracking = function(task_id, parent_id, subTask_id) {
		
		
		if ($scope.timerData.timerRunning === false) {
			
			
				// Tasks
				function getTasks() {
					DataCollection.getTasks()
						.success(function (res) {
						
							$scope.listTask = res;
						
							$scope.timerTask = $filter('filter')($scope.listTask, {id: task_id},true);
							$scope.timerTask = $scope.timerTask[0].subtasks;
						
							// Get Task for start timer
							if (parent_id == 1) {
								 $scope.timerTask = $filter('filter')($scope.timerTask, {parent_task: parent_id},true);
								 $scope.timerTask = $scope.timerTask[0];
							} else {
								 $scope.timerTask = $filter('filter')($scope.timerTask, {id: subTask_id},true);
								 $scope.timerTask = $scope.timerTask[0];
							}


							 // Copying to timerData (use in index.html)
							 $scope.timerData = timerDataService.timerData;


							 $scope.timerData.id = $scope.timerTask.id;
							 $scope.timerData.task_id = $scope.timerTask.task_id;
							 $scope.timerData.project_name = 'Project name';
							 $scope.timerData.task = $scope.timerTask.subtask;
							 $scope.timerData.estimated_time = $scope.timerTask.estimated_time;
							 $scope.timerData.totalTime = $scope.timerTask.total_time;
							 $scope.timerData.newTotalTime = moment("1900-01-01 00:00:00").add($scope.timerData.totalTime, 'seconds').format("HH:mm:ss");
							 // Seconds to Hours
							 $scope.timerData.totalTime = moment("1900-01-01 00:00:00").add($scope.timerData.totalTime, 'seconds').format("HH:mm:ss");

							 $scope.timerData.timerToggle = true;
									})
									.error(function (error) {
										console.log(error.message);
									});
				}
				getTasks();
			
		
				
	  } else {
		  
		  	 SweetAlert.swal({
			   title: "Timer is Locked!",
			   text: "Are you want to Unlock ?",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Yes, unlock it!",
			   closeOnConfirm: true}, 
			function(isConfirm){ 
				 
				 if (isConfirm) {
					  
					 var data = $.param({
						id: $scope.timerData.id,
						total_time: moment.duration($scope.timerData.newTotalTime, "HH:mm:ss").asSeconds()
					});
					var headers = {	'Content-Type': 'application/x-www-form-urlencoded'	};

					$http.put(apiUrl + 'api/public/totaltime', data, {
						headers: headers
					}).success(function (data, status) {

						$scope.timerData.totalTime = $scope.timerData.newTotalTime;
						// Tasks
						function getTasks() {
							DataCollection.getTasks()
								.success(function (res) {               
									 $scope.listTask = res;			
								})
								.error(function (error) {
									console.log(error.message);
								});
						}
						getTasks();

					}).error(function (data) {
						growl.error("Error, please try again!");
					});
					 
					 $scope.timerData.timerRunning = false;
					 
				 } else {
					 
				 }
			    
			});
		  
	  } 
		
		
    };
	
	
	// Function for Resolve Subtask Manually
	$scope.resolveSubTskManually = function(id){
		
		$scope.currentResolvingTask = $filter('filter')($scope.currentTask.subtasks, {id: id});
		$scope.currentResolvingTask = $scope.currentResolvingTask[0];
		
		resolveDataModalService.resolveData = $scope.currentResolvingTask;		
		
		ModalService.showModal({
            templateUrl: 'subTaskTime.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
			
			$scope.resolveData = resolveDataModalService.resolveData;
			
            modal.close.then(function(result) {
				
				
				if (result != 'No') {
					
					 var data = $.param({ id: $scope.resolveData.id, status: 2, total_time: moment.duration(result, "HH:mm:ss").asSeconds() });		
					 var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
					 $http.put(apiUrl+'api/public/addTaskTimeManually', data, { headers: headers }).success(function(data, status) {
						 	
						 // Refresh currentTask scope
 						 DataCollection.getTasks()
								.success(function (res) {               
									 $scope.listTask = res;			
							 		
							 		    // Get Current Task Details
										$scope.currentTask = $filter('filter')($scope.listTask, {id: $scope.resolveData.task_id},true);
										$scope.currentTask = $scope.currentTask[0];

										// Get Overall Time of tasks
										var allTasksTotalTime = [];
										angular.forEach($scope.currentTask.subtasks, function(value, key) {
											this.push(value.total_time);
										}, allTasksTotalTime);

										$scope.allTasksTotalTime = allTasksTotalTime.reduce((p,c) => p + c);
										
							 			// check allTasksTotalTime is greater than estimated time
										if( $scope.allTasksTotalTime > $scope.currentTask.estimated_time ) {
											var a = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
											$scope.currentTask.allTasksTotalTime = a;
											$('.timeFlowTxt').empty();
											$('.timeFlowTxt').text('Exceeded');
											$scope.exceededEstToggle = true;
										} else {
											var b = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
											b = Math.abs(b);
											$scope.currentTask.allTasksTotalTime = b;
											$('.timeFlowTxt').empty();
											$('.timeFlowTxt').text('Remaining');
											$scope.exceededEstToggle = false;
										}
							 
							 
								})
								.error(function (error) {
									console.log(error.message);
								});
						 
					 }).error(function(data) {
						  growl.error("Error, please try again!");
					 });
					
				} else {
					
						 // Refresh currentTask scope
						 DataCollection.getTasks()
									.success(function (res) {               
										 $scope.listTask = res;			

											// Get Current Task Details
											$scope.currentTask = $filter('filter')($scope.listTask, {id: $scope.resolveData.task_id},true);
											$scope.currentTask = $scope.currentTask[0];

											// Get Overall Time of tasks
											var allTasksTotalTime = [];
											angular.forEach($scope.currentTask.subtasks, function(value, key) {
												this.push(value.total_time);
											}, allTasksTotalTime);

											$scope.allTasksTotalTime = allTasksTotalTime.reduce((p,c) => p + c);

											// check allTasksTotalTime is greater than estimated time
											if( $scope.allTasksTotalTime > $scope.currentTask.estimated_time ) {
												var a = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
												$scope.currentTask.allTasksTotalTime = a;
												$('.timeFlowTxt').empty();
												$('.timeFlowTxt').text('Exceeded');
												$scope.exceededEstToggle = true;
											} else {
												var b = $scope.allTasksTotalTime - $scope.currentTask.estimated_time;
												b = Math.abs(b);
												$scope.currentTask.allTasksTotalTime = b;
												$('.timeFlowTxt').empty();
												$('.timeFlowTxt').text('Remaining');
												$scope.exceededEstToggle = false;
											}


									})
									.error(function (error) {
										console.log(error.message);
									});
					
				}
				 
            });
        });
		
		
	};
	
		
		
		
	//============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        $scope.$apply(function(){
            $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
            $scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function(){
                $scope.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function(element) {
    $scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        $scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      $scope.progressVisible = false
      });
    };

    $scope.uploadFile = function() {
        var fd = new FormData();
        for (var i in $scope.files) {
            fd.append("uploadedFile[]", $scope.files[i]);
        }
		
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", apiUrl + 'api/public/addAttachments');
        $scope.progressVisible = true;
        xhr.send(fd);
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

	
    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        //alert(evt.target.responseText)
        console.log(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
		
		
	//Fn for Delete Task Attachment
	$scope.deleteTaskAttachment = function(id,task_id) {
		
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "Your will not be able to recover this Attachment!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
			   cancelButtonText: "No, cancel plx!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {			   
					$http.delete(apiUrl+'api/public/deleteTaskAttachment/'+id).success(function (data, status) {

						if (data.message == "Deleted") {
							
							// Refresh currentTask scope
							DataCollection.getTasks()
										.success(function (res) {               
											 $scope.listTask = res;			
												// Get Current Task Details
												$scope.currentTask = $filter('filter')($scope.listTask, {id: task_id},true);
												$scope.currentTask = $scope.currentTask[0];
								
												// Task Attachments
												function getTaskAttachments() {
													DataCollection.getTaskAttachments()
														.success(function (res) {               
															 $scope.listTaskAttachments = res;	
															 // Get Task Attachments
															$scope.listCurrentTaskAttachments = $filter('filter')($scope.listTaskAttachments, {task_id: task_id},true);
														})
														.error(function (error) {
															console.log(error.message);
														});
												}
												getTaskAttachments();
								
										})
										.error(function (error) {
											console.log(error.message);
										});
							
							SweetAlert.swal("Deleted!", "Attachment has been deleted.", "success");
						} else {
							growl.error("Error, please try again!");
						}

					})
					.error(function (data) {
						growl.error("Error, please try again!");
					});				
			   } else {
				  SweetAlert.swal("Cancelled", "Attachment is safe :)", "error");
			   }
			});
		
	}
		
		
	
	/*
	$scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = apiUrl + 'api/public/addAttachments';
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
	*/
	
	
	
	$scope.fileNameChanged = function (ele) {
	  var files = ele.files;
	  var l = files.length;
	  var namesArr = [];

	  for (var i = 0; i < l; i++) {
		namesArr.push(files[i].name);
	  }
	}
	
	
	
	$scope.testFile = function () {
	   
		
			var data = $.param( $scope.subTaskTestFormData );
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			$http.post(apiUrl + 'api/public/addSubTask123', data, {
				headers: headers
			}).success(function (data, status) {
				
			}).error(function (data) {
				growl.error("Error, please try again!");
			});
		
		
	}
	
	
	
	
	
	
});
// End TaskFormCtrl



// ListTasksCtrl
appTmp.controller('ListTasksCtrl', function($rootScope, $scope, $http, $location, $routeParams, $filter, DataCollection, growl, SweetAlert) {
	
	
	
});
// End ListTasksCtrl



// EditTaskCtrl
appTmp.controller('EditTaskCtrl', function($rootScope, $scope, $http, $location, $routeParams, $filter, DataCollection, growl) {
	
	
});
// End EditTaskCtrl





appTmp.controller('ModalController', function($scope, close, $rootScope, $http, $location, $routeParams, $filter, DataCollection, growl, resolveDataModalService) {
	
	
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
	
	
	// SubTasks
	function getSubTasks() {
        DataCollection.getSubTasks()
            .success(function (res) {               
			     $scope.listSubTask = res;			
				 $scope.currentSubtaskView = $filter('filter')($scope.listSubTask, {id: $rootScope.currentTaskID});
				 $scope.currentSubtaskView = $scope.currentSubtaskView[0];
			
				 $scope.currentSubtaskView.old_estimated_time = angular.copy($scope.currentSubtaskView.estimated_time);
			
            })
            .error(function (error) {
                console.log(error.message);
            });
	}
	getSubTasks();
	
	
	$scope.close = function(result) {
		close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	
	// Edit SubTask
	$scope.subtaskEditFormSubmit = function(sub_task_id) {
		
			$scope.dataLoadingGif = true;
		
			$scope.currentSubtaskView.id = sub_task_id;
		
		
			var data = $.param( $scope.currentSubtaskView );
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			$http.put(apiUrl + 'api/public/editSubTask', data, {
				headers: headers
			}).success(function (data, status) {
				if (data.success == "true") {
					
					//$scope.listSubTask.unshift({ id: data.id, subtask: $scope.subTaskAddFormData.subtask });
					growl.success("Edited Subtask Successfully");
					$scope.dataLoadingGif = false;
					
				} else if (data.success == "exist") {
					//growl.success("Already exist");
					$scope.dataLoadingGif = false;
				}
			}).error(function (data) {
				growl.error("Error, please try again!");
				$scope.dataLoadingGif = false;
			});
		
	}
	
	
	$scope.resolveData = resolveDataModalService.resolveData;
	


});












  appTmp.filter('customArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
  });


  appTmp.filter('customArray2', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) == -1;
            });
        }
    };
  });


appTmp.directive('toNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  }
})


appTmp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);


appTmp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

appTmp.filter('roundup', function () {
    return function (value) {
        return Math.ceil(value);
    };
})
