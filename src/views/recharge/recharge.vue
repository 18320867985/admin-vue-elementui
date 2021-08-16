<template>
	<div class="recharge">

		<ul class="account-bar">
			<!-- <li  :class="{'active':typeId==item.id}" @click="selectComponent(item.id)" v-for="item in compList"  :key="item.id">{{item.ttl}}</li>	 -->
			<li v-for="item in compList" :key="item.id" :class="{'active':selectComponent=='RechargeIitem'+item.id}" @click="selectComponentFn(item.id)">{{item.ttl}}</li>
			
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
	import RechargeIitem3 from "./recharge-item.vue"
	import RechargeIitem4 from "./recharge-item.vue"

	export default {
		data() {
			return {
				selectComponent: 'RechargeIitem3',
				typeId: 3,
				compList: [{
						ttl: "货主",
						id: 3

					}, {
						ttl: "承运商",
						id: 4

					}

				]
			}
		},
		methods: {
			selectComponentFn(id) {
				
				this.typeId=id;
				if (id ===3) {
					this.selectComponent= "RechargeIitem3"
				}
				if (id ===4) {
					this.selectComponent= "RechargeIitem4"
				}
			}
		},

		components: {
			RechargeIitem3,
			RechargeIitem4
			
		}
	}
</script>
<style scoped="scoped">

</style>
