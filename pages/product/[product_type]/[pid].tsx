import { getProductBySubCategory } from "@redux/slices/api/productSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {}
interface ProductItem {
  status: string;
  imgList: any;
  productId: any;
}
export default function Index({}: Props): ReactElement {
  const route = useRouter();
  console.log(route.query);
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.listProduct) as any;

  const returnStatus = (status: string) => {
    switch (status) {
      case "OUT_OF_STOCK":
        return "OUT OF STOCK";
      case "IN_STOCK":
        return "AVAILABLE";
    }
  };
  useEffect(() => {
    dispatch(getProductBySubCategory(route.query.pid));
  }, [route.query]);

  const ProductItem = (item: ProductItem) => {
    return (
      <Link href={`/product/detail/${item.productId}`}>
        {item.status === "OUT_OF_STOCK" ? (
          <div className="product-item">
            <div className="product-item-overlay">
              <div className="product-item-status">
                {returnStatus(item.status)}
              </div>
            </div>
            <img src={item.imgList[0]} className="w-100 product-img-1" />
            <img src={item.imgList[1]} className="w-100 product-img-2" />
          </div>
        ) : (
          <div className="product-item">
            <img src={item.imgList[0]} className="w-100 product-img-1" />
            <img src={item.imgList[1]} className="w-100 product-img-2" />
          </div>
        )}
      </Link>
    );
  };
  return (
    <div>
      <div className="col-12">
        <div className="row">
          {listProduct.products?.map((obj: any, index: number) => (
            <div className="col-4 px-2 my-2">
              <ProductItem
                productId={obj.id}
                status={obj.status}
                imgList={obj.images}
              />
            </div>
          ))}

          {/* <div className="col-4 px-2 my-2">
            <ProductItem
              productId="2"
              status="available"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem
              productId="3"
              status="sold out"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem
              productId="4"
              status="available"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem
              productId="5"
              status="available"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem
              productId="6"
              status="sold out"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
