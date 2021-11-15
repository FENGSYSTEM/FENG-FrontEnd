import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message } from "antd";
import { updateCart } from "@redux/slices/counter";

interface Props {}

export default function Index({}: Props): ReactElement {
  const dispatch = useDispatch();
  const reduxCart = useSelector((state) => state.counter.cart);
  const totalItemsInCart = useSelector(
    (state) => state.counter.totalItemsInCart
  );
  const totalPriceInCart = useSelector(
    (state) => state.counter.totalPriceInCart
  );
  const CartItem = ({ obj, index }: { obj: any; index: number }) => {
    const [itemAmountValue, setAmountValue] = useState<number>(obj.amount);
    // const [reduxCartClone, setReduxCartClone] = useState<[]>(reduxCart);
    let reduxCartClone = [...reduxCart] as any;

    // console.log(reduxCartClone);
    return (
      <div className="row cart-item" key={index}>
        <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
          {obj.id}
        </div>
        <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
          {obj.name} - {obj.size}
        </div>
        <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Input
              value={itemAmountValue}
              type="number"
              className="text-center"
              onChange={(e) => {
                e.currentTarget.focus();
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
                    localStorage.setItem(
                      "cart",
                      JSON.stringify(reduxCartClone)
                    );
                    dispatch(updateCart(reduxCartClone));
                    // message.info("Cart updated !");
                  }
                }
              }}
            />
            <div
              className="font-9 cursor-pointer mt-2"
              onClick={() => {
                const currentItemIndex = reduxCartClone.findIndex(
                  (e: any) =>
                    e.id === obj.id &&
                    e.size === obj.size &&
                    e.color === obj.color
                );
                reduxCartClone.splice(currentItemIndex, 1);
                localStorage.setItem("cart", JSON.stringify(reduxCartClone));
                dispatch(updateCart(reduxCartClone));
              }}
            >
              REMOVE
            </div>
          </div>
        </div>
        <div className="col-3 cart-item-row d-flex align-items-center justify-content-center">
          ${obj.price}
        </div>
      </div>
    );
  };
  return (
    <div className="w-100">
      <div className="col-12">
        {reduxCart.map((obj: any, index: number) => [
          <CartItem obj={obj} index={index} />,
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
    </div>
  );
}