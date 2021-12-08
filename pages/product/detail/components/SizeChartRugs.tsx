import { Table } from "antd";
import React, { ReactElement } from "react";

interface Props {}

export default function SizeChartRugs({}: Props): ReactElement {
  const columns = [
    {
      title: "",
      dataIndex: "name",
    },
    {
      title: "SIZE INFORMATION",
      dataIndex: "size1",
    },
  ];
  const data = [
    {
      key: "1",
      name: "LOGO RUGS",
      size1: "51 cm X 51 cm",
    },
    {
      key: "2",
      name: "BODY RUGS",
      size1: "170 cm x 42 cm",
    },
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} bordered />
  );
}
