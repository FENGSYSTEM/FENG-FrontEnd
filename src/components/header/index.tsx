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
  setOpenPopupOrder,
  updateCart,
  updateTotalItems,
  updateTotalPrice,
} from "@redux/slices/api/orderSlice";
import Link from "next/link";
import FengMenu from "@components/Menu";
import { setOpenDrawer } from "@redux/slices/counter";
import { currencyFormatUS, currencyFormatVND } from "src/utils/currencyFormat";
import { Modal } from "antd";

interface Props {}

export default function Header({}: Props): ReactElement {
  const dispatch = useDispatch();
  const reduxCart = useSelector((state) => state.order.cart);
  const openDrawer = useSelector((state) => state.counter.openDrawer);
  const totalItemsInCart = useSelector((state) => state.order.totalItemsInCart);
  const totalPriceInCart = useSelector((state) => state.order.totalPriceInCart);
  const paymentMethod = useSelector((state) => state.counter.paymentMethod);
  const [categoryRadioState, setCategoryRadioState] = useState<boolean>(true);
  const isVnPrice = useSelector((state) => state.counter.isVnPrice);

  const showPopupOrder = useSelector((state) => state.order.showPopupOrder);
  // const [visible, setVisible] = useState(false);
  // const showDrawer = () => {
  //   setVisible(true);
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };

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
              <div className="font-10 d-flex align-items-center">
                Color:&nbsp;
                <div
                  className="mx-2"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: obj.color,
                    border: "2px solid #000",
                  }}
                />
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
        Total:&nbsp;
        <span className="font-bold">
          {isVnPrice
            ? currencyFormatVND(totalPriceInCart)
            : currencyFormatUS(totalPriceInCart)}
        </span>
      </div>
      <Link href="/cart">
        <div className="feng-button-md my-2">Purchase</div>
      </Link>
    </div>
  );
  return (
    <div className="w-100 d-flex justify-content-end">
      {/* <Button className="d-block d-md-none mx-1 d-flex align-items-center justify-content-center">
       
      </Button> */}
      <UnorderedListOutlined
        className="mx-2 d-block d-md-none"
        style={{ fontSize: "18pt", cursor: "pointer" }}
        onClick={() => dispatch(setOpenDrawer(!openDrawer))}
      />
      {/* <Input
        size="small"
        className="w-50 mx-1"
        placeholder="search..."
        prefix={<SearchOutlined />}
      /> */}
      {/* <Popover placement="bottom" content={filterContent} trigger="click">
        <Button className="mx-1 d-flex align-items-center justify-content-center">
          <FilterOutlined />
        </Button>
      </Popover> */}
      {/* <Button className="mx-1 d-flex align-items-center justify-content-center">
       
      </Button> */}
      <Popover placement="bottom" content={cartContent} trigger="click">
        <Badge
          className="mx-2"
          count={totalItemsInCart ? totalItemsInCart : 0}
          showZero
          status="default"
        >
          <ShoppingCartOutlined
            style={{ fontSize: "18pt", cursor: "pointer" }}
          />
        </Badge>
      </Popover>
      <Drawer
        title={() => <h1 className="font-bold cursor-pointer">FENG</h1>}
        placement="right"
        onClose={() => dispatch(setOpenDrawer(false))}
        visible={openDrawer}
      >
        <FengMenu />
      </Drawer>
      <Modal
        visible={showPopupOrder}
        onOk={() => {}}
        onCancel={() => dispatch(setOpenPopupOrder(false))}
        footer={null}
      >
        {paymentMethod === "BANKING" ? (
          <div>
            <p>
              Thank you for purchasing in Feng. Your order is in processing
              progress. Please check your information and transfer the total to
              one of the accounts below as soon as possible to complete the
              buying. You will receive a confirmation phone call, so please
              monitor your phone. After that, we will email with full details
              and a receipt of your purchase.
            </p>
            <p>
              Please note that your order will only be considered successful
              once we confirm the full payment has been received.
            </p>
            <p>PAYPAL</p>
            <p>nguyentuadigan@gmail.com</p>
            <p>
              Cảm ơn bạn đã mua hàng ở Feng. Đơn đặt hàng của bạn đang được xử
              lý. Vui lòng kiểm tra thông tin và chuyển tổng số tiền đơn hàng
              vào các số tài khoản sau để hoàn tất giao dịch mua. Sau đó, bạn sẽ
              nhận được một cuộc điện thoại xác nhận thông tin đơn hàng và xác
              nhận chuyển khoản, vì vậy hãy theo dõi điện thoại của bạn. Khi các
              thủ tục trên hoàn tất,chúng tôi sẽ email biên lai mua hàng của
              bạn.
            </p>
            <p>
              Xin lưu ý, đơn hàng của bạn chỉ được coi là đặt hàng thành công
              một khi chúng tôi xác nhận đã chuyển khoản đầy đủ.
            </p>
            <p>VP BANK</p>
            <p>PHUNG THI AI NGUYEN</p>
            <p>27322255</p>
          </div>
        ) : (
          <div>
            <p>COD/ Thanh toán khi nhận hàng</p>
            <p>
              Cảm ơn bạn đã mua hàng tại Feng. Đơn hàng của bạn đã được hệ thống
              ghi nhận, Feng sẽ sớm gọi điện xác nhận đơn hàng theo thứ tự và
              phương thức thanh toán COD của bạn.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
