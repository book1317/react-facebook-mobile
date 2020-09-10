import axios from "axios";
import { IAccount } from "store/AuthenStore.d";

class LoginAPI {
    async login(
        account: IAccount
    ) {
        try {
            console.log("Shoot API");
            const data = account
            console.log("data", data)
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

export default new LoginAPI();
