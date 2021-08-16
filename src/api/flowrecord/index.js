import axios from "../ins.js";

// 充值记录-条件分页查询
 async function flowrecord_query(params){
	let res = await  axios.post("/accountFlowRecord/query",params).catch(err=>{
		console.log(err)
	});
	return res&&res.data;
 }
 

export default{
	flowrecord_query,
	
}