<template>
	<div>
		<el-button-group slot="header" class="button-group">
			<el-button icon="el-icon-document" @click="copyData"
				>复制</el-button
			>
			<el-button icon="el-icon-download" @click="exportData"
				>导出</el-button
			>
		</el-button-group>
		<div class="json-preview">
			<vue-json-pretty :path="'res'" :data="graphData"> </vue-json-pretty>
		</div>
		<!-- 返回顶部 -->
		<el-button class="back-top">
			<i class="el-icon-caret-top"></i>
		</el-button>

	</div>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
	props: {
		graphData: Object,
	},
	components: {
		VueJsonPretty,
	},
	data() {
		return {
			jsonData: "",
		};
	},
	methods: {
		copyData() {
			this.jsonData = JSON.stringify(this.$props.graphData, null, 2);
			// console.log(this.jsonData);
			const tempInput = document.createElement("textarea");
			document.body.appendChild(tempInput);
			tempInput.value = this.jsonData;
			tempInput.select();
			document.execCommand("copy");
			document.body.removeChild(tempInput);
			this.$notify.success("JSON数据已复制到剪贴板！");
		},
		exportData() {
			this.jsonData = JSON.stringify(this.$props.graphData, null, 2);
			// console.log(this.jsonData);
			const blob = new Blob([this.jsonData], {
				type: "application/json",
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "exportData.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
			this.$notify.success("JSON数据已导出！");
		},
	},
};
</script>
<style scoped>
.button-group {
	position: absolute;
	top: 15px;
	right: 50px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
}
.back-top {
	position: fixed;
	right: 50px;
	bottom: 50px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: #409eff;
	box-shadow: 0 0 6px rgb(0 0 0 / 12%);
	cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
	z-index: 5;
}
</style>
