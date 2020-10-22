import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8443/user'

//用户注册
export const register = params => {return axios.post(`${baseUrl}/register`,params); };
//发送验证码(注册时)
export const registerCode = params => {return axios.post(`${baseUrl}/registerCode`,params); };
//账号密码登录
export const accountLogin = params => {return axios.post(`${baseUrl}/loginPwd`,params); };
//发送验证码(登录时)
export const codeLogin = params => {return axios.post(`${baseUrl}/loginCode`,params); };
//根据电话号码查询用户
export const getUserInfo = params => {return axios.post(`${baseUrl}/query`,params); };
//根据用户名查询电话号码
export const getUserPhone = params => {return axios.post(`${baseUrl}/getPhoneByName`,params); };
//查询用户发布的所有问题
export const getUserQuestion = params => {return axios.post(`${baseUrl}/question`,params); };
//用户终结问题
export const endQuestion = params => {return axios.post(`${baseUrl}/questionEnd`,params); };
//查询用户发布的所有回答
export const getUserAnswer = params => {return axios.post(`${baseUrl}/answer`,params); };
//查询用户所有消息
export const getUserMessage = params => {return axios.post(`${baseUrl}/message`,params); };
//查询用户所有未读消息
export const getUnreadMessage = params => {return axios.post(`${baseUrl}/unRead`,params); };
//修改消息状态
export const changeMessageStatus = params => {return axios.post(`${baseUrl}/byRead`,params); };
//判断消息类型
export const getMessageType = params => {return axios.post(`${baseUrl}/messageType`,params); };
//读取消息内容问题
export const getMessageQ = params => {return axios.post(`${baseUrl}/messageQ`,params); };
//读取消息内容回答
export const getMessageA = params => {return axios.post(`${baseUrl}/messageA`,params); };
//读取消息内容评论
export const getMessageC = params => {return axios.post(`${baseUrl}/messageC`,params); };
//修改用户信息
export const updateUserInfo = params => {return axios.post(`${baseUrl}/update`,params); };
//获取用户头像
export const getUserIcon = params => {return axios.post(`${baseUrl}/getImageStr`,params); };
//用户上传头像
export const uploadUserIcon = params => {return axios.post(`${baseUrl}/uploadIcon`,params); };
//根据回答查询问题
export const getAnswerQ = params => {return axios.post(`${baseUrl}/answerQ`,params); };
//根据回答查询评论
export const getAnswerC = params => {return axios.post(`${baseUrl}/commentA`,params); };
//修改密码
export const changePwd = params => {return axios.post(`${baseUrl}/password`,params); };
//修改手机号码
export const changePhone = params => {return axios.post(`${baseUrl}/updatePhone`,params); }
//发送验证码(修改密码、手机号码时)
export const codeSender = params => {return axios.post(`${baseUrl}/sendCode`,params); };