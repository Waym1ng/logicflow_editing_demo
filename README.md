## demo编辑器
### 运行
#### 安装
> `npm install`
#### 运行
> `npm run serve`
#### 打包
> `npm run build`

### 说明
#### 节点定义
- NodeConfig.js 文件
```
type: "demoNode1", // 对应类型
text: "demoNode1", // 拖拽后显示名称
label: "demoNode1", // 左侧栏显示名称
properties: {} //自定义属性
```
- comm-node 目录
> 圆形，矩形，组的定义
#### 边定义
- NodeEdge.js  通用边
- NodeGroupEdge.js 连接组的特殊边
#### 组件
- EditUi.vue 主文件
- DataDialog.vue 查看数据
- PropertyDialog.vue && CommonProperty.vue 属性编辑
- UploadDialog.vue 导入数据