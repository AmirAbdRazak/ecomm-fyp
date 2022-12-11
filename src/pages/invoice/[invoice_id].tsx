import React, { useEffect, useState } from 'react'
import { GetStaticPropsContext } from 'next'

import { prisma } from "../../server/db/client";

const InvoiceRow = ({ item }: { item: itemType }) => {
    return (
        <tr className="border-b border-slate-200">
            <td className="hidden w-20 h-20 px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                <img src={item.image_url} />
            </td>
            <td className="hidden px-3 py-4 text-sm text-left text-slate-500 sm:table-cell">
                {item.id}
            </td>
            <td className="hidden px-3 py-4 text-sm text-left text-slate-500 sm:table-cell">
                {item.name.length > 100 ? item.name.substring(0, 100) + "..." : item.name}
            </td>
            <td className="py-4 pl-3 pr-4 text-sm text-left text-slate-500 sm:pr-6 md:pr-0">
                ${item.price}
            </td>
        </tr>
    )
}

type itemType = {
    name: string,
    id: string,
    image_url: string,
    price: string,
}

type invoiceRes = {
    id: string,
    timestamp: Date,
    paymentType: string,
    amount: string,
    invoice_ref: string,
    customer: {
        name: string,
        email: string
    },
    OrderHistory: {
        id: string,
        item: itemType
    }[]
}


const Invoice = ({ invoiceList }: { invoiceList: invoiceRes }) => {

    return (
        <>
            <section className="py-5">
                <div className="w-full mx-auto py-16 bg-white">
                    <article className="overflow-hidden">

                        <div className="bg-[white] rounded-b-md">
                            <div className="p-9">
                                <div className="space-y-6 text-slate-700">
                                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                        MSU Ecommerce
                                    </p>
                                </div>
                            </div>
                            <div className="px-9">
                                <div className="flex w-full">
                                    <div className="grid grid-cols-4">
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">Customer Details</p>
                                            <p>{invoiceList?.customer.name}</p>
                                            <p>{invoiceList?.customer.email}</p>
                                        </div>
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">Invoice ID</p>
                                            <p>{invoiceList?.id}</p>
                                        </div>
                                        <div className="text-sm font-light text-slate-500 pl-10">
                                            <p className="text-sm font-normal text-slate-700">Invoice Reference</p>
                                            <p>{invoiceList?.invoice_ref}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-9">
                                <div className="flex flex-col mx-0 mt-8">
                                    <table className="min-w-full divide-y divide-slate-500">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-5 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                                    Product Preview
                                                </th>
                                                <th scope="col" className="hidden py-3.5 px-3 text-left text-sm font-normal text-slate-700 sm:table-cell">
                                                    Product Id
                                                </th>
                                                <th scope="col" className="hidden py-3.5 px-3 text-left text-sm font-normal text-slate-700 sm:table-cell">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="py-3.5 pl-3 pr-4 text-left text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                invoiceList?.OrderHistory.map(order =>
                                                    <InvoiceRow
                                                        key={order.id}
                                                        item={order.item}
                                                    />
                                                )
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th scope="row" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    Subtotal
                                                </th>
                                                <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                    Subtotal
                                                </th>
                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    $Free
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    Discount
                                                </th>
                                                <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                    Discount
                                                </th>
                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    $Free
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    Tax
                                                </th>
                                                <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                    Tax
                                                </th>
                                                <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    $Free
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                                                    Total
                                                </th>
                                                <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                                                    Total
                                                </th>
                                                <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                    $Free
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-48 p-9">
                                <div className="border-t pt-9 border-slate-200">
                                    <div className="text-sm font-light text-slate-700">
                                        <p>
                                            MSU Copyright
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section >
        </>
    )
}


export async function getStaticPaths() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'false',
        }
    }

    const invoice = await prisma.invoice.findMany();

    const paths = invoice.map((invoice) => ({
        params: { invoice_id: invoice.id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext<{ invoice_id: string }>) {
    if (context.params) {
        const { invoice_id } = context.params;
        const invoiceList = await prisma.invoice.findFirst({
            where: {
                id: invoice_id
            },
            select: {
                id: true,
                paymentType: true,
                amount: true,
                invoice_ref: true,
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
        });

        return {
            props: {
                invoiceList,
            },
            revalidate: 10
        }
    }
    console.log("An error occured");
}
export default Invoice;