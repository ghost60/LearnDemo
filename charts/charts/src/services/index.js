import request from "../utils/request";

// const url = "http://localhost:3000"
const url = "http://192.168.0.190:80"

export function getSyData() {
    return request(`${url}/time?sample_cnts=256`)
}

export function getPyData(action) {
    return request(`${url}/fft?sample_cnts=${action.sample_cnts}`)
}

export function setOpen(action) {
    return request(`${url}/wr_reg?reg_addr=${action.addr}&reg_data=${action.reg_data}`);
}

export function getSet(action) {
    return request(`${url}/rd_reg?reg_addr=${action.getAddr}&reg_cnt=${action.getData}`); //0-8  n-1
}

export function save() {
    return request(`${url}/wr_reg?reg_addr=29&reg_data=1`);
}

export function cancel() {
    return request(`${url}/wr_reg?reg_addr=31&reg_data=9527`);
}

export function setBack() {
    return request(`${url}/wr_reg?reg_addr=30&reg_data=1`);
}

export function getMList() {
    return request(`${url}/fft_peak`);
}