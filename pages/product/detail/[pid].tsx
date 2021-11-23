import React, { ReactElement, useEffect, useState } from "react";
import { Table, Tag, Space, message } from "antd";
import SizeChart from "./components/SizeChart";
import { emitWarning } from "process";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@redux/slices/counter";
import { getProductDetail } from "@redux/slices/api/productSlice";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface Props {}
interface ISizeSelector {
  size: number;
}
interface IColorSelector {
  color: string;
}

const thumbItems = (
  productDetail: any,
  [setThumbIndex, setThumbAnimation]: [
    setThumbIndex: any,
    setThumbAnimation: any
  ]
) => {
  return productDetail.images?.map((img: any, i: number) => (
    <div
      className="thumb"
      onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
    >
      <img src={img} key={`img-detail-${i}`} className="w-100" />
    </div>
  ));
};
// const items = [
//   <div className="item" data-value="1">
//     1
//   </div>,
//   <div className="item" data-value="2">
//     2
//   </div>,
//   <div className="item" data-value="3">
//     3
//   </div>,
//   <div className="item" data-value="4">
//     4
//   </div>,
//   <div className="item" data-value="5">
//     5
//   </div>,
// ];
// const thumbItems = (
//   items: any,
//   [setThumbIndex, setThumbAnimation]: [
//     setThumbIndex: any,
//     setThumbAnimation: any
//   ]
// ) => {
//   return items.map((item: any, i: number) => (
//     <div
//       className="thumb"
//       onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
//     >
//       {item}
//     </div>
//   ));
// };

export default function index({}: Props): ReactElement {
  const route = useRouter();
  const dispatch = useDispatch();
  const [sizeValue, setSizeValue] = useState<number>();
  const [colorValue, setColorValue] = useState<string>();

  const productDetail = useSelector(
    (state) => state.product.productDetail
  ) as any;

  const [mainIndex, setMainIndex] = useState(0);
  const [mainAnimation, setMainAnimation] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbAnimation, setThumbAnimation] = useState(false);
  const [thumbs, setThumbs] = useState<any>();

  useEffect(() => {
    const a = async () => {
      await dispatch(getProductDetail(route.query.pid));
    };
    a();
  }, [route.query]);

  useEffect(() => {
    setThumbs(thumbItems(productDetail, [setThumbIndex, setThumbAnimation]));
  }, [dispatch, productDetail]);

  const slideNext = () => {
    console.log("next");
    if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex + 1);
    }
  };

  const slidePrev = () => {
    console.log("prev");
    if (!thumbAnimation && thumbIndex > 0) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex - 1);
    }
  };

  const syncMainBeforeChange = (e: any) => {
    setMainAnimation(true);
  };

  const syncMainAfterChange = (e: any) => {
    setMainAnimation(false);

    if (e.type === "action") {
      setThumbIndex(e.item);
      setThumbAnimation(false);
    } else {
      setMainIndex(thumbIndex);
    }
  };

  const syncThumbs = (e: any) => {
    setThumbIndex(e.item);
    setThumbAnimation(false);

    if (!mainAnimation) {
      setMainIndex(e.item);
    }
  };

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

  const ColorSelector = ({ color }: IColorSelector) => {
    return (
      <div
        className={`product-detail-selector-item ${
          colorValue === color && "active"
        }`}
        onClick={() => setColorValue(color)}
      >
        {color}
      </div>
    );
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      id: route.query.pid,
      name: "Pant BW",
      price: 1000,
      size: sizeValue,
      color: colorValue,
      amount: 1,
    };
    console.log(selectedProduct);

    if (localStorage.getItem("cart")) {
      let listProductInCart = JSON.parse(localStorage.getItem("cart") as any);
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
  };

  // const thumbsResponsive = {
  //   300: {
  //     items: 5,
  //   },
  //   500: {
  //     items: 5,
  //   },
  // };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-5">
          <AliceCarousel
            activeIndex={mainIndex}
            animationType="fadeout"
            animationDuration={800}
            disableDotsControls
            disableButtonsControls
            infinite
            items={productDetail.images?.map((img: string, index: number) => (
              <img src={img} key={`img-detail-${index}`} className="w-100" />
            ))}
            mouseTracking={true}
            onSlideChange={syncMainBeforeChange}
            onSlideChanged={syncMainAfterChange}
            touchTracking={true}
          />
          <div className="thumbs">
            <AliceCarousel
              activeIndex={thumbIndex}
              autoWidth
              disableDotsControls
              // disableButtonsControls
              items={thumbs}
              mouseTracking={true}
              onSlideChanged={syncThumbs}
              touchTracking={true}
              // responsive={thumbsResponsive}
            />
            {/* <div className="btn-prev" onClick={slidePrev}>
              &lang;
            </div>
            <div className="btn-next" onClick={slideNext}>
              &rang;
            </div> */}
          </div>
          {/* <img src="/img/shop/pant-black.jpeg" className="w-100" />
          <div className="col-12 px-0 py-2">
            <div className="row px-0">
              {[1, 2, 3, 4, 5, 6].map((obj, index) => (
                <div className="col-4 my-2" key={index}>
                  <img src="/img/shop/pant-black.jpeg" className="w-100" />
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <div className="col-7">
          <h4 className="">{productDetail?.name}</h4>
          <h4 className="font-bold">${productDetail?.price}</h4>
          <div className="my-4">
            {productDetail?.description}
            {/* <ul>
              <li>Designer color: black</li>
              <li>Styled at natural waist or at high waist</li>
              <li>Self-belt with D-ring</li>
              <li>Straight leg</li>
              <li>Crease stitched at the front and back</li>
              <li>60% Virgin wool/ 40% Viscose</li>
              <li>Made in Italy</li>
            </ul> */}
          </div>
          <div className="my-3">
            <div className="my-3">
              <h6>
                <u>SELECT A SIZE</u>
              </h6>
              <div className="d-flex product-detail-size">
                <SizeSelector size={34} />
                <SizeSelector size={36} />
                <SizeSelector size={38} />
                <SizeSelector size={40} />
                <SizeSelector size={42} />
              </div>
            </div>
            <div className="my-3">
              <h6>
                <u>SELECT A COLOR</u>
              </h6>
              <div className="d-flex product-detail-size">
                <ColorSelector color="BLACK" />
                <ColorSelector color="WHITE" />
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
          <br />
          <h6>
            <u>SIZE CHART</u>
          </h6>
          <SizeChart />
        </div>
      </div>
    </div>
  );
}
// export async function getServerSideProps(context: any) {
//   console.log(context.query);
//   const { pid } = context.query;
//   return {
//     props: {
//       pid,
//     },
//   };
// }
