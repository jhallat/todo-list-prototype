//http://localhost:5010/api/security/login
import * as axios from "axios";
import { SECURITY_API } from "@/shared";

const login = async function(userName, password) {
    try {
        const response = await axios.post(`${SECURITY_API}/security/login`,
            {
                userName,
                password
            });
         localStorage.setItem('AuthObject', JSON.stringify(response.data));
         return response.data;
    } catch (error) {
        console.log(error)
        return {
            isAuthenticated: false
        };
    }
}

export const SecurityService = {
    login
}
