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
    DayFactory.getDates($rootScope.user.uid).then((dates) => {
      let month;
      let day;
      for(x=0;x<dates.length;x++){
    	let newDate = dates[x].date;
      let splt = newDate.split("/");
      let month = splt[0];
      let day = splt[1];
      if(month == "6"){
      month = "June";
      }else if(month == "7"){
      month = "July";
      }else if(month == "8"){
      month = "August";
      }else if(month == "9"){
      month = "September";
      }else{
      console.log("no valid month");
      }
      dates[x].month = month;
      dates[x].day = day;
    }
    $scope.newDates = dates;
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
