import axios from "../ins.js";

// 充值记录-条件分页查询
 async function recharge_query(params){
	let res = await  axios.post("/mhyAccountRechargeRecord/query",params).catch(err=>{
		console.log(err)
	});
	return res&&res.data;
 }
 
 
 // 充值记录-操作
 async function recharge_audit(params){
 	let res = await  axios.get("/mhyAccountRechargeRecord/audit",params).catch(err=>{
 		console.log(err)
 	});
 	return res&&res.data;
 }
 

export default{
	recharge_query,
	recharge_audit
	
}