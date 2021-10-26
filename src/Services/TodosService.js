import http from "./HttpService";
import {apiUrl} from "../config.json";

export const getTodoList = () => {
    const apiEndpoint =`${apiUrl}/todos`;
    return http.get(`${apiEndpoint}`)
    
}