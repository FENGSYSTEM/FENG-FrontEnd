import { Input } from "antd";
import React, { ReactElement } from "react";
import Marquee from "react-fast-marquee";
interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <div className="mt-5">
      <div className="w-100 marquee-slider my-3">
        <Marquee gradient={false} speed={65}>
          SALE BLACK FRIDAY SALE BLACK FRIDAY SALE BLACK FRIDAY SALE BLACK
          FRIDAY SALE BLACK FRIDAY SALE BLACK FRIDAY SALE BLACK FRIDAY SALE
          BLACK FRIDAY SALE BLACK FRIDAY&nbsp;
        </Marquee>
      </div>
      <div className="w-100 d-flex justify-content-start">
        <div className="font-bold font-20">FENG SYSTEM</div>
      </div>
      <hr />
      <div className="col-12">
        <div className="row">
          <div className="col-6 px-0">
            <div className="d-flex align-items-center justify-content-start">
              <Input
                size="small"
                placeholder="E-MAIL ADDRESS"
                className="w-50"
              />
              <div className="feng-button-sm mx-2">SUBCRIBE</div>
            </div>
          </div>
          <div className="col-6 px-0">
            <div className="d-flex align-items-center justify-content-end">
              <div className="mx-2 cursor-pointer">CONTACT</div>
              <div className="mx-2 cursor-pointer">PRESS</div>
              <div className="mx-2 cursor-pointer">STOCKISTS</div>
              <div className="mx-2 cursor-pointer">CUSTOMER CARE</div>
              <div className="mx-2 cursor-pointer">INSTAGRAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
