export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          console.log("User's location: ", userLatitude, userLongitude);
          // Resolves the promise with the user's latitude and longitude
          resolve({ latitude: userLatitude, longitude: userLongitude });
        },
        (error) => {
          // Alerts the user and rejects the promise if geolocation access fails
          alert(
            error.message + "Geolocation access is required to play the game.",
          );
          reject(error);
        },
      );
    } else {
      // Handles the case where geolocation is not supported by the browser
      const error = new Error("Geolocation is not supported by this browser.");
      alert(error.message);
      reject(error);
    }
  });
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude differences to radians
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  // Haversine formula to calculate the distance
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate and return the distance in kilometers
  return R * c;
}

function deg2rad(deg) {
  // Converts degrees to radians
  return deg * (Math.PI / 180);
}
