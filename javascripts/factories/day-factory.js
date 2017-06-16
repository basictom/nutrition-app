app.factory("DayFactory", function($q, $http, FIREBASE_CONFIG, $rootScope){
  console.log("day factory");

  let postNewDate = (date) => {
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

  return {};

});
