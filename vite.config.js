import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
			views: path.join(__dirname, 'src/views'),
			cps: path.join(__dirname, 'src/components'),
			api: path.join(__dirname, 'src/api'),
			utils: path.join(__dirname, 'src/utils'),
			styles: path.join(__dirname, 'src/styles'),
			assets: path.join(__dirname, 'src/assets'),
		},
	},
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: 'element-plus',
					esModule: true,
					ensureStyleFile: true,
					resolveStyle: name => {
						name = name.slice(3)
						return `element-plus/packages/theme-chalk/src/${name}.scss`
					},
					resolveComponent: name => {
						return `element-plus/lib/${name}`
					},
				},
			],
		}),
	],
})
