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
