import axios from "axios";
import { IAccount } from "store/AuthenStore.d";

class LoginAPI {
    async login(
        account: IAccount
    ) {
        try {
            const data = account
            const response = await axios.post(`http://localhost:8080/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
            });
            return response.data;
        } catch (error) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            return '';
        }
    }
}

export default new LoginAPI();
