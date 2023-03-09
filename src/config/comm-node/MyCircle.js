import { CircleNode, CircleNodeModel } from "@logicflow/core";

class demoNode1Model extends CircleNodeModel {
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = "#0f1c28";
		return style;
	}
	getTextStyle() {
		const style = super.getTextStyle();
		style.fontSize = 16;
		style.color = "#0f1c28";
		return style;
	}
}

class demoNode1View extends CircleNode {}
// 示例1
const demoNode1 =  {
	type: "demoNode1",
	view: demoNode1View,
	model: demoNode1Model,
};

class demoNode2Model extends CircleNodeModel {
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = "#d6612d";
		return style;
	}
	getTextStyle() {
		const style = super.getTextStyle();
		style.fontSize = 16;
		style.color = "#d6612d";
		return style;
	}
}

class demoNode2View extends CircleNode {}

const demoNode2 =  {
	type: "demoNode2",
	view: demoNode2View,
	model: demoNode2Model,
};

class demoModel extends CircleNodeModel {
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = "#1980db";
		return style;
	}
	getTextStyle() {
		const style = super.getTextStyle();
		style.fontSize = 16;
		style.color = "#1980db";
		return style;
	}
}

class demoView extends CircleNode {}

const demo =  {
	type: "demo",
	view: demoView,
	model: demoModel,
};

export {demoNode1, demoNode2, demo}
