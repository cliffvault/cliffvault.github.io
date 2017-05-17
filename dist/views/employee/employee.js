'use strict';

angular.module('appTmp.employee', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-employee', {
    templateUrl: 'views/employee/add.html',
    controller: 'AddEmployeeCtrl'
  })
  .when('/list-employee', {
      templateUrl: 'views/employee/list.html',
      controller: 'ListEmployeeCtrl'
  });
}])

appTmp.config(function (uibDatepickerConfig) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerConfig.showButtonBar = false;
});

//Controller for Employee ADD
appTmp.controller('AddEmployeeCtrl', function($rootScope, $scope, $http, $location, $filter, $uibModal, $timeout, DataCollection, growl, moment) {
	
	getAllDatasEmployee();

    function getAllDatasEmployee() {
		
		// Employees
        DataCollection.getEmployee()
            .success(function (res) {               
			     $scope.listEmployee = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
		// Roles
		DataCollection.getRoles()
            .success(function (res) {               
			     $scope.listRoles = res;	
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
		// Designations
		DataCollection.getDesignations()
            .success(function (res) {               
			     $scope.listDesignations = res;
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
		// Platforms
		DataCollection.getPlatforms()
            .success(function (res) {               
			     $scope.listPlatforms = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
		// Departments
		DataCollection.getDepartments()
            .success(function (res) {               
			     $scope.listDepartments = res;			
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
		
    }
	// End getAllDatasEmployee
	
	
	
	  // For Datepicker
	  $scope.inlineOptions = {
		minDate: new Date()
	  };

	  $scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(),
		minDate: new Date(),
		startingDay: 1
	  };

	  $scope.toggleMin = function() {
		$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
		$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	  };

	  $scope.toggleMin();

	  $scope.open1 = function() {
		$scope.popup1.opened = true;
	  };
	  $scope.popup1 = {
		opened: false
	  };
	
	  $scope.open2 = function() {
		$scope.popup2.opened = true;
	  };
	  $scope.popup2 = {
		opened: false
	  };
	
	
	

	
	
	/*
	// Check user permission for access this page
	if ($scope.IsAdmin() | $scope.IsCompany()) {
		
	} else {
		$location.path('/dashboard')
	}
*/
	
	
    
    $scope.phoneNumberPattern = /^\+?\d{2}[ ]?\d{3}[ ]?\d{5}$/;
    
    
    // Function for Match height
    $(function() {
        $('.match_height').matchHeight();
    });
    
    
	/*
    $scope.listEmployee = [{
        "get": "All",
	    "photo": "1.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 315,
		"e_name": "ajmal",
		"e_role": "Team Member",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "PHP",
		"address": "Adoor, Kerala, India",
		"email": "ajmal@cliffsupport.com",
		"phn": "9961118102",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "2.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 229,
		"e_name": "Dheeraj Gheevarghese",
		"e_role": "Team Member",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "Android",
		"address": "Alappuzha, Kerala, India",
		"email": "dheeraj@cliffsupport.com",
		"phn": "9497880304",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "InActive",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "3.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 228,
		"e_name": "Anjaly R Nair",
		"e_role": "Team Member",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "DotNet",
		"address": "Kottayam, Kerala, India",
		"email": "anjali@cliffsupport.com",
		"phn": "9446523995",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "4.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 227,
		"e_name": "Renju AG",
		"e_role": "Team Member",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "DotNet",
		"address": "Trivandrum, Kerala, India",
		"email": "renju@cliffsupport.com",
		"phn": "9633193631",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "5.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 226,
		"e_name": "Saravanasumesh",
		"e_role": "Admin",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "DotNet",
		"address": "Trivandrum, Kerala, India",
		"email": "ccsaravanasumesh@gmail.com",
		"phn": "0965698558",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "6.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 225,
		"e_name": "SaravanaKumar",
		"e_role": "Project Manager",
		"designation": "Software Engineer",
		"dept": "Software",
		"platform": "DotNet",
		"address": "Trivandrum, Kerala, India",
		"email": "saravana@cliffsupport.com",
		"phn": "9656985589",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "7.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "143",
		"id": 223,
		"e_name": "Subhit Kodapully",
		"e_role": "Project Manager",
		"designation": "Software Engineer",
		"dept": "MS DOTNET",
		"platform": "ASPNET",
		"address": "Cleaveland Rd, Pleasant Hill, CA, United States",
		"email": "subhit2016@gmail.com",
		"phn": "12167717728",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "InActive",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "8.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "10",
		"id": 186,
		"e_name": "Subhit Kodapully ",
		"e_role": "Admin",
		"designation": "Software Engineer",
		"dept": "Finance",
		"platform": "Banking",
		"address": "Cleaveland Rd, Pleasant Hill, CA, United States",
		"email": "subhit.kodapully@gmail.com",
		"phn": "0789999999",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	}
    ]
    */
	
	
	
	// Function for image crop in add new form
    $scope.myImageNew='';
    $scope.myCroppedImageNew='';
       

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImageNew = evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInputNew')).on('change',handleFileSelect);
    
    
        // Check valid or invalid image and show submit button
        $scope.proPicSubmitBtnNew = '';
        $scope.validProPicNew = function(){
            $scope.proPicSubmitBtnNew = 'Valid image';
        }        
        $scope.inValidProPicNew = function(){
            $scope.proPicSubmitBtnNew = '';
        }    
        
        
        // Function for upload profile pic
        $scope.uploadProPicNew = function(){
            var data = $.param({
                    json: JSON.stringify({
                        id: $scope.selectedEmployee.id,
                        photo: $scope.myCroppedImageNew
                    })
                });
            $http.put("/echo/json/", data).success(function(data, status) {
                    //$scope.selectedEmployee.photo = data;
            }).error(function(data) {
                    //console.log('Adding Failed');
                    $scope.selectedEmployee.photo = "new_image.jpg";                    
                    $scope.listEmployee.concat({id: $scope.selectedEmployee.id, photo: $scope.selectedEmployee.photo});
                    //console.log($scope.listEmployee);
            });            
        }
        
        
        
        $('.count_from_select').hide();
        $scope.hideSelectResultLength = function(){
            $('.count_from_select').hide();
            $('.count_from_text').show();
        }
        $scope.hideTextResultLength = function(){
            $('.count_from_text').hide();
            $('.count_from_select').show();
        }
	
		
	$scope.dataLoadingGif = false;	
	// Function for add new employee
	$scope.createEmployee = function() {
		
		
		/*
		$scope.$watch('EmployeeData.e_dob', function (newDate) {
			$scope.EmployeeData.e_dob = moment(newDate).format("YYYY-MM-DD");
			console.log($scope.EmployeeData.e_dob);
		});
		*/
		
		
				// Show loader
				$scope.dataLoadingGif = true;
				// Push location
				$scope.EmployeeData.e_photo = $scope.myCroppedImageNew;
				$scope.EmployeeData.e_location = $scope.e_location.formatted_address;
				$scope.EmployeeData.createdBy = $rootScope.UserMail;				
				$scope.EmployeeData.get = "All";
				$scope.EmployeeData.status = 1;
				// Get as Array
				var data = $.param( $scope.EmployeeData );
				var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
				$http.post(apiUrl+'api/public/employees', data, { headers: headers }).success(function(data, status) {
					  // Hide loader
					  $scope.dataLoadingGif = false;
					  if (data.success == "true") {
						 // Hide image crop
						 $scope.myImageNew='';
						 $scope.myCroppedImageNew='';
						 $scope.proPicSubmitBtnNew = '';
						 // Show Growl Meassage
						 growl.success("Successfully created a new employee");
						 // Add to array
 						 $scope.EmployeeData.e_id = data.id;
 						 $scope.EmployeeData.role = data.role;
 						 $scope.EmployeeData.e_department = data.e_department;
 						 $scope.EmployeeData.e_designation = data.e_designation;
 						 $scope.EmployeeData.e_platform = data.e_platform;
 						 $scope.EmployeeData.e_bloodgrp = data.e_bloodgrp;
						 $scope.EmployeeData.e_photo = $scope.EmployeeData.newEmplUsername+'.png';
						 // Push to array
						 $scope.listEmployee.unshift($scope.EmployeeData);
						 // Empty array
  					     $scope.EmployeeData = '';
					     $scope.e_location = '';
					     angular.element("input[type='file']").val(null);						  
						 // Resetting array
						 $scope.resetEmployeeData = {
							e_name: "pran",
							e_emp_id: "",
							e_emailid: "",
							e_gender: "Male",
							role: "4",
							e_designation: "1",
							e_department: "1",
							e_platform: "1",
							e_dob: "",
							e_doj: "",
							e_address: "",
							e_zip: "",
							e_phone: "",
							e_salary: "",
							e_bloodgrp: "O+",
							newEmplUsername: "",
							newEmplConfPassword: ""
						};
						$scope.EmployeeData = angular.copy($scope.resetEmployeeData);
				  }	// End IF
                }).error(function(data) {
                     growl.error("Error, please try again!");
                });
    } // End Fn createEmployee
	
	
	
    
        // Function for add new employee    
        $scope.new_e_name_check = 0;
    
    
        $scope.sendPost = function() {            
            
            $scope.$watch('addEmp.new_e_name.$valid', function(newVal) {
                
                if ( newVal === true ) {
                    
                    // Highlite View block
                    $('.view_highlite').addClass('active');
                    setTimeout(function(){ $('.view_highlite').removeClass('active');}, 1000);
                    
                    
                    // Check exist            
                    
                    if ( $scope.new_e_name_check == '0' ) {
                        // Sending New Name (POST)
                        var data = $.param({
                        json: JSON.stringify({
                                name: $scope.new_e_name
                            })
                        });
                        $http.post("action/post.php", data).success(function(data, status) {
                                $scope.e_name = data;
                        }).error(function(data) {
                            $scope.new_e_name_check = 1;
                            console.log($scope.new_e_name_check);
                        });
                    } else {
                        // Update Name (PUT)
                        var data = $.param({
                        json: JSON.stringify({
                                name: $scope.new_e_name
                            })
                        });
                        $http.put("/echo/json/", data).success(function(data, status) {
                                $scope.e_name = data;
                        });
                    }
                    

                    
                } // End IF

                
            }); // End Watch
            
            
        } // End Fn sendPost    
    
        
        // Check new input has focus
        $('.view_block').hide();
        $("#new_emp_name").focus(function() {
            $('.view_block').hide();
            $('.add_block').removeClass('col-md-6');
            $('.add_block').addClass('col-md-12');
        });
        
            
    
        // Employee add on Blur and Submit
        $scope.empAdd = function() {            
            if($scope.addEmp.$valid) {
                // Add to array
//                $scope.listEmployee.unshift({e_name:$scope.new_e_name_input});
//                $scope.new_e_name_input = "";

                
                // Sending New Name (POST)
                var data = $.param({
                json: JSON.stringify({
                        name: $scope.new_e_name_input
                    })
                });
                $http.post("api/action", data).success(function(data, status) {
                        // $scope.e_name = data;
                        // Add to array
                        $scope.listEmployee.unshift({e_name:$scope.new_e_name_input});
                        $scope.new_e_name_input = "";
                }).error(function(data) {
                        console.log('Adding Failed');
                        $scope.new_e_name_id_input = "315";                    
                        $scope.listEmployee.unshift({id: $scope.new_e_name_id_input, e_name: $scope.new_e_name_input, status: "Active"});
                        $scope.new_e_name_input = "";
                });
                
            } else {
                
            }            
        }
        
        
    
        // Select an employee from list
        $scope.empClick = function(item){
            $scope.checkCropArea = '';
            //$('.add_block').removeClass('col-md-12');
            //$('.add_block').addClass('col-md-6');
			
			$('.adding_box').hide();
			$('.add_emp_btn').show();
			
            $('.view_block').show();
            $('.thumb_bounce').removeClass('animate1 bounceIn');
            setTimeout(function(){
                $('.thumb_bounce').addClass('animate1 bounceIn');
            },1);
			/*
            $(function() {
                $('.match_height').matchHeight();
            });            
			*/
            $scope.currentEmpId = $(item.target).data('id');
			
            // Filter selected employee from all employees
            $scope.selectedEmployee = $filter('filter')($scope.listEmployee, {e_id: $scope.currentEmpId}, true);
            $scope.selectedEmployee = $scope.selectedEmployee[0];
			$scope.selectedEmployee.e_dob = new Date($scope.selectedEmployee.e_dob);
			$scope.selectedEmployee.e_doj = new Date($scope.selectedEmployee.e_doj);			
        }
		
		
		// New employee button click function
		$('.add_emp_btn').click(function(e){
			e.preventDefault();
			$('.adding_box').show();
			$('.view_block, .add_emp_btn').hide();
		});
        
        
        
        // Send employee details (PUT)
        $('#viewEmpForm').change(function(){
            
            if($scope.viewEditEmpForm.$invalid){                
                console.log('invalid');                
            }else {
                
				var data = $.param( $scope.selectedEmployee );
				var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
				$http.put(apiUrl+'api/public/employees', data, { headers: headers }).success(function(data, status) {
					
					 growl.success("Updated");
					  
					 //$scope.EmployeeData = angular.copy($scope.resetEmployeeData);
					
                }).error(function(data) {
                     growl.error("Error, please try again!");
                });
            }
                        
        }); //End Fn send Details Post    
    
    
        // Employee status change
        $scope.employeeStatusChange = function(status){
            $scope.currentEmpStatusId = $(status.target).data('id');
            
            // Update Employee Status (PUT)
            var data = $.param({
                json: JSON.stringify({
                        id: $scope.currentEmpStatusId
                    })
                });
                $http.put("/echo/json/", data).success(function(data, status) {
                    //$scope.e_name = data;
                });
            
        }
        
    
        // DP upload modal
        $scope.dpUploadModal = function(){    
           $uibModal.open({
                 templateUrl: 'dpUpload.html',
                 controller: 'ModalInstanceCtrl',
                 controllerAs: '$ctrl'
           });       
        }
        
        
        // Function for image crop
        $scope.myImage='';
        $scope.myCroppedImage='';
       

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
    
        // Function for show / hide image crop area    
        $scope.checkCropArea = '';
        
        // Show
        $scope.showCropArea = function(){            
            $scope.checkCropArea = 'show';
            $('.view_block_height').css({'height': 'auto'});
        }        
        // Hide
        $scope.hideCropArea = function(){            
            $scope.checkCropArea = '';            
        }
        
        
        // Check valid or invalid image and show submit button
        $scope.proPicSubmitBtn = '';
        $scope.validProPic = function(){
            $scope.proPicSubmitBtn = 'Valid image';
        }        
        $scope.inValidProPic = function(){
            $scope.proPicSubmitBtn = '';
        }    
        
        
        // Function for upload profile pic
        $scope.uploadProPic = function(){
            var data = $.param({
                    json: JSON.stringify({
                        id: $scope.selectedEmployee.id,
                        photo: $scope.myCroppedImage
                    })
                });
            $http.put("/echo/json/", data).success(function(data, status) {
                    //$scope.selectedEmployee.photo = data;
            }).error(function(data) {
                    //console.log('Adding Failed');
                    $scope.selectedEmployee.photo = "new_image.jpg";                    
                    $scope.listEmployee.concat({id: $scope.selectedEmployee.id, photo: $scope.selectedEmployee.photo});
                    $scope.checkCropArea = '';
                    //console.log($scope.listEmployee);
            });            
        }
        
        
        
        $('.count_from_select').hide();
        $scope.hideSelectResultLength = function(){
            $('.count_from_select').hide();
            $('.count_from_text').show();
        }
        $scope.hideTextResultLength = function(){
            $('.count_from_text').hide();
            $('.count_from_select').show();
        }
		
		
/*
$scope.$watch('selectedEmployee.e_dob', function (newDate) {
	$scope.selectedEmployee.e_dob = moment(newDate).format("YYYY-MM-DD");
	console.log($scope.selectedEmployee.e_dob);
});
*/
        

});
// End AddEmployeeCtrl





// Contoller for modal
angular.module('appTmp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
    
  var $ctrl = this;
  
  $ctrl.ok = function () {
      $uibModalInstance.close("ok..closed");
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
});





//Controller for Employee Listing
appTmp.controller('ListEmployeeCtrl', function($scope, $http, $location, $filter, DataCollection) {

	
	
	getAllDatasEmployee();

    function getAllDatasEmployee() {
		
        DataCollection.getEmployee()
            .success(function (res) {
               
			     $scope.listEmployee = res;
			
				 // Function for pagination
				 $scope.viewbyEmp = $scope.listEmployee.length;
				 $scope.totalItemsEmp = $scope.listEmployee.length;
				 $scope.currentPageEmp = 1;
				 $scope.itemsPerPageEmp = $scope.viewbyEmp;
				 $scope.maxSizeEmp = 3; //Number of pager buttons to show

				 $scope.setPageEmp = function (pageNo) {
					 $scope.currentPageEmp = pageNo;
				 };

				 $scope.pageChangedEmp = function () {
					 console.log('Page changed to: ' + $scope.currentPageEmp);
				 };

				 $scope.setItemsPerPageEmp = function (num) {
					 $scope.itemsPerPageEmp = num;
					 $scope.currentPageEmp = 1; //reset to first paghe
				 }
			
            })
            .error(function (error) {
                console.log(error.message);
            });
		
		
			
			// For getting all Designations
			DataCollection.getDesignations()
            .success(function (res) {
			     $scope.allDesignationEmp = res;
				 	$scope.showDesignationSelect = function (designation_id) {
						var selected = $filter('filter')($scope.allDesignationEmp, {id: designation_id});
						return (designation_id && selected.length) ? selected[0].designation : 'Not set';
				    };
            })
            .error(function (error) {
                console.log(error.message);
            });		
		
			// For getting all platforms
			DataCollection.getPlatforms()
            .success(function (res) {
			     $scope.allPlatformEmp = res;
				   $scope.showPlatformSelect = function (platform_id) {
						var selected = $filter('filter')($scope.allPlatformEmp, {pf_id: platform_id});
						return (platform_id && selected.length) ? selected[0].d_platform : 'Not set';
				  };
            })
            .error(function (error) {
                console.log(error.message);
            });
		
			// For getting all Departments
			DataCollection.getDepartments()
            .success(function (res) {
			     $scope.allDepartmentEmp = res;
				   $scope.showDepartmentSelect = function(currentEmpId) {
					  var selected = $filter('filter')($scope.allDepartmentEmp, {d_id: currentEmpId});          
					  return (currentEmpId && selected.length) ? selected[0].d_department : 'Not set';      
				   };
            })
            .error(function (error) {
                console.log(error.message);
            });
		
			// For getting all Roles
			DataCollection.getRoles()
            .success(function (res) {
			     $scope.allRoleEmp = res;
				   $scope.showRoleSelect = function(currentEmpId) {
					 var selected = $filter('filter')($scope.allRoleEmp, {r_id: currentEmpId});            
					 return (currentEmpId && selected.length) ? selected[0].role : 'Not set';      
				  };
            })
            .error(function (error) {
                console.log(error.message);
            });	
			
			// For getting all Bloodgroups
			DataCollection.getBloodgroups()
            .success(function (res) {
			     $scope.allBloodgroupEmp = res;
				   $scope.showBloodGroupSelect = function(currentEmpId) {
					 var selected = $filter('filter')($scope.allBloodgroupEmp, {e_id: currentEmpId});            
					 return (currentEmpId && selected.length) ? selected[0].e_bloodgrp : 'Not set';      
				  };
            })
            .error(function (error) {
                console.log(error.message);
            });	
		
			// For getting all status
			DataCollection.getStatus()
            .success(function (res) {
			     $scope.allStatusEmp = res;
					$scope.showStatusSelect = function(currentEmpId) {
						 var selected = $filter('filter')($scope.allStatusEmp, {l_id: currentEmpId});            
						 return (currentEmpId && selected.length) ? selected[0].status : 'Not set';      
				    };
            })
            .error(function (error) {
                console.log(error.message);
            });	
			
		
			
		
		
    }
	// End getAllDatasEmployee
	
	

  
  
  
  
  
	
	
	
	
/*
    $scope.allPlatformEmp = [{
        id: 1,
        platform: "Android"
    }, {
        id: 2,
        platform: "PHP"
    }, {
        id: 3,
        platform: "DOTNET"
    }, {
        id: 22,
        platform: "Javascript"
    },
    {
        id: 23,
        platform: "Banking"
   }
  ];
  
    
    $scope.allDesignationEmp = [{
        id: 1,
        designation: "Software Engineer"
    }, {
        id: 2,
        designation: "Android Developer"
    }, {
        id: 3,
        designation: "Software Developer"
    }, {
        id: 22,
        designation: "Software Engineer"
    },
    {
        id: 23,
        designation: "Software Engineer"
   }
  ];
*/
    
	
	/*
  // Function for Xeditable form
  $scope.showDesignationSelect = function (designation_id) {
        var selected = $filter('filter')($scope.allDesignationEmp, {id: designation_id});
        return (designation_id && selected.length) ? selected[0].designation : 'Not set';
  };
  $scope.showPlatformSelect = function (platform_id) {
        var selected = $filter('filter')($scope.allPlatformEmp, {pf_id: platform_id});
        return (platform_id && selected.length) ? selected[0].d_platform : 'Not set';
  };
  $scope.showDepartmentSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.allDepartmentEmp, {d_id: currentEmpId});          
     return (currentEmpId && selected.length) ? selected[0].d_department : 'Not set';      
  };
  $scope.showRoleSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.allRoleEmp, {r_id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].role : 'Not set';      
  };
  $scope.showBloodGroupSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.allBloodgroupEmp, {e_id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].e_bloodgrp : 'Not set';      
  };
  $scope.showStatusSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.allStatusEmp, {l_id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].status : 'Not set';      
  };
	*/
	
	
 // Save Edited Platform
 $scope.editPlatformEmp = function(platform_id, list_id) {
        var selected = $filter('filter')($scope.allPlatformEmp, {pf_id: platform_id});        
        $scope.changedPlatform = (platform_id && selected.length) ? selected[0].pf_id : 'Not set';  
 	    var data = { 'id': list_id, 'pf_id': $scope.changedPlatform };
        $http.put(apiUrl+'api/public/edit-emp-platform', data).success(function (data, status) {
           
        });
 };
	
// Save Edited Department
 $scope.editDepartmentEmp = function(department_id, list_id) {
        var selected = $filter('filter')($scope.allDepartmentEmp, {d_id: department_id});        
        $scope.changedDepartmet = (department_id && selected.length) ? selected[0].d_id : 'Not set';  
 	    var data = { 'id': list_id, 'd_id': $scope.changedDepartmet };
        $http.put(apiUrl+'api/public/edit-emp-department', data).success(function (data, status) {
           
        });
 };
	
// Save Edited Role
 $scope.editRoleEmp = function(role_id, list_id) {
        var selected = $filter('filter')($scope.allRoleEmp, {r_id: role_id});        
        $scope.changedRole = (role_id && selected.length) ? selected[0].r_id : 'Not set';  
 	    var data = { 'id': list_id, 'l_id': $scope.changedRole };
        $http.put(apiUrl+'api/public/edit-emp-role', data).success(function (data, status) {
           
        });
 };

// Save Edited Blood Group
 $scope.editBloodGroupEmp = function(blood_id, $data) {
	 	var e_id = $data;
 	    var data = { 'id': e_id, 'e_bloodgrp': blood_id };
        $http.put(apiUrl+'api/public/edit-emp-blood', data).success(function (data, status) {
			if (data.message == "Success") {
				// For getting all Bloodgroups
				DataCollection.getBloodgroups()
				.success(function (res) {
					 $scope.allBloodgroupEmp = res;
					   $scope.showBloodGroupSelect = function(currentEmpId) {
						 var selected = $filter('filter')($scope.allBloodgroupEmp, {e_id: currentEmpId});            
						 return (currentEmpId && selected.length) ? selected[0].e_bloodgrp : 'Not set';      
					  };
				})
				.error(function (error) {
					console.log(error.message);
				});	
			} 
        });
 };
	

	
 // Save to Inactive state
 $scope.changeEmpStatusInActive = function(currentId, $data) {
	 
	 var currentId = $data;
	 
     var data = { 'l_id': currentId, 'status': 0 };
     $http.put(apiUrl+'api/public/statusInactive', data).success(function (data, status) {
          getAllDatasEmployee();
     });	 
	 
}
 
// Save to Active state
 $scope.changeEmpStatusActive = function(currentId, $data) {
	 
	 var currentId = $data;
	 
     var data = { 'l_id': currentId, 'status': 1 };
     $http.put(apiUrl+'api/public/statusActive', data).success(function (data, status) {
          getAllDatasEmployee();
     });
		 
}


	
	
    
	
    $scope.showDesignationStatus = function (designation_id) {
        console.log(' ** called for ', designation_id);
        var selected = $filter('filter')($scope.allDesignationEmp, {
            id: designation_id
        });
        return (designation_id && selected.length) ? selected[0].designation : 'Not set';
    };

    //http://jsfiddle.net/hrr4M/13/
    
   
	/*

	// Function for pagination
     $scope.viewbyEmp = $scope.listEmployee.length;
     $scope.totalItemsEmp = $scope.listEmployee.length;
     $scope.currentPageEmp = 1;
     $scope.itemsPerPageEmp = $scope.viewbyEmp;
     $scope.maxSizeEmp = 3; //Number of pager buttons to show

     $scope.setPageEmp = function (pageNo) {
         $scope.currentPageEmp = pageNo;
     };

     $scope.pageChangedEmp = function () {
         console.log('Page changed to: ' + $scope.currentPageEmp);
     };

     $scope.setItemsPerPageEmp = function (num) {
         $scope.itemsPerPageEmp = num;
         $scope.currentPageEmp = 1; //reset to first paghe
     }
	 
	  */

});





// Directive for employee listings
appTmp.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    //angular.element(element).css('color','blue');    
        // Function for Match height
        $(function() {            
            $('.match_height').matchHeight();            
            /*
            // Function for add animate 1 - 3 classes in user cards listing
            var i = 0;
            $('.user_card').each(function () {
                if (i < 3) {
                    i++;
                } else {
                    i = 1;
                }
                $(this).addClass('animate' + i);
            });
            */           
        });      
  };
})




/*

{
		"e_id": "1",
		"l_id": "0",
		-------"e_name": "Saravana Kumar",
		-------"e_emailid": "saravana@cvault.com",
		"e_phone": "+91 1234567890",
		"e_address": "Street 1, Lane2",
		"e_bloodgrp": "O+",
		"e_designation": "1",
		"e_department": "1",
		"e_platform": "1",
		"e_salary": "100000",
		"e_dob": "02-05-1990",
		"e_doj": "24-11-2010",
		"e_l_name": "Kumar",
		"e_f_name": "Saravana"
	}
    
   
    $scope.listEmployee = [{
        "get": "All",
	    "photo": "1.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 315,
		"e_name": "ajmal",
		"e_role": "Team Member",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "Software",
		"platform": "PHP",
        "platform_id": 2,
		"address": "Adoor, Kerala, India",
		"email": "ajmal@cliffsupport.com",
		"phn": "9961118102",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "2.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 229,
		"e_name": "Dheeraj Gheevarghese",
		"e_role": "Team Member",
		"designation": "Android Developer",
        "designation_id": 2,
		"dept": "Software",
		"platform": "Android",
        "platform_id": 1,
		"address": "Alappuzha, Kerala, India",
		"email": "dheeraj@cliffsupport.com",
		"phn": "9497880304",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "InActive",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "3.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 228,
		"e_name": "Anjaly R Nair",
		"e_role": "Team Member",
		"designation": "Software Developer",
        "designation_id": 3,
		"dept": "Software",
		"platform": "DotNet",
        "platform_id": 3,
		"address": "Kottayam, Kerala, India",
		"email": "anjali@cliffsupport.com",
		"phn": "9446523995",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "4.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 227,
		"e_name": "Renju AG",
		"e_role": "Team Member",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "Software",
		"platform": "DotNet",
        "platform_id": 3,
		"address": "Trivandrum, Kerala, India",
		"email": "renju@cliffsupport.com",
		"phn": "9633193631",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "5.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 226,
		"e_name": "Saravanasumesh",
		"e_role": "Admin",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "Software",
		"platform": "DotNet",
        "platform_id": 3,
		"address": "Trivandrum, Kerala, India",
		"email": "ccsaravanasumesh@gmail.com",
		"phn": "0965698558",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "6.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "66",
		"id": 225,
		"e_name": "SaravanaKumar",
		"e_role": "Project Manager",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "Software",
		"platform": "DotNet",
        "platform_id": 3,
		"address": "Trivandrum, Kerala, India",
		"email": "saravana@cliffsupport.com",
		"phn": "9656985589",
		"u_name": null,
		"pwd": null,
		"blood_grp": "A+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "7.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "143",
		"id": 223,
		"e_name": "Subhit Kodapully",
		"e_role": "Project Manager",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "MS DOTNET",
		"platform": "DOTNET",
        "platform_id": 4,
		"address": "Cleaveland Rd, Pleasant Hill, CA, United States",
		"email": "subhit2016@gmail.com",
		"phn": "12167717728",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "InActive",
		"description": null,
		"project": null,
		"drp_role": []
	},
	{
        "get": "All",
	    "photo": "8.jpg",
		"platform1": 0,
		"role1": 0,
		"designation1": 0,
		"department1": 0,
		"p_id1": 0,
		"e_id1": 0,
		"d_id": "10",
		"id": 186,
		"e_name": "Subhit Kodapully ",
		"e_role": "Admin",
		"designation": "Software Engineer",
        "designation_id": 1,
		"dept": "Finance",
		"platform": "Banking",
        "platform_id": 5,
		"address": "Cleaveland Rd, Pleasant Hill, CA, United States",
		"email": "subhit.kodapully@gmail.com",
		"phn": "0789999999",
		"u_name": null,
		"pwd": null,
		"blood_grp": "O+",
		"created_by": null,
		"created_date": null,
		"created_ip": null,
		"last_log_date": null,
		"last_log_ip": null,
		"status": "Active",
		"description": null,
		"project": null,
		"drp_role": []
	}
    ]

    */