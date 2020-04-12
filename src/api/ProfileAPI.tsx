import axios from "axios";

class ProfileAPI {
  async getProfiles() {
    try {
      const res = await axios.get(`http://localhost:8080/get_profiles`, {});
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

  async getProfileByAccount(user: string, password: string) {
    try {
      const res = await axios.get(
        `http://localhost:8080/get_profiles/login`,
        {}
      );
      return res.data;
    } catch (err) {}
  }
}

export default new ProfileAPI();
