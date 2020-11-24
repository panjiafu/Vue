<template>
	<div>
		<van-tabs v-model="active">
			<van-tab v-for="(i,index) in rank" :title="i" :key='index' >
				<Comment :id='datas.male' v-show="index===0"></Comment>
				<CommentFemale :id='datas.female' v-show="index===1"></CommentFemale>
				<CommentPic :id='datas.picture' v-show="index===2"></CommentPic>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import Comment from '../../components/rank/Comment.vue'
	import CommentFemale from '../../components/rank/Commentfemale.vue'
	import CommentPic from '../../components/rank/Commentpic.vue'
	export default {
		data() {
			return {
				datas: {},
				rank:['男生','女生','出版'],
				active:0
			}
		},
		created() {
			fetch('http://novel.kele8.cn/rank-category').then(res => res.json())
				.then(data => {
					this.datas = data
				});
		},
		components:{
			Comment,
			CommentFemale,
			CommentPic 
		}
	}
</script>

<style>
</style>
