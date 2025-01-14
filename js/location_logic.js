export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          console.log("User's location: ", userLatitude, userLongitude);
          resolve({ latitude: userLatitude, longitude: userLongitude }); // Resolve with the user's location
        },
        (error) => {
          alert(
            error.message + "Geolocation access is required to play the game.",
          );
          reject(error); // Reject with the error
        },
      );
    } else {
      const error = new Error("Geolocation is not supported by this browser.");
      alert(error.message);
      reject(error); // Reject with the error
    }
  });
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
