import { login, user_info } from 'api'
import { setStorage } from 'utils'
import router from '@/router'

const user = {
	state: {
		userInfo: {},
	},

	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
	},

	getters: {
		userInfo: state => state.userInfo,
	},
	actions: {
		async login({ commit }, payload) {
			try {
				const data = await login(payload)
				const { token } = data
				setStorage('hc-token', token)
				const _userinfo = await user_info({ token })
				commit('SET_USERINFO', _userinfo)
				router.push({ name: 'index' })
			} catch (error) {
				console.log(error)
			}
		},
	},
}

export default user
