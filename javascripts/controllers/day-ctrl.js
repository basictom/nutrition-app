app.controller("DayCtrl", function($scope, DayFactory, FIREBASE_CONFIG){
  // console.log("day ctrl");

  $scope.newDay = {};
  $scope.userDate = {};

  console.log("user date", $scope.userDate);

  $scope.addNewDay = () => {
    console.log("user date");
  DayFactory.postNewDay()
    .then((returns) => {
      console.log("new day return", returns);
      // $scope.newDay = {returns};
      // $location.url(`/board/${$scope.user}/pin/${$scope.boardid}`);
    }).catch((error) => {
      console.log("Add Pin Error", error);
    });
  };

});
