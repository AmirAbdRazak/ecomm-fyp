import { prisma } from '../../server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { order_list, invRef }: { order_list: string[]; invRef: string } =
            req.body;

        const createInvoice = await prisma.invoice.create({
            data: {
                customer_id: '123456',
                amount: '$Free',
                paymentType: 'Debit Card',
                invoice_ref: invRef,
            },
        });

        await prisma.orderHistory.updateMany({
            where: {
                id: { in: order_list },
            },
            data: {
                status: 'Purchased',
                invoice_id: createInvoice.id,
            },
        });

        const sendRes = {
            invoice: createInvoice,
        };

        res.status(200).json(sendRes);
    }
};

export default checkout;
