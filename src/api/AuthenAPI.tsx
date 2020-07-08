import axios from "axios";
import { IAccount } from "store/AuthenStore.d";

class AuthenAPI {
  async getProfileByAccount(account: IAccount) {
    try {
      const data = {
        username: account.username,
        password: account.password,
      };
      const res = await axios.post(`http://localhost:8080/login`, data, {
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

  async createProfile(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    try {
      console.log("Shoot API");
      const data = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      };
      const res = await axios.post(`http://localhost:8080/register`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
      console.log("resp api=====>", res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthenAPI();
