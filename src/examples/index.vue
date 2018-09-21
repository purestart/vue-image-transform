<template>
  <div class="home-container">
    <div class="Header">
      图片形变编辑器
      <div @click="generateImage" class="btn">
        生成图片
      </div>
    </div>
    <div style="position:relative;">

      <image-transform 
        :imgSrc="editSrc"  
        ref="imageTran" 
        :width="width" 
        :height="height">
      </image-transform>
    </div>
    <vue-image-model :close="()=>{imgUrl=''}" v-show="imgUrl.length>0" :url="imgUrl"></vue-image-model>
  </div>
</template>

<script>
import VueImageModel from "./image-model.vue";

export default {

  name: 'el-index',
      components: {
    VueImageModel,
  },
  data(){
    return{
          editSrc:"/static/image/sticker1.png",
          width:100,
          height:100,
          imgUrl:'',
    }
  },
  created(){
    this.width = document.body.offsetWidth;
    this.height = document.body.offsetHeight - document.body.offsetWidth * 0.08;
  },
  mounted(){

    
  },
  methods:{
    generateImage(){
      this.$refs.imageTran.toDataUrl((url)=>{
        this.imgUrl=url;
      });
    },
  
  }
};
</script>

<style lang="scss" scoped>

  .home-container{
    width: 100%;

    .Header{
      background:linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
      height: 8vw;
      color: #fff;
      text-align: center;
      display: -ms-flexbox;
      display: -moz-box;
      display:-webkit-box;
      display: -webkit-flex;
      display: flex;
      box-align:center;
      -moz-box-align:center;
      -webkit-box-align:center;
      -webkit-align-items:center;
      align-items:center;box-pack:center;
      -webkit--moz-box-pack:center;
      -moz-box-pack:center;
      -webkit-justify-content:center;
      justify-content:center;
      .btn{
        position: absolute;
        right: 3vw;
        padding: 1vw 3vw;
        background-color: red;
        border: 1px solid red;
        border-radius: 2vw;
        &:active{
          background-color: #e13d13;
          border: 1px solid #e13d13;
        }
      }
    }
  }

</style>
