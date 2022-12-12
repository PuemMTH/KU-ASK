// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../database/connection'
import UsersStatus from '../../../database/model/UsersStatus'
import jwt_decode from "jwt-decode";
import { jwt_Decoded, jwt_verify, req_inv_token, UsersSubJectInventory } from "../../../interface/global_interface";
import CustomAxios from "../../../services/baxios.service";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).json({message: "Method not allowed"})
    await connect()

    try {
        let { token_verify } = req.body as jwt_verify;
        let decoded: jwt_Decoded = jwt_decode(token_verify);
        let now = new Date();
        let exp = new Date(decoded.exp * 1000);
        if (now > exp) {
            res.status(401).json({
                message: "Token expired",
            });
            return;
        }
        let letCustomAxios = new CustomAxios();
        let jwt_user_id = decoded.idcode;
        const checkUser = await UsersStatus.findOne({ user_id: jwt_user_id })
        if (checkUser) {
            await UsersStatus.updateOne({ user_id: jwt_user_id }, {
                user_log_count: checkUser.user_log_count + 1,
                user_log_time: new Date(),
                user_firstLogin: false,
            })
            res.status(200).json({
                message: "Success",
                data: await UsersStatus.findOne({ user_id: jwt_user_id })
            })
            return;
        }else{
            
            const sub = await UsersStatus.create({
                user_id: jwt_user_id,
                user_inventory: [],
                user_log_count: 1,
                user_firstLogin: true,
                user_log_time: new Date(),
            })
            await sub.save()

        }

    } catch {
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }

}