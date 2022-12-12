import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../database/connection'
import UsersStatus from '../../../database/model/UsersStatus'
import { jwt_Decoded, jwt_verify } from "../../../interface/global_interface";
import jwt_decode from "jwt-decode";

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

        let jwt_user_id = decoded.idcode;
        const checkUser = await UsersStatus.findOne({ user_id: jwt_user_id })
        if (checkUser) {
            return res.status(200).json({
                data: checkUser.user_inventory
            })
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