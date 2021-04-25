// 数组每一项添加索引字段
export const increaseIndexes = val => {
	return Object.keys(val)
		.map(v => {
			return {
				// @ts-ignore
				...val[v],
				key: v,
			}
		})
		.filter(v => v.meta)
}

export const setStorage = (name, data) => {
	localStorage.setItem(name, JSON.stringify(data))
}

export const getStorage = name => {
	const data = localStorage.getItem(name)
	return JSON.parse(data)
}

export const removeStorage = name => {
	localStorage.removeItem(name)
}
