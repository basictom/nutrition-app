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
        console.log("api returned", nutrients);
          // let collection = nutr.data;
            // Object.keys(pinCollection).forEach((key) => {
            //   pinCollection[key].id=key;
            //   pins.push(pinCollection[key]);
            // });
          resolve(nutrients);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {getUserNutr:getUserNutr};


});
