<template>
	<div class="account">

		<ul class="account-bar">
			<!-- <li  :class="{'active':typeId==item.id}" @click="selectComponent(item.id)" v-for="item in compList"  :key="item.id">{{item.ttl}}</li>	 -->
			<li v-for="item in compList" :key="item.id" :class="{'active':selectComponent=='AccountItem'+item.id}" @click="selectComponentFn(item.id)">{{item.ttl}}</li>
			
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
	import AccountItem1 from "./account-item.vue"
	import AccountItem2 from "./account-item.vue"
	import AccountItem3 from "./account-item.vue"
	import AccountItem4 from "./account-item.vue"

	export default {
		data() {
			return {
				selectComponent: 'AccountItem1',
				typeId: 1,
				compList: [{
						ttl: "总平台",
						id: 1

					}, {
						ttl: "区域",
						id: 2

					}, {
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
				if (id ===1) {
					this.selectComponent= "AccountItem1"
				}
				if (id ===2) {
					this.selectComponent= "AccountItem2"
				}
				if (id === 3) {
					this.selectComponent="AccountItem3"
				}
				if (id === 4) {
					this.selectComponent= "AccountItem4"
				}

			}
		},

		components: {
			AccountItem1,
			AccountItem2,
			AccountItem3,
			AccountItem4
		}
	}
</script>

<style scoped="scoped">

</style>
