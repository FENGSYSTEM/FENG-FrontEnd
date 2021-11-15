import React, { ReactElement } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";

interface Props {}

export default function Index({}: Props): ReactElement {
  const reduxCart = useSelector((state) => state.counter.cart);
  const totalPriceInCart = useSelector(
    (state) => state.counter.totalPriceInCart
  );
  return (
    <div className="w-100">
      <div className="col-12">
        <div className="row">
          <div className="col-8">
            <div className=" order-palete shadow-md">
              <h5>Contact information</h5>
              <Input className="my-2" placeholder="Enter your name" />
              <Input className="my-2" placeholder="Phone number" />
              <Input className="my-2" placeholder="Your address" />
            </div>
          </div>
          <div className="col-4">
            {reduxCart.map((obj: any, index) => (
              <div className="w-100" key={index}>
                <div className="font-12 mt-2 d-flex justify-content-between align-items-center my-1">
                  <div>{obj.name}</div>
                  <div className="font-normal font-10 color-gray">
                    ${obj.amount * obj.price}
                  </div>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <div className="font-10">
                    Color:&nbsp;<span className="font-bold">{obj.color}</span>
                  </div>
                  <div className="font-10">
                    Amount:&nbsp;<span className="font-bold">{obj.amount}</span>
                  </div>
                  <div className="font-10">
                    Size:&nbsp;<span className="font-bold">{obj.size}</span>
                  </div>
                </div>
                <hr />
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-10">Total</div>
              <div className="font-10 color-gray">
                USD&nbsp;
                <span className="font-14 color-black">${totalPriceInCart}</span>
              </div>
            </div>
            <hr />
            <div className="w-100 d-flex justify-content-end align-items-center">
              <div className="feng-button-md w-100 mt-2">PLACE AN ORDER</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
