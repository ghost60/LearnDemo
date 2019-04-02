import React, { Component } from "react";
import PCharts from "./components/PCharts";
import Set from "./components/Set";
import MList from "./components/MList";
import { connect } from "dva";
import "./App.css";

class App extends Component {
  state = {
    selecter: 0
  };
  componentDidMount() {
    // this.getData();
  }
  tabbar = e => {
    this.props.dispatch({
      type: "app/selecter",
      payload: {
        selecter: e
      }
    });
  };
  refresh = () => {
    this.getData();
  };
  getData = () => {
    this.props.dispatch({
      type: "app/getSyData"
    });
    this.props.dispatch({
      type: "app/getPyData"
    });
    this.props.dispatch({
      type: "app/getMList"
    });
  };
  render() {
    const { app } = this.props;
    const { selecter, PyData, SyData } = app;
    return (
      <div className="App">
        <header className="header">震动频谱</header>
        <div className="tabbar">
          <div
            className={selecter === 0 ? "selecter active" : "selecter"}
            onClick={() => {
              this.tabbar(0);
            }}
          >
            时域数据
          </div>
          <div
            className={selecter === 1 ? "selecter active" : "selecter"}
            onClick={() => {
              this.tabbar(1);
            }}
          >
            频域数据
          </div>
          <div
            className={selecter === 2 ? "selecter active" : "selecter"}
            onClick={() => {
              this.tabbar(2);
            }}
          >
           峰值序列
          </div>
          <div
            className={selecter === 3 ? "selecter active" : "selecter"}
            onClick={() => {
              this.tabbar(3);
            }}
          >
            设置
          </div>
        </div>
        <main style={{ marginTop: "6px" }}>
          {selecter === 3 && <Set />}
          {selecter === 2 && <MList />}
          {(selecter === 0 || selecter === 1) && (
            <div>
              <span className="refresh" onClick={this.refresh}>
                更新
              </span>
              <PCharts
                data={selecter === 0 ? SyData : PyData}
                type={selecter === 0 ? "line" : "interval"}
              />
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default connect(({ app }) => ({
  app
}))(App);
