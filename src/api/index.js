import request from 'utils/axios'

export const login = params => {
	return request({
		url: 'user/login',
		method: 'post',
		data: params,
	})
}

export function user_info() {
	return request({
		url: 'user/userinfo',
		method: 'get',
	})
}
