app.factory("FoodFactory", function($q, $http, $httpParamSerializerJQLike, NUTRX_CONFIG, FIREBASE_CONFIG){




  let getUserNutr = (query) => {
    let flatNutrients = {};
    return $q((resolve, reject) => {
      $http({
        method: 'POST',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-app-id': `${NUTRX_CONFIG.xappId}`,
          'x-app-key': `${NUTRX_CONFIG.xapiKey}`,
          'x-remote-user-id': `${NUTRX_CONFIG.xuserId}`
        },
        data: $httpParamSerializerJQLike({'query': query.query
        })
      })
      .then((nutrients) => {
          flatNutrients = nutrients.data.foods;
          resolve(flatNutrients);
      }).catch((error) => {
        console.log("catch error", error);
        reject(error);
      });
    });
  };


  let getUserFoods = (mealId) => {
    let foods = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foods.json?orderBy="mealId"&equalTo="${mealId}"`)
      .then((food) => {
          let foodCollect = food.data;
          if(foodCollect !== null){
            Object.keys(foodCollect).forEach((key) => {
              foodCollect[key].id=key;
              foods.push(foodCollect[key]);
            });
          }
          resolve(foods);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  let postUserValues = (values, mealId) => {
    return $q((resolve, reject) => {
        $http.post(`${FIREBASE_CONFIG.databaseURL}/foods.json`, JSON.stringify({
          mealId: mealId,
          nf_cholesterol: values.nf_cholesterol,
          nf_calories: values.nf_calories,
          nf_protein: values.nf_protein,
          nf_total_carbohydrate: values.nf_total_carbohydrate,
          serving_qty: values.serving_qty,
          serving_unit: values.serving_unit,
          food_name: values.food_name
        }))
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          console.log("post to FB", error);
          reject(error);
        });
    });
  };

  return {getUserNutr:getUserNutr, getUserFoods:getUserFoods, postUserValues:postUserValues};

});
