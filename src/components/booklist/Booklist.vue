<template>
	<div class="booklist-li">
		<li @click="getBook">
			<img :src="imgUrl">
			<div class="book-info">
				<p class="book-title">{{book.title}}</p>
				<p class="book-author">{{book.author}} | {{book.cat}}</p>
				<p class="short-intro">{{book.shortIntro}}</p>
				<p class="reader-info">{{latelyFollower}}万人气 | {{book.retentionRatio}}%读者留存</p>
			</div>
		</li>
	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default {
		props: ['book'],
		computed: {
			latelyFollower() {
				return (this.book.latelyFollower / 10000).toFixed(1)
			},
			imgUrl() {
				return util.staticPath + this.book.cover
			}
		},
		created() {
			console.log(this.book);
		},
		methods: {
			getBook() {
				this.$router.push({
					name: 'Detail',
					params: {
						id: this.book._id
					}
				})
			}
		},
	}
</script>


<style scoped>
	.booklist-li {
		max-height: 560px;
		overflow: hidden;
	}

	img {
		width: 90px;
		height: 110px;
		float: left;
		margin-right: 10px;
	}

	li {
		width: 100%;
		height: 110px;
		margin-left: 16px;
		margin-right: 16px;
		border-bottom: 1px solid #e6dbdb;
		padding-bottom: 3px;
		padding-top: 3px;
	}
	li p:nth-child(3){
		width: 238px;
		overflow: hidden;
	}
	li:active,
	li:focus {
		background: #FFF0FF;
	}

	.book-info {
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		padding-left: 50px;
		padding-top: 3px;
		padding-bottom: 3px;
	}

	.book-title {
		font-weight: bold;
	}

	.short-intro {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #655555;
	}

	.book-author {
		color: #655555;
	}

	.book-info p {
		margin-top: 0;
		margin-bottom: 0;
		font-size: 11px;
		line-height: 20px;
	}
</style>
