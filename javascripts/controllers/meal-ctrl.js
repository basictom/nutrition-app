app.controller("MealCtrl", function($scope, MealFactory, FIREBASE_CONFIG){

  $scope.meals = {};
  $scope.userInput = {};

  // $scope.items = [{
  //   id: 1,
  //   label: 'Breakfast',
  //   subItem: { name: 'aSubItem' }
  // }, {
  //   id: 2,
  //   label: 'Lunch',
  //   subItem: { name: 'bSubItem' }
  // },{
  //   id: 3,
  //   label: 'Dinner',
  //   subItem: { name: 'bSubItem' }
  // }];

  let query = $scope.userInput;
  console.log("user input", $scope.userInput);

  $scope.getFacts = () => {
    console.log("clicking...");
    // get meals from API
    MealFactory.getUserNutr(query).then((returns) => {
      let returnedVal = returns.data.foods;
      $scope.meals = returnedVal;
    }).catch(() => {
      console.log("get error", error);
    });
  };

  // let getMeals = () => {
  //   // get meals from FIREBASE
  // };






  // $scope.meals = {};
  // $scope.userInput = {};
  // let query = $scope.userInput;
  // console.log("user input", $scope.userInput);
  //
  // $scope.getFacts = () => {
  //   console.log("clicking...");
  //   // get meals from API
  //   MealFactory.getUserNutr(query).then((returns) => {
  //     let returnedVal = returns.data.foods;
  //     $scope.meals = returnedVal;
  //   }).catch(() => {
  //     console.log("get error", error);
  //   });
  // };
  //
  // let getMeals = () => {
  //   // get meals from FIREBASE
  // };

});
