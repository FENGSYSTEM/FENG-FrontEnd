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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];
  return (
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
  );
}

export default MyApp;
