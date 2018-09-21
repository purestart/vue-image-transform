import ImageTransformComponent from './ImageTransform.vue'

　　const ImageTransform={
　　　　install:function(Vue){ //核心部分，在我们使用Vue.use()时，自动调用的是install，而install导出的必须是的组件
　　　　Vue.component(ImageTransformComponent.name,ImageTransformComponent);
　　}
};
export default ImageTransform;