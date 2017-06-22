app.controller("DayCtrl", function($scope, $rootScope, DayFactory, FIREBASE_CONFIG){
  $scope.newDates = {};
  $scope.date = "";
  $scope.newDate = "";
  let currentId = "";

  $scope.showEditDiv = false;

  // console.log("user date", $scope.userDate.date);

  $scope.addNewDay = () => {
  let date = $scope.date;
  DayFactory.postNewDay(date)
    .then((returns) => {
      $scope.date = {returns};
      getDates();
      $scope.date = "";
    }).catch((error) => {
      console.log("Add Pin Error", error);
    });
  };

  let getDates = () => {
    DayFactory.getDates($rootScope.user.uid).then((results) => {
      $scope.newDates = results;
    }).catch((error) => {
      console.log("get dates error", error);
    });
  };

  getDates();

  $scope.deleteDates = (id) => {
    console.log("clicking into delete", id);
    DayFactory.dateDelete(id).then((result) => {
      getDates();
    }).catch((error) => {
      console.log("error in delete", error);
    });
  };

  $scope.clickingEditButton = (id) => {
    console.log("clicking edit button");
    $scope.showEditDiv = true;
    // console.log("edit id", id);
    currentId = id;

  };




  $scope.editOneDatePlease = () => {
    
    // newDate = $scope.date;
    // console.log("clicking into edit", id);
    // $scope.newDate
    DayFactory.tryingToEditDates(currentId, $scope.newDate).then(() => {

      getDates();
    }).catch((error) => {
      console.log("error in edit", error);
    });
  };



});
