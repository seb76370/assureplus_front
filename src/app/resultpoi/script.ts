export function location_gps_on_ggole_map(): Promise<{latitude: number, longitude: number}> {
  return new Promise((resolve, reject) => {
    let latitude = 0;
    let longitude = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        const map = document.querySelector("iframe");
        const url = `https://maps.google.com/maps?width=700&height=440&hl=en&q=${latitude} ${longitude}+(Titre)&ie=UTF8&t=&z=10&iwloc=B&output=embed`;
        if (map instanceof HTMLIFrameElement) {
          map.src = url;

        }
        resolve({latitude, longitude});
      }, (error) => {
        reject(error);
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
      reject(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
    }
  });
}
