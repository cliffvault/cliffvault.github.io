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



//Controller for Employee ADD
appTmp.controller('AddEmployeeCtrl', function($scope, $http, $location, $filter, $uibModal, $timeout) {
    
    
    $scope.phoneNumberPattern = /^\+?\d{2}[ ]?\d{3}[ ]?\d{5}$/;
    
    
    // Function for Match height
    $(function() {
        $('.match_height').matchHeight();
    });
    
    
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
                        $http.post("actions/post.php", data).success(function(data, status) {
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
                $http.post("actions/post.php", data).success(function(data, status) {
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
            $('.add_block').removeClass('col-md-12');
            $('.add_block').addClass('col-md-6');
            $('.view_block').show();
            $('.thumb_bounce').removeClass('animate1 bounceIn');
            setTimeout(function(){
                $('.thumb_bounce').addClass('animate1 bounceIn');
            },1);
            $(function() {
                $('.match_height').matchHeight();
            });            
            $scope.currentEmpId = $(item.target).data('id');
            // Filter selected employee from all employees
            $scope.selectedEmployee = $filter('filter')($scope.listEmployee, {id: $scope.currentEmpId}, true);
            $scope.selectedEmployee = $scope.selectedEmployee[0];
        }
        
        
        
        // Send employee details (PUT)
        $('#viewEmpForm').change(function(){
            
            if($scope.viewEmp.$invalid){                
                //console.log('invalid');                
            }else {
                // Update Name (PUT)
                var data = $.param({
                    json: JSON.stringify({
                        id: $scope.selectedEmployee.e_name,
                        e_name: $scope.selectedEmployee.e_name,
                        designation: $scope.selectedEmployee.designation,
                        email: $scope.selectedEmployee.email,
                        phn: $scope.selectedEmployee.phn,
                        platform: $scope.selectedEmployee.platform,
                        dept: $scope.selectedEmployee.dept,
                        e_role: $scope.selectedEmployee.e_role,
                        blood_grp: $scope.selectedEmployee.blood_grp,
                        address: $scope.selectedEmployee.address
                    })
                });
                $http.put("/echo/json/", data).success(function(data, status) {
                    //$scope.e_name = data;
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
appTmp.controller('ListEmployeeCtrl', function($scope, $http, $location, $filter) {
    
        
    
   
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
        id: 4,
        platform: "Javascript"
    },
    {
        id: 5,
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
        id: 4,
        designation: "Software Engineer"
    },
    {
        id: 5,
        designation: "Software Engineer"
   }
  ];

    
  // Function for Xeditable form
  $scope.showDesignationSelect = function (designation_id) {
        var selected = $filter('filter')($scope.allDesignationEmp, {id: designation_id});
        return (designation_id && selected.length) ? selected[0].designation : 'Not set';
  };
  $scope.showPlatformSelect = function (platform_id) {
        var selected = $filter('filter')($scope.allPlatformEmp, {id: platform_id});
        return (platform_id && selected.length) ? selected[0].platform : 'Not set';
  };
  $scope.showDepartmentSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.listEmployee, {id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].dept : 'Not set';      
  };
  $scope.showRoleSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.listEmployee, {id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].e_role : 'Not set';      
  };
  $scope.showBloodGroupSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.listEmployee, {id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].blood_grp : 'Not set';      
  };
  $scope.showStatusSelect = function(currentEmpId) {
     var selected = $filter('filter')($scope.listEmployee, {id: currentEmpId});            
     return (currentEmpId && selected.length) ? selected[0].status : 'Not set';      
  };
    
    
 // Save Edited platform
 $scope.editPlatformEmp = function(platform_id, list_id) {
        var selected = $filter('filter')($scope.allPlatformEmp, {id: platform_id});        
        $scope.changedPlatform = (platform_id && selected.length) ? selected[0].platform : 'Not set';        
        var data = $.param({
            json: JSON.stringify({
                id: list_id,
                platform: $scope.changedPlatform
            })
        });
        $http.put("/echo/json/", data).success(function (data, status) {
            //$scope.e_name = data;
        });        
 };

    
    $scope.showDesignationStatus = function (designation_id) {
        console.log(' ** called for ', designation_id);
        var selected = $filter('filter')($scope.allDesignationEmp, {
            id: designation_id
        });
        return (designation_id && selected.length) ? selected[0].designation : 'Not set';
    };

    //http://jsfiddle.net/hrr4M/13/
    
    
    
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


