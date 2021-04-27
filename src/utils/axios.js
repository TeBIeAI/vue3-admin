import axios from 'axios'
import { BASE_URL, BASE_API } from '@/config'
import { getStorage } from 'utils'
console.log(BASE_URL)

axios.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded;charset=UTF-8'

const instance = axios.create({
	baseURL: BASE_URL + BASE_API,
	timeout: 1000,
})

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		const token = getStorage('hc-token')
		token && !Array.isArray(token) && (config.headers.authorization = token)
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// 对响应数据做点什么
		const { data, code } = response.data
		if (code !== 200) {
			return Promise.reject(data)
		} else {
			return data
		}
	},
	error => {
		// 对响应错误做点什么
		return Promise.reject(error)
	}
)

export default instance
