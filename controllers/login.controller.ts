import { NextApiRequest, NextApiResponse } from "next";
import CustomAxios from "../services/baxios.service";
 
import crypto from "crypto"
import { config } from "dotenv";
const keyc = config().parsed?.MYKU_ENCODEKEY || ""
const eString = (str: string) => {
    return crypto
        .publicEncrypt(
            {
                key: keyc,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(str, "utf8")
        )
        .toString("base64");
};

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let axiosService = new CustomAxios();
        let { data } = await axiosService.getLogin(
            eString(req.body.username),
            eString(req.body.password)
        );
        res.json(data)
    } catch {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default Login;