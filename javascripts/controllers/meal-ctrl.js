app.controller("MealCtrl", function($scope, $rootScope, MealFactory, FoodFactory, FIREBASE_CONFIG){

  $scope.meals = [];
  $scope.userInput = {};

  let chartdata = 


  $scope.data = {
     singleSelect: null,
    };
  $scope.options = ["Breakfast","Lunch","Dinner"];

  let query = $scope.userInput;
  console.log("user input", $scope.userInput);

  $scope.getFacts = () => {
    MealFactory.createMeal($scope.userInput, $rootScope.user.uid).then((returns) => {
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
    MealFactory.getUserMeals($rootScope.user.uid).then((returns) => {
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


});
