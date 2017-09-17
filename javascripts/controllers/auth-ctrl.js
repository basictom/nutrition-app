app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory){

  $scope.alerts = [];

  $scope.auth = {
    email: "thomas@t.com",
    password: "123456"
  };

  if ($location.path() === "/logout"){
  AuthFactory.logout();
  $rootScope.user = {};
  $location.url("/auth");
  }

  let logMeIn = () => {
    AuthFactory.authenticate($scope.auth).then((userCreds) => {
      return UserFactory.getUser(userCreds.uid).then((user) => {
        $rootScope.user = user;
        $location.url("/day");
      }).catch((error) => {
        $scope.alerts.push({msg: error.message});
        console.log("getUser error", error);
      });
    }, (error) => {
      $scope.alerts.push({msg: error.message});
    });
  };

  $scope.registerUser = () => {
    console.log("register with user");
    AuthFactory.registerWithEmail($scope.auth).then((didRegister) =>{
      $scope.auth.uid = didRegister.uid;
      return UserFactory.addUser($scope.auth);
    }, (error) => {
      console.log("registerWithEmail error", error);
    })
    .then((registerComplete) => {
      logMeIn();
    }).catch((error) => {
      console.log("addUser error", error);
    });
  };

  $scope.loginUser = () => {
    logMeIn();
  };



});
