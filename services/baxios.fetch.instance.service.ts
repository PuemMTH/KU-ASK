import axios, { AxiosInstance, AxiosStatic } from "axios";
import { LoginInF } from "../interface/global_interface";

import { config } from "dotenv";
const MYKU_APPKEY = config().parsed?.MYKU_APPKEY || ""

export default class AxiosFetchService {
    public axiosInstance: AxiosInstance;
    constructor(token: string) {
        this.axiosInstance = axios.create({
            baseURL: "https://myapi.ku.th",
            headers: {
                "app-key": MYKU_APPKEY,
                "x-access-token": token,
            }
        });
    }
}