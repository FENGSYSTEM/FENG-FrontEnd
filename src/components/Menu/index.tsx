import React, { ReactElement, useEffect, useState } from "react";
import { DatePicker } from "antd";
import Header from "@components/Header";
import Link from "next/link";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { getSubCategory, getSubCategory } from "@redux/slices/api/productSlice";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";
import { setOpenDrawer } from "@redux/slices/counter";

interface Props {}

export default function FengMenu({}: Props): ReactElement {
  const [preorderExpanded, setPreorderExpanded] = useState<boolean>(true);
  const [womanExpanded, setWomanExpanded] = useState<boolean>(true);
  const [manExpanded, setManExpanded] = useState<boolean>(false);
  const [homeDecorExpanded, setHomeDecorExpanded] = useState<boolean>(false);

  const [collectionExpanded, setCollectionExpanded] = useState<boolean>(false);
  const [listSubCategoryWoman, setlistSubCategoryWoman] = useState<any>();
  const [listSubCategoryMan, setlistSubCategoryMan] = useState<any>();
  const [listSubCategoryHomeDecor, setlistSubCategoryHomeDecor] =
    useState<any>();

  const [listSubCategoryPreorder, setListSubCategoryPreorder] = useState<any>();

  const dispatch = useDispatch();

  const getSubCategory = async () => {
    // const resPreorder = await axios
    //   .get(`${API_ENDPOINT}/categories/Pre order`)
    //   .then((res) => {
    //     // console.log(res.data);
    //     setListSubCategoryPreorder(res.data);
    //     return res.data;
    //   });
    const resDataMan = await axios
      .get(`${API_ENDPOINT}/categories/Menswear`)
      .then((res) => {
        // console.log(res.data);
        setlistSubCategoryMan(res.data);
        return res.data;
      });
    const resDataWoman = await axios
      .get(`${API_ENDPOINT}/categories/Womenswear`)
      .then((res) => {
        // console.log(res.data);
        setlistSubCategoryWoman(res.data);
        return res.data;
      });
    const resDataHomeDecor = await axios
      .get(`${API_ENDPOINT}/categories/Home decor`)
      .then((res) => {
        // console.log(res.data);
        setlistSubCategoryHomeDecor(res.data);
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
        {/* <h1 className="font-bold cursor-pointer">FENG</h1> */}
        <img
          src="/icons/FENG.svg"
          className="py-3 cursor-pointer"
          onClick={() => dispatch(setOpenDrawer(false))}
        />
      </Link>
      <div className="menu">
        {/* <div
          className="item"
          onClick={() => setPreorderExpanded(!preorderExpanded)}
        >
          Pre order
        </div>
        {preorderExpanded && (
          <div className="ml-3">
            {listSubCategoryPreorder?.map((obj: any, index: number) => (
              <Link href={`/product/preorder/${obj.url}`}>
                <div
                  className="sub-item"
                  key={index}
                  onClick={() => dispatch(setOpenDrawer(false))}
                >
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )} */}
        <div className="item" onClick={() => setWomanExpanded(!womanExpanded)}>
          Womenswear
        </div>
        {womanExpanded && (
          <div className="ml-3">
            {listSubCategoryWoman?.map((obj: any, index: number) => (
              <Link href={`/product/womenswear/${obj.url}`}>
                <div
                  className="sub-item"
                  key={index}
                  onClick={() => dispatch(setOpenDrawer(false))}
                >
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="item" onClick={() => setManExpanded(!manExpanded)}>
          Menswear
        </div>
        {manExpanded && (
          <div className="ml-3">
            {listSubCategoryMan?.map((obj: any, index: number) => (
              <Link href={`/product/menswear/${obj.url}`}>
                <div
                  className="sub-item"
                  key={index}
                  onClick={() => dispatch(setOpenDrawer(false))}
                >
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div
          className="item"
          onClick={() => setHomeDecorExpanded(!homeDecorExpanded)}
        >
          Home Décor
        </div>
        {homeDecorExpanded && (
          <div className="ml-3">
            {listSubCategoryHomeDecor?.map((obj: any, index: number) => (
              <Link href={`/product/home-decor/${obj.url}`}>
                <div
                  className="sub-item"
                  key={index}
                  onClick={() => dispatch(setOpenDrawer(false))}
                >
                  {obj.name}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="item">
          <Link href="/about-us">About us</Link>
        </div>
        <div className="item">
          <Link href="/contact">Contact</Link>
        </div>
        <div className="item">
          <Link href="/frequency-questions">Q&A</Link>
        </div>
        {/* <div
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
        )} */}
      </div>
    </div>
  );
}
