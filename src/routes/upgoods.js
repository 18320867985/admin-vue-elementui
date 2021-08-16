// upgoods
import upgoods from "../views/upgoods/upgoods.vue"
import upgoodsDtl from "../views/upgoods/upgoods-dtl.vue"
import upgoodRule  from "../views/upgoods/upgoods-rule.vue"

export default [{
		path: "",
		component: upgoods,
		meta:{ ttl:"提货报价表"},
		//	redirect: '/basic',
	},
	{
			path: "upgoodsDtl",
			component: upgoodsDtl,
			meta:{ ttl:"提货报价表-详情"},
			//	redirect: '/basic',
	},
	{
			path: "upgoodsRule",
			component: upgoodRule,
			meta:{ ttl:"提报规则"},
			// redirect: '/basic',
	}
	
];
