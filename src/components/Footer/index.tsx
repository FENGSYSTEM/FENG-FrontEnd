import { getEvent } from "@redux/slices/api/eventSlice";
import { Input } from "antd";
import React, { ReactElement, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
interface Props {}

export default function Footer({}: Props): ReactElement {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.event.eventData) as any;

  useEffect(() => {
    dispatch(getEvent());
  }, []);
  return (
    <div className="w-100">
      {typeof eventData?.content !== "undefined" && (
        <div className="w-100 marquee-slider my-3">
          <Marquee gradient={false} speed={65}>
            {Array.from({ length: 20 }, (_, i) => eventData?.content + " ")}
          </Marquee>
        </div>
      )}

      <div className="container mt-5">
        <div className="w-100 d-flex justify-content-start">
          <div className="font-bold font-20">FENG SYSTEM</div>
        </div>
        <hr />
        <div className="col-12">
          <div className="row">
            <div className="col-md-6 px-0">
              <div className="d-flex align-items-center justify-content-start">
                <Input
                  size="small"
                  placeholder="E-MAIL ADDRESS"
                  className="w-50"
                />
                <div className="feng-button-sm mx-2">SUBCRIBE</div>
              </div>
            </div>
            <div className="col-md-6 px-0">
              <div className="d-flex flex-md-row flex-column m-md-0 my-3 align-items-start align-items-md-center justify-content-end">
                {/* <div className="mx-2 cursor-pointer">CONTACT</div>
                <div className="mx-2 cursor-pointer">PRESS</div>
                <div className="mx-2 cursor-pointer">STOCKISTS</div>
                <div className="mx-2 cursor-pointer">CUSTOMER CARE</div> */}
                <a
                  href="https://www.instagram.com/feng.system/"
                  target="_blank"
                >
                  <div className="mx-2 cursor-pointer">INSTAGRAM</div>
                </a>
                <a href="https://www.facebook.com/feng.system" target="_blank">
                  <div className="mx-2 cursor-pointer">FACEBOOK</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
