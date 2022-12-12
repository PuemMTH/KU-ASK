import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../database/connection'
import SubjectInfo from '../../../database/model/SubjectInfo'

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({message: "Method not allowed"})
    await connect()
    try {
        const checkSubjectInfo = await SubjectInfo.find({ })
        if (checkSubjectInfo) {
            return res.status(200).json({
                data: checkSubjectInfo
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