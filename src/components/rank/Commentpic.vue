<template>
	<div class="comment">
		<div>
			<ul class="left">
				<li @click="xs()">人气榜</li>
				<li @click="xso()">热搜榜</li>
				<li @click="xst()">畅销榜</li>
				<li @click="xsf()">新书榜</li>
				<li @click="xsfive()">完结榜</li>
				<li>免费榜</li>
			</ul>
			<div class="listScroll">
				<div class="right" ref='rightScroll' v-show="show">
					<div class="list-li">
						<li @click="gotodetail(index)" v-for="(item,index) in lists" :key="index">
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
			<div class="listScroll" v-show="showt">
				<div class="right" ref='rightScroll'>
					<div class="list-li">
						<li @click="gotodetailt(index)" v-for="(item,index) in listso" :key="index">
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
			<div class="listScroll" v-show="shows">
				<div class="right" ref='rightScroll'>
					<div class="list-li">
						<li @click="gotodetailth(index)" v-for="(item,index) in listst" :key="index">
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
			<div class="listScroll" v-show="showf">
				<div class="right" ref='rightScroll'>
					<div class="list-li">
						<li @click="gotodetailf(index)" v-for="(item,index) in listsf" :key="index">
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
			<div class="listScroll" v-show="showfive">
				<div class="right" ref='rightScroll'>
					<div class="list-li">
						<li @click="gotodetailfive(index)" v-for="(item,index) in listsfive" :key="index">
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
		</div>
	</div>
</template>

<script>
	import util from '../utils/util.js'
	import BScroll from 'better-scroll'
	export default {
		props: {
			id: {
				Object
			}
		},
		data() {
			return {
				indexid: 0,
				lists: {},
				listso: {},
				listst: {},
				listsf: {},
				listsfive: {},
				show: true,
				shows: false,
				showt: false,
				showf: false,
				showfive: false
			}
		},
		created() {
			fetch(`/rank/5a322ef4fc84c2b8efaa8335`).then(res => res.json())
				.then(data => {
					this.lists = data.ranking.books
				});
			fetch(`/rank/5a68296bfc84c2b8ef9efdb0`).then(res => res.json())
				.then(data => {
					this.listso = data.ranking.books
				});
			fetch(`/rank/5a39ca20fc84c2b8ef82c9ed`).then(res => res.json())
				.then(data => {
					this.listst = data.ranking.books
				});
			fetch(`/rank/5a39ca3ffc84c2b8ef82da82`).then(res => res.json())
				.then(data => {
					this.listsf = data.ranking.books
				});
			fetch(`/rank/5a39ca59fc84c2b8ef82e96c`).then(res => res.json())
				.then(data => {
					this.listsfive = data.ranking.books
				});

		},

		methods: {
			scroll() {
				this.$nextTick(() => {
					if (!this.ulscroll) {
						this.ulscroll = new BScroll(this.$refs.rightScroll, {
							click: true,
						});
					} else {
						this.ulscroll.refresh()
					}
				})
			},
			updated() {
				this.scroll()
			},
			listid() {
				let rankid = []
				for (let ids in this.id) {
					rankid.push(this.id[ids]._id);
				}
				return rankid[0]
			},
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind = index
				let id = this.lists[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			gotodetailt(index) {
				let ind = index
				let id = this.listso[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			gotodetailth(index) {
				let ind = index
				let id = this.listst[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			gotodetailf(index) {
				let ind = index
				let id = this.listsf[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			gotodetailfive(index) {
				let ind = index
				let id = this.listsfive[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
			xs() {
				this.show = true
				this.shows = false
				this.showt=false
				this.showf=false
				this.showfive=false
			},
			xso() {
				this.show = false
				this.shows = true
				this.showt=false
				this.showf=false
				this.showfive=false
			},
			xst() {
				this.show = false
				this.shows = false
				this.showt=true
				this.showf=false
				this.showfive=false
			},
			xsf() {
				this.show = false
				this.shows = false
				this.showt=false
				this.showf=true
				this.showfive=false
			},
			xsfive() {
				this.show = false
				this.shows = false
				this.showt=false
				this.showf=false
				this.showfive=true
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.comment {
		height: 568px;
		position: relative;
		list-style: none;
		overflow: hidden;

		.left {
			width: 25%;
			height: 568px;
			line-height: 36px;
			text-align: center;
		}

		.listScroll {
			overflow: hidden;
			width: 75%;
			height: 568px;
			position: absolute;
			top: 0;
			right: 0;
		}

		.right {
			width: 100%;
			height: 100%;

			li {
				width: 115%;
				height: 100px;
				list-style: none;
				border-bottom: 1px solid lightgray;
				margin: 10px;

				img {
					width: 22%;
					height: 90px;
					float: left;
				}

				span {
					width: 77%;
					height: 90px;
					float: right;

					a {
						display: block;
						width: 78%;
						height: 32px;
						line-height: 32px;
						float: left;
						padding-left: 10px;
						overflow: hidden;
					}

					.i-short {
						display: block;
						width: 72%;
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
						width: 100%;
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
