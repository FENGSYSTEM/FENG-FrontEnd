import { Table } from "antd";
import React, { ReactElement } from "react";

interface Props {}

export default function SizeChartPants({}: Props): ReactElement {
  const columns = [
    {
      title: "",
      dataIndex: "name",
    },
    {
      title: "Length",
      dataIndex: "size1",
    },
    {
      title: "Waist",
      dataIndex: "size2",
    },
    {
      title: "Rise",
      dataIndex: "size3",
    },
    {
      title: "Thigh",
      dataIndex: "size4",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Small",
      size1: "100 cm",
      size2: "30 cm",
      size3: "35 cm",
      size4: "32 cm",
    },
    {
      key: "2",
      name: "Medium",
      size1: "110 cm",
      size2: "33 cm",
      size3: "35 cm",
      size4: "32 cm",
    },
    {
      key: "3",
      name: "Large",
      size1: "110 cm",
      size2: "38 cm",
      size3: "35 cm",
      size4: "32 cm",
    },
    {
      key: "4",
      name: "Extra Large",
      size1: "110 cm",
      size2: "40 cm",
      size3: "35 cm",
      size4: "32 cm",
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
