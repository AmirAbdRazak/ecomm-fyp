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

    const recUnsorted = prodFilter.map(([asin, value]) => {
        return {
            [asin]: value,
        };
    });

    const recSorted = recUnsorted
        .sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
            const x = Object.values<number>(a)[0];
            const y = Object.values<number>(b)[0];

            return x && y ? y - x : 0;
        })
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((rec) => Object.keys(rec)[0]!);

    const recProds = await prisma.item.findMany({
        where: {
            id: { in: recSorted },
        },
        select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
        },
    });

    res.status(200).json(recProds);
};

export default recSys;
