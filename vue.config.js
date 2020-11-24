module.exports = {
	configureWebpack: {
		devServer: {
			proxy:{
				//排名分类
				'/rank-category':{
					target: 'http://novel.kele8.cn',
					changeOrigin: true
				},
				//排名详情
				'/rank':{
					target: 'http://novel.kele8.cn',
					changeOrigin: true
				},
				//子分类的分类
				'/sub-categories':{
					target: 'http://novel.kele8.cn',
					changeOrigin: true
				},
				//父分类
				'/categories':{
					target: 'http://novel.kele8.cn',
					changeOrigin: true
				},
			},
		}
	},
}