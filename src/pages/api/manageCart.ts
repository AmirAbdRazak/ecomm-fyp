import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const manageCart = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {

        case "GET":
            const inCart = await prisma.orderHistory.findMany({
                where: {
                    customer_id: "123456",
                    status: "In cart",
                },
                select: {
                    item: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image_url: true,
                        },
                    },
                },
            });
            res.status(200).json(inCart);
            break;

        case "POST":
            const {item_id, seller_id} = req.body;
            const toCart = await prisma.orderHistory.create({
                data: {
                    item_id: item_id,
                    customer_id: "123456",
                    seller_id: seller_id,
                    status: "In cart",
                }
            });

            
            res.status(200).json(toCart);
            break;
        
        default: 
            res.status(200).send("This page does not exist I fear");


    }
};

export default manageCart;
