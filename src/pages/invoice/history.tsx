import { NextApiResponse } from 'next';
import Link from 'next/link';
import React from 'react';
import { prisma } from '../../server/db/client';

const InvoiceRow = ({ item }: { item: itemType }) => {
    return (
        <tr className="border-b border-slate-200">
            <td className="hidden h-20 w-20 px-3 py-4 text-right text-sm text-slate-500 md:table-cell">
                <img
                    src={item.image_url}
                    alt={item.name}
                />
            </td>
            <td className="hidden px-3 py-4 text-left text-sm text-slate-500 md:table-cell">
                {item.id}
            </td>
            <td className="table-cell px-3 py-4 text-left text-sm text-slate-500">
                {item.name.length > 100
                    ? item.name.substring(0, 100) + '...'
                    : item.name}
            </td>
            <td className="py-4 pl-3 pr-4 text-left text-sm text-slate-500 sm:pr-6 md:pr-0">
                $
                {item.price == 'Out of Stock' || item.price == '0.0'
                    ? '4.99'
                    : item.price}
            </td>
        </tr>
    );
};

type itemType = {
    name: string;
    id: string;
    image_url: string;
    price: string;
};

type invoiceRes = {
    id: string;
    timestamp: Date;
    paymentType: string;
    amount: string;
    invoice_ref: string;
    customer: {
        name: string;
        email: string;
    };
    OrderHistory: {
        id: string;
        item: itemType;
    }[];
};

const InvoiceItem = ({ invoiceList }: { invoiceList: invoiceRes }) => {
    return (
        <Link href={`/invoice/${invoiceList.id}`}>
            <div className="mx-10 my-10 rounded-lg border py-10 pb-20 shadow-sm hover:shadow-lg md:mx-20">
                <div className="mx-5 grid grid-cols-2 px-10 py-10">
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                            Invoice ID:
                        </p>
                        <p>{invoiceList?.id}</p>
                    </div>
                    <div className="hidden pl-10 text-sm font-light text-slate-500 md:block">
                        <p className="text-sm font-normal text-slate-700">
                            Invoice Reference:
                        </p>
                        <p>{invoiceList?.invoice_ref}</p>
                    </div>
                </div>
                <div className="mx-5 border-b px-9">
                    <div className="mx-0 mt-8 flex flex-col">
                        <table className="min-w-full divide-y divide-slate-500">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="hidden py-3.5 pl-4 pr-5 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                                    >
                                        Product Preview
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-3.5 px-3 text-left text-sm font-normal text-slate-700 md:table-cell"
                                    >
                                        Product Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-normal text-slate-700 sm:table-cell"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-3 pr-4 text-left text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                                    >
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceList?.OrderHistory.map((order) => (
                                    <InvoiceRow
                                        key={order.id}
                                        item={order.item}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const InvoiceHistory = ({
    invoiceHistory,
}: {
    invoiceHistory: invoiceRes[];
}) => {
    return (
        <>
            <section className="py-5">
                <div className="mx-auto w-full bg-white py-16">
                    <article className="overflow-hidden">
                        <div className="rounded-b-md bg-[white]">
                            <div className="px-20">
                                <div className="space-y-6 text-slate-700">
                                    <p className="font-body text-2xl font-extrabold  tracking-tight">
                                        Order History
                                    </p>
                                </div>
                            </div>
                            <div>
                                {invoiceHistory &&
                                    invoiceHistory.reverse().map(
                                        (invoiceList) =>
                                            invoiceList.OrderHistory.length >
                                                0 && (
                                                <InvoiceItem
                                                    key={invoiceList.id}
                                                    invoiceList={invoiceList}
                                                />
                                            )
                                    )}
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
};

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=120, stale-while-revalidate=59'
    );
    const invoiceHistory = await prisma.invoice.findMany({
        select: {
            id: true,
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
    return {
        props: {
            invoiceHistory,
        },
    };
}

export default InvoiceHistory;
