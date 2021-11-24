import React, { ReactElement, useEffect, useState } from "react";
import { Input, Radio, Space, Badge, Popover, Button, Drawer } from "antd";
import {
  SearchOutlined,
  RightOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCart,
  updateTotalItems,
  updateTotalPrice,
} from "@redux/slices/api/orderSlice";
import Link from "next/link";
import FengMenu from "@components/Menu";

interface Props {}

export default function Header({}: Props): ReactElement {
  const dispatch = useDispatch();
  const reduxCart = useSelector((state) => state.order.cart);
  const totalItemsInCart = useSelector((state) => state.order.totalItemsInCart);
  const totalPriceInCart = useSelector((state) => state.order.totalPriceInCart);
  const [categoryRadioState, setCategoryRadioState] = useState<boolean>(true);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (window) {
      if (localStorage.getItem("cart")) {
        const cartItems = JSON.parse(localStorage.getItem("cart") as any);
        dispatch(updateCart(cartItems));
      }
    }
  }, []);

  useEffect(() => {
    let sumAmount = Object.values(reduxCart).reduce(
      (acc: any, cur: any) => parseInt(acc) + parseInt(cur.amount),
      0
    ) as number;
    let sumPrice = Object.values(reduxCart).reduce(
      (acc, cur: any) => acc + cur.price * cur.amount,
      0
    ) as number;
    dispatch(updateTotalItems(sumAmount));
    dispatch(updateTotalPrice(sumPrice));
  }, [reduxCart]);

  const filterContent = (
    <div>
      <div className="filter-item">
        <div className="title">
          <div className="">Category</div>
          <RightOutlined />
        </div>
      </div>
      <div className="py-1">
        <Radio.Group
          onChange={(e) => setCategoryRadioState(e.target.value)}
          value={categoryRadioState}
        >
          <Space direction="vertical">
            <Radio value={1}>Color</Radio>
            <Radio value={2}>Bottom</Radio>
            <Radio value={3}>Skirt</Radio>
            <Radio value={4}>Coat</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="filter-item">
        <div className="title">
          <div className="">Color</div>
          <RightOutlined />
        </div>
      </div>
      <div className="filter-item">
        <div className="title">
          <div className="">Size</div>
          <RightOutlined />
        </div>
      </div>
      <div className="filter-item">
        <div className="title">
          <div className="">Accessories</div>
          <RightOutlined />
        </div>
      </div>
    </div>
  );
  const cartContent = () => (
    <div>
      <div className="font-12 cart-popup-item text-center">
        Cart ({totalItemsInCart})
        <hr />
      </div>
      <div>
        {reduxCart.map((obj: any, index) => (
          <div className="cart-popup-item" key={index}>
            <div className="font-12 mt-2">{obj.name}</div>
            <div className="w-100 d-flex align-items-center justify-content-between">
              <div className="font-10">
                Color:&nbsp;<span className="font-bold">{obj.color}</span>
              </div>
              <div className="font-10">
                Amount:&nbsp;<span className="font-bold">{obj.amount}</span>
              </div>
              <div className="font-10">
                Size:&nbsp;<span className="font-bold">{obj.size}</span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="font-12 text-left">
        Total:&nbsp;<span className="font-bold">${totalPriceInCart}</span>
      </div>
      <Link href="/cart">
        <div className="feng-button-md my-2">Purchase</div>
      </Link>
    </div>
  );
  return (
    <div className="w-100 d-flex justify-content-end">
      <Button
        className="d-block d-md-none mx-1 d-flex align-items-center justify-content-center"
        onClick={() => setVisible(!visible)}
      >
        <UnorderedListOutlined />
      </Button>
      <Input
        size="small"
        className="w-50 mx-1"
        placeholder="search..."
        prefix={<SearchOutlined />}
      />
      <Popover placement="bottom" content={filterContent} trigger="click">
        <Button className="mx-1 d-flex align-items-center justify-content-center">
          <FilterOutlined />
        </Button>
      </Popover>
      <Button className="mx-1 d-flex align-items-center justify-content-center">
        <Popover placement="bottom" content={cartContent} trigger="click">
          <Badge count={totalItemsInCart} showZero status="default">
            <ShoppingCartOutlined />
          </Badge>
        </Popover>
      </Button>
      <Drawer
        title={() => <h1 className="font-bold cursor-pointer">FENG</h1>}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <FengMenu />
      </Drawer>
    </div>
  );
}
