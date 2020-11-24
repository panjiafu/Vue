<template>
	<div class="classification" ref="listScroll">
		<div>
			<div class="classification-top">
				<h2>分类</h2>
				<span class="seach" @click="searcher()"><img src="../../../public/fonts/images/iconseach.png" /></span>
			</div>
			<div class="images">
				<h3>猜你喜欢</h3>
				<div class="images-left">
					<van-image style="height:130px" width="10rem" height="10rem" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
				</div>
				<div class="images-right">
					<van-image style="height:130px" width="10rem" height="10rem" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
				</div>
			</div>
			<div class="classification-list">
				<div>
					<van-tabs>
						<van-tab title="推荐">
							<Clist :name="recom.picture"></Clist>
						</van-tab>
						<van-tab title="男生">
							<Classfmc :name="recom.male"></Classfmc>
						</van-tab>
						<van-tab title="女生">
							<Classfmc :name="recom.female"></Classfmc>
						</van-tab>
						<van-tab title="出版">
							<Classfmc :name="recom.press"></Classfmc>
						</van-tab>
					</van-tabs>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Clist from '../../components/classlist/Classlist.vue'
	import Classfmc from '../../components/classlist/Classfmc.vue'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				recom: {},
			}
		},
		created() {
			fetch('/categories').then(res => res.json())
				.then(data => {
					console.log(data);
					this.recom = data
				});
		},
		methods: {
			searcher() {
				this.$router.replace('/search')
			},
			scroll() {
				this.$nextTick(() => {
					if (!this.ulscroll) {
						this.ulscroll = new BScroll(this.$refs.listScroll, {
							click: true,
							scrollY: true,
						});
					} else {
						this.ulscroll.refresh()
					}
				})
			},
		},
		updated() {
			this.scroll()
		},
		components: {
			Clist,
			Classfmc
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.classification {
		width: 100%;
		height: 612px;
		overflow: hidden;
		background-color: #F2F2F2;

		.classification-top {
			height: 40px;
			width: 100%;
			background-color: white;

			h2 {
				float: left;
				height: 40px;
				line-height: 40px;
				font-size: 20px;
				padding-left: 10px;
			}

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

		.images {
			width: 90%;
			margin: 0 auto;
			margin-top: 20px;

			h3 {
				font-size: 20px;
			}

			.images-left {
				float: left;
				margin-right: 10px;

			}
		}

		.classification-list {
			width: 90%;
			margin: 0 auto;
			height: 400px;
		}
	}
</style>
