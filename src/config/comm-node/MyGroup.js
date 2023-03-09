import { GroupNode } from "@logicflow/extension";

class MyGroup extends GroupNode.view {}

class MyGroupModel extends GroupNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.isRestrict = true;
    this.resizable = true;
    this.width = 600;
    this.height = 300;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = "#000000";
    style.strokeWidth = 2;
    return style;
  }
}

export default {
  type: "my-group",
  model: MyGroupModel,
  view: MyGroup
};