import { getConfigs } from "@redux/slices/api/configContentSlice";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";

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

  const DescriptionHTML = configData?.aboutUs;

  const imagesAboutUs = [
    {
      original: "/img/about-us/1n.jpg",
      thumbnail: "/img/about-us/1n.jpg",
      originalWidth: "100%",
    },
    {
      original: "/img/about-us/2n.jpg",
      thumbnail: "/img/about-us/2n.jpg",
      originalWidth: "100%",
    },
    {
      original: "/img/about-us/3.jpg",
      thumbnail: "/img/about-us/3.jpg",
      originalWidth: "100%",
    },
    {
      original: "/img/about-us/3n.jpg",
      thumbnail: "/img/about-us/3n.jpg",
      originalWidth: "100%",
    },
  ];
  return (
    <div>
      <Head>
        <title>ABOUT US | FENGSYSTEM</title>
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
      </Head>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            {wd && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(DescriptionHTML),
                }}
              />
            )}
          </div>
          <div className="col-md-6">
            {imagesAboutUs.map((obj, index) => (
              <img className="w-100" src={obj.original} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
