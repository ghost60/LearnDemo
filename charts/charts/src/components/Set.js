import React, { Component } from "react";
import { Select, InputNumber, Button, message } from "antd";
import { connect } from "dva";
import * as api from "../services/index";
import "./set.css";
const Option = Select.Option;

const setlist = [
  {
    name: "wifi模式",
    type: "select",
    addr: 0,
    item: ["AP模式", "STATION模式"]
  },
  {
    name: "加速度采样轴",
    type: "select",
    addr: 1,
    item: ["x轴", "y轴", "z轴"]
  },
  {
    name: "加速度传感器使能",
    type: "select",
    addr: 3,
    item: [0, 1]
  },
  {
    name: "加速度传感器数据包间隔(ms)",
    type: "input",
    addr: 4,
    item: [1, 1000000]
  },
  {
    name: "加速度传感器采样间隔(ms)",
    type: "input",
    addr: 5,
    item: [1, 1000]
  },
  {
    name: "滤波参数",
    type: "input",
    addr: 6,
    item: [1, 106]
  },
  {
    name: "采样点数",
    type: "input",
    addr: 7,
    item: [2, 10]
  }
];

class Set extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "app/getSet"
    });
  }
  onChange = value => {
    this.props.dispatch({
      type: "app/setAddr",
      payload: {
        addr: value
      }
    });
    this.props.dispatch({
      type: "app/selectData"
    });
  };
  setDataChange = value => {
    this.props.dispatch({
      type: "app/setData",
      payload: {
        selectData: value
      }
    });
  };
  onClick = () => {
    this.props.dispatch({
      type: "app/setOpen"
    });
    // const { app } = this.props;
    // if(app.set){
    //   message.success('设置成功');
    // }else{
    //   message.error('设置失败');
    // }
  };
  async save() {
    const result = await api.save();
    const { status } = result;
    if (status === "ok") {
      message.success("保存成功");
    } else {
      message.error("保存失败");
    }
  }
  async cancel() {
    const result = await api.cancel();
    const { status } = result;
    if (status === "ok") {
      message.success("复位成功");
    } else {
      message.error("复位失败");
    }
  }
  async setBack() {
    const result = await api.setBack();
    const { status } = result;
    if (status === "ok") {
      message.success("恢复成功");
    } else {
      message.error("恢复失败");
    }
  }
  render() {
    const { app } = this.props;
    const { data, addr, selectData } = app;
    const value = data.length > 0 && selectData===-1? data[addr] : selectData;
    const inaddr = addr >= 2 ? addr - 1 : addr;
    const site = (
      <Select
        defaultValue={inaddr}
        onChange={this.onChange.bind(this)}
        style={{ width: 200 }}
      >
        {setlist.map((item, i) => {
          const index = i >= 2 ? i + 1 : i;
          return (
            <Option value={index} key={i}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
    return (
      <div style={{ margin: "40px", textAlign: "center" }}>
        <div className="item">
          <span>地址</span>
          {site}
        </div>
        <div className="item">
          <span>数据</span>
          {setlist[inaddr].type === "select" ? (
            <Select
              value={value}
              onChange={this.setDataChange.bind(this)}
              style={{ width: 200 }}
            >
              {setlist[inaddr].item.map((item, i) => {
                return (
                  <Option value={i} key={i}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          ) : (
            <InputNumber
              precision={0}
              min={setlist[inaddr].item[0]}
              max={setlist[inaddr].item[1]}
              defaultValue={value}
              onChange={this.setDataChange.bind(this)}
              style={{ width: 200 }}
            />
          )}
        </div>
        <div>
          <Button
            type="primary"
            style={{ width: 200, marginLeft: "36px" }}
            onClick={this.onClick}
          >
            设置
          </Button>
        </div>
        <div style={{ marginTop: "4px" }}>
          <Button
            type="primary"
            style={{ width: "95px", marginLeft: "37px" }}
            onClick={this.save}
          >
            保存
          </Button>
          <Button
            type="primary"
            style={{ width: "95px", marginLeft: "10px" }}
            onClick={this.cancel}
          >
            复位
          </Button>
        </div>
        <Button
          type="primary"
          style={{ width: "200px", marginLeft: "36px", marginTop: "5px" }}
          onClick={this.setBack}
        >
          恢复出厂设置
        </Button>
      </div>
    );
  }
}

export default connect(({ app }) => ({
  app
}))(Set);
