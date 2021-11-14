import React, { ReactElement, useState } from "react";
import { DatePicker } from "antd";
import Header from "@components/Header";
import Link from "next/link";

interface Props {
  children: React.ReactElement;
}

export default function MasterLayout({ children }: Props): ReactElement {
  const [womanExpanded, setWomanExpanded] = useState<boolean>(true);
  const [manExpanded, setManExpanded] = useState<boolean>(false);

  return (
    <div className="container py-5">
      <div className="col-12">
        <div className="row">
          <div className="col-3">
            <Link href="/">
              <img
                src="/img/logo/feng-logo.png"
                className="feng-logo cursor-pointer"
              />
            </Link>
            <div className="menu">
              <div
                className="item"
                onClick={() => setWomanExpanded(!womanExpanded)}
              >
                Woman
              </div>
              {womanExpanded && (
                <div className="ml-3">
                  <Link href="/product/woman/new-arrivals">
                    <div className="sub-item">New Arrivals</div>
                  </Link>
                  <Link href="/product/woman/top">
                    <div className="sub-item">Top</div>
                  </Link>
                  <Link href="/product/woman/bottom">
                    <div className="sub-item">Bottom</div>
                  </Link>
                  <Link href="/product/woman/coat">
                    <div className="sub-item">Coat</div>
                  </Link>
                  <Link href="/product/woman/accessories">
                    <div className="sub-item">Accessories</div>
                  </Link>
                </div>
              )}
              <div
                className="item"
                onClick={() => setManExpanded(!manExpanded)}
              >
                Man
              </div>
              {manExpanded && (
                <div className="ml-3">
                  <div className="sub-item">New Arrivals</div>
                  <div className="sub-item">Top</div>
                  <div className="sub-item">Bottom</div>
                  <div className="sub-item">Coat</div>
                  <div className="sub-item">Accessories</div>
                </div>
              )}
              <div className="item">About us</div>
              <div className="item">Collection</div>
            </div>
          </div>
          <div className="col-9">
            <Header />
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
