import React, { ReactElement, useState } from "react";
import { Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@redux/slices/api/orderSlice";
import { useRouter } from "next/router";
import { Radio } from "antd";
import { currencyFormatUS, currencyFormatVND } from "src/utils/currencyFormat";
import { setPaymentMethod } from "@redux/slices/counter";
interface Props {}

export default function Index({}: Props): ReactElement {
  const route = useRouter();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const reduxCart = useSelector((state) => state.order.cart);
  const totalPriceInCart = useSelector((state) => state.order.totalPriceInCart);
  const [cusName, setCusName] = useState<string>();
  const [cusPhone, setCusPhone] = useState<string>();
  const [cusAddress, setCusAddress] = useState<string>();
  const [cusEmail, setCusEmail] = useState<string>();
  const [cusNote, setCusNote] = useState<string>("");
  const isVnPrice = useSelector((state) => state.counter.isVnPrice);
  const [shipType, setShipType] = useState<string>("");

  const handleCreateOrder = () => {
    if (cusName && cusEmail && cusPhone && cusAddress && shipType) {
      const data = {
        name: cusName,
        email: cusEmail,
        phone: cusPhone,
        address: cusAddress,
        note: cusNote,
        productOrders: reduxCart.map((obj: any, index) => ({
          productId: parseInt(obj.id),
          amount: parseInt(obj.amount),
          color: obj.color,
          size: obj.size,
        })),
        paymentType: shipType,
      };
      dispatch(createOrder(data));
      setCusName("");
      setCusPhone("");
      setCusAddress("");
      route.push("/");
    } else {
      message.info("Please fill your information !");
    }
  };

  const onChangeShipType = (e: any) => {
    // console.log("radio checked", e.target.value);
    setShipType(e.target.value);
    dispatch(setPaymentMethod(e.target.value));
  };

  return (
    <div className="w-100">
      <div className="col-12">
        <div className="row">
          <div className="col-md-8">
            <div className=" order-palete shadow-md">
              <h5>Contact information</h5>
              <Input
                className="my-2"
                value={cusName}
                onChange={(e) => setCusName(e.target.value)}
                placeholder="Enter your name"
              />
              <Input
                className="my-2"
                value={cusEmail}
                onChange={(e) => setCusEmail(e.target.value)}
                placeholder="Email address"
              />
              <Input
                className="my-2"
                value={cusPhone}
                onChange={(e) => setCusPhone(e.target.value)}
                placeholder="Phone number"
              />
              <Input
                className="my-2"
                value={cusAddress}
                onChange={(e) => setCusAddress(e.target.value)}
                placeholder="Your address"
              />
              <div className="my-2 d-flex align-items-center">
                <div className="mr-3">Payment method:</div>
                <Radio.Group onChange={onChangeShipType} value={shipType}>
                  <Radio value={"COD"}>COD</Radio>
                  <Radio value={"BANKING"}>Internet Banking</Radio>
                </Radio.Group>
              </div>
              <TextArea
                value={cusNote}
                placeholder="Note"
                showCount
                maxLength={100}
                style={{ height: 120 }}
                onChange={(e) => setCusNote(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 my-3 my-md-0">
            {reduxCart.map((obj: any, index) => (
              <div className="w-100" key={index}>
                <div className="font-12 mt-2 d-flex justify-content-between align-items-center my-1">
                  <div>{obj.name}</div>
                  <div className="font-normal font-10 color-gray">
                    {isVnPrice
                      ? currencyFormatVND(obj.amount * obj.price)
                      : currencyFormatUS(obj.amount * obj.price)}
                  </div>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <div className="font-10 d-flex align-items-center">
                    Color:&nbsp;
                    <div
                      className="mx-2"
                      style={{
                        width: "20px",
                        height: "20px",
                        background: obj.color,
                        border: "2px solid #000",
                      }}
                    />
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
                {/* USD&nbsp; */}
                <span className="font-14 color-black">
                  {isVnPrice
                    ? currencyFormatVND(totalPriceInCart)
                    : currencyFormatUS(totalPriceInCart)}
                </span>
              </div>
            </div>
            <hr />
            <div className="w-100 d-flex justify-content-end align-items-center">
              <div
                className="feng-button-md w-100 mt-2"
                onClick={() => handleCreateOrder()}
              >
                PLACE AN ORDER
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
