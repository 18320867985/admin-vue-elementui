import axios from "../ins.js";

// 账户余额-详情
async function account_getAccountDetail (params)
{
	let res = await axios.get("/mhyAccout/accountDetail", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// 账户余额-条件分页查询
async function account_query (params)
{
	let res = await axios.post("/mhyAccout/query", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

// 账户余额-条件分页查询
async function account_accountDetail (params)
{
	let res = await axios.get("/mhyAccout/accountDetail", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

// 账户余额-保存调整余额
async function account_saveAccountBalance (params)
{
	let res = await axios.post("/accoutBalanceAdjust/saveAccountBalance", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

// 账户余额-审核余额账户列表
async function account_balanceAdjustQuery (params)
{
	let res = await axios.post("/accoutBalanceAdjust/query", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

// 审核余额调整-审核
async function account_balanceAdjustAudit (params)
{
	let res = await axios.get("/accoutBalanceAdjust/audit", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

// 审核余额调整-审核页面数据
async function account_balanceAdjustPrepareAudit (params)
{
	let res = await axios.get("/accoutBalanceAdjust/prepareAudit", params).catch(err =>
	{
		console.log(err);
	});
	return res && res.data;
}

export default {
	account_getAccountDetail,
	account_query,
	account_accountDetail,
	account_saveAccountBalance,
	account_balanceAdjustQuery,
	account_balanceAdjustAudit,
	account_balanceAdjustPrepareAudit
}