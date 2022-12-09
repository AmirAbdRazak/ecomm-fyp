import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

const NavItem = ({ title, isFocus = false }: { title: string, isFocus?: boolean }) => {
  return (
    <li>
      <a className={`block px-4 text-lg ${!isFocus && 'font-light'} ${isFocus && 'text-rose-600'}`} href={title == "Home" ? "/" : "/" + title.toLowerCase()}>{title}</a>
    </li>
  )
}


const NavBar = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {

  const [opacity, setOpacity] = useState("bg-opacity-0");

  useEffect(() => {
    const body = document.body;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY

      if (currentScroll <= 0) {
        body.classList.remove('scroll-up');
        setOpacity("bg-opacity-0")
      }

      if (currentScroll > 0) {
        setOpacity("bg-opacity-100")
      }

      if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-up');
        body.classList.add('scroll-down');
      }

      else if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
        body.classList.add('scroll-up');
        body.classList.remove('scroll-down');
      }

      lastScroll = currentScroll;

    })
  }, []);

  return (
    <>
      <header className={`fixed w-full transition duration-500 ease-out t-0 l-0 z-[20] drop-shadow bg-white ${opacity}`}>
        <div className={`container flex flex-wrap items-center mx-10 py-5`}>
          <a href="#" className="flex items-center text-xl tracking-wider justify"><p className="text-black">IREX</p><p className="text-rose-600">MSU</p></a>
          <nav className="block pl-10">
            <ul className="flex flex-row px-5 py-2">
              <NavItem title="Home" isFocus={true} />
              <NavItem title="Products" />
              <NavItem title="Promotions" />
              <NavItem title="About" />
              <button className="btn btn-primary bg-rose-200 mx-3 px-3 rounded-md text-lg  text-rose-700" onClick={() => { setOpen(true) }} >Cart</button>
            </ul>
          </nav>
        </div>
      </header >
    </>
  )
}
export default NavBar