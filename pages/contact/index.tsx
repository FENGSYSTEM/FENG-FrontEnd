import { getConfigs } from "@redux/slices/api/configContentSlice";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createDOMPurify from "dompurify";
import Head from "next/head";

interface Props {}

export default function index({}: Props): ReactElement {
  const dispatch = useDispatch();
  const configData = useSelector((state) => state.config.configsData) as any;

  const [DOMPurify, setDOMPurify] = useState<any>();
  const [wd, setWd] = useState<any>();
  useEffect(() => {
    if (window) {
      setWd(window);
      setDOMPurify(createDOMPurify(window));
    }
  }, []);

  useEffect(() => {
    dispatch(getConfigs());
  }, []);

  const DescriptionHTML = configData?.contact;
  return (
    <div className="config-content">
      <Head>
        <title>CONTACT | FENGSYSTEM</title>
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
            "body { background-image: url(/img/background.png); background-repeat: no-repeat; background-size: cover }"
          }
        </style>
      </Head>
      {wd && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(DescriptionHTML),
          }}
        />
      )}
    </div>
  );
}
