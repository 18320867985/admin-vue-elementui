import axios from 'axios' //引入axios

let baseURL = '';

// 注意 开启跨域要于vue.config.js文件配置优先
//let baseURL = 'http://192.168.1.226:60002/'; 
//let baseURL = 'http://192.168.1.41:60002/';

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;

//添加请求的拦截器
axios.interceptors.request.use(function (config)
{
	//在发送请求之前做某事
	//console.log(config)
	return config;
}, function (error)
{
	//请求错误时做些事
	return Promise.reject(error);
});

//添加响应的拦截器
axios.interceptors.response.use(function (response)
{
	//对响应数据做些事
	// console.log("response",response)
	return response;
}, function (error)
{
	//请求错误时做些事
	return Promise.reject(error);
});

export default axios;
