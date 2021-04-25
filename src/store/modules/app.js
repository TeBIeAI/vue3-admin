const app = {
	state: {
		sidebar: {
			collapse: false,
		},
	},

	mutations: {
		SET_SIDEBAR: state => {
			state.sidebar.collapse = !state.sidebar.collapse
		},
	},

	getters: {
		sidebar: state => state.sidebar,
	},
}

export default app
