angular.module('restApiApp', []).controller('MainCtrl', function($scope, $http) {
      
      $scope.oktaApps = '{!apps}';
      alert($scope.oktaApps[[0].id);
      
      //$scope.results = ""; // sessionId, url from ng-init
  
      /*$scope.submit = function() {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $scope.sessionId;
        $http.get($scope.url).then(function(response) {
          $scope.results = response.data;
        }, function(errResponse) {
          console.log('Error while fetching data');
        });
      };*/
    });
    



    public static OktaUser parseUserJSONString(String str) {
        String jsonStr = str;
    List<OktaUser> oktaUsers = new List<OktaUser>();     
        JSONParser parser = JSON.createParser(jsonStr);
            while (parser.nextToken() != null) {
                    if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                        OktaUser oktaUser = (OktaUser)parser.readValueAs(OktaUser.class);
                        system.debug('App id: ' + oktaUser.id);
                        oktaUsers.add(oktaUser);
                        // For debugging purposes, serialize again to verify what was parsed.
                        String s = JSON.serialize(oktaUser);
                        system.debug('Serialized app: ' + s);
    
                        // Skip the child start array and start object markers.
                        parser.skipChildren();
                    }
            }
        return oktaUsers[0];
    }  


    public static OktaUser parseUserJSONString(String str) {
        String jsonStr = str;
    List<OktaUser> oktaUsers = new List<OktaUser>();     
        JSONParser parser = JSON.createParser(jsonStr);
            while (parser.nextToken() != null) {
                    if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                        //OktaUser oktaUser = (OktaUser)parser.readValueAs(OktaUser.class);
                        OktaUser oktaUser = (OktaUser)parser.readValueAs(OktaUser.class)
                        system.debug('oktaUser id: ' + oktaUser.id);
                        oktaUsers.add(oktaUser);
                        // For debugging purposes, serialize again to verify what was parsed.
                        String s = JSON.serialize(oktaUser);
                        system.debug('Serialized app: ' + s);
    
                        // Skip the child start array and start object markers.
                        parser.skipChildren();
                    }
            }
        return oktaUsers[0];
    }  



    {escape: false} // No escaping, please


    |filter:{type:'OKTA_GROUP'}