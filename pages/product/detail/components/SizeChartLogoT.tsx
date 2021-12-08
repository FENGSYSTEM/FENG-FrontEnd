import { Table } from "antd";
import React, { ReactElement } from "react";

interface Props {}

export default function SizeChartLogoT({}: Props): ReactElement {
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
      size1: "70 cm",
      size2: "48 cm",
      size3: "21 cm",
    },
    {
      key: "2",
      name: "Medium",
      size1: "72 cm",
      size2: "50 cm",
      size3: "21 cm",
    },
    {
      key: "3",
      name: "Large",
      size1: "74 cm",
      size2: "52 cm",
      size3: "21 cm",
    },
    {
      key: "3",
      name: "Extra Large",
      size1: "76 cm",
      size2: "54 cm",
      size3: "21 cm",
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
