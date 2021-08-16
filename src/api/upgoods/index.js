import axios from "../ins.js";

// 获取提货报价汇总信息
 async function upgoods_query(params){
	let res = await  axios.get("/pickup/getPickupPriceList",params).catch(err=>{
		console.log(err)
	});
	return res&&res.data;
 }
 
 
 // 获取提货报价明细
 async function upgoods_dtl(params){
 	let res = await  axios.get("/pickup/getPickupPriceDetail",params).catch(err=>{
 		console.log(err)
 	});
 	return res&&res.data;
 }
 
 
 // 获取提货规则列表
 async function upgoods_rule(params){
 	let res = await  axios.get("/pickup/getPickupRuleList",params).catch(err=>{
 		console.log(err)
 	});
 	return res&&res.data;
 }

export default{
	upgoods_query,
	upgoods_dtl,
	upgoods_rule
	
}