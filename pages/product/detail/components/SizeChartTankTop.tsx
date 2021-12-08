import { Table } from "antd";
import React, { ReactElement } from "react";

interface Props {}

export default function SizeChartTankTop({}: Props): ReactElement {
  const columns = [
    {
      title: "",
      dataIndex: "name",
    },
    {
      title: "Body Length",
      dataIndex: "size1",
    },
    {
      title: "Chest Width",
      dataIndex: "size2",
    },
    {
      title: "Neck Opening",
      dataIndex: "size3",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Small",
      size1: "66 cm",
      size2: "25 cm",
      size3: "36 cm",
    },
    {
      key: "2",
      name: "Medium",
      size1: "68 cm",
      size2: "25 cm",
      size3: "38 cm",
    },
    {
      key: "3",
      name: "Large",
      size1: "70 cm",
      size2: "25 cm",
      size3: "40 cm",
    },
    {
      key: "3",
      name: "Extra Large",
      size1: "72 cm",
      size2: "25 cm",
      size3: "42 cm",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      // showHeader={false}
      bordered
    />
  );
}
