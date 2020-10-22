import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8443/question'

//查询主页所有问题
export const getAllQuestion = params => {return axios.post(`${baseUrl}/all`,params); };
//查询问题内容
export const getQuestion = params => {return axios.post(`${baseUrl}/query`,params); };
//查询问题的所有未屏蔽回答
export const getAnswer = params => {return axios.post(`${baseUrl}/answer`,params); };
//新增问题
export const addQuestion = params => {return axios.post(`${baseUrl}/add`,params); };
//问题热度排序
export const getHeat = params => {return axios.post(`${baseUrl}/heat`,params); };
//问题关键词搜索
export const queryQuestion = params => {return axios.post(`${baseUrl}/search`,params); };
