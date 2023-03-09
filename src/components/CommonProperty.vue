<template>
	<div>
		<el-form label-width="80px" v-model="nodePropertyObj">
			<el-form-item
				v-for="(value, key, index) in nodePropertyObj"
				:label="key"
				:key="index"
			>
				<el-input v-model="nodePropertyObj[key]"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	name: "CommonProperty",
	props: {
		nodeData: Object,
		lf: Object || String,
	},
	data() {
		return {
			text: "",
			nodePropertyObj: {},
		};
	},
	mounted() {
		this.nodePropertyObj = this.$props.nodeData.properties;
	},
	methods: {
		onSubmit() {
			const { id } = this.$props.nodeData;
			if (!id) {
				this.$message.error("保存失败！");
				return;
			}
			this.$props.lf.setProperties(id, {
				...this.$data.nodePropertyObj,
			});
			console.log("update: ", this.$data.nodePropertyObj);
			this.$message.success("保存成功！");
			// this.$props.lf.updateText(id, this.$data.nodePropertyObj.text);
		},
	},
	watch: {
		nodeData: {
			handler(newName, oldName) {
				this.nodePropertyObj = this.$props.nodeData.properties;
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
<style scoped></style>
