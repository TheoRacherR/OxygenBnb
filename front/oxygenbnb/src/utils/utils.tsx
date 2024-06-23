import axios from "axios";
import { userRole } from "../../../../back/oxygenbnb/src/tables/user/entities/user.entity";

export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/";
export const endQuery =
  "&format=json&addressdetails=1&polygon_geojson=0&limit=20";

export const verifyIfLogged = async (): Promise<boolean> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("jwtToken"),
        },
      });
      if (verifToken.status === 200) return true;
      else return false;
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken");
      return false;
    }
  } else return false;
};

export const verifyRole = async (): Promise<userRole | string> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("jwtToken"),
        },
      });
      if (verifToken.status === 200) return verifToken.data.role;
      else return "error";
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log(e)
      console.log("change jwtToken");
      return "not logged";
    }
  } else return "not logged";
};

export const getUserInfos = async (): Promise<{
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const token = localStorage.getItem("jwtToken");
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: token,
        },
      });
      if (verifToken.status === 200) {
        const infos: {
          data: {
            id: number;
            firstname: string;
            lastname: string;
            email: string;
            role: string;
          };
        } = await axios.get(`/user/${verifToken.data.id}`);
        return {
          id: infos.data.id,
          firstname: infos.data.firstname,
          lastname: infos.data.lastname,
          email: infos.data.email,
          role: infos.data.role,
        };
      }
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken");
    }
  }
};
