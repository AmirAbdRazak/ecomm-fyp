// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import superjson from "superjson";
import Cart from "../components/layout/cart";
import NavBar from "../components/layout/navbar";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

  const [cartState, setCartState] = useState(false);
  const [render, setRender] = useState(true);

  return (
    <>
      <Cart setOpen={setCartState} open={cartState} setRender={setRender} render={render} />
      <NavBar setOpen={setCartState} />
      <Component {...pageProps} setRender={setRender} />
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
