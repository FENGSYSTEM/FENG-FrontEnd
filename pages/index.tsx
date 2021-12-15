import Head from "next/head";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>FENGSYSTEM</title>
        <link rel="icon" href="fav-i.ico" type="image/x-icon" />
        <meta property="og:title" content="FENG | FENG SYSTEM™" />
        <meta
          name="og:description"
          content="Discover all the collections by Feng for women, men and browse the Feng 's system and heritage"
        />
        <meta
          name="description"
          content="Discover all the collections by Feng for women, men and browse the Feng 's system and heritage"
        />
        <meta property="og:url" content="https://fengsystem.co/" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fengsystem.co/" />
        <meta property="og:site_name" content="fengsystem.co" />
        <meta property="og:image:alt" content="Visit fengsystem.co" />
        <style>
          {
            "body { background-image: url(/img/111.jpg); background-repeat: no-repeat; background-size: cover }"
          }
        </style>
      </Head>
    </div>
  );
};

export default Home;
