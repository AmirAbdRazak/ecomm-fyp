import { prisma } from '../../server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const getInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
    let invoice;
    await new Promise((r) => setTimeout(r, 1000));
    if (req.method === 'POST') {
        const { invoice_id } = req.body;
        invoice = await prisma.invoice.findFirst({
            where: {
                id: invoice_id,
            },
            select: {
                id: true,
                timestamp: true,
                paymentType: true,
                amount: true,
                invoice_ref: true,
                customer: {
                    select: {
                        name: true,
                        email: true,
                    },
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
                            },
                        },
                    },
                },
            },
        });
    }

    res.status(200).json({
        invoice: invoice,
        warning:
            'Invoice is deprecated for now until React Query is implemented, we are currently using Server Side Rendering in the meanwhile',
    });
};

export default getInvoice;
