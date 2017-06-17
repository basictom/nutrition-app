app.factory("MealFactory", function($q, $http, $rootScope, FIREBASE_CONFIG, NUTRX_CONFIG){




  let createMeal = (meal, uid) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
        date: meal.date,
        type: meal.singleSelect,
        uid: uid
      }))
      .then((meals) => {
          resolve(meals);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let getUserMeals = () => {
    let meals = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="mealId"&equalTo="${mealId}"`)
      .then((meals) => {
        console.log("get meals in factory", meals);
          let mealCollect = meals.data;
          resolve(mealCollect);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return { getUserMeals:getUserMeals, createMeal:createMeal};


});
