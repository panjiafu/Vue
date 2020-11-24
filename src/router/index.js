import Vue from 'vue'
import VueRouter from 'vue-router'
import Bookcity from '../views/home/Bookcity.vue'
import Classification from '../views/home/Classification.vue'
import Bookshelf from '../views/home/Bookshelf.vue'
import Ranking from '../views/home/ranking.vue'
import Recommened from '../views/book/Recommend.vue'
import Female from '../views/book/Female.vue'
import Male from '../views/book/Male.vue'
import Search from '../components/recommend/seachpage.vue'
import Detail from '../components/booklist/Detail.vue'
import Readbook from '../components/readbook/Readbook.vue'
import Zi from '../components/classlist/zi.vue'

Vue.use(VueRouter)

const routes = [
		
	{
		path: '/zi/:name',
		name: 'Zi',
		component: Zi
	},
	{
		path: '/ranking',
		name: 'Ranking',
		component: Ranking
	},
	{
		path: '/readbook/:id',
		name: 'Readbook',
		props: true,
		component: Readbook
	},
	{
		path: '/detail/:id',
		name: 'Detail',
		props: true,
		component: Detail
	},
	{
		path: '/search',
		name: 'Search',
		component: Search
	},
	{
		path: '/bookshelf',
		name: 'Bookshelf',
		props: true,
		component: Bookshelf
	},
	{
		path: '/classification',
		name: 'Classification',
		component: Classification
	},
	{
	path: '/',
	component: Bookcity,
	children: [{
			path: '/',
			component: Recommened
		},
		{
			path: '/female',
			component: Female
		},
		{
			path: '/male',
			component: Male
		},
	]
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
