import {
	Toast,
	Tabs,
	Tab,
	Swipe,
	SwipeItem,
	Search,
	Image ,
	Dialog,
	Icon,
	Overlay,
	Button,
	Popup,
	Progress
}
from 'vant'
const vants = [Button,Toast,Tabs, Tab, Swipe, SwipeItem,Search,Image ,Dialog,Icon,Overlay,Popup,Progress]

export default {
	/**
	 * Vue.use 方法会自动调用install函数
	 * Install Vant Component plugin
	 * @param Vue
	 */
	install(Vue) {
		vants.forEach(Component => {
			Vue.use(Component)
		})
	}
}
