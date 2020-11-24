<template>
	<div class="readbook">
		<div class="top" v-show="top">
			<span @click="goback()">
				<van-icon name="arrow-left" />返回</span>
			<p @click="addshujia()">加入书架</p>
		</div>
		<div class="mulu" v-show="chapterlist" >
			<div class="mulu-div" ref="chapterlistscroll">
				<ul class="mulu-ul">
					<li v-for="(item,index) in this.bookChapter.chapters" :key="index" >{{item.title}}</li>
				</ul>
			</div>
		</div>
		<div class="wapper" ref='wapper'>
			<div class="readbook-comment" :style="{background:Background,color:Color}">
				<v-touch class="vtouch">
					<h3 :style="{fontSize:FontSize*1.3+'px'}">{{bookChaptersContent.title}}</h3>
					<article v-html="bookChaptersBody" :style="{fontSize:FontSize+'px',lineHeight:lineheight+'px'}"></article>
				</v-touch>
			</div>
		</div>
		<div class="centerhidden" @click="popup"></div>
		<van-popup :overlay="false" v-model="show" position="bottom" :style="{ height: '30%' }">
			<div class="chapter">
				<span class="prev" @click="prev">上一章</span>
				<span class="next" @click="next">下一章</span>
			</div>
			<div class="readSet-item pattern">
				<span v-for="(item,index) in pattern" :class="{active:patternindex===index}" @click.stop="setPattern(item,index)"
				:key="index">{{item.item}}</span>
			</div>
			<div class="font">
				<span>字体</span>
				<span @click.stop="fontred()">-</span>
				<span @click.stop="fontadd()">+</span>
			</div>
			<li class="centerhidden-li"><span @click="mulushow()">目录</span></li>
		</van-popup>

		<div class="btn">
			<button @click="prev">上一章</button>
			<button @click="next">下一章</button>
		</div>

	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import util from '../utils/util.js'
	export default {
		data() {
			return {
				bookChapter: {},
				bookChaptersContent: '',
				currentChapter: 0,
				show: false,
				left: false,
				nightmode: false,
				pattern: [{
					item: '默认',
					color: '',
					background: ''
				}, {
					item: '夜间',
					color: '#666',
					background: '#000'
				}, {
					item: '护眼',
					color: '#5c5d58',
					background: '#c8e8c8'
				}],
				patternindex: 0,
				Color: null,
				Background: null,
				FontSize: 15,
				lineheight: 20,
				top: false,
				chapterlist: false,
				chapterDescSort:false
			}
		},
		computed: {
			bookChaptersBody() {
				let content = this.bookChaptersContent && this.bookChaptersContent.cpContent ? 'cpContent' : 'body'
				return this.bookChaptersContent && this.bookChaptersContent[content].replace(/\n/g,
					'<br/>&nbsp&nbsp&nbsp&nbsp&nbsp')
			}
		},
		created() {
			let readRecord = util.getLocalStroageData('followBookList')
			//获取源id
			fetch(`http://novel.kele8.cn/book-sources?view=summary&book=${this.$route.params.id}`).then(res => res.json())
				.then(data => {
					//获取章节
					fetch('http://novel.kele8.cn/book-chapters/' + data[0]._id).then(res => res.json())
						.then(data => {
							this.bookChapter = data
							this.currentChapter = readRecord && readRecord[this.$route.params.id] && readRecord[this.$route.params.id].chapter ?
								readRecord[this.$route.params.id].chapter : 0
							// this.records()
							let arr = []
							arr.unshift(readRecord)
							this.getBookChapterContent()
						})
				})
		},
		methods: {
			//获取章节内容
			getBookChapterContent() {
				let lastChapter = this.currentChapter >= this.bookChapter.chapters.length - 1 ? this.bookChapter.chapters.length -
					1 : this.currentChapter
				//对章节link编码
				let link = encodeURIComponent(this.bookChapter.chapters[lastChapter].link)
				fetch('http://novel.kele8.cn/chapters/' + link).then(res => res.json())
					.then(data => {
						this.bookChaptersContent = data.chapter
						this.cpContent = data.chapter.cpContent
					})
			},
			//获取上一章
			getPrevChapter() {
				let lastChapter = this.currentChapter >= this.bookChapter.chapters.length - 1 ? this.bookChapter.chapters.length -
					1 : this.currentChapter
				//对章节link编码
				let link = encodeURIComponent(this.bookChapter.chapters[lastChapter - 1].link)
				fetch('http://novel.kele8.cn/chapters/' + link).then(res => res.json())
					.then(data => {
						this.bookChaptersContent = data.chapter
						this.cpContent = data.chapter.cpContent
					})
			},
			//获取下一章
			getNextChapter() {
				let lastChapter = this.currentChapter >= this.bookChapter.chapters.length - 1 ? this.bookChapter.chapters.length -
					1 : this.currentChapter
				//对章节link编码
				let link = encodeURIComponent(this.bookChapter.chapters[lastChapter + 1].link)
				fetch('http://novel.kele8.cn/chapters/' + link).then(res => res.json())
					.then(data => {
						this.bookChaptersContent = data.chapter

						this.cpContent = data.chapter.cpContent
					})
			},
			prev() {
				if (this.currentChapter === 0) {
					this.$toast.loading('已经是第一章了！');
					return
				}
				this.getPrevChapter();
				this.currentChapter -= 1
				this.record()
			},
			next() {
				if (this.currentChapter === this.bookChapter.chapters.length) {
					this.$toast.loading('已经最后第一章了！');
					return
				}
				this.getNextChapter();
				this.currentChapter += 1
				this.record()
			},
			scroll() {
				this.$nextTick(() => {
					if (!this.ulscroll) {
						this.ulscroll = new BScroll(this.$refs.wapper, {
							click: true,
						});
					} else {
						this.ulscroll.refresh()
					}
				})
			},
			chapterlists() {
				this.$nextTick(() => {
					if (!this.listscroll) {
						this.listscroll = new BScroll(this.$refs.chapterlistscroll, {
							click: true,
						});
					} else {
						this.listscroll.refresh()
					}
				})
			},
			//加入书架记录
			record() {
				let localcurrent = util.getLocalStroageData('followBookList') || {}
				localcurrent[this.$route.params.id] = {
					id: this.bookChaptersContent.id,
					title: this.bookChaptersContent.title,
					chapter: this.currentChapter,
				}
				util.setLocalStroageData('followBookList', localcurrent)
			},
			popup() {
				if (this.show || this.chapterlist) {
					this.show = false
					this.top = false
					this.chapterlist = false
				} else {
					this.show = true
					this.top = true
				}
			},
			mulushow() {
				this.chapterlist = true
			},
			setPattern(item, index) {
				this.patternindex = index;
				this.Color = item.color;
				this.Background = item.background;
			},
			//字体
			fontadd() {
				if (this.FontSize < 25) {
					this.FontSize++
					this.lineheight++
					return this.FonrSize = 25
				} else {
					return
				}
			},
			fontred() {
				if (this.FontSize < 15) {
					return this.FonrSize = 15
				} else {
					this.FontSize--
					this.lineheight--
				}
			},
			addshujia() {
				this.$dialog.confirm({
						message: '是否将小说加入书架？',
					})
					.then(() => {
						this.record()
						this.$toast('添加成功')
					})
					.catch((err) => {
						console.log(err);
					});
			},
			goback() {
				this.$router.replace('/')
			},
		},
		updated() {
			this.scroll()
			this.chapterlists()
		},

	}
</script>

<style lang="scss" scoped="scoped">
	.readbook {
		width: 100%;
		height: 667px;
		position: relative;
		list-style: none;

		.mulu {
			width: 70%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 99999;
			overflow: hidden;
			// height: 612px;
		
			.mulu-div{
				background-color: white;
				width: 100%;
			}
			.mulu-ul{
				min-height: 100%;
				
				li{
					padding-left: 10px;
					height: 50px;
					line-height: 50px;
				}
			}
		}

		.top {
			width: 100%;
			height: 40px;
			background-color: pink;
			position: absolute;
			top: 0;

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

		.wapper {
			overflow: hidden;
			height: 612px;
		}

		.readbook-comment {
			width: 100%;
			z-index: 9;

			h3 {
				padding: 10px 0px 0px 10px;
			}

			article {
				padding: 0 5px;
			}
		}

		.vtouch {
			min-height: 100%;
		}

		.btn {
			width: 100%;
			height: 55px;
			display: flex;

			button {
				flex: 50%;
			}
		}

		.chapter {
			width: 100%;
			height: 40px;

			.progress {
				display: block;
				float: left;
				width: 60%;
				margin-top: 17px;
			}

			.prev {
				display: block;
				float: left;
				width: 20%;
				height: 40px;
				line-height: 40px;
				text-align: center;

			}

			.next {
				display: block;
				float: right;
				width: 20%;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}

		.centerhidden {
			width: 80%;
			height: 200px;
			position: absolute;
			top: 20%;
			left: 10%;

		}

		.centerhidden-li {
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: red;
			position: relative;
			position: absolute;
			bottom: 0;

			span {
				display: inline-block;
				width: 33.3%;
				height: 50px;
				line-height: 50px;
				text-align: center;
			}
		}

		.pattern {
			height: 40px;
			margin: 10px 0px;

			span {
				display: inline-block;
				width: 20%;
				height: 40px;
				line-height: 40px;
				text-align: center;

			}
		}

		.font {
			height: 40px;
			margin: 10px 0px;

			span {
				display: inline-block;
				width: 20%;
				height: 40px;
				line-height: 40px;
				text-align: center;

			}
		}
	}
</style>
