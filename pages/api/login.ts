// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Login from '../../controllers/login.controller'
import type { LoginData } from '../../interface/global_type'

export default function handler( req: NextApiRequest, res: NextApiResponse<LoginData>) {
    if(req.method !== "POST") return res.status(405).json({message: "Method not allowed"})
    return Login(req, res)
}