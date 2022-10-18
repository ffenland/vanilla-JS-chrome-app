const onGeoSuccess = (geolocationPosition) => {
  const { latitude, longitude } = geolocationPosition.coords;
  console.log(latitude);
  console.log(longitude);
};
const onGeoFail = () => {
  alert("Where are you?!");
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
