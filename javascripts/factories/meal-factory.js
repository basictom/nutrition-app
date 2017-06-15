app.factory("MealFactory", function($q, $http, FIREBASE_CONFIG, NUTRX_CONFIG){

  let getUserNutr = (query) => {
    console.log("get api", query);
    let nutrients = [];
    return $q((resolve, reject) => {
      $http({
        method: 'post',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'x-app-id': `${NUTRX_CONFIG.xappId}`,
          'x-app-key': `${NUTRX_CONFIG.xapiKey}`,
          'x-remote-user-id': `${NUTRX_CONFIG.xuserId}`
        }
      })
      .then((nutr) => {
        console.log("api returned", nutr);
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
