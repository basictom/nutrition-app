app.factory("MealFactory", function($q, $http, $rootScope, FIREBASE_CONFIG, NUTRX_CONFIG){




  let createMeal = (meal, uid, date) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
        date: date,
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

  let getUserMeals = (dateId) => {
    console.log("get user meals", dateId);
    let meals = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="dayId"&equalTo="${dateId}"`)
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
