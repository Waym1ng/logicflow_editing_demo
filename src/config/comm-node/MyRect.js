import { RectNode, RectNodeModel } from "@logicflow/core";

class rect01Model extends RectNodeModel {
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

class rect01View extends RectNode {}

const rect01 = {
	type: "rect01",
	view: rect01View,
	model: rect01Model,
};

class rect02Model extends RectNodeModel {
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

class rect02View extends RectNode {}

const rect02 = {
	type: "rect02",
	view: rect02View,
	model: rect02Model,
};

class rect03Model extends RectNodeModel {
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

class rect03View extends RectNode {}

const rect03 = {
	type: "rect03",
	view: rect03View,
	model: rect03Model,
};

class rect04Model extends RectNodeModel {
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = "#e94eb5";
		return style;
	}
	getTextStyle() {
		const style = super.getTextStyle();
		style.fontSize = 16;
		style.color = "#e94eb5";
		return style;
	}
}

class rect04View extends RectNode {}

const rect04 = {
	type: "rect04",
	view: rect04View,
	model: rect04Model,
};

export { rect01, rect02, rect03, rect04 };
