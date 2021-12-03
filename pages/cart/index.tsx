import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message } from "antd";
import { updateCart } from "@redux/slices/api/orderSlice";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { apiGetProductDetail } from "src/api/product";
import Head from "next/head";

// import { RightOutlined } from "@ant-design/icons";

interface Props {}

const CartItem = ({
  obj,
  index,
  reduxCart,
}: {
  obj: any;
  index: number;
  reduxCart: any;
}) => {
  const dispatch = useDispatch();
  // const reduxCart = useSelector((state) => state.order.cart);

  const [itemAmountValue, setAmountValue] = useState<number>(obj.amount);
  // const [reduxCartClone, setReduxCartClone] = useState<[]>(reduxCart);
  let reduxCartClone = [...reduxCart] as any;
  // console.log(reduxCartClone);
  // useEffect(() => {
  //   console.log("abc");
  // }, [dispatch]);
  const [productDetail, setProductDetail] = useState<any>();

  useEffect(() => {
    async function initProductDetail() {
      const data = await apiGetProductDetail(obj.id);
      setProductDetail(data);
    }
    initProductDetail();
  }, []);

  return (
    <div className="row cart-item">
      <Head>
        <title>FENGSYSTEM</title>
      </Head>
      <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
        <div className="">
          <img src={productDetail?.images[0]} height="80px" />
        </div>
      </div>
      <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
        {obj.name} - {obj.size}
      </div>
      <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center">
          <Input
            value={itemAmountValue}
            type="number"
            className="text-center"
            key={`recipient_${index}`}
            onChange={(e) => {
              console.log(e);
              if (parseInt(e.target.value) < 1) {
                message.info("Minimum amount value reached !");
              } else {
                setAmountValue(parseInt(e.target.value));
                const currentItemIndex = reduxCartClone.findIndex(
                  (e: any) =>
                    e.id === obj.id &&
                    e.size === obj.size &&
                    e.color === obj.color
                );
                let currentItem = reduxCartClone[currentItemIndex];
                if (currentItemIndex !== -1) {
                  reduxCartClone[currentItemIndex] = {
                    ...currentItem,
                    amount: e.target.value,
                  };
                  localStorage.setItem("cart", JSON.stringify(reduxCartClone));
                  dispatch(updateCart(reduxCartClone));

                  // message.info("Cart updated !");
                }
              }
            }}
          />
        </div>
      </div>
      <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
        <div>${obj.price}</div>
        <div
          className="font-11 px-2 pb-2 cursor-pointer"
          onClick={() => {
            const currentItemIndex = reduxCartClone.findIndex(
              (e: any) =>
                e.id === obj.id && e.size === obj.size && e.color === obj.color
            );
            reduxCartClone.splice(currentItemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(reduxCartClone));
            dispatch(updateCart(reduxCartClone));
          }}
        >
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default function Index({}: Props): ReactElement {
  const reduxCart = useSelector((state) => state.order.cart);
  const totalItemsInCart = useSelector((state) => state.order.totalItemsInCart);
  const totalPriceInCart = useSelector((state) => state.order.totalPriceInCart);

  return (
    <div className="w-100">
      <div className="col-12">
        {reduxCart.map((obj: any, index: number) => [
          <CartItem obj={obj} index={index} reduxCart={reduxCart} />,
          <hr />,
        ])}
      </div>
      <div className="w-100 text-right font-14">
        TOTAL:&nbsp;<span className="font-bold">${totalPriceInCart}</span>
      </div>
      <div className="w-100 font-9 text-right my-2 color-gray">
        * Please note that all countries outside the EU may be subject to local
        taxes and duties. These are not included in the final price
      </div>
      <div className="w-100 d-flex justify-content-end">
        <Link href="/order">
          <div className="feng-button-md my-2">CHECKOUT</div>
        </Link>
      </div>
    </div>
  );
}
