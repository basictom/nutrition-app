app.factory("DayFactory", function($q, $http, FIREBASE_CONFIG, $rootScope){
  console.log("day factory");

  let postNewDay = (date) => {
    console.log("day factory", date);
  return $q((resolve, reject) => {
    $http.post(`${FIREBASE_CONFIG.databaseURL}/days.json`, JSON.stringify({
      date: date,
      uid: $rootScope.user.uid
    }))
    .then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};


let getDates = (uid) => {
  console.log("get dates uid", uid);
    let dates = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/days.json`)
      .then((day) => {
        let dateCollect = day.data;
          if(dateCollect !== null){
            Object.keys(dateCollect).forEach((key) => {
              dateCollect[key].id=key;
              dates.push(dateCollect[key]);
            });
          }
          console.log("get user dates", dates);
          resolve(dates);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {postNewDay:postNewDay, getDates:getDates};

});
