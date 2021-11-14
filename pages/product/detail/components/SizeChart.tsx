import { Table } from "antd";
import React, { ReactElement } from "react";

interface Props {}

export default function SizeChart({}: Props): ReactElement {
  const columns = [
    {
      title: "country",
      dataIndex: "name",
    },
    {
      title: "size-1",
      dataIndex: "size1",
    },
    {
      title: "size-2",
      dataIndex: "size2",
    },
    {
      title: "size-3",
      dataIndex: "size3",
    },
    {
      title: "size-4",
      dataIndex: "size4",
    },
    {
      title: "size-5",
      dataIndex: "size5",
    },
    {
      title: "size-6",
      dataIndex: "size6",
    },
    {
      title: "size-7",
      dataIndex: "size7",
    },
  ];
  const data = [
    {
      key: "1",
      name: "FRANCE",
      size1: 32,
      size2: 34,
      size3: 36,
      size4: 38,
      size5: 40,
      size6: 42,
      size7: 44,
    },
    {
      key: "2",
      name: "US",
      size1: 0,
      size2: 2,
      size3: 4,
      size4: 6,
      size5: 8,
      size6: 10,
      size7: 12,
    },
    {
      key: "3",
      name: "UK",
      size1: 4,
      size2: 6,
      size3: 8,
      size4: 10,
      size5: 12,
      size6: 14,
      size7: 16,
    },
    {
      key: "3",
      name: "ITALY",
      size1: 36,
      size2: 38,
      size3: 40,
      size4: 42,
      size5: 44,
      size6: 46,
      size7: 48,
    },
    {
      key: "3",
      name: "JAPAN",
      size1: 3,
      size2: 5,
      size3: 7,
      size4: 9,
      size5: 11,
      size6: 13,
      size7: 15,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      bordered
    />
  );
}
