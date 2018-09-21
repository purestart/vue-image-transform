# vue-image-transform

#### 项目介绍
image transform 图片变形编辑组件，拖拽变形，并导出新的图片

![image](http://onf2hckia.bkt.clouddn.com/github-vue-image-transform-v1.gif)

#### 软件架构
兼容移动端和PC端

####依赖
目前依赖jquery,需要在index.html引入jq
> <script type="text/javascript" src="http://libs.baidu.com/jquery/1.7.2/jquery.min.js"></script>


#### 安装教程

    npm install vue-image-transform --save

#### 使用说明

    在main.js中
    import 'vue-image-transform/dist/vue-image-transform.min.css';
    import { ImageTranform } from 'vue-image-transform';
    Vue.use(ImageTranform);

    页面中使用
    <image-transform 
        :imgSrc="editSrc"  
        ref="imageTran" 
        :width="width" 
        :height="height">
    </image-transform>

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
