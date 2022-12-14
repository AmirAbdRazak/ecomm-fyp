// import Router from 'next/router';
import { GetStaticPropsContext } from 'next/types';
import React, { Dispatch, SetStateAction } from 'react';
import { prisma } from '../../server/db/client';

const uploadCart = async (
    item_id: string,
    seller_id: string,
    setRender: Dispatch<SetStateAction<boolean>>,
    setOpen: Dispatch<SetStateAction<boolean>>
) => {
    const obj = {
        item_id: item_id,
        seller_id: seller_id,
    };

    await fetch('/api/manageCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    setOpen(true);
    setRender(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOpen(false);
};

const Product = ({
    prod,
    setRender,
    setOpen,
}: {
    prod: product;
    setRender: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div className="bg-white">
            <div className="pt-20">
                <div className="mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:px-8"></div>

                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="aspect-h-3 aspect-w-4 hidden overflow-hidden rounded-lg lg:flex lg:flex-col">
                        <img
                            src={prod.image_url}
                            alt={prod.name}
                            className="h-50 w-50 object-cover object-center"
                        />
                    </div>

                    <div className="my-auto flex flex-col">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {prod.name}
                            </h1>
                        </div>

                        <div className="mt-4 lg:col-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">
                                $
                                {prod.price == 'Out of Stock' ||
                                prod.price == '0.0'
                                    ? '4.99'
                                    : prod.price}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            uploadCart(
                                prod.id,
                                prod.seller_id,
                                setRender,
                                setOpen
                            )
                        }
                        className="my-auto flex h-20 w-full items-center justify-center rounded-md border border-transparent bg-rose-600 py-3 px-8 text-base font-medium 
                    text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                        Add to bag
                    </button>
                </div>

                <div className="mx-6 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">
                                {prod.name}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">
                            Details
                        </h2>

                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{prod.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'false',
        };
    }

    const prods = await prisma.item.findMany();

    const paths = prods.map((prod) => ({
        params: { productId: prod.id },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(
    context: GetStaticPropsContext<{ productId: string }>
) {
    if (context.params) {
        const prod = await prisma.item.findUnique({
            where: {
                id: context.params.productId,
            },
        });

        return {
            props: {
                prod,
            },
        };
    }
    console.log('An error occured');
}

export default Product;
