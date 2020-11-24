<template>
	<div class="recommend__p" ref='listScroll'>
		<div>
			<div class="recommend">
				<div class="recommend-top">
					<h3>排行榜<span>完整榜单></span></h3>
					<li v-for="(item,index) in recom.male" :key="index" v-show='index === 0'>
						<Recommenedtop :id='item._id'></Recommenedtop>
					</li>
				</div>
			</div>
			<!-- <div class="van-swipe-div">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<van-swipe-item>1</van-swipe-item>
					<van-swipe-item>2</van-swipe-item>
				</van-swipe>
			</div> -->
			<div class="list">
				<div class="list-li">
					<li  class="list-span" v-for="(item,index) in list" :key="index" @click="gotodetail(index)">
						<img :src="imgUrl()+item.cover" />
						<a>{{item.title}}</a>
						<i class="i-short">{{item.shortIntro}}</i>
						<i class="i-major">{{item.majorCate}}&nbsp;·&nbsp;{{item.minorCate}}.{{item.latelyFollower}}人在读</i>
					</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Recommenedtop from '../../components/recommend/Recommend_top.vue';
	import BScroll from 'better-scroll'
	import util from '../../components/utils/util.js'

	export default {
		data() {
			return {
				recom: {},
				list: {}
			}
		},
		created() {
			
			fetch('/rank-category').then(res => res.json())
				.then(data => {
					this.recom = data
				});
			fetch('/rank/54d42d92321052167dfb75e3').then(res => res.json())
				.then(data => {
					this.list = data.ranking.books
				});
		},
		updated() {
			this.scroll()
		},
		methods: {
			scroll() {
				this.$nextTick(() => {
					if (!this.ulscroll) {
						this.ulscroll = new BScroll(this.$refs.listScroll, {
							click: true,
						});
					} else {
						this.ulscroll.refresh()
					}
				})
			},
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind=index
				let id= this.list[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			}
		},
		components: {
			Recommenedtop
		}
	}
</script>

<style lang="scss" scoped>
	.recommend__p {
		max-height: 572px;
		overflow: hidden;

		.recommend {
			display: flex;
			padding-top: 30px;

			.recommend-top {
				flex: 0 0 90%;
				margin: 0 auto;
				height: 400px;
				overflow: hidden;

				h3 {
					font-size: 20px;
					background-color: white;
					padding: 5px 10px;

					span {
						display: block;
						font-size: 12px;
						color: gray;
						float: right;
						line-height: 25px;
					}
				}

				li {
					list-style: none;
				}
			}
		}

		.van-swipe-div {
			width: 90%;
			margin: 0 auto;

			.my-swipe .van-swipe-item {
				margin-top: 30px;
				color: #fff;
				font-size: 20px;
				line-height: 150px;
				text-align: center;
				background-color: #39a9ed;

				img {
					width: 100%;
					height: 180px;
				}
			}
		}

		.list {
			display: flex;
			list-style: none;
			padding-top: 20px;

			.list-li {
				flex: 0 0 90%;
				margin: 0 auto;
				background-color: white;

				.list-span {
					padding-top: 20px;
					padding-bottom: 20px;
					display: block;
					width: 100%;
					height: 102px;
					border-bottom: 1px solid lightgray;

					img {
						width: 64px;
						height: 92px;
						float: left;
					}

					a {
						display: block;
						width: 226px;
						height: 32px;
						line-height: 32px;
						float: left;
						padding-left: 10px;
					}

					.i-short {
						display: block;
						width: 220px;
						float: left;
						font-size: 12px;
						padding-left: 16px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						line-height: 16px;
					}

					.i-major {
						display: block;
						width: 223px;
						float: left;
						padding-left: 13px;
						font-size: 11px;
						margin-top: 10px;
						color: rgb(166, 166, 166);
					}
				}
			}
		}
	}
</style>
