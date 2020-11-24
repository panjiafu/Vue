<template>
	<div class="app">
		<div class="tabs">
			<router-link class="footer-span" to="/">书城</router-link>
			<router-link class="footer-span" to="/classification">分类</router-link>
			<router-link class="footer-span" to="/bookshelf">书架</router-link>
			<router-link class="footer-span" to="/ranking">排行</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
	export default {

	}
</script>
<style lang="scss" scoped="scoped">
	.app {
		.tabs {
			display: flex;
			justify-content: space-around;
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			height: 55px;

			.footer-span {
				display: block;
				flex: 1;
				font-size: 10px;
				line-height: 55px;
				text-align: center;
				color: block;
				text-decoration: none;
			}
		}
	}
</style>
