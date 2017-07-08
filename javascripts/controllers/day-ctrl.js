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
      loadPieChart();
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
    // $scope.
    // console.log("edit id", id);
    currentId = id;

  };




  $scope.editOneDatePlease = () => {
    
    // newDate = $scope.date;
    // console.log("clicking into edit", id);
    // $scope.newDate
    DayFactory.tryingToEditDates(currentId, $scope.newDate).then(() => {

      getDates();
      $scope.showEditDiv = false;
      $scope.date = "";
    }).catch((error) => {
      console.log("error in edit", error);
    });
  };



  let loadPieChart = () => {
  // console.log("indside pie charts", foo);
    var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "light",
    "groupPercent": 5,
    "dataProvider": [ {
      "types": "Lithuania",
      "litres": 501.9
    }, {
      "types": "Czech Republic",
      "litres": 301.9
    }, {
      "types": "Ireland",
      "litres": 201.1
    }, {
      "types": "Germany",
      "litres": 165.8
    }, {
      "types": "Australia",
      "litres": 139.9
    }, {
      "types": "Austria",
      "litres": 128.3
    }, {
      "types": "UK",
      "litres": 99
    }, {
      "types": "Belgium",
      "litres": 60
    }, {
      "types": "The Netherlands",
      "litres": 50
    } ],
    "valueField": "litres",
    "titleField": "types",
     "balloon":{
     "fixedPosition":true
    },
    "export": {
      "enabled": true
    }
    });
  };



});
