import axios from "axios";

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

  async getProfileByAccount(username: string, password: string) {
    try {
      const data = {
        username: username,
        password: password,
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

export default new ProfileAPI();
