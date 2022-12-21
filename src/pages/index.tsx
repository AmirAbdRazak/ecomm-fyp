import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { trpc } from '../utils/trpc';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                    <svg
                        className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <div>
                        <div className="relative px-4 pt-6 sm:px-6 lg:px-8"></div>

                        {/* Mobile menu, show/hide based on menu open state.

                            Entering: "duration-150 ease-out"
                            From: "opacity-0 scale-95"
                            To: "opacity-100 scale-100"
                            Leaving: "duration-100 ease-in"
                            From: "opacity-100 scale-100"
                            To: "opacity-0 scale-95" */}
                        <div className="absolute inset-x-0 top-0 z-10 hidden origin-top-right transform p-2 transition md:hidden">
                            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                                <div className="flex items-center justify-between px-5 pt-4">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=600"
                                            alt=""
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
                                        >
                                            <span className="sr-only">
                                                Close main menu
                                            </span>
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-rose-600 hover:bg-gray-100"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>

                    <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">
                                    Personalized Shopping{' '}
                                </span>
                                <span className="block text-rose-600 xl:inline">
                                    Just For You
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                                Powered by AI, online shopping now can now
                                seamlessly be done so that customers can find
                                their wanted products more easily. More
                                shopping, less deciding.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md pr-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-8 py-3 text-base font-medium text-white hover:bg-rose-700 md:py-4 md:px-10 md:text-lg"
                                    >
                                        Promotions
                                    </a>
                                </div>
                                <div className="mt-3 pr-4 sm:mt-0 sm:flex md:px-4">
                                    <p className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-100 px-8 py-3 text-base font-medium text-rose-700 hover:bg-rose-200 md:py-4 md:px-10 md:text-lg">
                                        <Link href="/products">Products</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
                    src="https://i.shgcdn.com/596b4be0-0985-4dab-8e41-2b0f60e7721d/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                    alt=""
                />
            </div>
        </section>
    );
};

const Cards = ({
    title,
    price,
    imageURL,
    id,
}: {
    title: string;
    price: string;
    imageURL: string;
    id: string;
}) => {
    return (
        <Link href={`/products/${id}`}>
            <div className="w-full max-w-sm rounded-lg bg-white shadow-md">
                <img
                    className="h-40 justify-around rounded-t-lg p-8"
                    src={imageURL}
                    alt="product image"
                />
                <div className="px-5 py-5">
                    <a href="#">
                        <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                            {title.length > 35
                                ? title.substring(0, 35) + '...'
                                : title}
                        </h5>
                    </a>
                    <div className="flex items-center justify-between py-4">
                        <span className="text-lg font-bold text-gray-900">
                            $
                            {price == 'Out of Stock' || price == '0.0'
                                ? '4.99'
                                : price}
                        </span>
                        <p
                            className="rounded-lg bg-rose-700 px-5 py-2.5 
                        text-center text-sm font-medium text-white hover:bg-rose-800 
                        focus:outline-none focus:ring-4 focus:ring-rose-300"
                        >
                            More details
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
const Home: NextPage = () => {
    const [recProds, setRecs] = useState<recSysRes[]>([]);

    useEffect(() => {
        fetch('/api/recSys', {
            headers: {
                'cache-control': 'max-age=60s',
            },
        })
            .then((res) => res.json())
            .then((data: recSysRes[]) => {
                setRecs(data);
            });
    }, []);

    return (
        <>
            <Head>
                <title>MSU AI E-Commerce</title>
                <meta
                    name="description"
                    content="This website is powered by AI and has data analytics, made by Muhammad Amir for his Final Year Project"
                    key="desc"
                />
                <meta
                    property="og:title"
                    content="AI Driven E-Commerce"
                />
                <meta
                    property="og:description"
                    content="This website is powered by AI and has data analytics, made by Muhammad Amir for his Final Year Project"
                />
                <meta
                    property="og:image"
                    content="https://www.easyuni.my/media/uploads/2022/04/20/msu-logo-facebook-resized.jpg"
                />
            </Head>
            <HeroSection />

            <section className="bg-gray-100">
                <div className="flex flex-row items-center space-x-5 pr-4 pt-10 pl-10 md:pr-0">
                    <h1 className="text-3xl font-semibold">
                        Recommended Products
                    </h1>
                    <button className="btn btn-primary rounded-md bg-rose-700 px-3 py-1 text-white shadow">
                        See More
                    </button>
                </div>
                <div className="grid grid-cols-1 justify-around gap-4 py-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {recProds
                        .map((value) => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
                        .splice(0, 8)
                        .map((rec) => (
                            <Cards
                                key={rec.id}
                                id={rec.id}
                                title={rec.name}
                                price={rec.price}
                                imageURL={rec.image_url}
                            />
                        ))}
                </div>
            </section>
        </>
    );
};

export default Home;
