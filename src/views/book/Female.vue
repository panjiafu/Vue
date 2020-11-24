<template>
	<div class="female" ref='listScroll'>
		<div>
			<div class="female-comment">
				<h2>排行榜<i>完整榜单></i></h2>
				<van-tabs>
					<van-tab title="热搜榜">
						<Topone :id='receiveid[0]'></Topone>
					</van-tab>
					<van-tab title="畅销榜">
						<Topone :id='receiveid[1]'></Topone>
					</van-tab>
					<van-tab title="好评榜">
						<Topone :id='receiveid[2]'></Topone>
					</van-tab>
					<van-tab title="潜力榜">
						<Topone :id='receiveid[3]'></Topone>
					</van-tab>
				</van-tabs>
			</div>
			<div class="female-list">
				<h3>热门标签<i @click="goclass()">更多 ></i></h3>
				<div ref='wapper'>
					<div class="female-list-span">
						<ul>
							<span v-for="(item,index) of felist" :key="index">{{item}}</span>
						</ul>
					</div>
				</div>
			</div>
			<Femalecomment :id='receiveid[5]'></Femalecomment>
			<Femalezuixing :id='receiveid[6]'></Femalezuixing>
			<Femalejd :id='receiveid[8]'></Femalejd>
			<div class="list-li">
				<li @click="gotodetail(index)" class="list-span" v-for="(item,index) in lists" :key="index">
					<img :src="imgUrl()+item.cover" />
					<span>
						<a>{{item.title}}</a>
						<i class="i-short">{{item.shortIntro}}</i>
						<i class="i-major">{{item.majorCate}}&nbsp;·&nbsp;{{item.minorCate}}.{{item.latelyFollower}}人在读</i>
					</span>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	import Topone from '../../components/femalerankinglist/Topone.vue'
	import Femalecomment from '../../components/femalerankinglist/Femalecomment.vue'
	import Femalezuixing from '../../components/femalerankinglist/Femalezuixing.vue'
	import Femalejd from '../../components/femalerankinglist/Femalejd.vue'
	import BScroll from 'better-scroll'
	import util from '../../components/utils/util.js'
	export default {
		props: {
			femaleid: {
				Object,
				Array,
			}
		},
		data() {
			return {
				felist: [],
				lists: {},
				receiveid:[]
			}
		},
		created() {
			this.receiveid=this.femaleid
			fetch('/sub-categories').then(res => res.json())
				.then(data => {
					for (let var1 in data.female) {
						let arr = data.female[var1].mins
						for (let i = 0; i < arr.length; i++) {
							this.felist.push(arr[i])

						}
					}
				});
			fetch(`/rank/${this.femaleid[9]}`).then(res => res.json())
				.then(data => {
					this.lists = data.ranking.books
				});
		},
		updated() {
			this.scroll(),
				this.wapper()
		},
		methods: {
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
			wapper() {
				this.$nextTick(() => {
					if (!this.wapperscroll) {
						this.wapperscroll = new BScroll(this.$refs.wapper, {
							click: true,
							scrollX: true,
							scrollY: false,
							eventPassthrough: 'vertical'
						});
					} else {
						this.wapperscroll.refresh()
					}
				})
			},
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind=index
				let id= this.lists[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			goclass(){
				this.$router.push('/classification');
				
			}
		},
		components: {
			Topone,
			Femalecomment,
			Femalezuixing,
			Femalejd
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.female {
		width: 100%;
		height: 572px;
		overflow: hidden;

		h3 {
			font-size: 20px;
			padding: 5px 10px;
			height: 30px;
			line-height: 30px;

			i {
				float: right;
				font-size: 10px;
				color: gray;
			}
		}

		.female-comment {
			width: 90%;
			margin: 0 auto;
			height: 400px;
			overflow: hidden;

			h2 {
				margin-top: 30px;
				font-size: 20px;
				padding: 5px 10px;

				i {
					display: block;
					font-size: 10px;
					color: gray;
					float: right;
					line-height: 25px;
				}
			}
		}

		.female-list {
			width: 90%;
			margin: 0 auto;
			height: 142px;
			margin-top: 30px;
			overflow: hidden;

			.female-list-span {
				width: 1260px;
				height: 70px;

				span {
					display: inline-block;
					width: 65px;
					padding: 10px 10px;
					background-color: pink;
					border-radius: 20px;
					margin: 10px 10px;
					text-align: center;
				}
			}
		}

		.list-li {
			width: 90%;
			margin: 0 auto;
			list-style: none;

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

				span {
					display: block;
					width: 238px;
					height: 102px;
					float: right;
					padding-right: 35px;

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
