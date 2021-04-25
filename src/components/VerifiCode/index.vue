<template>
	<div class="s-canvas">
		<canvas
			id="s-canvas"
			:width="contentWidth"
			:height="contentHeight"
		></canvas>
	</div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	name: 'SIdentify',
	emits: ['changeCode'],
	setup(props, { emit }) {
		const state = reactive({
			identifyCode: '',
			fontSizeMin: 25,
			fontSizeMax: 30,
			backgroundColorMin: 255,
			backgroundColorMax: 255,
			colorMin: 0,
			colorMax: 160,
			lineColorMin: 100,
			lineColorMax: 255,
			dotColorMin: 0,
			dotColorMax: 255,
			contentWidth: 112,
			contentHeight: 34,
		})

		// 生成一个随机数
		const randomNum = (min, max) => {
			return Math.floor(Math.random() * (max - min) + min)
		}

		// 生成一个随机的颜色
		const randomColor = (min, max) => {
			let r = randomNum(min, max)
			let g = randomNum(min, max)
			let b = randomNum(min, max)
			return 'rgb(' + r + ',' + g + ',' + b + ')'
		}

		const eventHandl = () => {
			initCode()
			emit('changeCode', state.identifyCode)
		}

		const drawPic = () => {
			let canvas = document.getElementById('s-canvas')
			let ctx = canvas.getContext('2d')
			canvas.addEventListener('click', eventHandl, false)
			// ctx.textBaseline = 'bottom'
			// 绘制背景
			ctx.fillStyle = randomColor(
				state.backgroundColorMin,
				state.backgroundColorMax
			) //图形填充颜色设置
			ctx.strokeStyle = randomColor(
				state.backgroundColorMin,
				state.backgroundColorMax
			) //图形轮廓的颜色设置
			ctx.fillRect(0, 0, state.contentWidth, state.contentHeight) //绘制一个填充的矩形 0 0 width height x起点 y起点  宽 高
			ctx.strokeRect(0, 0, state.contentWidth, state.contentHeight) // 绘制一个矩形边框 0 0 width height x起点 y起点  宽 高
			// ctx.clearRect(50,0,this.contentWidth,this.contentHeight)  //清除指定矩形区域，清除部分完全透明
			// 绘制文字
			for (let i = 0; i < state.identifyCode.length; i++) {
				drawText(ctx, state.identifyCode[i], i)
			}
			drawLine(ctx)
			drawDot(ctx)
		}

		const drawText = (ctx, txt, i) => {
			ctx.fillStyle = randomColor(state.colorMin, state.colorMax)
			ctx.font = randomNum(state.fontSizeMin, state.fontSizeMax) + 'px SimHei' //字体大小
			ctx.textBaseline = 'alphabetic' //基线对齐
			let x = (i + 1) * (state.contentWidth / (state.identifyCode.length + 1))
			let y = randomNum(state.fontSizeMax, state.contentHeight - 5)
			var deg = randomNum(-45, 45)
			// 修改坐标原点和旋转角度
			ctx.translate(x, y) //移动不同位置  参数偏移量
			ctx.rotate((deg * Math.PI) / 180) //旋转 参数角度
			ctx.fillText(txt, 0, 0)
			// 恢复坐标原点和旋转角度
			ctx.rotate((-deg * Math.PI) / 180)
			ctx.translate(-x, -y)
		}

		const drawLine = ctx => {
			// 绘制干扰线
			for (let i = 0; i < 8; i++) {
				ctx.strokeStyle = randomColor(state.lineColorMin, state.lineColorMax)
				ctx.beginPath() //新建一条路径
				ctx.moveTo(
					randomNum(0, state.contentWidth),
					randomNum(0, state.contentHeight)
				) //设置起点x,y
				ctx.lineTo(
					randomNum(0, state.contentWidth),
					randomNum(0, state.contentHeight)
				) //绘制直线 x,y 一条当前位置到x,y点的直线
				ctx.stroke() // 通过线条绘制图形轮廓
				// ctx.closePath() //结束闭合路径
			}
		}

		const drawDot = ctx => {
			// 绘制干扰点
			for (let i = 0; i < 100; i++) {
				ctx.fillStyle = randomColor(0, 255)
				ctx.beginPath()
				// 绘制圆弧或圆，x,y,radius，startAngle,endAngle,anticlockwise // x,y 圆心点，radius 半径，从startAngle开始到endAngle结束
				ctx.arc(
					randomNum(0, state.contentWidth),
					randomNum(0, state.contentHeight),
					1,
					4,
					2 * Math.PI
				)
				ctx.fill() //通过填充路径的内容区域生成实心的图形。
			}
		}

		const initCode = () => {
			var arr = []
			for (var i = 48; i < 123; i++) {
				if (i > 57 && i < 65) continue
				if (i > 90 && i < 97) continue
				arr.push(String.fromCharCode(i))
			}
			arr.sort(function () {
				return Math.random() - 0.5
			})
			arr.length = 4
			state.identifyCode = arr.join('')
		}

		onMounted(() => {
			initCode()
			drawPic()
			emit('changeCode', state.identifyCode)
		})
		watch(
			() => state.identifyCode,
			() => drawPic()
		)

		return {
			...toRefs(state),
		}
	},
})
</script>
<style scoped lang="scss">
.s-canvas {
	height: 38px;
	&:hover {
		cursor: pointer;
	}
}
.s-canvas canvas {
	margin-top: 1px;
	margin-left: 8px;
}
</style>
