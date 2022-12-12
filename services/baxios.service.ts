import axios, { AxiosInstance, AxiosStatic } from "axios";
import { LoginInF } from "../interface/global_interface";

import { config } from "dotenv";
const MYKU_APPKEY = config().parsed?.MYKU_APPKEY || ""

export default class AxiosService {
    public axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://myapi.ku.th",
        });
    }

    public async getGroupCourse( academicYear: string, semester: string, stdId: string, token: string ) {
        let { data } = await this.axiosInstance.get(
            `/std-profile/getGroupCourse?academicYear=${academicYear}&semester=${semester}&stdId=${stdId}`,
            {
                headers: {
                    "app-key": MYKU_APPKEY,
                    "x-access-token": token,
                },
            }
        );
        return data;
    }
    
    public async checkGrades( idcode: string, token: string ) {
        let { data } = await this.axiosInstance.get(
            `/std-profile/checkGrades?idcode=${idcode}`,
            {
                headers: {
                    "app-key": MYKU_APPKEY,
                    "x-access-token": token,
                },
            }
        );
        return data;
    }

    public async getImage(token: string): Promise<string> {
        let { data } = await this.axiosInstance.get<any>( "/std-profile/stdimages",
            {
                headers: {
                    "app-key": MYKU_APPKEY,
                    "x-access-token": token,
                },
                responseType: "arraybuffer",
            }
        );
        return (
            "data:image/jpeg;base64," +
            Buffer.from(data, "binary").toString("base64")
        );
    }

    public getLogin(username: string, password: string) {
        return this.axiosInstance.post<LoginInF>( "/auth/login", { username, password },
            {
                headers: {
                    authority: "myapi.ku.th",
                    accept: "*/*",
                    "app-key": MYKU_APPKEY,
                    "content-type": "application/json",
                    origin: "https://my.ku.th",
                    referer: "https://my.ku.th/",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                },
            }
        );
    }
}