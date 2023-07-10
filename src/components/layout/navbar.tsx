import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const NavItem = ({
    title,
    isFocus = false,
}: {
    title: string;
    isFocus?: boolean;
}) => {
    return (
        <li
            className={`hidden px-4 text-lg md:block ${
                !isFocus && 'font-light'
            } ${isFocus && 'text-rose-600'}`}
        >
            <Link
                href={
                    title == 'Home'
                        ? '/'
                        : title == 'History'
                        ? '/invoice/history'
                        : '/' + title.toLowerCase()
                }
            >
                {title}
            </Link>
        </li>
    );
};

const NavBar = ({
    setOpen,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const path = router?.asPath;
    console.log(path);
    const [opacity, setOpacity] = useState('bg-opacity-0');

    useEffect(() => {
        const body = document.body;
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                body.classList.remove('scroll-up');
                setOpacity('bg-opacity-0');
            }

            if (currentScroll > 0) {
                setOpacity('bg-opacity-100');
            }

            if (
                currentScroll > lastScroll &&
                !body.classList.contains('scroll-down')
            ) {
                body.classList.remove('scroll-up');
                body.classList.add('scroll-down');
            } else if (
                currentScroll < lastScroll &&
                body.classList.contains('scroll-down')
            ) {
                body.classList.add('scroll-up');
                body.classList.remove('scroll-down');
            }

            lastScroll = currentScroll;
        });
    }, []);

    return (
        <>
            <header
                className={`t-0 l-0 fixed z-[20] w-full bg-white drop-shadow transition duration-500 ease-out ${opacity} `}
            >
                <div
                    className={`container mx-5 flex flex-wrap items-center py-5 md:mx-10`}
                >
                    <Link href="/">
                        <div className="justify flex items-center text-xl tracking-wider">
                            <p className="text-black">IREX</p>
                            <p className="text-rose-600">MSU</p>
                        </div>
                    </Link>
                    <nav className="block">
                        <ul className="flex flex-row px-5 py-2">
                            <NavItem
                                key="Home"
                                title="Home"
                                isFocus={true}
                            />
                            <NavItem
                                key="Products"
                                title="Products"
                            />
                            <NavItem
                                key="History"
                                title="History"
                            />
                            {!path.includes('/invoice/') && (
                                <button
                                    className="btn btn-primary mx-3 block rounded-md bg-rose-200 px-3 text-lg text-rose-700"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    Cart
                                </button>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};
export default NavBar;
