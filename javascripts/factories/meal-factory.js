app.factory("MealFactory", function($q, $http, $httpParamSerializerJQLike, FIREBASE_CONFIG, NUTRX_CONFIG){

  let getUserNutr = (query) => {
    console.log("get api", query);
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
        console.log("api returned", nutrients);
          // resolve(nutrients);
          flatNutrients = nutrients.data.foods;
          resolve(flatNutrients);
          console.log("nutrients", flatNutrients);
          // return postUserValues(flatNutrients);
      }).catch((error) => {
        console.log("catch error", error);
        reject(error);
      });
    });
  };




  let postUserValues = (values) => {
    console.log("hitting post user values", values);
    return $q((resolve, reject) => {
        $http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
          food_name: values.food_name
        }))
        .then((result) => {
          console.log("post to FB", result);
          resolve(result);
        }).catch((error) => {
          console.log("post to FB", error);
          reject(error);
        });
    });
  };


  return {getUserNutr:getUserNutr, postUserValues:postUserValues};


});
