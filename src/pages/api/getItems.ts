import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const getItems = async (req: NextApiRequest, res: NextApiResponse) => {

    const prods = await prisma.item.findMany();
    res.status(200).json(prods);

};

export default getItems;
