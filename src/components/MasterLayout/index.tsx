import React, { ReactElement, useEffect, useState } from "react";
import { DatePicker } from "antd";
import Header from "@components/Header";
import Link from "next/link";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { getSubCategory, getSubCategory } from "@redux/slices/api/productSlice";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";
import FengMenu from "@components/Menu";
import { getConfigs } from "@redux/slices/api/configContentSlice";
import { setIsVnPrice } from "@redux/slices/counter";

interface Props {
  children: React.ReactElement;
}

export default function MasterLayout({ children }: Props): ReactElement {
  const dispatch = useDispatch();
  const [isOpenSplash, setOpenSplash] = useState<boolean>(true);

  const configsData = useSelector((state) => state.config.configsData) as any;

  useEffect(() => {
    dispatch(getConfigs());
  }, []);

  useEffect(() => {
    if (window) {
      if (localStorage.getItem("priceType") === "vn") {
        dispatch(setIsVnPrice(true));
      } else {
        dispatch(setIsVnPrice(false));
      }
    }
  }, []);
  return (
    <>
      <div
        className="splash"
        hidden={!isOpenSplash}
        onClick={() => setOpenSplash(false)}
        style={{ backgroundImage: `url(${configsData?.image})` }}
      ></div>
      <div className="w-100 py-5">
        <div className="col-12">
          <div className="row">
            <div
              className="d-none d-md-block col-md-2"
              // style={{ borderRight: "1px solid #EBEBEB" }}
            >
              <FengMenu />
            </div>
            <div className="col-12 col-md-10">
              <Header />
              <div className="mt-5 min-vh-70">{children}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// export async function getServerSideProps(context: any) {
//   console.log(context);
//   const { pid } = context.query;
//   const listSubCategoryMan = await axios.get(`${API_ENDPOINT}/categories/man`);
//   const listSubCategoryWoman = await axios.get(
//     `${API_ENDPOINT}/categories/woman`
//   );
//   console.log(listSubCategoryMan.data);
//   console.log(listSubCategoryWoman.data);

//   return {
//     props: {
//       pid,
//       listSubCategoryMan,
//       listSubCategoryWoman,
//     }, // will be passed to the page component as props
//   };
// }
