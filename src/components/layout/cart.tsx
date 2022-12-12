import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import Router, { SingletonRouter } from 'next/router';

type getCartRes = {
    id: string;
    item: product;
};

const removeItem = (
    order_id: string,
    setRender: Dispatch<SetStateAction<boolean>>
) => {
    fetch('/api/manageCart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: order_id }),
    }).then(() => {
        setRender(true);
    });
};

const checkoutCart = (
    orders: getCartRes[],
    setRender: Dispatch<SetStateAction<boolean>>,
    invRef: string,
    router: SingletonRouter,
    setOpen: Dispatch<SetStateAction<boolean>>
) => {
    const order_list = orders.map((order) => order.id);

    if (order_list.length > 0) {
        fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_list: order_list, invRef: invRef }),
        })
            .then((res) => {
                return res.json();
            })
            .then(async (data) => {
                setOpen(false);
                setRender(true);
                router.push(`/invoice/${data.invoice.id}`);
            });
    }
};

const CartDialog = ({
    prods,
    setOpen,
    setRender,
}: {
    prods: getCartRes[];
    setOpen: Dispatch<SetStateAction<boolean>>;
    setRender: Dispatch<SetStateAction<boolean>>;
}) => {
    const [invRef, setInvRef] = useState<string>('');

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                    </Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="-m-2 p-2 text-2xl text-gray-400 hover:text-rose-500"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Close panel</span>X
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                        >
                            {prods &&
                                prods.map((order) => {
                                    const { id, name, image_url, price } =
                                        order.item;
                                    return (
                                        <li
                                            key={order.id}
                                            className="flex py-6"
                                        >
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={image_url}
                                                    alt={name}
                                                    className="h-full w-full object-contain object-center p-2"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link
                                                                href={`/products/${id}`}
                                                            >
                                                                {name.trim()
                                                                    .length < 45
                                                                    ? name.trim()
                                                                    : name
                                                                          .trim()
                                                                          .substring(
                                                                              0,
                                                                              45
                                                                          ) +
                                                                      '...'}
                                                            </Link>
                                                        </h3>
                                                        <p className="ml-4 text-lg text-rose-500">
                                                            {' '}
                                                            $
                                                            {price ==
                                                                'Out of Stock' ||
                                                            price == '0.0'
                                                                ? '4.99'
                                                                : price}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="font-medium text-rose-600 hover:text-rose-500"
                                                            onClick={() =>
                                                                removeItem(
                                                                    order.id,
                                                                    setRender
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6 ">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$Free</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                    <button
                        onClick={() =>
                            checkoutCart(
                                prods,
                                setRender,
                                invRef,
                                Router,
                                setOpen
                            )
                        }
                        className="mx-auto flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700"
                    >
                        Checkout
                    </button>
                </div>
                <div className="mt-4">
                    <label className="text-sm text-gray-500">Inv. Ref: </label>
                    <input
                        type="text"
                        className="rounded-md border text-sm text-gray-500"
                        value={invRef}
                        onChange={(e) => setInvRef(e.target.value)}
                    ></input>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        {'or '}
                        <button
                            type="button"
                            className="font-medium text-rose-600 hover:text-rose-500"
                            onClick={() => setOpen(false)}
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Cart({
    setOpen,
    open,
    setRender,
    render,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
    setRender: Dispatch<SetStateAction<boolean>>;
    render: boolean;
}) {
    const [products, setProducts] = useState<getCartRes[]>();

    useEffect(() => {
        if (render) {
            fetch('/api/manageCart')
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data);
                });

            setRender(false);
        }
    }, [render, setRender]);

    return (
        <Transition.Root
            show={open}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="relative z-30"
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    {products && (
                                        <CartDialog
                                            prods={products}
                                            setOpen={setOpen}
                                            setRender={setRender}
                                        />
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
