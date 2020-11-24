<template>
	<div class="female-bang">
		<h3>最新上架·热门飙升<i>更多 ></i></h3>
		<li v-for="(item,index) in felist" :key="index" @click="gotodetail(index)">
			<img :src="imgUrl()+item.cover" />
			<p>{{item.author}}</p>
		</li>
	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default{
		props:{
			id:{
				String,
				Number
			}
		},
		data(){
			return{
				felist:{}
			}
		},
		created() {
			fetch(`/rank/${this.id}`).then(res => res.json())
				.then(data => {
					this.felist = data.ranking.books
				});
		},
		methods:{
			imgUrl() {
				return util.staticPath
			},
			gotodetail(index) {
				let ind=index
				let id= this.felist[ind]._id
				console.log(id);
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
	.female-bang {
		width: 90%;
		margin: 0 auto;
		margin-top: 30px;
		height: 310px;
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
	
		li {
			list-style: none;
			float: left;
			width: 84px;
			margin-bottom: 20px;
	
			img {
				width: 64px;
				height: 92px;
				padding: 3px 10px;
			}
	
			p {
				text-align: center;
				padding: 5px 5px;
				font-size: 13px;
			}
		}
	}
</style>
