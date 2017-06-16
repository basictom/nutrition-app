app.factory("MealFactory", function($q, $http, $httpParamSerializerJQLike, FIREBASE_CONFIG, NUTRX_CONFIG){

  let getUserNutr = (query) => {
    console.log("get api", query);
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
        // console.log("api returned", nutrients);
          // resolve(nutrients);
          let flatNutrients = nutrients.data.foods;
          return postUserValues(flatNutrients);
      }).then((returns) => {
          console.log("second .then return", returns);
        }).catch((error) => {
        reject(error);
      });
    });
  };




  let postUserValues = (values) => {
  return $q((resolve, reject) => {
    $http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
      // description: pinId.description,
      // title: pinId.title,
      // uid: $rootScope.user.uid,
      // url: pinId.url,
      // boardID: boardId
    }))
    .then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};


  return {getUserNutr:getUserNutr};


});
