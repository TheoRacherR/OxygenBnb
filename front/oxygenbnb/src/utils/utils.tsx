import axios from "axios";
import { userRole } from "../../../../back/oxygenbnb/src/tables/user/entities/user.entity";
import { JwtService } from '@nestjs/jwt';

export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/";
export const endQuery = "&format=json&addressdetails=1&polygon_geojson=0&limit=20";

export const verifyIfLogged = async (): Promise<boolean> => {
  if(localStorage.getItem("jwtToken")){
    try {
      const verifToken = await axios.get(
        "http://localhost:3333" + "/auth/verifyToken", {
          headers: {
            token: localStorage.getItem("jwtToken")
          }
        }
      )
      if(verifToken.status === 200) return true;
      else return false;
    }
    catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken")
      return false
    }
  }
  else return false;
}

export const verifyRole = async (): Promise<userRole | string> =>{
  if(localStorage.getItem("jwtToken")){
    try {
      const verifToken = await axios.get(
        "http://localhost:3333" + "/auth/verifyToken", {
          headers: {
            token: localStorage.getItem("jwtToken")
          }
        }
      )
      if(verifToken.status === 200) return verifToken.data.role;
      else return "error";
    }
    catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken")
      return "not logged"
    }
  }
  else return "not logged";
}

export const getUserInfos = async (): Promise<{id: number; firstname: string; lastname: string; email: string; role: string}> => {
  if(localStorage.getItem("jwtToken")){
    try {
      const token = localStorage.getItem("jwtToken");
      const verifToken = await axios.get(
        "http://localhost:3333" + "/auth/verifyToken", {
          headers: {
            token: token
          }
        }
      )
      if(verifToken.status === 200){
        const infos: { data: {id: number, firstname: string, lastname: string, email: string, role: string} } = await axios.get("http://localhost:3333" + "/user/" + verifToken.data.id)
        return {
          id: infos.data.id,
          firstname: infos.data.firstname,
          lastname: infos.data.lastname,
          email: infos.data.email,
          role: infos.data.role
        }
      }
    }
    catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken")
    }
  }
}



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
