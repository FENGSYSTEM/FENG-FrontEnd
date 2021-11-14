import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}
interface ProductItem {
  status: string;
  imgUrl: string;
}
export default function Index({}: Props): ReactElement {
  const route = useRouter();
  console.log(route.query);
  const ProductItem = (item: ProductItem) => {
    return (
      <Link href={`/product/detail/123`}>
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
            <ProductItem status="sold out" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="available" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="sold out" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="available" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="available" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="sold out" imgUrl="/img/shop/p1.jpeg" />
          </div>
        </div>
      </div>
    </div>
  );
}
