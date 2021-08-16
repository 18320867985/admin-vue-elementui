<template>

	<ul class="account-bar">
		<router-link to="/account" tag="li">总平台</router-link>
		<router-link to="/account/accountOwner" tag="li">货主</router-link>
		<router-link to="/account/accountArea" tag="li">区域</router-link>
		<router-link to="/account/accountCarrier" tag="li">承运商</router-link>

	</ul>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style>

</style>
