import React, { ReactElement } from "react";

interface Props {}
interface ProductItem {
  status: string;
  imgUrl: string;
}
export default function Index({}: Props): ReactElement {
  const ProductItem = (item: ProductItem) => {
    return (
      <div className="product-item">
        <div className="product-item-overlay">
          <div className="product-item-status">{item.status}</div>
        </div>
        <img src={item.imgUrl} className="w-100" />
      </div>
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
            <ProductItem status="add to cart" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="sold out" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="add to cart" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="add to cart" imgUrl="/img/shop/p1.jpeg" />
          </div>
          <div className="col-4 px-2 my-2">
            <ProductItem status="sold out" imgUrl="/img/shop/p1.jpeg" />
          </div>
        </div>
      </div>
    </div>
  );
}
