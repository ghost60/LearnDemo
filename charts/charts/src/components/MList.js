import React from "react";
import { Table } from "antd";
import { connect } from "dva";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "频率",
    dataIndex: "pl",
    key: "pl"
  },
  {
    title: "幅度",
    dataIndex: "fd",
    key: "fd"
  }
];

function MList(props) {
  return <Table columns={columns} dataSource={props.app.mList} size={"small"}/>;
}

export default connect(({ app }) => ({
  app
}))(MList);
