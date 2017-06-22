app.factory("DayFactory", function($q, $http, FIREBASE_CONFIG, $rootScope){
  console.log("day factory");

  let postNewDay = (date) => {
  return $q((resolve, reject) => {
    $http.post(`${FIREBASE_CONFIG.databaseURL}/days.json`, JSON.stringify({
      date: date,
      uid: $rootScope.user.uid
    }))
    .then((result) => {
      resolve(result.data);
    }).catch((error) => {
      reject(error);
    });
  });
};


let getDates = (uid) => {
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
          resolve(dates);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let dateDelete = (dayId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/days/${dayId}.json`)
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let editDates = (id) => {
    console.log(id);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/days/${id}.json`, JSON.stringify({
        date: date,
        uid: $rootScope.user.uid
      }))
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  return {postNewDay:postNewDay, getDates:getDates, dateDelete:dateDelete};

});
