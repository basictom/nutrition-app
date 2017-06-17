app.controller("MealCtrl", function($scope, MealFactory, FIREBASE_CONFIG){

  $scope.meals = {};
  $scope.userInput = {};


  $scope.data = {
     singleSelect: null,
    };
  $scope.options = ["Breakfast","Lunch","Dinner"];

  let query = $scope.userInput;
  console.log("user input", $scope.userInput);

  $scope.getFacts = () => {
    console.log("clicking...");
    // get meals from API
    MealFactory.getUserNutr(query).then((returns) => {
      // let returnedVal = returns.data.foods;
      $scope.meals = returns;
      for(i=0;i<returns.length;i++){
        singleItem(returns[i]);
      }
    }).catch((error) => {
      console.log("get error", error);
    });
  };

  let singleItem = (item) => {
    MealFactory.postUserValues(item).then((returns) => {
      console.log("signle", returns);
    }).catch((error) => {
      console.log("single error", error);
    });
  };

  // let getMeals = () => {
  //   // get meals from FIREBASE
  // };

});
