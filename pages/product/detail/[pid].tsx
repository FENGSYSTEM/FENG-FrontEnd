import React, { ReactElement, useState } from "react";
import { Table, Tag, Space } from "antd";
import SizeChart from "./components/SizeChart";

interface Props {}
interface ISizeSelector {
  size: number;
}
interface IColorSelector {
  color: string;
}
export default function index({}: Props): ReactElement {
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
              <div className="feng-button w-100">ADD TO CART</div>
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
