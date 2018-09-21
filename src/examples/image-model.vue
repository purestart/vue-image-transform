<template>
    <div @click="close" class="image-model">
        <i :class="width>800?'pc-device':''" class="pt-iconfont icon-guanbi"></i>
        <img @click.stop="()=>{}" :src="url" alt="">
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    url: String,
    close: Function
  },
  data() {
    return {
      width: 0
    };
  },
  created() {
    this.width = document.body.offsetWidth;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.image-model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.527);
  z-index: 667;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -moz-box;
  display: -webkit-box;
  display: flex;

  box-pack: center;
  -webkit--moz-box-pack: center;
  -moz-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;

  box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;

  .pt-iconfont {
    position: absolute;
    right: 5vw;
    top: 5vw;
    color: #fff;
  }

  .pt-iconfont.pc-device {
    top: 50px;
    right: 50px;
  }

  img {
    max-width: 80vw;
    max-height: 80vh;

    background-color: #fff;
  }
}
</style>