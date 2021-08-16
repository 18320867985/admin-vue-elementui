import axios from 'axios'; // 引入axios
import qs from 'qs';

let axios_ins = axios.create();

// config
let baseURL = ''
// 注意 开启跨域要于vue.config.js文件配置优先 
//let baseURL = 'http://192.168.1.226:60002/'; 
//let baseURL = 'http://192.168.1.41:60002/';
let contentType = "application/x-www-form-urlencoded;charset=UTF-8";

axios_ins.defaults.baseURL = baseURL;
axios_ins.defaults.timeout = 10000;
axios.defaults.withCredentials = false;

axios_ins.defaults.headers.get[ 'Content-Type' ] = contentType;
axios_ins.defaults.headers.post[ 'Content-Type' ] = contentType;
axios_ins.defaults.headers.put[ 'Content-Type' ] = contentType;

//添加请求的拦截器
axios_ins.interceptors.request.use(function (config)
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
axios_ins.interceptors.response.use(function (response)
{
	//对响应数据做些事
	// console.log("response",response)
	return response;

}, function (error)
{
	//请求错误时做些事
	return Promise.reject(error);
});

let ins = {

	get (url, params, config)
	{
		return axios_ins.get(url, {params, ...config});
	},
	post (url, params, config)
	{
		return axios_ins.post(url, qs.stringify(params), config);
	},
	put (url, params, config)
	{
		return axios_ins.put(url, qs.stringify(params), config);
	},
	delete (url, params, config)
	{
		return axios_ins.delete(url, params, config);
	}

}

export default ins;
