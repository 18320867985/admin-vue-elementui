
//  account
import  account from "../views/account/account.vue"
import  accountAdjust from "../views/account/account-adjust.vue"

export default [{
		path: "",
		component: account,
		meta:{ ttl:"余额列表"},

	},
	
	{
			path: "accountAdjust",
			component: accountAdjust,
			meta:{ ttl:"审核余额调整"},
			//hidden:true
	}
];
