var app = angular.module("app", ["ngRoute", "OktaAuthClient", "WidgetConfig"]);

app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "views/dashboard.html",
		controller: "DashboardController"
	})
	.when("/login", {
		templateUrl: "views/login.html",
		controller: "LoginController"

	})
    .when("/register", {
        templateUrl: "views/register.html",
        controller: "RegistrationController"
    })
    .when("/home",{
        templateUrl: "views/home.html",
        controller: "HomeController"
    })
	.otherwise({redirectTo: "/"});
});

// Set up controllers
app.controller("HomeController", HomeController);
app.controller("LoginController", LoginController);
app.controller("RegistrationController", RegistrationController);
app.controller("DashboardController", DashboardController);

// Global variable "widget"
app.value("widget", undefined);
app.run(function(widgetManager, CONFIG){

	// Initialize Widget from configuration file
	widget = widgetManager.initWidget( CONFIG.options );
});

// Directive to launch the widget
app.directive("myWidget",
	function($window, widgetManager) {
		return {
			restrict: "E",
			replace: true,
			link: function(scope, element, attr) {
				var button = element.children()[0];
				angular.element(button).on("click", function() {
					scope.$apply(function() {
						scope.widget = true;
					});
					widgetManager.renderWidget(element.children()[1])
					.then(function(tokens) {
						angular.forEach(tokens, function(token) {
							if ("idToken" in token) {
								$window.localStorage["idToken"] = angular.toJson({
									"idToken" : token.idToken,
									"claims" : token.claims
								});
							}
							if ("accessToken" in token) {
								console.log(token);
								$window.localStorage["accessToken"] = angular.toJson({
									"accessToken" : token.accessToken
								});
							}
						});
						
					}, function(error) {
						console.error(error);
					});				
				});
			}
		}
});

//renders registration view
RegistrationController.$inject = ["$window", "$http", "$location", "$scope", "widgetManager"];
function RegistrationController ($window, $http, $location, $scope, widgetManager){
    $scope.createUser = function(){
        //alert($scope.fname + $scope.lname + $scope.email + $scope.password);
        var req = {
         method: 'POST',
         url: 'https://shantanu.okta.com/api/v1/users?activate=true',
         headers: {
           'Accept': "application/json",
             'Content-Type' : "application/json",
             'Authorization' : "SSWS 00CjJWW4fL2ax9ggRb_eHnl-v5cCNH3u5KbL_m_DWd" 
         },
         data: {
             profile : {
                firstName : $scope.fname,
                 lastName : $scope.lname,
                 email : $scope.email,
                 login : $scope.email                 
             },
             credentials : {
                    password : {
                     value : $scope.password
                 },
                 recovery_question : {
                     question : "Who's a major player in the cowboy scene?",
                     answer : "test"
                 }
             }
         }
        }

        $http(req).
            then(
                function(res){
                    alert ("User successfully created!");
                    $location.path("/login");
                }, 
                function(res){
                    alert(res);
                }
        );
    }
}

//	Renders Home view
HomeController.$inject = ["$scope", "$window", "$location", "widgetManager"];
function HomeController($scope, $window, $location, widgetManager) {
	
	// Get idToken from LocalStorage
	var token = angular.isDefined($window.localStorage["idToken"]) ? JSON.parse($window.localStorage["idToken"]) : undefined;
	
	var accessToken = angular.isDefined($window.localStorage["accessToken"]) ? JSON.parse($window.localStorage["accessToken"]) : undefined;
	// Redirect if there is no token
	if (angular.isUndefined(token)) {
		$location.path("/login");
	}

	$scope.session = true;
	$scope.token = token;
	$scope.accessToken = accessToken;

	// Refreshes the current session if active	
	$scope.refreshSession = function() {
		widgetManager.refreshSession()
		.then(function(success) {
			// Show session object
			$scope.sessionObject = success;
		}, function(err) {
			// Error
		});
	};

	// Closes the current live session
	$scope.closeSession = function() {
		widgetManager.closeSession()
		.then(function(success) {
			$scope.session = undefined;
		}, function(err) {
			// Error
		});
	};

	// Renews the current idToken
	$scope.renewIdToken = function() {
		widgetManager.renewIdToken(token.idToken)
		.then(function(success) {
			// Update local storage and token value
			$window.localStorage["idToken"] = angular.toJson(
				{
			        "idToken" : success.idToken,
			        "claims" : success.claims
			     });
			$scope.token = success;
		}, function(error) {
			// Error
		});
	}

	//	Clears the localStorage saved in the web browser and scope variables
	function clearStorage() {
		$window.localStorage.clear();
		$scope = $scope.$new(true);
	}

	//	Signout of organization
	$scope.signout = function() {
		widgetManager.logoutWidget()
		.then(function(success) {
			clearStorage();
			$location.path("/login");
		}, function(err) {
			// Error
		});
	};
}

// Renders login view if session does not exist
LoginController.$inject = ["$window", "$location", "$scope", "widgetManager"];
function LoginController($window, $location, $scope, widgetManager) {
	widgetManager.checkSession()
	.then(function(loggedIn) {
		$window.localStorage.clear();
		$scope = $scope.$new(true);
        // $location.path("/login");
	});
}

// Renders dashboard view if session exists
DashboardController.$inject = ["$window", "$http", "$location", "$scope", "widgetManager","ORG_URL","API_KEY"];
function DashboardController($window,$http, $location, $scope, widgetManager, ORG_URL, API_KEY) {
	// Get idToken from LocalStorage
	var token = angular.isDefined($window.localStorage["idToken"]) ? JSON.parse($window.localStorage["idToken"]) : undefined;
	
	var accessToken = angular.isDefined($window.localStorage["accessToken"]) ? JSON.parse($window.localStorage["accessToken"]) : undefined;
	// Redirect if there is no token
	if (angular.isUndefined(token)) {
		$location.path("/login");
	}else{
        $scope.session = true;
        $scope.token = token;
        $scope.accessToken = accessToken;

        $scope.getUserInfo = function(){
            var req = {
             method: 'POST',
             url: ORG_URL+'oauth2/v1/userinfo',
             headers: {
               'Accept': "application/json",
               'Authorization' : "Bearer" + $scope.accessToken.accessToken
             },
             data: {}
            }

            $http(req).
                then(
                    function(res){
                        $scope.user = res.data;
                        $scope.listUserApps();
                    }, 
                    function(res){
                        alert(res);
                    }
            );
        }

        $scope.listUserApps = function(){
            var req = {
             method: 'GET',
             url: ORG_URL+'api/v1/users/'+$scope.user.sub+'/appLinks',
             headers: {
               'Accept': "application/json",
               'Content-Type' : "application/json",
               'Authorization' : "SSWS "+API_KEY
             }
            }

            $http(req).
                then(
                    function(res){
                        $scope.userApps = res.data;
                    }, 
                    function(res){
                        alert(res);
                    }
            );
        }

	   $scope.getUserInfo();
       
        //	Clears the localStorage saved in the web browser and scope variables
        function clearStorage() {
            $window.localStorage.clear();
            $scope = $scope.$new(true);
        }
        
        //	Signout of organization
        $scope.signout = function() {
            widgetManager.logoutWidget()
            .then(function(success) {
                clearStorage();
                $location.path("/login");
            }, function(err) {
                // Error
            });
	};
    }
    

}




