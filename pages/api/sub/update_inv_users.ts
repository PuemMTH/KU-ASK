import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../database/connection'
import UsersStatus from '../../../database/model/UsersStatus'
import { jwt_Decoded, update_inv_token } from "../../../interface/global_interface";
import jwt_decode from "jwt-decode";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).json({message: "Method not allowed"})
    await connect()

    try {
        let { token_verify, update_subject } = req.body as update_inv_token;

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
            await UsersStatus.updateOne({ user_id: jwt_user_id }, {
                user_inventory: update_subject,
            }).then(async () => {
                res.status(200).json({
                    message: "Success",
                    data: await UsersStatus.findOne({ user_id: jwt_user_id })
                })
                return;
            }).catch(() => {
                res.status(500).json({
                    message: "Internal server error",
                });
                return;
            });
            
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