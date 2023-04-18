export function location_gps_on_ggole_map(latitude:number = 0,longitude:number = 0): Promise<{latitude: number, longitude: number}> {
  return new Promise((resolve, reject) => {

   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (latitude == 0)
        {
          latitude = position.coords.latitude;
        }
        if (longitude == 0)
        {
          longitude = position.coords.longitude;
        }
 
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
