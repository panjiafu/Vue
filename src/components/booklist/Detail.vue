<template>
	<div class="detail">
		<div class="bgc">
			<div class="detail-back">
				<span @click="goback()">
					<van-icon name="arrow-left" />返回</span>
				<p @click="shelf()">书籍详情</p>
			</div>
			<div class="detail-comment">
				<div class="detail-left">
					<p>{{books.title}}</p>
					<p>{{books.author}}</p>
					<p>{{books.majorCate}}&nbsp;·&nbsp;{{books.minorCate}}</p>
					<van-button round type="info" class='btno'>加入收藏</van-button>
					<van-button round type="info" class='btnt' @click='readbook()'>免费阅读</van-button>
				</div>
				<div class="detail-right"><img :src='imgUrl()+books.cover' /></div>
			</div>
			<div class="detail-Intro">
				<p>{{books.title}}</p>
				<p>{{books.longIntro}}</p>
				<p @click="mark()">查看更多>></p>
				<van-overlay :show="show">
					<div class="wrapper">
						<div class="block">
							<p>{{books.title}}</p>
							<a>{{books.longIntro}}</a>
							<span @click="markspan()">x</span>
						</div>
					</div>
				</van-overlay>
			</div>
		</div>

	</div>
</template>

<script>
	import util from '../utils/util.js'
	export default {
		data() {
			return {
				show: false,
				books: {}
			}
		},
		created() {
			fetch(`http://novel.kele8.cn/book-info/${this.$route.params.id}`).then(res => res.json())
				.then(data => {
					this.books = data
				})
		},
		methods: {
			imgUrl() {
				return util.staticPath
			},
			goback() {
				this.$router.replace('/')
			},
			mark() {
				this.show = true
			},
			markspan() {
				this.show = false
			},
			btnmark() {
				this.show = true
			},
			readbook() {
				this.$router.push({
					name: 'Readbook',
					params: {
						id: this.$route.params.id
					}
				})
			},
			// shelf() {
			// 	let localcurrent = util.setLocalStroageData('this.bookChaptersContent') || {}
			// 	localcurrent[this.$route.params.id] = {
			// 		cover:this.books.cover,
			// 	}
			// 	this.$toast('加入成功！');
			// }
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.detail {
		.bgc {
			background-color: white;
			position: relative;
			z-index: 9;
			height: 667px;
			overflow: hidden;
		}

		.detail-back {
			width: 100%;
			height: 40px;
			background-color: pink;
			position: relative;

			P {
				position: absolute;
				top: 14px;
				right: 25px;
				font-size: 16px;
			}

			span {
				display: block;
				width: 50px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 15px;

			}
		}

		.detail-comment {
			// width: 90%;
			height: 180px;
			margin: 0 auto;
			background-color: white;
			border-bottom: 1px solid lightblue;

			.detail-left {
				width: 60%;
				height: 180px;
				float: left;

				p {
					margin-left: 15px;
				}

				p:nth-child(1) {
					margin-top: 30px;
					font-size: 18px;
				}

				p:nth-child(2) {
					margin-top: 10px;
					font-size: 12px;
				}

				p:nth-child(3) {
					margin-top: 10px;
					font-size: 12px;
				}

			}

			.detail-right {
				width: 40%;
				height: 180px;
				float: right;

				img {
					width: 100px;
					height: 140px;
					padding-top: 20px;
					padding-left: 28px;
				}
			}

		}

		.detail-Intro {
			// width: 90%;
			margin: 0 auto;
			background-color: white;
			text-indent: 20px;
			position: relative;
			min-height: 180px;

			p:nth-child(1) {
				font-size: 20px;
				padding-top: 20px;

			}

			p:nth-child(2) {
				width: 90%;
				margin: 0 auto;
				font-size: 15px;
				padding-top: 20px;
				margin-bottom: 20px;
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
			}

			p:nth-child(3) {
				text-align: center;
				font-size: 10px;
				color: #c3c3c3;
			}
		}

		.wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}

		.block {
			width: 300px;
			height: 400px;
			background-color: #fff;
			position: relative;

			span {
				display: block;
				font-size: 30px;
				width: 30px;
				height: 30px;
				opacity: 0.3;
				position: absolute;
				top: -5px;
				right: 8px;
			}

			a {
				display: block;
				width: 90%;
				margin: 0 auto;
				font-size: 15px;
				margin-top: 30px;
			}
		}

		.btno {
			padding: 0px 12px;
			margin: 10px 10px;
		}

		.btnt {
			padding: 0px 12px;
			margin: 10px 10px;
			background-color: coral;
			border: 0px;
		}
	}
</style>
