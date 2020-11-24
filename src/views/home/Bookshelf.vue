<template>
	<div class="shelflist">
		<h2>书城</h2>
		<li v-for="(item,index) in books" :key="index"  @click='readbook(index)'>
			<img :src="imgUrl()+item.cover" />
			<span>
				<a>{{item.title}}</a>
				<i class="i-short">{{item.author}}</i>
				<i class="i-major">{{item.majorCate}}&nbsp;·&nbsp;{{item.minorCate}}.{{item.latelyFollower}}人在读</i>
			</span>
		</li>
	</div>
</template>

<script>
	import util from '../../components/utils/util.js'
	export default {
		data() {
			return {
				books: [],
			}
		},
		created() {
			this.getBookId()
			this.getupdatebook()
		},
		methods: {
			readbook(index) {
				this.$router.push('/readbook/'+this.books[index]._id)
			},
			//返回追更的书本id
			getBookId() {
				let localShelf = util.getLocalStroageData('followBookList')
				let bookListArray = []
				for (let bookId in localShelf) {
					bookListArray.unshift(bookId)
				}
				return bookListArray
			},
			//获取书籍信息
			getupdatebook() {
				for(let i in this.getBookId() ){
					fetch('http://novel.kele8.cn/book-info/' + this.getBookId()[i]).then(res => res.json())
						.then(data => {
							this.books.push( data)
							let localShelf = util.getLocalStroageData('followBookList')
							for (let bookId in localShelf) {
								this.books.title = localShelf[bookId].title
							}
						})
				}
				
			},
			imgUrl() {
				return util.staticPath
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.shelflist {
		width: 100%;
		height: 612px;

		h2 {
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
			background-color: pink;
		}

		li {
			list-style: none;
			height: 130px;
			padding: 5px 0px 0px 0px;

			img {
				width: 25%;
				height: 125px;

				float: left;
			}

			span {
				display: block;
				width: 71%;
				height: 130px;
				float: right;
				line-height: 30px;

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
</style>
