import axios from "../ins.js";

// 账户余额-详情
async function drawRecord_query (params)
{
	let res = await axios.post("/accountDrawRecord/query", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// 提现记录-操作
async function drawRecord_audit (params)
{
	let res = await axios.get("/accountDrawRecord/audit", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

export default {
	drawRecord_query,
	drawRecord_audit

}