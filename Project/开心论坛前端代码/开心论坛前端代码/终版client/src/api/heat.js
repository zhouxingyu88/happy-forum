import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8443/heat'

//查询用户之前是否浏览过该问题
export const queryHeat = params => {return axios.post(`${baseUrl}/query`,params); };
//修改问题热度
export const updateHeat = params => {return axios.post(`${baseUrl}/update`,params); };



