// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../database/connection'
import UsersStatus from '../../../database/model/UsersStatus'
import { jwt_Decoded, jwt_verify, req_inv_token, UsersSubJectInventory, jwt_getGroupCourse } from "../../../interface/global_interface";
import jwt_decode from "jwt-decode";

import CustomAxios from "../../../services/baxios.service";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).json({message: "Method not allowed"})
    await connect()

    try {
        let { token_verify, academicYear, semester } = req.body as jwt_getGroupCourse;
        let letCustomAxios = new CustomAxios();

        let decoded: jwt_Decoded = jwt_decode(token_verify);
        let now = new Date();
        let exp = new Date(decoded.exp * 1000);
        if (now > exp) {
            res.status(401).json({
                message: "Token expired",
            });
            return;
        }

        let jwt_user_id = decoded.idcode;
        const checkUser = await UsersStatus.findOne({ user_id: jwt_user_id })
        if (checkUser) {
            let getGroupCourse = await letCustomAxios.getGroupCourse(academicYear, semester, decoded.stdid, token_verify)
            
            res.status(200).json({
                message: "Success",
                data: getGroupCourse
            })
            
            return;
        }else{
            res.status(500).json({
                message: "Internal server error",
            });
            return;
        }

    } catch {
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }

}