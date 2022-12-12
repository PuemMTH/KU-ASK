import axios, { AxiosInstance, AxiosStatic } from "axios";
import { LoginInF } from "../interface/global_interface";
export default class AxiosServiceFrontend {
    public axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "/api",
        });
    }
    public login(username: string, password: string) {
        return this.axiosInstance.post<LoginInF>("/auth/login", {
            username,
            password,
        });
    }
    public tokenTime(token_verify: string | undefined) {
        return this.axiosInstance.post("/api/token", {
            token_verify,
        });
    }
}