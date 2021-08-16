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
	import AccountItem0 from "./account-adjust-item.vue"
	import AccountItem1 from "./account-adjust-item.vue"

	export default {
		data() {
			return {
				selectComponent: 'AccountItem0',
				typeId: 0,
				compList: [{
						ttl: "待审核",
						id: 0

					}, {
						ttl: "已审核",
						id: 1

					}

				]
			}
		},
		methods: {
			selectComponentFn(id) {
				
				this.typeId=id;
				if (id ===0) {
					this.selectComponent= "AccountItem0"
				}
				if (id ===1) {
					this.selectComponent= "AccountItem1"
				}
				
			}
		},

		components: {
			AccountItem0,
			AccountItem1
		}
	}
</script>
<style scoped="scoped">

</style>
