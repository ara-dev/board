<template>
  <div class="relative" ref="mainboard">
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
import {ref, onMounted, watchEffect, watch} from "vue";
import {useElementSize} from '@vueuse/core'

const container = ref(null);
const mainboard = ref(null);
const {width, height} = useElementSize(mainboard);
let stage = null;
let layer = null;

watchEffect(() => {

})

watch([width, height], () => {
  //console.log("sdfsdfsdfsdfsdfsdf");
  /*stage.size({
    width: width.value,
    height: height.value
  });*/
  draw();

  //layer.draw();


})


/*function temp(){
     alert('sdfgdsfgdfgd');
     stage.size({
       width: 100,
       height: 200
     });
}*/
function draw() {
  //console.log("dsfdsfsdf",container);
  //const width =1040//window.innerWidth;
  //const height =750//window.innerHeight;
  //console.log( width.value,height.value,"erdfgdfgdfgdfgdfg");
  stage = new Konva.Stage({
    container: container.value,
    width: width.value,
    height: height.value,
    //x: 20,
    //y: 20,
    //width: 20,
    //height: 20
    //offsetX : -150,
    //rotation : 35,
    //visible: false ,
    //fill: 'red'
    //opacity : 0.5,
    //offsetX: 350,
    //offsetY:350,
  });


  //stage.container().style.backgroundColor = 'green';


  layer = new Konva.Layer({
    //x: 350,
    //y: 350,
    // clearBeforeDraw : true ,
     width:350,
     height:500,
    // draggable: true,
   /* clipX: 0,
    clipY: 0,
    clipWidth: stage.width(),
    clipHeight: stage.height(),*/
    // listening: true,
  });

  stage.add(layer);


  var group = new Konva.Group({
    x:0,
    y:0,
    width:350,
    height:500,
     clipX: 0,
    clipY: 0,
    clipWidth: 350,
    clipHeight: 500,
  });

  group.zIndex(100);

  layer.add(group);

  /* var con= new  Konva.Container({

   })*/

  /* layer.clip({
     x: 20,
     y: 20,
     width: 20,
     height: 20
   });*/

  var background = new Konva.Rect({
    x: 0,
    y: 0,
    width: 350,
    height: 500,
    fill: 'green',
    //fillLinearGradientStartPoint: { x: 0, y: 0 },
    //fillLinearGradientEndPoint: { x: stage.width(), y: stage.height() },
    // gradient into transparent color, so we can see CSS styles
    /*fillLinearGradientColorStops: [
      0,
      'yellow',
      0.5,
      'blue',
      0.6,
      'rgba(0, 0, 0, 0)',
    ],*/
    // remove background from hit graph for better perf
    // because we don't need any events on the background
    listening: false,
  });
  background.zIndex(100);
  group.add(background);



  /*var rect1 = new Konva.Rect({
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
  });

  layer.add(rect1);*/

  var rect1 = new Konva.Rect({
    x: 60,
    y: 60,
    width: 100,
    height: 90,
    fill: 'red',
    name: 'rect',
    draggable: true,
  });
  group.add(rect1);

  var rect2 = new Konva.Rect({
    x: 250,
    y: 100,
    width: 150,
    height: 90,
    fill: 'blue',
    name: 'rect',
    draggable: true,
  });
  group.add(rect2);


  /*var text1 = new Konva.Text({
    x: 50,
    y: 70,
    fontSize: 30,
    text: 'keepRatio = true',
    draggable: true,
  });*/

  //layer.add(text1);

  var tr = new Konva.Transformer({
    nodes: [],
    keepRatio: true,
    enabledAnchors: [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ],
    draggable: true,
  });

  layer.add(tr);


  // add a new feature, lets add ability to draw selection rectangle
  var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  layer.add(selectionRectangle);

  var x1, y1, x2, y2;
  stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
      return;
    }
    x1 = stage.getPointerPosition().x;
    y1 = stage.getPointerPosition().y;
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
  });

  stage.on('mousemove touchmove', () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
  });

  stage.on('mouseup touchend', () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });

    var shapes = stage.find('.rect');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
  });

  // clicks should select/deselect shapes
  stage.on('click tap', function (e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
      return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect')) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
  });









  /* var text2 = new Konva.Text({
     x: 50,
     y: 200,
     fontSize: 30,
     text: 'keepRatio = false',
     draggable: true,
   });
   layer.add(text2);*/

  /* var tr2 = new Konva.Transformer({
     nodes: [text2],
     keepRatio: false,
     enabledAnchors: [
       'top-left',
       'top-right',
       'bottom-left',
       'bottom-right',
     ],
   });
   layer.add(tr2);*/
}


onMounted(() => {
  draw();
})

// export default {
// name: "Stage"
// }
</script>

<style>
.konvajs-content {
  /*background: #fff;*/
}
</style>
