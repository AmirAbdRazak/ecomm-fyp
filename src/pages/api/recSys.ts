import { prisma } from '../../server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabaseUrl = process.env.SUPABASE_URL!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const recSys = async (req: NextApiRequest, res: NextApiResponse) => {
    const invoiceRes = await prisma.invoice.findMany({
        where: {
            customer_id: '123456',
        },
        select: {
            OrderHistory: {
                select: {
                    item_id: true,
                },
            },
        },
    });

    // Grabs the invoiceRes and parses it into a list of 10 most recent product purchases
    const prevOrders = invoiceRes
        .map((inv) => inv.OrderHistory.map((order) => order.item_id))
        .flat()
        .splice(0, 10);

    const { data } = await supabase
        .from('Recsys')
        .select('*')
        .in('asin', prevOrders);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prodFilter: [string, number][] = data!
        .map((recs: number) =>
            Object.entries(recs).filter(([asin, value]: [string, number]) => {
                if (asin != 'asin' && value > 0.65 && value != 1) {
                    return [asin, value];
                }
            })
        )
        .flat();

    const recProds = prodFilter.map(([asin, value]) => {
        return {
            [asin]: value,
        };
    });

    res.status(200).json(recProds);
};

export default recSys;
