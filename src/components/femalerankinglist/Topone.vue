<template>
	<div class="top">
		<li v-for="(item,index) in felist" :key="index" @click="gotodetail(index)">
			<img :src="imgUrl()+item.cover" />
			<span><i>{{index+1}}</i><a>{{item.title}}</a></span>
			<p>{{(item.latelyFollower/ 100).toFixed(1)}}万热度</p>
		</li>
	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default {
		props:{
			id:{
				String,
				Number
			}
		},
		data() {
			return {
				felist: {}
			}
		},
		created() {
			let ids=this.id
			fetch(`/rank/${ids}`).then(res => res.json())
				.then(data => {
					// console.log(data)
					this.felist=data.ranking.books
				});
		},
		methods: {
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind=index
				console.log(index);
				let id= this.felist[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped="scoped">
	.top {

		li {
			list-style: none;
			display: inline-block;
			width: 50%;
			margin: 5px 0px;
			height: 62px;

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
