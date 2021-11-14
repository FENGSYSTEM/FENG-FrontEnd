import React from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import "@styles/antd.css";
import { Provider } from "react-redux";
import store from "@redux/store";
import MasterLayout from "@components/MasterLayout";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </Provider>
  );
}

export default MyApp;
