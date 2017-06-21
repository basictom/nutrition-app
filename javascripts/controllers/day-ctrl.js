app.controller("DayCtrl", function($scope, $rootScope, DayFactory, FIREBASE_CONFIG){
  $scope.newDates = {};
  $scope.date = "";

  // console.log("user date", $scope.userDate.date);

  $scope.addNewDay = () => {
  console.log("user date", $scope.date);
  let date = $scope.date;
  DayFactory.postNewDay(date)
    .then((returns) => {
      console.log("day returns", returns);
      $scope.date = {returns};
      getDates();
      $scope.date = "";
    }).catch((error) => {
      console.log("Add Pin Error", error);
    });
  };

  let getDates = () => {
    DayFactory.getDates($rootScope.user.uid).then((results) => {
      console.log("get dats", results);
      $scope.newDates = results;
    }).catch((error) => {
      console.log("get dates error", error);
    });
  };

  getDates();



});
