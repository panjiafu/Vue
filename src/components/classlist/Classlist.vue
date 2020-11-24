<template>
	<div class="Clist">
		<li v-for='(i,index) in name' :key="index" @click="zi(i.name)">
			<img :src="imgUrl()+i.bookCover[0]"/>
			<span>{{i.name}}</span>
		</li>
		
	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default {
		props: {
			name: {
				Object
			},
		},
		methods:{
			imgUrl() {
				return util.staticPath
			},
			zi(index){
				this.$router.push('/zi/'+index);
			}
		}
	
	}
</script>

<style lang="scss" scoped="scoped">
	.Clist{
		width: 100%;
		li{
			background-color: white;
			list-style: none;
			width: 47%;
			float: left;
			border-radius: 30px;
			position: relative;
			margin: 10px 0px;
			line-height: 30px;
			margin-right: 10px;
			img{
				border-radius: 50%;
				width: 30px;
				height: 30px;
				margin-left: 10px;
				margin-top: 5px;
			}
			span{
				position: absolute;
				right: 20px;
				padding-top: 5px;
			}
		}
	}
</style>
