<template>
    <div :style="'width:'+width+'px;'+'height:'+height+'px'" class="matrix-wrapper">
        <div id="matrix-container" class="matrix-container">
            <div >
                <div id="img" class="matrix-img"></div>
            </div>
            
            <div class="pt tl"></div>
            <div class="pt tr"></div>
            <div class="pt bl"></div>
            <div class="pt br"></div>
        </div>
        <div class="crop-container">
            <div class="crop-img"></div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  import "./canvasUtil.min.js";
  import PerspectiveTransform from "./PerspectiveTransform.min.js";

  export default {
    name:"ImageTransform",
   props:{
        width:{
            type:Number,
            required:true
        },
        height:{
            type:Number,
            required:true
        },
        imgSrc:{
            type:String,
            required:true
        },
        // initPoints:{
        //     type:Array,
        //     required:true
        // },
        // hasTranspa:{
        //     type:Boolean,
        //     required:true
        // },
        // editBase64:{
        //     type:String,
        //     required:true
        // },
        maxImageW:{
            type:Number,
            required:false,
            default:null
        },
        maxImageH:{
            type:Number,
            required:false,
            default:null
        }
        // flipX:{
        //     type:Boolean,
        //     required:true
        // }
    },
    data () {
      return {
          imageWidth:0,
          imageHeight:0,
          target:{},
          targetPoint:{},
          points:[],
          flag:false,
          transform:{},
          container:{},
          eventList:{
            TOUCH_START: 'mousedown',
            TOUCH_MOVE: 'mousemove',
            TOUCH_END: 'mouseup',
            TOUCH_CANCEL: 'touchcancel',
            TAP: 'tap',
            DOUBLE_TAP: 'doubletap',
            LONG_TAP: 'longtap',
            SWIPE_START: 'swipestart',
            SWIPING: 'swiping',
            SWIPE_END: 'swipeend',
            SWIPE_LEFT: 'swipeleft',
            SWIPE_RIGHT: 'swiperight',
            SWIPE_UP: 'swipeup',
            SWIPE_DOWN: 'swipedown'
        },
        mobileFlag:false,
        initPoints: [[50, 50], [550, 100], [300, 400], [100, 400]],
        editBase64:null,
        hasTranspa:false,
      }
    },
    created () {
        //获取图片宽高
      var image = new Image();
      image.src = this.imgSrc;
      let that=this;
      let maxWidth=this.width/2;
      let maxHeight= this.height/2;
      if(this.maxImageW && this.maxImageW>0){
          maxWidth=this.maxImageW;
      }
      if(this.maxImageH && this.maxImageH>0){
          maxHeight=this.maxImageH;
      }

      image.onload = function() {
          //console.log("onload");
          that.imageWidth=image.width;
          that.imageHeight=image.height;
          if(that.imageWidth>that.imageHeight && that.imageWidth>maxWidth){

              that.imageHeight=(that.imageHeight/that.imageWidth)*maxWidth;
              that.imageWidth=maxWidth;
              
          }else if(that.imageHeight>that.imageWidth && that.imageHeight>maxHeight){

            that.imageWidth=(that.imageWidth/that.imageHeight)*maxHeight;

            that.imageHeight=maxHeight;

          }

          that.initPoints[0][0]=(that.width-that.imageWidth)/2;
          that.initPoints[0][1]=(that.height-that.imageHeight)/2;

          that.initPoints[1][0]=(that.width-that.imageWidth)/2+that.imageWidth;
          that.initPoints[1][1]=(that.height-that.imageHeight)/2;

          that.initPoints[2][0]=(that.width-that.imageWidth)/2+that.imageWidth;
          that.initPoints[2][1]=(that.height-that.imageHeight)/2+that.imageHeight;

          that.initPoints[3][0]=(that.width-that.imageWidth)/2;
          that.initPoints[3][1]=(that.height-that.imageHeight)/2+that.imageHeight;

          that.editBase64=that.getBase64Image(image);

          that.initCanvas();
      }
        

    },
    mounted () {
        console.log("mounted");
        
        
        
        this.mobileFlag=this.isMobile();
    
        this.eventList = {
            TOUCH_START: this.isMobile() ? 'touchstart' : 'mousedown',
            TOUCH_MOVE: this.isMobile() ? 'touchmove' : 'mousemove',
            TOUCH_END: this.isMobile() ? 'touchend' : 'mouseup',
            TOUCH_CANCEL: 'touchcancel',
            TAP: 'tap',
            DOUBLE_TAP: 'doubletap',
            LONG_TAP: 'longtap',
            SWIPE_START: 'swipestart',
            SWIPING: 'swiping',
            SWIPE_END: 'swipeend',
            SWIPE_LEFT: 'swipeleft',
            SWIPE_RIGHT: 'swiperight',
            SWIPE_UP: 'swipeup',
            SWIPE_DOWN: 'swipedown'
        };

        
    },
    methods:{
        initCanvas(){
            
        this.imageWidth=this.initPoints[1][0]-this.initPoints[0][0];
        this.imageHeight=this.initPoints[3][1]-this.initPoints[0][1];
        $(".matrix-container").css("width",this.imageWidth+"px");
        $(".matrix-container").css("height",this.imageHeight+"px");
        $(".matrix-container").css("left",this.initPoints[0][0]+"px");
        $(".matrix-container").css("top",this.initPoints[0][1]+"px");
        $(".matrix-img").css("width",this.imageWidth+"px");
        $(".matrix-img").css("height",this.imageHeight+"px");
        // if(this.flipX){
        //     this.getMirrorImage(this.imgSrc,(dataUrl)=>{
        //         $(".matrix-img").css("background-image","url(" + dataUrl + ")");
        //     })
        // }else{
        //     $(".matrix-img").css("background-image","url(" + this.imgSrc + ")");
        // }
         $(".matrix-img").css("background-image","url(" + this.imgSrc + ")");
        
        $(".matrix-img").css("background-size",this.imageWidth+"px "+this.imageHeight+"px");

         var container = $(".matrix-container");
         var img = $(".matrix-img");
         var pts = $(".pt");
         var IMG_WIDTH = this.imageWidth;
         var IMG_HEIGHT = this.imageHeight;

         var points=[[0,0],[1,1],[2,2],[3,3]];
         this.points=points;

         var transform = new PerspectiveTransform(img[0], IMG_WIDTH, IMG_HEIGHT, true);
         this.transform=transform;

            var tl = pts.filter(".tl").css({
                left : transform.topLeft.x,
                top : transform.topLeft.y
            });
			points[0][0]=transform.topLeft.x;
			points[0][1]=transform.topLeft.y;
			
            var tr = pts.filter(".tr").css({
                left : transform.topRight.x,
                top : transform.topRight.y
            });
			points[1][0]=transform.topRight.x;
			points[1][1]=transform.topRight.y;
			
            var bl = pts.filter(".bl").css({
                left : transform.bottomLeft.x,
                top : transform.bottomLeft.y
            });
			points[3][0]=transform.bottomLeft.x;
			points[3][1]=transform.bottomLeft.y;
			
            var br = pts.filter(".br").css({
                left : transform.bottomRight.x,
                top : transform.bottomRight.y
            });
			points[2][0]=transform.bottomRight.x;
            points[2][1]=transform.bottomRight.y;
            
            let that=this;
            pts.on(this.eventList.TOUCH_START,function(e) {
            //pts.mousedown(function(e) {
                
                that.target = $(this);
                let target=that.target;

                //console.log(that.flag);
                //console.log("mousedown");
                
                that.targetPoint = target.hasClass("tl") ? transform.topLeft : target.hasClass("tr") ? transform.topRight : target.hasClass("bl") ? transform.bottomLeft : transform.bottomRight;
                that.onMouseMove.apply(that, Array.prototype.slice.call(arguments));
				
                // $(window).mousemove(that.onMouseMove);
                // $(window).mouseup(function() {
                //     $(window).unbind('mousemove', that.onMouseMove);
                // })

                // pts.on(that.eventList.TOUCH_MOVE,that.onMouseMove);
                // pts.on(that.eventList.TOUCH_END,()=>{
                //     pts.unbind(that.eventList.TOUCH_MOVE, that.onMouseMove);
                // });
                $(window).on(that.eventList.TOUCH_MOVE,that.onMouseMove);
                $(window).on(that.eventList.TOUCH_END,()=>{
                    $(window).unbind(that.eventList.TOUCH_MOVE, that.onMouseMove);
                });

            });
        },
        isMobile() {
            
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
                return true;
            }
            else {
                return false;
            }
        },
        toDataUrl(cb){
            this.generateImage(cb);
            
        },
        generateImage(cb){
                console.log("generateImage")
                
                //document.getElementById("img")[0]
                console.log(this.points);
                //相对点
                let points=this.points;
                //获取原始点
                let initPoints=this.initPoints;

                let relativePoints=[[0,0],[0,0],[0,0],[0,0]];

                relativePoints[0][0]=points[0][0]+initPoints[0][0];
                relativePoints[0][1]=points[0][1]+initPoints[0][1];

                relativePoints[1][0]=points[1][0]+initPoints[1][0]-this.imageWidth;
                relativePoints[1][1]=points[1][1]+initPoints[1][1];

                relativePoints[2][0]=points[2][0]+initPoints[2][0]-this.imageWidth;
                relativePoints[2][1]=points[2][1]+initPoints[2][1]-this.imageHeight;

                relativePoints[3][0]=points[3][0]+initPoints[3][0];
                relativePoints[3][1]=points[3][1]+initPoints[3][1]-this.imageHeight;

                console.log(relativePoints);

                this.getDecodeImage(cb,relativePoints);
                
        },
        getDecodeImage(cb,points){
            //获取画布宽高
            let leftWP=points[0][0]>points[3][0]?points[3][0]:points[0][0];
            let rightWP=points[1][0]>points[2][0]?points[1][0]:points[2][0];

            let width=rightWP-leftWP;

            let topHP=points[0][1]>points[1][1]?points[1][1]:points[0][1];
            let bottomHP=points[3][1]>points[2][1]?points[3][1]:points[2][1];

            let height=bottomHP-topHP;

            let canv0 = document.createElement('canvas');
            canv0.width = width;
            canv0.height = height;
            let ctx = canv0.getContext('2d');
            // 変形画像用Canvas
            let canv1 = document.createElement('canvas');
            canv1.width = width;
            canv1.height = height;
            let ctx1 = canv1.getContext('2d');


            var basePoints = JSON.parse(JSON.stringify(points))

            basePoints[0][0]=basePoints[0][0]-leftWP;
            basePoints[1][0]=basePoints[1][0]-leftWP;
            basePoints[2][0]=basePoints[2][0]-leftWP;
            basePoints[3][0]=basePoints[3][0]-leftWP;

            basePoints[0][1]=basePoints[0][1]-topHP;
            basePoints[1][1]=basePoints[1][1]-topHP;
            basePoints[2][1]=basePoints[2][1]-topHP;
            basePoints[3][1]=basePoints[3][1]-topHP;

            let img = new Image();

            let that=this;
            img.addEventListener('load' , function(){
                //console.log("开始绘制");
                //重设画布宽高
                let cw=canv0.width;
                let ch=canv0.height;
                let w=img.width;
                let h=(ch/cw)*w;

                canv0.width=w;
                canv0.height=h;
                
                canv1.width=w;
                canv1.height=h;

                //以左上为基点 重设basePoints
                let wradio=w/cw;
                let hradio=h/ch;
                
                //console.log(wradio);
                //console.log(hradio);

                //获取基点
                let basex=basePoints[0][0]>basePoints[3][0]?basePoints[3][0]:basePoints[0][0];
                let basey=basePoints[0][1]>basePoints[1][1]?basePoints[1][1]:basePoints[0][1];

                //调整放大后的坐标
                basePoints[0][0]=basex+(basePoints[0][0]-basex)*wradio;
                basePoints[0][1]=basey+(basePoints[0][1]-basey)*hradio;

                basePoints[1][0]=basex+(basePoints[1][0]-basex)*wradio;
                basePoints[1][1]=basey+(basePoints[1][1]-basey)*hradio;
                
                basePoints[2][0]=basex+(basePoints[2][0]-basex)*wradio;
                basePoints[2][1]=basey+(basePoints[2][1]-basey)*hradio;

                basePoints[3][0]=basex+(basePoints[3][0]-basex)*wradio;
                basePoints[3][1]=basey+(basePoints[3][1]-basey)*hradio;

                let op = new canvasUtil.perspective(ctx1, img);

                console.log(img.width);
                
                op.draw(basePoints);
                //that.prepare_lines(ctx2, that.points);
                that.draw_canvas(ctx, ctx1, null);


                // 将canvas的透明背景设置成白色
                // var imageData = ctx.getImageData(0, 0, canv0.width, canv0.height);
                // for(var i = 0; i < imageData.data.length; i += 4) {
                //     // 当该像素是透明的，则设置成白色
                //     if(imageData.data[i + 3] == 255) {
                //         //console.log(imageData.data[i + 3]);
                        
                //         imageData.data[i] = 0;
                //         imageData.data[i + 1] = 0;
                //         imageData.data[i + 2] = 0;
                //         imageData.data[i + 3] = 0;
                //     }
                // }
                // ctx.putImageData(imageData, 0, 0);

                var dataURL = canv0.toDataURL("image/png");
                console.log(that.hasTranspa);
                if(that.hasTranspa==true){
                    var image = new Image();  
                    image.src = dataURL;
                    let that1=that;
                    image.onload = function(){
                        var base64 = that1.getTranParentBase64Image(image);
                       // console.log(base64);
                        //形变 位置
                        cb(base64,wradio);
                    }
                }else{
                    cb(dataURL,wradio);
                }
               //cb(dataURL);

            } , false);
            img.src = this.editBase64;

            //let canvas = document.getElementById("matrix-control");
        },
        onMouseMove(e) {
                //console.log("onMouseMove");
                //console.log(e);
                let nativeEv=e;

                if(this.mobileFlag){
                    nativeEv=e.originalEvent.changedTouches[0];
                }

                var container = $(".matrix-container");
                var img = $(".matrix-img");
                let transform=this.transform;
                
                let targetPoint=this.targetPoint;
                let target=this.target;
                let points=this.points;
                targetPoint.x = nativeEv.pageX - container.offset().left ;
                targetPoint.y = nativeEv.pageY - container.offset().top ;
                target.css({
                    left : targetPoint.x,
                    top : targetPoint.y
                });
				
				if(target.hasClass("tl")){
					points[0][0]=targetPoint.x;
					points[0][1]=targetPoint.y;
				}else if(target.hasClass("tr")){
					points[1][0]=targetPoint.x;
					points[1][1]=targetPoint.y;
				}else if(target.hasClass("br")){
					points[2][0]=targetPoint.x;
					points[2][1]=targetPoint.y;
				}else{
					points[3][0]=targetPoint.x;
					points[3][1]=targetPoint.y;
                }
                
                //console.log(points);
                //check the polygon error, if it's 0, which mean there is no error
                if(transform.checkError()==0){
                    transform.update();
                    img.show();
                }else{
                    img.hide();
                }
        },
         draw_canvas(ctx, ctx1, ctx2) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(ctx1.canvas, 0, 0);
            if(ctx2){
                ctx.drawImage(ctx2.canvas, 0, 0);
            }
            
        },
        getTranParentBase64Image(img) {  
            var canvx = document.createElement("canvas");  
            canvx.width = img.width;  
            canvx.height = img.height;
            var ctxx = canvx.getContext("2d"); 
            
            ctxx.drawImage(img, 0, 0, img.width, img.height);

            // 将canvas的透明背景设置成白色
            var imageData = ctxx.getImageData(0, 0, canvx.width, canvx.height);
            for(var i = 0; i < imageData.data.length; i += 4) {
                // 当该像素是透明的，则设置成白色
                if(imageData.data[i + 1] == 255 && imageData.data[i + 2] == 255 && imageData.data[i] == 255) {
                    //console.log(imageData.data[i + 3]);
                    
                    imageData.data[i] = 0;
                    imageData.data[i + 1] = 0;
                    imageData.data[i + 2] = 0;
                    imageData.data[i + 3] = 0;
                }
            }
            ctxx.putImageData(imageData, 0, 0);

            var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
            var dataURL = canvx.toDataURL("image/"+ext);
            return dataURL;
        },
        getBase64Image(img) {
      //console.log(this.hasTranspa);

      this.hasTranspa = false;
      var canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      var cw = img.width;
      var ch = img.height;
      var w = img.width;
      var h = img.height;

      if (cw > 2024 && cw > ch) {
        w = 2024;
        h = 2024 * ch / cw;
        canvas.width = w;
        canvas.height = h;
      }
      if (ch > 2024 && ch > cw) {
        h = 2024;
        w = 2024 * cw / ch;
        canvas.width = w;
        canvas.height = h;
      }

      var ctx = canvas.getContext("2d");
      //ctx.fillStyle = '#ffffff';
      
        //镜像翻转
        // if (this.flipX) {
        //     ctx.scale(-1, 1);
        //     ctx.translate(-w, 0);
        //     ctx.drawImage(img, 0, 0, w, h);
        // }else{
        //     ctx.drawImage(img, 0, 0, w, h);
    
        // }
        ctx.drawImage(img, 0, 0, w, h);

      // 将canvas的透明背景设置成白色
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let flag = false;

      for (var i = 0; i < imageData.data.length; i += 4) {
        // 当该像素是透明的，则设置成白色
        if (imageData.data[i + 3] == 0) {
          //console.log(imageData.data[i + 3]);

          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
          flag = true;
        }
      }

      this.hasTranspa = flag;
      //console.log(this.hasTranspa);

      ctx.putImageData(imageData, 0, 0);

      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
        getMirrorImage(url,cb){

            var canvm = document.createElement("canvas");

            let img = new Image();

            let ctxm = canvm.getContext("2d");

            img.addEventListener('load' , function(){

                let cw = img.width;
                let ch = img.height;
                let w = img.width;
                let h = img.height;

                console.log(w);
                console.log(h);

                canvm.width = w;
                canvm.height = h;
                
                
                // if (cw > 2024 && cw > ch) {
                //     w = 2024;
                //     h = 2024 * ch / cw;
                //     canvm.width = w;
                //     canvm.height = h;
                // }
                // if (ch > 2024 && ch > cw) {
                //     h = 2024;
                //     w = 2024 * cw / ch;
                //     canvm.width = w;
                //     canvm.height = h;
                // }
                
                ctxm.scale(-1, 1);
                ctxm.translate(-w, 0);
                ctxm.drawImage(img, 0, 0,w,h);

                var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                var dataURL = canvm.toDataURL("image/" + ext);

                cb(dataURL);

            })

            img.src=url;
            


        }

    }
  }
</script>

<style lang='scss' scoped>
    .matrix-wrapper{
        position: absolute;
        left: 0;
        top:0;
        .crop-container{
            position: absolute;
            opacity: 0;
        }
        .matrix-container{
            position: absolute;
            left: 200px;
            top: 200px;
            width: 200px;
            height: 200px;
            // background-color: #ffffff;
            .matrix-img{
                	background-repeat:no-repeat;
                    position: absolute;

            }
            // &.mirror{
            //     transform:matrix(-1, 0, 0, 1, 0, 0);
            //     -moz-transform: matrix(-1, 0, 0, 1, 0, 0);
            //     -webkit-transform: matrix(-1, 0, 0, 1, 0, 0);
            // }
            .pt{
                position: absolute;
                width: 30px;
                height: 30px;
                margin-left: -15px;
                margin-top: -15px;
                border-radius: 15px;
                background-color: #F00;
                cursor: pointer;
            }
        }
    }

</style>