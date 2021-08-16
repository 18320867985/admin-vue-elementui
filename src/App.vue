<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data: function() {
			return {
				ttl: "vue dev "

			}
		}
	}
</script>