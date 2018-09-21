# vue-image-transform

#### 项目介绍
image transform 图片变形编辑组件，拖拽变形，并导出新的图片

![image](http://onf2hckia.bkt.clouddn.com/github-vue-image-transform-v1.gif)

#### 软件架构
软件架构说明


#### 安装教程

    npm install vue-image-transform --save

#### 使用说明

    在main.js中
    import 'vue-image-transform/dist/vue-image-transform.min.css';
    import { ImageTranform } from 'vue-image-transform';
    Vue.use(ImageTranform);

    页面中使用
    <image-transform :onChange="onChange" :onSearch="onSearch">
        搜索页面 推荐标签 搜索提示等等...    
    </image-transform>

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
