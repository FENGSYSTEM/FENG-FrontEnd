import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@styles/app.scss";
import "@styles/global.scss";
import "@styles/antd.css";
import { Provider, useSelector } from "react-redux";
import store from "@redux/store";
import MasterLayout from "@components/MasterLayout";
import { animated, Transition } from "react-spring";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import moment from "moment";

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

  const [diffTime, setDiffTime] = useState<any>();
  const [countDownTime, setCountDownTime] = useState<any>(null);
  const [showPage, setShowPage] = useState<any>(true);

  useEffect(() => {
    const countDown = setInterval(() => {
      // const then: any = new Date("2021-12-04T21:00:00");
      // const now: any = new Date();
      const then: any = moment.utc("2021-12-09T13:00:00");

      const now: any = moment.utc();
      const diffTimes = then - now;

      setDiffTime(diffTimes);
      if (diffTimes <= 0) {
        clearInterval(countDown);
        setShowPage(true);
        setCountDownTime({
          day: "0",
          hour: "0",
          minute: "0",
          second: "0",
        });
      } else {
        const duration: any = moment.duration(diffTimes, "milliseconds");
        const result = moment.duration(duration - 1000, "milliseconds");
        setCountDownTime({
          day: result.days(),
          hour: result.hours(),
          minute: result.minutes(),
          second: result.seconds(),
        });
      }
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>FENGSYSTEM</title>
        <link rel="icon" href="/fav-i.ico" type="image/x-icon" />
        {/* <meta property="og:title" content="FENG | FENG SYSTEM™" />
        <meta property="og:url" content="https://fengsystem.co/" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fengsystem.co/" />
        <meta
          property="og:site_name"
          content="Discover all the collections by Feng for women, men and browse the Feng 's system and heritage"
        />
        <meta property="og:image:alt" content="Visit fengsystem.co" /> */}
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
