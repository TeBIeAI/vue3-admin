<template>
	<div class="login-wrapper">
		<transition name="el-fade-in-linear">
			<div v-show="show" class="login-form transition-box">
				<el-form :model="form" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input size="medium" v-model="form.username" clearable>
							<template #prepend>
								<el-button icon="el-icon-s-custom"></el-button>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							size="medium"
							v-model="form.password"
							type="password"
							clearable
						>
							<template #prepend>
								<el-button icon="el-icon-s-cooperation"></el-button>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="sidentify">
						<el-col :span="14">
							<el-input
								size="medium"
								placeholder="请输入验证码"
								v-model="form.sidentify"
								@keyup.enter="submitForm('loginForm')"
							>
							</el-input>
						</el-col>
						<el-col :span="8">
							<v-sidentify @changeCode="changeCode"></v-sidentify>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-button
							style="width: 100%"
							type="primary"
							size="medium"
							@click="submitForm('loginForm')"
							>Login In</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</transition>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import VerifiCode from 'cps/VerifiCode/index.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
	components: {
		'v-sidentify': VerifiCode,
	},
	setup() {
		const form = reactive({
			username: 'admin',
			password: '123456',
			sidentify: '',
			vaildCode: '',
		})
		const show = ref(false)
		const rules = {
			username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			sidentify: [{ required: true }],
		}
		const loginForm = ref(null)

		const submitForm = () => {
			form.sidentify !== form.vaildCode && ElMessage.error('请正确输入验证码')
			loginForm.value.validate(vaild => {
				if (vaild) {
					console.log(1)
				} else {
					console.log(2)
				}
			})
		}

		onMounted(() => {
			setTimeout(() => {
				console.log(show.value)
				show.value = true
			}, 600)
		})

		const changeCode = code => {
			form.vaildCode = code
		}

		return {
			form,
			rules,
			loginForm,
			submitForm,
			changeCode,
			show,
		}
	},
})
</script>

<style scoped lang="scss">
.login-wrapper {
	width: 100%;
	height: 100%;
	background: #e9ecf3;

	.login-form {
		box-sizing: border-box;
		width: 390px;
		height: 320px;
		position: absolute;
		left: 50%;
		top: 40%;
		padding: 40px 30px;
		transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 5px;
	}
}
.transition-box {
	transition: all 1.2s linear;
}
</style>
