import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8443/admin'

//登录
export const adminLogin = params => {return axios.post(`${baseUrl}/login`,params); };
//退出登录
export const adminLogout = params => {return axios.post(`${baseUrl}/exit`,params); };
//获取所有未通过注册的用户
export const getRegister = params => {return axios.post(`${baseUrl}/register`); };
//注册用户模糊查询
export const queryRegister = params => {return axios.post(`${baseUrl}/queryRegister`,params); };
//同意用户注册
export const userRegister = params => {return axios.post(`${baseUrl}/userRegister`,params); };
//拒绝用户注册
export const refuseRegister = params => {return axios.post(`${baseUrl}/refuseRegister`,params); };
//获取所有用户
export const getUser = params => {return axios.post(`${baseUrl}/user`); };
//用户模糊查询
export const queryUser = params => {return axios.post(`${baseUrl}/queryUser`,params); };
//拉黑用户
export const blackUser = params => {return axios.post(`${baseUrl}/userBlack`,params); };
//取消拉黑用户
export const whiteUser = params => {return axios.post(`${baseUrl}/userWhite`,params); };
//查看所有已拉黑用户
export const getBlackUser = params => {return axios.post(`${baseUrl}/blackUsers`,params); };
//查看所有未拉黑用户
export const getWhiteUser = params => {return axios.post(`${baseUrl}/whiteUsers`,params); };
//获取所有问题
export const getQuestion = params => {return axios.post(`${baseUrl}/question`); };
//问题模糊查询
export const queryQuestion = params => {return axios.post(`${baseUrl}/queryQuestion`,params); };
//屏蔽问题
export const blackQuestion = params => {return axios.post(`${baseUrl}/questionBlack`,params); };
//取消屏蔽问题
export const whiteQuestion = params => {return axios.post(`${baseUrl}/questionWhite`,params); };
//查看所有已屏蔽问题
export const getBlackQuestion = params => {return axios.post(`${baseUrl}/blackQuestions`,params); };
//查看所有未屏蔽问题
export const getWhiteQuestion = params => {return axios.post(`${baseUrl}/whiteQuestions`,params); };
//获取所有回答
export const getAnswer = params => {return axios.post(`${baseUrl}/answer`); };
//回答模糊查询
export const queryAnswer = params => {return axios.post(`${baseUrl}/queryAnswer`,params); };
//屏蔽回答
export const blackAnswer = params => {return axios.post(`${baseUrl}/answerBlack`,params); };
//取消屏蔽回答
export const whiteAnswer = params => {return axios.post(`${baseUrl}/answerWhite`,params); };
//查看所有已屏蔽回答
export const getBlackAnswer = params => {return axios.post(`${baseUrl}/blackAnswers`,params); };
//查看所有未屏蔽回答
export const getWhiteAnswer = params => {return axios.post(`${baseUrl}/whiteAnswers`,params); };