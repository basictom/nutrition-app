app.controller("MealCtrl", function($scope, $rootScope, $routeParams, MealFactory, FoodFactory, FIREBASE_CONFIG){

  $scope.meals = [];
  $scope.userInput = {};

  let totals = {
    breakfast : {
      calories : 0,
      protein: 0,
      carbs: 0
    },
    lunch : {
      calories : 0,
      protein: 0,
      carbs: 0
    },
    dinner : {
      calories : 0,
      protein: 0,
      carbs: 0
    }
  };


  $scope.data = {
     singleSelect: null,
    };
  $scope.options = ["Breakfast","Lunch","Dinner"];

  let query = $scope.userInput;

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
    let counter = 0;
    console.log("route params", $routeParams.date);
    MealFactory.getUserMeals($routeParams.date).then((returns) => {
      let finalCount = returns.length;
      returns.forEach((meal) => {
        FoodFactory.getUserFoods(meal.id).then((results) => {
          meal.foods = results;
          counter++;
          if(counter === finalCount){
            $scope.meals = returns;
            getTotals(returns);
            getFoods();
          }
        }).catch((error) => {
          console.log("get user foods", error);
        });
      });
      // Loop through everything that comes back make a factory call for the meal specific foods
      
    }).catch((error) => {
      console.log("get meals error", error);
    });
  };

  getMeals();

  let getTotals = (foo) => {
    // console.log("foods after totals", foo);
    foo.forEach((meal) => {
      meal.foods.forEach((food) => {
        // console.log("inside second foreach loop", food);
        if(meal.type === "Breakfast"){
          console.log("inside breakfast", food.nf_calories);
          totals.breakfast.calories += food.nf_calories;
          totals.breakfast.carbs += food.nf_total_carbohydrate;
          totals.breakfast.protein += food.nf_protein;
        }else if(meal.type === "Lunch"){
          totals.lunch.calories += food.nf_calories;
          totals.lunch.carbs += food.nf_total_carbohydrate;
          totals.lunch.protein += food.nf_protein;
        }else{
          totals.dinner.calories += food.nf_calories;
          totals.dinner.carbs += food.nf_total_carbohydrate;
          totals.dinner.protein += food.nf_protein;
        }
      });
    });
    // console.log("after looping", totals);
    loadCharts();
  };

  

  

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
let loadCharts = () => {
    let proteinData = [ {
    "type": "Breakfast",
    "visits": totals.breakfast.protein
  }, {
    "type": "Lunch",
    "visits": totals.lunch.protein
  }, {
    "type": "Dinner",
    "visits": totals.dinner.protein
  }];
console.log("proteinData", proteinData);
let calorieData = [ {
    "type": "Breakfast",
    "visits": totals.breakfast.calories
  }, {
    "type": "Lunch",
    "visits": totals.lunch.calories
  }, {
    "type": "Dinner",
    "visits": totals.dinner.calories
  }];
let carbData = [ {
    "type": "Breakfast",
    "visits": totals.breakfast.carbs
  }, {
    "type": "Lunch",
    "visits": totals.lunch.carbs
  }, {
    "type": "Dinner",
    "visits": totals.dinner.carbs
  }];

var chart = AmCharts.makeChart( "chartdiv1", {
  "type": "serial",
  "theme": "light",
  "dataProvider": proteinData,
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "<strong>[[value]]</strong>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "visits"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "type",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }
});

chart = AmCharts.makeChart( "chartdiv2", {
  "type": "serial",
  "theme": "light",
  "dataProvider": calorieData,
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "<strong>[[value]]</strong>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "visits"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "type",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }
});

chart = AmCharts.makeChart( "chartdiv3", {
  "type": "serial",
  "theme": "light",
  "dataProvider": carbData,
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "<strong>[[value]]</strong>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "visits"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "type",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }
});
};


});
