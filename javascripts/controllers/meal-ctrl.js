app.controller("MealCtrl", function($scope, MealFactory, FIREBASE_CONFIG){


  $scope.meals = {};
  $scope.userInput = {};
  let query = $scope.userInput;
  console.log("user input", $scope.userInput);

  $scope.getFacts = () => {
    console.log("clicking...");
    // get meals from API
    MealFactory.getUserNutr(query).then((returns) => {
      console.log("api ctrl return", returns);
    }).catch(() => {
      console.log("get error", error);
    });
  };

  let getMeals = () => {
    // get meals from FIREBASE
  };

});
