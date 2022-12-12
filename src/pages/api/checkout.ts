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

        order_list.forEach(async (order_id) => {
            await prisma.orderHistory.update({
                where: {
                    id: order_id,
                },
                data: {
                    status: 'Purchased',
                    invoice_id: createInvoice.id,
                },
            });
        });

        const sendRes = {
            invoice: createInvoice,
            order_list: order_list,
        };

        res.status(200).json(sendRes);
    }
};

export default checkout;
