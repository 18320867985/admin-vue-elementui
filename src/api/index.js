
// 模块
import account  from "./account";
import recharge  from "./recharge";
import drawRecord  from "./drawRecord";
import upgoods  from "./upgoods";
import flowrecord  from "./flowrecord";

export default{
	...account,
	...recharge,
	...drawRecord,
	...upgoods,
	...flowrecord
}