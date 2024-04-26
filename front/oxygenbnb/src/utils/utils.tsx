export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/";
export const endQuery = "&format=json&addressdetails=1&polygon_geojson=0&limit=20";

// export const SearchPlaceWithPlaceID = (id:number) => {
//   const queryString = `lookup?osm_ids=${id}${endQuery}`;
//   fetch(`${NOMINATIM_BASE_URL}${queryString}`, { method: "GET", redirect: "follow"})
//     .then((response) => response.text())
//     .then((result) => {
//       return result;
//     })
//     .catch((err) => console.log("err: ", err));
// }


// export const SearchPlaceWithString = (query: string) => {
//   const queryString = `search?q=${query}${endQuery}`;
//   // console.log(`${NOMINATIM_BASE_URL}${queryString}`)
//   fetch(`${NOMINATIM_BASE_URL}${queryString}`, { method: "GET", redirect: "follow"})
//     .then((response) => response.text())
//     .then((res) => {
//       // console.log(resu lt)
//       return res;
//     })
//     .catch((err) => console.log("err: ", err));

// }
