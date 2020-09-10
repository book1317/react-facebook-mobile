import axios from "axios";
import { IRegister } from "store/RegisterStore.d";

class RegisterAPI {
  async createProfile(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    try {
      console.log("Shoot API");
      const data:IRegister = {
        profile:{
        firstname: firstname,
        lastname: lastname,
        },
        account:{
        username: username,
        password: password,
        }
      };
      console.log("data",data)
      const res = await axios.post(`http://localhost:8080/register`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new RegisterAPI();
