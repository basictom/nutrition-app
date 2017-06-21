app.controller("MealCtrl", function($scope, $rootScope, $routeParams, MealFactory, FoodFactory, FIREBASE_CONFIG){

  $scope.meals = [];
  $scope.userInput = {};

  let chartdata = [];


  $scope.data = {
     singleSelect: null,
    };
  $scope.options = ["Breakfast","Lunch","Dinner"];

  let query = $scope.userInput;
  console.log("user input", $scope.userInput);

  $scope.getFacts = () => {
    console.log("route params", $routeParams.date);
    MealFactory.createMeal($scope.userInput, $rootScope.user.uid, $routeParams.date).then((returns) => {
      let mealId = returns.data.name;
      FoodFactory.getUserNutr(query).then((returns) => {
        for(i=0;i<returns.length;i++){
          singleItem(returns[i], mealId);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  $scope.addMeal = () => {
    console.log("clicking option");
  };


  let getFoods = () => {
    FoodFactory.getUserFoods().then((results) => {
      // console.log("getFoods", results);
      // $scope.foods = results;
    }).catch((error) => {
      console.log("get foods error", error);
    });
  };


  let getMeals = () => {
    console.log("route params", $routeParams.date);
    MealFactory.getUserMeals($routeParams.date).then((returns) => {
      returns.forEach((meal) => {
        FoodFactory.getUserFoods(meal.id).then((results) => {
          meal.foods = results;
        }).catch((error) => {
          console.log("get user foods", error);
        });
      });
      // Loop through everything that comes back make a factory call for the meal specific foods
      $scope.meals = returns;
      console.log("get meals", returns);
      getFoods();
    }).catch((error) => {
      console.log("get meals error", error);
    });
  };

  getMeals();

  

  

  let singleItem = (item, mealId) => {
    FoodFactory.postUserValues(item, mealId).then((returns) => {
      mealId = returns.data.name;
      console.log("single meal", mealId);
      // getMeals(mealId);
      getMeals();
    }).catch((error) => {
      console.log("single error", error);
    });
  };


// ##############################################
//                 AM CHARTS JS
// ##############################################

var chartData = generateChartData();

var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": chartData,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#FF6600",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }, {
        "id":"v3",
        "axisColor": "#B0DE09",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "left"
    }],
    "graphs": [{
        "valueAxis": "v1",
        "lineColor": "#FF6600",
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "Total Calories",
        "valueField": "calories",
    "fillAlphas": 0
    }, {
        "valueAxis": "v2",
        "lineColor": "#FCD202",
        "bullet": "square",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "Total Protiens",
        "valueField": "protiens",
    "fillAlphas": 0
    }, {
        "valueAxis": "v3",
        "lineColor": "#B0DE09",
        "bullet": "triangleUp",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "Total Carbs",
        "valueField": "carbs",
    "fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
      "enabled": true,
        "position": "bottom-right"
     }
});



function setDataSet(dataset_url) {
  AmCharts.loadFile(dataset_url, {}, function(data) {
    chart.dataProvider = AmCharts.parseJSON(data);
    chart.validateData();
  });
}



// chart.addListener("dataUpdated", zoomChart);
// zoomChart();


// generate some random data, quite different range
function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 10);

    for (var i = 0; i < 10; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var calories = Math.round(Math.sin(i * 5) * i);
        var protiens = Math.round(Math.random() * 80) + 500 + i * 3;
        var carbs = Math.round(Math.random() * 6000) + i * 4;

        chartData.push({
            date: newDate,
            calories: calories,
            protiens: protiens,
            carbs: carbs
        });
    }
    return chartData;
}

// function zoomChart(){
//     chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
// }


});
