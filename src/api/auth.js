import axios from "./index";
import { API_SERVER } from "../config/constants";

class AuthApi {
  static Login = (data) => {
    // return axios.post(`${API_SERVER}/auth/login`, data); // https://backend-stonkverse.vercel.app/api/v1/auth/login

    let data1 = JSON.stringify({
        "username": "admin",
        "password": "123456a@"
      });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_SERVER}/auth/login`,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data : data1
      };
      
      return axios.request(config);

  };

  static Register = (data) => {
    return axios.post(`${API_SERVER}users/register`, data);
  };

  static Authorize = (code) => {
    return axios.get(`${API_SERVER}sessions/oauth/github?code=${code}`);
  };

  static Logout = (data) => {
    return axios.post(`${API_SERVER}users/logout`, data, {
      headers: { Authorization: `${data.token}` },
    });
  };
}

export default AuthApi;