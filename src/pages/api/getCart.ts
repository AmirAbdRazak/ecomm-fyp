import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {

    const inCart = await prisma.orderHistory.findMany({ 
        where: { 
            customer_id: "123456",
            status: "In cart"
        },
        select: { 
            item: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    image_url: true
                }
            }
        }
    })

    res.status(200).json(inCart);
}

export default getCart;