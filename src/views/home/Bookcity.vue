<template>
	<div class="nav-ul">
		<div class="nav-link">
			<div class="nav-left">
				<router-link class="nav-item" to="/">推荐</router-link>
				<router-link class="nav-item" to="/male">男生</router-link>
				<router-link class="nav-item" to="/female">女生</router-link>
			</div>
			<div class="nav-right">
				<span class="seach" @click="searcher()"><img src="../../../public/fonts/images/iconseach.png" /></span>
			</div>
		</div>
		<router-view :femaleid='femalelist' :maleid='malelist' />
	</div>
</template>
<script>
	export default {
		data() {
			return {
				femalelist: [],
				malelist: []
			}
		},
		created() {
			fetch('/rank-category').then(res => res.json())
				.then(data => {
					for (let var1 in data.male) {
						let arr = data.male[var1]
						this.malelist.push(arr._id)
					}
				});
			fetch('/rank-category').then(res => res.json())
				.then(data => {
					for (let var1 in data.female) {
						let arr = data.female[var1]
						this.femalelist.push(arr._id)
					}
				});
		},
		methods: {
			searcher() {
				this.$router.replace('/search')
			}
		},

	}
</script>
<style lang="scss" scoped>
	.nav-ul {

		.nav-link {
			display: flex;
			justify-content: left;
			position: relative;

			.nav-left {
				overflow: hidden;
				height: 40px;
				flex: 0 0 80%;


				.nav-item {
					margin-left: 10px;
					margin-right: 5px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					text-decoration: none;
				}
			}

			.nav-right {
				flex: 0 0 20%;

				.seach {
					display: block;
					width: 50px;
					height: 30px;
					position: absolute;
					right: 0;
					margin-top: 5px;
					margin-right: 5px;

					img {
						width: 20px;
						height: 20px;
						margin-left: 15px;
						margin-top: 5px;
					}
				}
			}
		}

	}
</style>
