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

  let getUserMeals = (uid) => {
    console.log("get user meals", uid);
    let meals = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="uid"&equalTo="${uid}"`)
      .then((meal) => {
        let mealCollect = meal.data;
          if(mealCollect !== null){
            Object.keys(mealCollect).forEach((key) => {
              mealCollect[key].id=key;
              meals.push(mealCollect[key]);
            });
          }
          console.log("get user meals", meals);
          resolve(meals);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {getUserMeals:getUserMeals, createMeal:createMeal};


});
