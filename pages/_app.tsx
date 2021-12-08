import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@styles/app.scss";
import "@styles/global.scss";
import "@styles/antd.css";
import { Provider } from "react-redux";
import store from "@redux/store";
import MasterLayout from "@components/MasterLayout";
import { animated, Transition } from "react-spring";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 500,
    showSpinner: false,
  });

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];
  return (
    <>
      <Head>
        <title>FENGSYSTEM</title>
        <link rel="icon" href="fav-i.ico" type="image/x-icon" />
        {/* <meta property="og:image" content="thumbnails/thumbnail-bx-2.jpg" /> */}
        <meta property="og:title" content="FENG | FENG SYSTEM™" />
        <meta property="og:url" content="https://fengsystem.co/" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Discover all the collections by Feng for women, men and browse the Feng 's system and heritage"
        />
        <meta property="og:image:alt" content="Visit fengsystem.co" />
      </Head>
      <Provider store={store}>
        <MasterLayout>
          <Transition
            items={items}
            keys={(item: any) => item.id}
            initial={{ top: 0, opacity: 0 }}
            from={{ top: -20, opacity: 0, position: "relative" }}
            enter={{ top: 0, opacity: 1, position: "relative" }}
            trail={300}
          >
            {(
              styles,
              { pageProps: animatedPageProps, Component: AnimatedComponent },
              key
            ) => (
              <animated.div
                style={{
                  ...styles,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <AnimatedComponent {...animatedPageProps} />
              </animated.div>
            )}
          </Transition>
        </MasterLayout>
      </Provider>
    </>
  );
}

export default MyApp;
