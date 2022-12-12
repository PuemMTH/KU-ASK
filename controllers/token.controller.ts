import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";
import { jwt_Decoded, jwt_verify } from "../interface/global_interface";

const tokenTime = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let { token_verify } = req.body as jwt_verify;
        let decoded: jwt_Decoded = jwt_decode(token_verify);
        let now = new Date();
        let exp = new Date(decoded.exp * 1000);
        let expOutFormat = exp.getFullYear() + "-" + (exp.getMonth() + 1) + "-" + exp.getDate() + " " + exp.getHours() + ":" + exp.getMinutes() + ":" + exp.getSeconds();
        if (now > exp) {
            res.status(401).json({
                message: "Token expired",
            });
            return;
        }
        res.status(200).json({
            message: "Token valid",
            exp: expOutFormat,
        });
    } catch {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default tokenTime;