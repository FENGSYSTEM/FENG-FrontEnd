import React, { ReactElement, useEffect, useState } from "react";
import { Table, Tag, Space, message } from "antd";
import SizeChartLogoT from "./components/SizeChartLogoT";
import { emitWarning } from "process";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@redux/slices/api/orderSlice";
import { getProductDetail } from "@redux/slices/api/productSlice";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import Head from "next/head";
import SizeChartPants from "./components/SizeChartPants";
import SizeChartTankTop from "./components/SizeChartTankTop";
import SizeChartRugs from "./components/SizeChartRugs";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";
import { currencyFormatVND } from "src/utils/currencyFormat";
import Link from "next/link";

interface Props {}
interface ISizeSelector {
  size: number;
}
interface IColorSelector {
  color: any;
}

interface Props {
  pid: string;
  detailData: any;
}

export default function index({ pid, detailData }: Props): ReactElement {
  const route = useRouter();
  const dispatch = useDispatch();

  const [DOMPurify, setDOMPurify] = useState<any>();
  const [wd, setWd] = useState<any>();

  useEffect(() => {
    if (window) {
      setWd(window);
      setDOMPurify(createDOMPurify(window));
    }
  }, []);

  const [sizeValue, setSizeValue] = useState<number>();
  const [colorValue, setColorValue] = useState<string>();

  const productDetail = useSelector(
    (state) => state.product.productDetail
  ) as any;

  const [thumbs, setThumbs] = useState<any>();

  // useEffect(() => {
  //   console.log(route.query.pid);
  //   const a = async () => {
  //     await dispatch(getProductDetail(route.query.pid));
  //   };
  //   a();
  // }, [route.query]);

  const SizeSelector = ({ size }: ISizeSelector) => {
    return (
      <div
        className={`product-detail-selector-item ${
          sizeValue === size && "active"
        }`}
        onClick={() => setSizeValue(size)}
      >
        {size}
      </div>
    );
  };

  function c_hex_is_light(color: string) {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  }
  const ColorSelector = ({ color }: IColorSelector) => {
    const [hover, setHover] = useState<boolean>(false);
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`product-detail-selector-item`}
        style={{
          backgroundColor: hover
            ? color.color_code
            : colorValue === color.color_code
            ? color.color_code
            : "#ffffff",
          color: hover
            ? c_hex_is_light(color.color_code)
              ? "#000000"
              : "#ffffff"
            : colorValue === color.color_code
            ? c_hex_is_light(color.color_code)
              ? "#000000"
              : "#ffffff"
            : "#000000",
        }}
        onClick={() => setColorValue(color.color_code)}
      >
        {color.color_name}
      </div>
    );
  };

  const handleAddToCart = () => {
    if (detailData.status === "IN_STOCK") {
      if (sizeValue && colorValue) {
        const selectedProduct = {
          id: route.query.pid,
          name: detailData.name,
          price: detailData.price,
          size: sizeValue,
          color: colorValue,
          amount: 1,
        };
        console.log(selectedProduct);

        if (localStorage.getItem("cart")) {
          let listProductInCart = JSON.parse(
            localStorage.getItem("cart") as any
          );
          const existingProductIndex = listProductInCart.findIndex(
            (e: any) =>
              e.id === selectedProduct.id &&
              e.size === selectedProduct.size &&
              e.color === selectedProduct.color
          );
          if (existingProductIndex !== -1) {
            let existingProduct = listProductInCart[existingProductIndex];
            listProductInCart[existingProductIndex] = {
              ...existingProduct,
              amount: existingProduct.amount + 1,
            };
            localStorage.setItem("cart", JSON.stringify(listProductInCart));
            dispatch(updateCart(listProductInCart));
            message.info("Added to cart");
          } else {
            listProductInCart.push(selectedProduct);
            localStorage.setItem("cart", JSON.stringify(listProductInCart));
            dispatch(updateCart(listProductInCart));
            message.info("Added to cart");
          }
        } else {
          const listProductInCart = [];
          listProductInCart.push(selectedProduct);
          localStorage.setItem("cart", JSON.stringify(listProductInCart));
          dispatch(updateCart(listProductInCart));
          message.info("Added to cart");
        }
      } else {
        message.info("Please select size or color");
      }
    } else {
      message.info("This product is out of stock !!");
    }
  };

  const DescriptionHTML = detailData.description;
  console.log(
    detailData.images.map((url: string, index: number) => ({
      original: url,
      thumbnail: url,
    }))
  );
  return (
    <>
      <Head>
        <title>{detailData.name} - FENGSYSTEM</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          property="og:title"
          content={`${detailData.name} / FENG SS22 - EMBODY`}
        />
        <meta
          name="og:description"
          content={`Discover all the collections by Feng for women, men and browse the Feng 's system and heritage`}
        />
        <meta
          name="description"
          content={`Discover all the collections by Feng for women, men and browse the Feng 's system and heritage`}
        />
        <meta
          property="og:url"
          content={`https://fengsystem.co/product/detail/${pid}/`}
        />
        <link
          rel="canonical"
          href={`https://fengsystem.co/product/detail/${pid}/`}
        />
        <meta property="og:image" content={detailData.images[0]} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="col-12">
        <div className="row">
          <div className="col-md-5">
            {detailData.images && (
              <ImageGallery
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                items={detailData.images.map((url: string, index: number) => ({
                  original: url,
                  thumbnail: url,
                  originalWidth: "100%",
                }))}
              />
            )}
          </div>
          <div className="col-md-7">
            <h4 className="">{detailData.name}</h4>
            {detailData.priceOld && (
              <h5 className="color-gray">
                <del>{currencyFormatVND(detailData.priceOld)}</del>
              </h5>
            )}

            <h4 className="font-bold">{currencyFormatVND(detailData.price)}</h4>

            <div className="my-4">
              {wd && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(DescriptionHTML),
                  }}
                />
              )}
            </div>
            <div className="my-3">
              <div className="my-3">
                <h6>
                  <u>SELECT A SIZE</u>
                </h6>
                <div className="d-flex product-detail-size">
                  {detailData.productStocks.map((obj: any, index: number) => (
                    <SizeSelector size={obj.size} key={`key-${index}`} />
                  ))}
                </div>
              </div>
              <div className="my-3">
                <h6>
                  <u>SELECT A COLOR</u>
                </h6>
                <div className="d-flex product-detail-size">
                  {detailData.color.map((color: any, index: number) => (
                    <ColorSelector color={color} />
                  ))}
                </div>
              </div>
              <div className="my-4">
                <div
                  className="feng-button w-100"
                  onClick={() => handleAddToCart()}
                >
                  ADD TO CART
                </div>
              </div>
            </div>
            <Link href="/frequency-questions#size-chart">
              <h6 style={{ cursor: "pointer" }}>
                <u>SIZE CHART</u>
              </h6>
            </Link>
            {/* <br />
            <h6>
              <u>Logo T</u>
            </h6>
            <SizeChartLogoT />
            <br />
            <br />
            <h6>
              <u>Pants</u>
            </h6>
            <SizeChartPants />
            <br />
            <br />
            <h6>
              <u>Tank Top</u>
            </h6>
            <SizeChartTankTop />
            <br />
            <br />
            <h6>
              <u>Rugs</u>
            </h6>
            <SizeChartRugs />
            <br /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { pid } = context.query;
  const res = await axios.get(`${API_ENDPOINT}/products/${pid}`);
  return {
    props: {
      pid,
      detailData: res.data,
    }, // will be passed to the page component as props
  };
}
