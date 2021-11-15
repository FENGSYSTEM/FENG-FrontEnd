import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}
interface ProductItem {
  status: string;
  imgUrl: string;
  productId: any;
}
export default function Index({}: Props): ReactElement {
  const route = useRouter();
  console.log(route.query);
  const ProductItem = (item: ProductItem) => {
    return (
      <Link href={`/product/detail/${item.productId}`}>
        <div className="product-item">
          <div className="product-item-overlay">
            <div className="product-item-status">{item.status}</div>
          </div>
          <img src={item.imgUrl} className="w-100" />
        </div>
      </Link>
    );
  };
  return (
    <div>
      <div className="col-12">
        <div className="row">
          <div className="col-4 px-2 my-2">
            <ProductItem
              productId="1"
              status="sold out"
              imgUrl="/img/shop/p1.jpeg"
            />
          </div>
          <div className="col-4 px-2 my-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
