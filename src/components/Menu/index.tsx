import React, { ReactElement, useEffect, useState } from "react";
import { DatePicker } from "antd";
import Header from "@components/Header";
import Link from "next/link";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { getSubCategory, getSubCategory } from "@redux/slices/api/productSlice";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

interface Props {}

export default function FengMenu({}: Props): ReactElement {
  const [womanExpanded, setWomanExpanded] = useState<boolean>(true);
  const [manExpanded, setManExpanded] = useState<boolean>(false);
  const [collectionExpanded, setCollectionExpanded] = useState<boolean>(false);
  const [listSubCategoryWoman, setlistSubCategoryWoman] = useState<any>();
  const [listSubCategoryMan, setlistSubCategoryMan] = useState<any>();

  const dispatch = useDispatch();

  const getSubCategory = async () => {
    const resDataMan = await axios
      .get(`${API_ENDPOINT}/categories/man`)
      .then((res) => {
        // console.log(res.data);
        setlistSubCategoryMan(res.data);
        return res.data;
      });
    const resDataWoman = await axios
      .get(`${API_ENDPOINT}/categories/woman`)
      .then((res) => {
        // console.log(res.data);
        setlistSubCategoryWoman(res.data);
        return res.data;
      });
    // console.log(listSubCategoryMan);
    // console.log(listSubCategoryWoman);
  };

  useEffect(() => {
    getSubCategory();
  }, []);
  return (
    <div>
      <Link href="/">
        {/* <img
                src="/img/logo/feng-logo.png"
                className="feng-logo cursor-pointer"
              /> */}
        <h1 className="font-bold cursor-pointer">FENG</h1>
      </Link>
      <div className="menu">
        <div className="item" onClick={() => setWomanExpanded(!womanExpanded)}>
          Woman
        </div>
        {womanExpanded && (
          <div className="ml-3">
            {listSubCategoryWoman?.map((obj: any, index: number) => (
              <Link href={`/product/woman/${obj.url}`}>
                <div className="sub-item" key={index}>
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="item" onClick={() => setManExpanded(!manExpanded)}>
          Man
        </div>
        {manExpanded && (
          <div className="ml-3">
            {listSubCategoryMan?.map((obj: any, index: number) => (
              <Link href={`/product/man/${obj.url}`}>
                <div className="sub-item" key={index}>
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="item">About us</div>
        <div
          className="item"
          onClick={() => setCollectionExpanded(!collectionExpanded)}
        >
          Collection
        </div>
        {collectionExpanded && (
          <div className="ml-3">
            <Link href="/collection/SS2021">
              <div className="sub-item">SS2020</div>
            </Link>
            <Link href="/collection/SS2022">
              <div className="sub-item">SS2021</div>
            </Link>
            <Link href="/collection/SS2023">
              <div className="sub-item">SS2022</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
