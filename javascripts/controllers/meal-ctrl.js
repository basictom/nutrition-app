app.controller("MealCtrl", function($scope, $rootScope, MealFactory, FoodFactory, FIREBASE_CONFIG){

  $scope.meals = {};
  $scope.foods = {};
  $scope.userInput = {};


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
    // get meals from API

  };

  $scope.addMeal = () => {
    console.log("clicking option");
  };

  let getMeals = () => {
    MealFactory.getUserMeals().then((returns) => {
      returns.forEach((meal) => {
        FoodFactory.getUserFoods(meal.id).then((results) => {
          console.log("array of meals", results);
          meal.foods = results;
        }).catch(() => {

        });
      });
      // Loop through everything that comes back make a factory call for the meal specific foods
      $scope.meals = returns;
      console.log("get meals", $scope.meals);
    }).catch((error) => {
      console.log("get meals error", error);
    });
  };

  getMeals();

  let getFoods = () => {
    FoodFactory.getUserFoods().then((results) => {
      // console.log("getFoods", results);
      $scope.foods = results;
    }).catch((error) => {
      console.log("get foods error", error);
    });
  };

  getFoods();

  let singleItem = (item, mealId) => {
    FoodFactory.postUserValues(item, mealId).then((returns) => {
      // console.log("signle", returns);
    }).catch((error) => {
      console.log("single error", error);
    });
  };


});
