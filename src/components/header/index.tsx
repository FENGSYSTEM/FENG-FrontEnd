import React, { ReactElement, useState } from "react";
import { Input, Radio, Space, Badge, Popover, Button } from "antd";
import {
  SearchOutlined,
  RightOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface Props {}

export default function Header({}: Props): ReactElement {
  const [categoryRadioState, setCategoryRadioState] = useState<boolean>(true);
  const content = (
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
  return (
    <div className="w-100 d-flex justify-content-end">
      <Input
        className="w-50 mx-1"
        placeholder="search..."
        prefix={<SearchOutlined />}
      />
      <Popover placement="bottom" content={content} trigger="click">
        <Button className="mx-1 d-flex align-items-center justify-content-center">
          <FilterOutlined />
        </Button>
      </Popover>
      <Button className="mx-1 d-flex align-items-center justify-content-center">
        <Badge count={0} showZero status="default">
          <ShoppingCartOutlined />
        </Badge>
      </Button>
    </div>
  );
}
