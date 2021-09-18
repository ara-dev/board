<template>
  <div class="relative" ref="mainboard" >
   <!-- width : {{ width }}
    height : {{ height }}-->
    <div id="container" ref="container"></div>
  <!--  {{  test }}
    {{  height }}-->
    <!--<div style="position: absolute; top: 5px; right: 351.5px;"><span aria-haspopup="true" class="bp3-popover2-target"><button type="button" class="bp3-button bp3-minimal" tabindex="0"><span icon="duplicate" aria-hidden="true" class="bp3-icon bp3-icon-duplicate"><svg data-icon="duplicate" width="16" height="16" viewBox="0 0 16 16"><path d="M15 0H5c-.55 0-1 .45-1 1v2h2V2h8v7h-1v2h2c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 4H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10H2V6h8v8z" fill-rule="evenodd"></path></svg></span></button></span><span aria-haspopup="true" class="bp3-popover2-target"><button type="button" class="bp3-button bp3-minimal" tabindex="0"><span icon="insert" aria-hidden="true" class="bp3-icon bp3-icon-insert"><svg data-icon="insert" width="16" height="16" viewBox="0 0 16 16"><path d="M5 9h2v2c0 .6.4 1 1 1s1-.4 1-1V9h2c.6 0 1-.4 1-1s-.4-1-1-1H9V5c0-.6-.4-1-1-1s-1 .4-1 1v2H5c-.6 0-1 .4-1 1s.4 1 1 1zm10-9H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 14H2V2h12v12z" fill-rule="evenodd"></path></svg></span></button></span></div>-->
   <!-- <a-button @click="temp()">dsfsdfsdfsdfsdfsdf</a-button>-->
  </div>

</template>

<script lang="ts" setup>
import Konva from "konva";
import { ref,onMounted,watchEffect,watch } from "vue";
import { useElementSize } from '@vueuse/core'

  const container= ref(null);
  const mainboard= ref(null);
  const { width, height } = useElementSize(mainboard);
  //const test = useElementSize(mainboard);
  let stage=null;

  watchEffect(()=>{
    //save()
    //console.log("sdfsdfsdfsdfsdfsdf");
    //console.log(test,"this is test");
  })

   watch([width,height],()=>{
     //console.log("sdfsdfsdfsdfsdfsdf");
     stage.size({
       width: width.value,
       height: height.value
     });
   })



 /*function temp(){
      alert('sdfgdsfgdfgd');
      stage.size({
        width: 100,
        height: 200
      });
 }*/



  onMounted(()=>{
    //console.log("dsfdsfsdf",container);
    //const width =1040//window.innerWidth;
    //const height =750//window.innerHeight;
    stage = new Konva.Stage({
      container: container.value,
      width: width.value,
      height: height.value,
    });
    var layer = new Konva.Layer({
      //x : width.value  / 2,
      //y : height.value / 2
      //width: 150,
      //height: 150,
    });

    stage.add(layer);
    //layer.toCanvas();

    var text1 = new Konva.Text({
      x: 50,
      y: 70,
      fontSize: 30,
      text: 'keepRatio = true',
      draggable: false,
    });
    layer.add(text1);

    var tr1 = new Konva.Transformer({
      nodes: [text1],
      keepRatio: true,
      enabledAnchors: [
        //'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      draggable: true,
    });
    layer.add(tr1);

    var text2 = new Konva.Text({
      x: 50,
      y: 200,
      fontSize: 30,
      text: 'keepRatio = false',
      draggable: true,
    });
    layer.add(text2);

    var tr2 = new Konva.Transformer({
      nodes: [text2],
      keepRatio: false,
      enabledAnchors: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
    });
    layer.add(tr2);
    //console.log("dsfdsfsdf",container);
  })

// export default {
// name: "Stage"
// }
</script>

<style >
.konvajs-content
{
  /*background: #fff;*/
}
</style>
