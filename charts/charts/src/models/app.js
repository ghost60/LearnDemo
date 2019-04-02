import * as api from "../services/index";
import { message } from "antd";

export default {
  namespace: "app",
  state: {
    PyData: [],
    SyData: [],
    open: 1,
    selecter: 0,
    addr: 0,
    data: [],
    selectData: -1,
    getAddr: 0,
    getData: 8,
    mList: []
  },
  reducers: {
    selecter(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    selectData(state) {
      return {
        ...state,
        ...{
          selectData: -1
        }
      };
    },
    setAddr(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    setData(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    setAddrData(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    // setOpenSuccess(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload
    //   };
    // },
    getSyDataSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    getPyDataSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    getMListSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *setOpen({ payload }, { call, put, select }) {
      const { addr, selectData, data } = yield select(_ => _.app);
      const reg_data = selectData === -1 ? data[addr] : selectData;
      const result = yield call(api.setOpen, {
        addr,
        reg_data
      });
      if (result.status === "ok") {
        // yield put({
        //   type: "setOpenSuccess",
        //   payload: {
        //     set: true
        //   }
        // });
        message.success("设置成功");
      } else {
        // yield put({
        //   type: "setOpenSuccess",
        //   payload: {
        //     set: false
        //   }
        // });
        message.error("设置失败");
      }
    },
    *getSet({ payload }, { call, put, select }) {
      const { getAddr, getData } = yield select(_ => _.app);
      const result = yield call(api.getSet, {
        getAddr,
        getData
      });
      yield put({
        type: "setAddrData",
        payload: {
          data: result.reg_data
        }
      });
    },
    *getSyData({ payload }, { call, put }) {
      const data = yield call(api.getSyData, {});
      let { sample_cnts, sample_rate, sample_data } = data;
      let result = [];
      let x = sample_rate / 2 / (sample_cnts / 2);
      if (sample_data && sample_data.length > 0) {
        for (let i = 0; i < sample_data.length; i++) {
          result.push({
            x: x * (i + 1),
            y: sample_data[i]
          });
        }
        yield put({
          type: "getSyDataSuccess",
          payload: {
            SyData: result
          }
        });
      }
    },
    *getPyData({ payload }, { call, put, select }) {
      const getAddr = 7,
        getData = 1;
      const py = yield call(api.getSet, {
        getAddr,
        getData
      });
      const sample_cnts = Math.pow(2, py.reg_data[0]);
      const data = yield call(api.getPyData, {
        sample_cnts
      });
      let { fft_n, sample_rate, fft_data } = data;
      let result = [];
      let x = sample_rate / 2 / (fft_n / 2);
      if (fft_data && fft_data.length > 0) {
        for (let i = 0; i < fft_data.length; i++) {
          result.push({
            x: x * i,
            y: fft_data[i]
          });
        }
        yield put({
          type: "getPyDataSuccess",
          payload: {
            PyData: result
          }
        });
      }
    },
    *getMList({ payload }, { call, put }) {
      const data = yield call(api.getMList, {});
      const { status, ampl_arr, freq_arr } = data;
      if (status === "ok") {
        let result = [];
        for (let i = ampl_arr.length - 1; i >= 0; i--) {
          let obj = {
            index: i,
            pl: freq_arr[i],
            fd: ampl_arr[i]
          };
          result.push(obj);
        }
        yield put({
          type: "getMListSuccess",
          payload: {
            mList: result
          }
        });
      }
    }
  }
};
