<!-- 节点属性面板 -->
<template>
	<div class="property-dialog">
		<CommonProperty :nodeData="nodeData" :lf="lf" />
	</div>
</template>
<script>
import CommonProperty from "./CommonProperty";

export default {
	name: "PropertyDialog",
	components: {
		CommonProperty,
	},
	props: {
		nodeData: Object,
		lf: Object,
	},
	data() {
		return {};
	},
	methods: {}
};
</script>
<style>
.property-dialog {
	padding: 20px;
}
</style>
