import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import NavBar from "../components/layout/navbar"
import { useEffect } from "react";

const Home: NextPage = () => {
    const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

    return (
        <>
            <div className="relative overflow-hidden bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                        <svg className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <div>
                            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                            </div>

                            {/* Mobile menu, show/hide based on menu open state.

                            Entering: "duration-150 ease-out"
                            From: "opacity-0 scale-95"
                            To: "opacity-100 scale-100"
                            Leaving: "duration-100 ease-in"
                            From: "opacity-100 scale-100"
                            To: "opacity-0 scale-95" */}
                            <div className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
                                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                                    <div className="flex items-center justify-between px-5 pt-4">
                                        <div>
                                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=600" alt="" />
                                        </div>
                                        <div className="-mr-2">
                                            <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                                                <span className="sr-only">Close main menu</span>
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <a href="#" className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-rose-600 hover:bg-gray-100">Log in</a>
                                </div>
                            </div>
                        </div>

                        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Personalized Shopping </span>
                                    <span className="block text-rose-600 xl:inline">Just For You</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">Powered by AI, online shopping now can now seamlessly be done so that customers can find their wanted products more easily. More shopping, less deciding.</p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md pr-4">
                                        <a href="#" className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-8 py-3 text-base font-medium text-white hover:bg-rose-700 md:py-4 md:px-10 md:text-lg">Promotions</a>
                                    </div>
                                    <div className="mt-3 sm:mt-0 :sm:ml-3 px-4">
                                        <a href="#" className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-100 px-8 py-3 text-base font-medium text-rose-700 hover:bg-rose-200 md:py-4 md:px-10 md:text-lg">Products</a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="https://i.shgcdn.com/596b4be0-0985-4dab-8e41-2b0f60e7721d/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" />
                </div>
            </div>
            <p>meow</p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>meome</p>

        </>
    );
};


export default Home;
