import Head from "next/head";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>FENGSYSTEM</title>
        <style>
          {
            "body { background-image: url(/img/background.png); background-repeat: no-repeat; background-size: cover }"
          }
        </style>
      </Head>
    </div>
  );
};

export default Home;
