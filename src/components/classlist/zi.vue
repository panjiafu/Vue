<template>
	<div class="list-li">
		<div class="detail-back">
			<span >
				<van-icon name="arrow-left" />返回</span>
		</div>
		<div>
			<li class="list-span" v-for="(item,index) in book" :key="index" @click="gotodetailf(index)">
				<img :src="imgUrl()+item.cover" />
				<span>
					<a>{{item.title}}</a>
					<i class="i-short">{{item.shortIntro}}</i>
				<i class="i-major">{{item.majorCate}}&nbsp;·&nbsp;{{item.minorCate}}</i>
				</span>
			</li>
		</div>
	</div>
</template>

<script>
	import util from '../../components/utils/util.js'
	export default {
		props: {
			name: {
				Object,
			}
		},
		data() {
			return {
				book: {}
			}
		},
		created() {
			console.log(this.$route.params.name);
			fetch('http://novel.kele8.cn/category-info?major=' + this.$route.params.name).then(res => res.json())
				.then(data => {
					console.log(data);
					this.book = data.books
				})
		},
		methods: {
			imgUrl() {
				return util.staticPath
			},
			gotodetailf(index) {
				let ind = index
				let id = this.book[ind]._id
				console.log(id);
				this.$router.push({
					name: 'Detail',
					params: {
						id: id
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.list-li {
		width: 100%;
		height: 572px;
		overflow: hidden;
		list-style: none;
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
				margin-left: 20px;
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
</style>
