<template>
	<div>
		<div>
			<el-form :model="po" :rules="rules" ref="dataForm" label-width="100px">
				<el-form-item label="用户.id字符串数组(逗号分隔)" prop="ids">
					<el-input v-model="po.ids"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import WbfcForm from 'wbfc-vue-components/WbfcForm';
import WbfcUtils from 'wbfc-vue-components/WbfcUtils';
import ActionPaths from '@/../ActionPaths'
export default {
	name: 'IUserBatDeleteWithPo',
	mixins: [WbfcForm],
	data() {
		return {
			id: WbfcUtils.generateId() + '_' + 'IUserBatDeleteWithPo', // id
			url: ActionPaths.TPSYSTEM_I_USER_BATDELETEWITHPO, // 接口地址
			po: {
				ids: '' // 用户.id字符串数组(逗号分隔)
			},
			rules: {
				ids: [
					{ required:true, message: '用户.id字符串数组(逗号分隔)必填', trigger: 'blur'}
				]
			},
			vo: {
				code: '', // 返回码，默认000，为正常。其他参见返回码表。
				msg: '', // 返回消息，默认为null。一般会返回错误消息提示。
				result: {} // 返回结果，默认为null。
			}
		};
	}
}
</script>