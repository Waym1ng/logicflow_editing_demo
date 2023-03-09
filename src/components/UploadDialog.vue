<template>
	<div>
		<el-upload
			class="upload-demo"
			drag
			action
			:limit="1"
			accept=".json"
			:on-change="onChange"
			:on-remove="onRemove"
			:auto-upload="false"
			ref="upload"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				将文件拖到此处，或<em>点击上传</em>
			</div>
			<div class="el-upload__tip" slot="tip">只能上传json文件</div>
		</el-upload>
		<el-button class="submit-btn" type="primary" @click="submitData"
			>确定</el-button
		>
	</div>
</template>

<script>
export default {
	name: "UploadDialog",
	props: {
		uploadVisible: Boolean,
	},
	data() {
		return {
			uploadData: null,
			fileList: [],
		};
	},
	methods: {
		onChange(file, fileList) {
			let reader = new FileReader();
			reader.readAsText(file.raw);
			reader.onload = (e) => {
				this.uploadData = [];
				this.uploadData = JSON.parse(e.target.result);
			};
		},
		onRemove(file) {
			this.fileList = [];
			this.uploadData = null;
		},
		submitData() {
			if (this.uploadData == null) {
				this.$message.warning("未选择json文件！");
				return;
			}
			this.$emit("uploadData", this.uploadData, false);
		},
	},
	watch: {
		uploadVisible(newVal, oldVal) {
			if (newVal) {
				// console.log("Val is true");
				this.$refs.upload.clearFiles();
				this.fileList = [];
				this.uploadData = null;
			}
		},
		immediate: true,
	}
};
</script>

<style scoped>
.submit-btn {
	margin-top: 15px;
}
</style>
