import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {search} = req.query;
    res.redirect(302, `/?search=${search}`)
}   