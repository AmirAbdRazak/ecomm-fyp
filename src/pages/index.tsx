import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
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
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                                    <p className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-100 px-8 py-3 text-base font-medium text-rose-700 hover:bg-rose-200 md:py-4 md:px-10 md:text-lg">
                                        <Link href="/products" >Products</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="https://i.shgcdn.com/596b4be0-0985-4dab-8e41-2b0f60e7721d/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" />
            </div>
        </section>
    )
}

const Cards = ({ title, price, rating, imageURL }: { title: string, price: number, rating: number, imageURL: string }) => {
    return (

        <div className="w-full max-w-sm bg-white rounded-lg shadow-md">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={imageURL} height="200" width="200" alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <span className="bg-rose-200 text-rose-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{rating.toPrecision(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${price}</span>
                    <a href="#" className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
                </div>
            </div>
        </div>

    )
}

const Home: NextPage = () => {

    return (
        <>
            <HeroSection />

            <section className="bg-gray-100">
                <div className="flex flex-row items-center pt-10 pl-10 space-x-5">
                    <h1 className="text-3xl font-semibold">Recommended Products</h1>
                    <button className="btn btn-primary bg-rose-700 rounded-md px-3 py-1 text-white shadow">
                        See More
                    </button>
                </div>
                <div className="flex flex-row justify-around py-10 space-x-5 px-10">
                    <Cards
                        title="Very Good Headphone"
                        price={150}
                        rating={5.0}
                        imageURL="https://my-test-11.slatic.net/p/eeb6e67cf7df679078d1a2861eba1f41.png"
                    />
                    <Cards
                        title="Very Good Headphone"
                        price={150}
                        rating={5.0}
                        imageURL="https://my-test-11.slatic.net/p/eeb6e67cf7df679078d1a2861eba1f41.png"
                    />
                    <Cards
                        title="Very Good Headphone"
                        price={150}
                        rating={5.0}
                        imageURL="https://my-test-11.slatic.net/p/eeb6e67cf7df679078d1a2861eba1f41.png"
                    />
                    <Cards
                        title="Very Good Headphone"
                        price={150}
                        rating={5.0}
                        imageURL="https://my-test-11.slatic.net/p/eeb6e67cf7df679078d1a2861eba1f41.png"
                    />
                </div>
            </section>


        </>
    );
};


export default Home;
