import React, { ReactElement, useState } from "react";
import { Table, Tag, Space, message } from "antd";
import SizeChart from "./components/SizeChart";
import { emitWarning } from "process";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateCart } from "@redux/slices/counter";

interface Props {}
interface ISizeSelector {
  size: number;
}
interface IColorSelector {
  color: string;
}
export default function index({}: Props): ReactElement {
  const route = useRouter();
  const dispatch = useDispatch();
  const [sizeValue, setSizeValue] = useState<number>();
  const [colorValue, setColorValue] = useState<string>();
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
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-5">
          <img src="/img/shop/pant-black.jpeg" className="w-100" />
          <div className="col-12 px-0 py-2">
            <div className="row px-0">
              {[1, 2, 3, 4, 5, 6].map((obj, index) => (
                <div className="col-4 my-2" key={index}>
                  <img src="/img/shop/pant-black.jpeg" className="w-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-7">
          <h4 className="">SIGNATURE BELTED TAILORED PANT</h4>
          <h4 className="font-bold">$1000</h4>
          <div className="my-4">
            <ul>
              <li>Designer color: black</li>
              <li>Styled at natural waist or at high waist</li>
              <li>Self-belt with D-ring</li>
              <li>Straight leg</li>
              <li>Crease stitched at the front and back</li>
              <li>60% Virgin wool/ 40% Viscose</li>
              <li>Made in Italy</li>
            </ul>
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
