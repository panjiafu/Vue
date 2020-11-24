<template>
	<div class="search">
		<div class="search-top">
			<div class="goback" @click="goback"><van-icon name="arrow-left" /></div>
			<form action="/">
				<van-search class="search-input" v-model="value" show-action placeholder="请输入搜索关键词" @input='autoComplete'  />
			</form>

			<ul class="auto-complete-list" v-if="autoCompleteList.length && value">
				<li v-for="(item, index) in autoCompleteList" :key="index" >
					{{item}}
				</li>
			</ul>
			<ul class="search-result" v-if="searchResult.length">
				<Booklist v-for="book in searchResult" :book="book" :key="book._id"></Booklist>
			</ul>
		</div>
		<router-view />
	</div>
</template>

<script>
	import util from '../utils/util.js'
	import Booklist from '../booklist/Booklist.vue'
	export default {
		data() {
			return {
				value: '',
				searchHotWords: null,
				autoCompleteList: [],
				searchResult: [],
				searchHistory: []
			};
		},
		created() {},
		watch: {
			'value': function() {
				if (!this.value) {
					this.autoCompleteList = []
					this.searchResult = []
					this.searchHistory = util.getLocalStroageData('seachHistory') ? util.getLocalStroageData('searchHistory') : []
				}
			}
		},
		updated() {
			this.search()
		},
		methods: {
			goback() {
				this.$router.replace('/')
			},
			search() {
				this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
				fetch('http://novel.kele8.cn/search?keyword=' + this.value).then(res =>res.json())
					.then(data => {
						this.searchHotWords = data.books
						this.searchResult = data.books
						this.searchHotWords.length = 10
					});

			},
			//搜索自动补充
			autoComplete() {
				fetch('http://novel.kele8.cn/auto-complete?query=' + this.value).then(res => res.json())
					.then(data => {
						this.autoCompleteList = data.keywords
					})
			},
		},
		components: {
			Booklist
		}
	}
</script>

<style scoped lang="scss">
	.search {
		position: relative;

		.search-top {
			position: relative;
			display: flex;
			height: 40px;
			line-height: 40px;

			.goback {
				flex: 0 0 10%;
				font-size: 30px;
				padding: 10px 10px;
				text-align: center;

				.search-input:focus {
					outline: none;
				}
			}
		}

		.auto-complete-list {
			position: absolute;
			display: flex;
			flex-direction: column;
			margin-top: 40px;
			width: 100%;
			top: 40px;
			left: 0;
		}

		.auto-complete-list li {
			padding-left: 25px;
			line-height: 36px;
			border-bottom: 1px solid #f2f2f2;
		}

		.auto-complete-list li:active {
			background: #f2f2f2;
		}

		.search-result {
			position: absolute;
			top: 40px;
			flex-direction: column;
			margin-top: 40px;
			width: 100%;
			background: #f2f2f2;
		}
	}
</style>
