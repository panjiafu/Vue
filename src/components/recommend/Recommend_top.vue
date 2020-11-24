<template>
	<div class="recommend_top">
		<li class="li" v-for="(i,index) in book" :key="index" @click="gotodetail(index)">
			<img :src="imgUrl()+i.cover" />
			<span><i>{{index+1}}</i><a>{{i.title}}</a></span>
			<p>{{(i.latelyFollower/ 100).toFixed(1)}}万热度</p>
		</li>
	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default {
		props: ['id'],
		data() {
			return {
				book: {},
			}
		},
		created() {
			fetch(`/rank/5a6844aafc84c2b8efaa6b6e`).then(res => res.json())
				.then(data => {
					this.book = data.ranking.books
				});
		},
		methods: {
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind = index
				let id=this.book[ind]._id
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.recommend_top {
		background-color: white;
		padding-top: 20px;
		height: 368px;

		li {
			list-style: none;
			display: inline-block;
			width: 50%;
			margin: 5px 0px;
			height: 73px;
			border-bottom: 1px solid lightgray;

			img {
				width: 20%;
				float: left;
			}

			span {
				display: block;
				width: 80%;
				float: right;
				margin-top: 10px;
			
				i {
					display: block;
					width: 10%;
					float: left;
					margin: 0px 5%;
				}
			
				a {
					display: block;
					width: 80%;
					float: left;
					font-size: 13px;
				}
			
			}
			p {
				font-size: 10px;
				width: 65%;
				float: right;
				padding-left: 10px;
				color: lightgray;
				margin-top: 5px;
			}
		}
	}
</style>
