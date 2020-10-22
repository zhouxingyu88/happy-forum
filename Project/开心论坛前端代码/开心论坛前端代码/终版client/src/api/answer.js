import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8443/answer'

//新增回答
export const addAnswer = params => {return axios.post(`${baseUrl}/add`,params); };
//修改回答
export const updateAnswer = params => {return axios.post(`${baseUrl}/update`,params); };
//删除回答
export const deleteAnswer = params => {return axios.post(`${baseUrl}/delete`,params); };
//查询回答的所有未屏蔽评论
export const queryComment = params => {return axios.post(`${baseUrl}/comment`,params); };