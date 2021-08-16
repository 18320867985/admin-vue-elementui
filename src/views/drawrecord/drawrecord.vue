<template>
	<div class="recharge">

		<ul class="account-bar">
			<!-- <li  :class="{'active':typeId==item.id}" @click="selectComponent(item.id)" v-for="item in compList"  :key="item.id">{{item.ttl}}</li>	 -->
			<li v-for="item in compList" :key="item.id" :class="{'active':selectComponent=='DrawrecordItem'+item.id}" @click="selectComponentFn(item.id)">{{item.ttl}}</li>
			
		</ul>

		<!-- <template>
			<div class="complist" v-for=" item in compList" :key="item.id"  :class="{'active':typeId==item.id}" >
				<account-item  :typeId="item.id"></account-item>
			</div>
		
		</template> -->
		<transition name="slide-fade2">
			<keep-alive>
				<component :is="selectComponent" :typeId="typeId"></component>
			</keep-alive>
		</transition>

	</div>
</template>

<script>
	import DrawrecordItem3 from "./drawrecord-item.vue"
	import DrawrecordItem4 from "./drawrecord-item.vue"
	import DrawrecordItem5 from "./drawrecord-item.vue"
	
	export default {
		data() {
			return {
				selectComponent: 'DrawrecordItem3',
				typeId: 3,
				compList: [{
						ttl: "货主提现",
						id: 3
					}, {
						ttl: "承运商提现",
						id: 4
					},
					{
						ttl: "活动佣金提现",
						id: 5
					}

				]
			}
		},
		methods: {
			selectComponentFn(id) {
				
				this.typeId=id;
				if (id ===3) {
					this.selectComponent= "DrawrecordItem3";
				}
				if (id ===4) {
					this.selectComponent= "DrawrecordItem4";
				}
				if (id ===5) {
					this.selectComponent= "DrawrecordItem5";
				}
			}
		},

		components: {
			DrawrecordItem3,
			DrawrecordItem4,
			DrawrecordItem5
			
		}
	}
</script>
<style scoped="scoped">

</style>
