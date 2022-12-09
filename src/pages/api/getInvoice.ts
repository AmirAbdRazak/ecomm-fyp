import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const getInvoice = async (req: NextApiRequest, res: NextApiResponse) => {

    let invoice;

    if (req.method === "POST") {
        const { invoice_id } = req.body;
        invoice = await prisma.invoice.findFirst({
            where: {
                id: invoice_id
            },
            select: {
                id: true,
                timestamp: true,
                paymentType: true,
                amount: true,
                customer: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                OrderHistory: {
                    select: {
                        id: true,
                        item: {
                            select: {
                                name: true,
                                id: true,
                                image_url: true,
                                price: true,
                            }
                        }
                    }
                }
            }
        })
    }

    res.status(200).json(invoice);

};

export default getInvoice;