import axios from "axios";
import { IAccount } from "store/AuthenStore.d";

class ProfileAPI {
  async getProfiles() {
    try {
      const res = await axios.get(`http://localhost:8080/profiles`, {});
      return res.data;
    } catch (err) {}
  }

  async getProfileByID(id: number) {
    try {
      const res = await axios.get(
        `http://localhost:8080/get_profiles/${id}`,
        {}
      );
      return res.data;
    } catch (err) {}
  }

  async getProfileByAccount(account: IAccount) {
    try {
      const data = {
        username: account.username,
        password: account.password,
      };
      // console.log(data);
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
}

export default new ProfileAPI();
