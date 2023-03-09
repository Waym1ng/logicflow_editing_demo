<template>
	<div id="logic-flow-view">
		<h2 class="text-title">demo拖拉拽流程</h2>
		<!-- 画布 -->
		<div id="LF-container" ref="container"></div>
		<!-- 属性面板 -->
		<el-card class="card-box">
			<h3 class="text-title">属性编辑面板</h3>
			<PropertyDialog
				v-if="dialogVisible"
				:nodeData="clickNode"
				:lf="lf"
			></PropertyDialog>
		</el-card>
		<!-- 数据查看面板 -->
		<el-dialog title="查看数据" :visible.sync="dataVisible" width="50%">
			<DataDialog :graphData="graphData"></DataDialog>
		</el-dialog>
		<!-- 导入数据面板 -->
		<el-dialog title="导入数据" :visible.sync="uploadVisible" width="35%">
			<UploadDialog
				v-on:uploadData="getUploadData"
				:uploadVisible="uploadVisible"
			></UploadDialog>
		</el-dialog>
	</div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { Snapshot, Menu } from "@logicflow/extension";
import {
	DndPanel,
	SelectionSelect,
	Control,
	Group,
} from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import { nodeList } from "@/config//NodeConfig";
import sequence from "@/config/NodeEdge";
import groupSequence from "@/config/NodeGroupEdge";
import MyGroup from "@/config/comm-node/MyGroup";
import {
	rect01,
	rect02,
	rect03,
	rect04,
} from "@/config/comm-node/MyRect";
import { demoNode1, demoNode2, demo } from "@/config/comm-node/MyCircle";
import dataDemo from "@/config/dataDemo.json";

import PropertyDialog from "./PropertyDialog";
import DataDialog from "./DataDialog";
import UploadDialog from "./UploadDialog";

export default {
	name: "EditUi",
	components: {
		PropertyDialog,
		DataDialog,
		UploadDialog,
	},
	data() {
		return {
			lf: null,
			clickNode: null,
			dialogVisible: false,
			graphData: null,
			dataVisible: false,
			uploadVisible: false,
		};
	},
	methods: {
		initLf() {
			// 画布配置
			LogicFlow.use(Snapshot);
			// 启动右键菜单
			LogicFlow.use(Menu);
			// 启动控制面板
			LogicFlow.use(Control);
			const domLf = new LogicFlow({
				container: document.querySelector("#LF-container"),
				plugins: [Menu, DndPanel, SelectionSelect, Control, Group],
				grid: true,
				background: {
					color: "#f7f9ff",
				},
				keyboard: {
					enabled: true,
					shortcuts: [
						{
							keys: ["delete", "backspace"],
							callback: () => {
								const elements = domLf.getSelectElements(true);
								domLf.clearSelectElements();
								elements.edges.forEach((edge) =>
									domLf.deleteEdge(edge.id)
								);
								elements.nodes.forEach((node) =>
									domLf.deleteNode(node.id)
								);
								this.dialogVisible = false;
							},
						},
					],
				},
				edgeGenerator: (sourceNode, targetNode, currentEdge) => {
					// 目标节点类型 my-group 时使用 自定义的边 group-sequence
					if (targetNode.type === "my-group") return "group-sequence";
				},
			});
			// 边
			domLf.register(sequence);
			domLf.register(groupSequence);
			domLf.setDefaultEdgeType("sequence");
			// 节点
			// domLf.register(MyGroup); // 单个注册
			domLf.batchRegister([
				MyGroup,
				rect01,
				rect02,
				rect03,
				rect04,
				demoNode1,
				demoNode2,
				demo,
			]); // 批量注册
			this.lf = domLf;
			this.initNodeEvent();
			this.onNodePanel();
			this.addControlItem();
			this.addMenulItem();
		},
		initNodeEvent() {
			this.lf.on("node:click", (item) => {
				// console.log("node:click", item.data);
				// console.log("node:click", this.lf.getEditConfig());
				if (item.data.type == "my-group") {
					return;
				}
				// item.data.properties 是自定义属性
				this.$data.clickNode = item.data;
				this.$data.dialogVisible = true;
			});
		},
		onNodePanel() {
			let lf = this.lf;
			lf.extension.dndPanel.setPatternItems([
				{
					label: "选区",
					icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiA0SDRWMTJIMTJWNFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ0IDM2SDM2VjQ0SDQ0VjM2WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTIgMzZINFY0NEgxMlYzNloiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ0IDRIMzZWMTJINDRWNFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTggMzZWMTIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNDAgMzZWMTIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTIgOEgzNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMiA0MEgzNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==",
					callback: () => {
						lf.extension.selectionSelect.openSelectionSelect();
						lf.once("selection:selected", () => {
							lf.extension.selectionSelect.closeSelectionSelect();
						});
					},
				},
				...nodeList,
			]);
		},
		addControlItem() {
			this.lf.extension.control.addItem({
				iconClass: "lf-control-view",
				title: "",
				text: "查看",
				onClick: (lf, ev) => {
					this.catData();
				},
			});
			this.lf.extension.control.addItem({
				iconClass: "lf-control-import",
				title: "",
				text: "导入",
				onClick: (lf, ev) => {
					this.importData();
				},
			});
			this.lf.extension.control.addItem({
				iconClass: "lf-control-clear",
				title: "",
				text: "清空",
				onClick: (lf, ev) => {
					this.lf.clearData();
					this.dialogVisible = false;
				},
			});
		},
		addMenulItem() {
			this.lf.extension.menu.addMenuConfig({
				nodeMenu: [
					{
						text: "属性",
						callback(node) {
							alert(
								`节点id：${node.id}\n节点类型：${node.type}\n节点坐标：(x: ${node.x}, y: ${node.y})`
							);
						},
					},
				],
			});
		},
		onRender(data) {
			this.lf.render(data);
		},
		catData() {
			this.$data.graphData = this.$data.lf.getGraphData();
			this.$data.dataVisible = true;
		},
		importData() {
			this.$data.uploadVisible = true;
		},
		getUploadData(data, uploadVisible) {
			this.graphData = data;
			this.onRender(this.graphData);
			this.$data.uploadVisible = uploadVisible;
		},
	},
	mounted() {
		this.initLf();
		this.onRender(dataDemo);
	},
};
</script>

<style>
.logic-flow-view {
	height: 100vh;
	position: relative;
}
.text-title {
	text-align: center;
	margin: 20px;
}
#LF-container {
	width: calc(100% - 500px);
	height: 80vh;
	outline: none;
	margin-left: 50px;
}
.lf-control-view {
	background: url("@/assets/control-icons/preview-open.png");
}
.lf-control-import {
	background: url("@/assets/control-icons/import.png");
}
.lf-control-clear {
	background: url("@/assets/control-icons/clear.png");
}
.lf-dnd-shape {
	background-size: 100% 100%;
}
.lf-dnd-text {
	margin-top: 2px;
}
.card-box {
	position: absolute;
	width: 350px;
	height: 75vh;
	right: 50px;
	top: 100px;
}
</style>
