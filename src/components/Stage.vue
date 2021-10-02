<template>
<!--  overflow-auto-->
  <div class="relative h-screen" ref="mainboard">
    <!--<a-button id="test" style="z-index: 1000">
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color"
              d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z"/>
      </svg>
    </a-button>-->
      <div id="container-0" ref="container"></div>
<!--      <div id="container-1" ref="container"></div>-->
    <!--<div style="position: absolute; top: 5px; right: 351.5px;"><span aria-haspopup="true" class="bp3-popover2-target"><button type="button" class="bp3-button bp3-minimal" tabindex="0"><span icon="duplicate" aria-hidden="true" class="bp3-icon bp3-icon-duplicate"><svg data-icon="duplicate" width="16" height="16" viewBox="0 0 16 16"><path d="M15 0H5c-.55 0-1 .45-1 1v2h2V2h8v7h-1v2h2c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 4H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10H2V6h8v8z" fill-rule="evenodd"></path></svg></span></button></span><span aria-haspopup="true" class="bp3-popover2-target"><button type="button" class="bp3-button bp3-minimal" tabindex="0"><span icon="insert" aria-hidden="true" class="bp3-icon bp3-icon-insert"><svg data-icon="insert" width="16" height="16" viewBox="0 0 16 16"><path d="M5 9h2v2c0 .6.4 1 1 1s1-.4 1-1V9h2c.6 0 1-.4 1-1s-.4-1-1-1H9V5c0-.6-.4-1-1-1s-1 .4-1 1v2H5c-.6 0-1 .4-1 1s.4 1 1 1zm10-9H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 14H2V2h12v12z" fill-rule="evenodd"></path></svg></span></button></span></div>-->
   <!-- <a-button>
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color"
              d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z"/>
      </svg>
    </a-button>-->
  </div>

</template>

<script lang="ts" setup>
import Konva from "konva";
import {stageStore} from "../core";
import {Shape } from 'konva/lib/Shape'
import {ref, onMounted, watchEffect, watch, inject} from "vue";
import {useElementSize} from '@vueuse/core'



/*const container = ref(null);*/
/*


const test = ref(null)
*/
const mainboard = ref(null);
const {width, height} = useElementSize(mainboard);

/*const docWidth = ref(350);
const docHeight = ref(350);*/

 /*width.value= docWidth.value >  width.value ? docWidth.value + 120 : width.value;
  height.value =docHeight.value >   height.value ? docHeight.value +120  : height.value;*/


/*console.log(width.value,"this is width");
console.log(height.value,"this is height");*/

let stage = null;
let layer = null;

/*watchEffect(() => {

})*/

watch([width, height], () => {
 /* width.value= docWidth.value >  width.value ? docWidth.value : width.value;
  height.value =docHeight.value >   height.value ? docHeight.value : height.value;*/
  //draw();
  stageStore.resizeStage(width.value,height.value);
});



/*function draw() {

  /!*var rect1 = new Konva.Rect({
    x: 60,
    y: 60,
    width: 100,
    height: 90,
    fill: 'yellow',
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

  var text1 = new Konva.Text({
    x: 50,
    y: 70,
    fontSize: 30,
    name: 'text',
    text: 'keepRatio = true',
    draggable: true,
  });
  group.add(text1);

  var text2 = new Konva.Text({
    x: 50,
    y: 200,
    fontSize: 30,
    text: 'کمیسیون مشترک به منظور بحث در مورد مسیر پیش رو برای حصول اطمینان از اجرای مستمر توافق هسته ای در تمامی ابعاد آن و بررسی مسائل حل نشده ناشی از خروج یکجانبه آمریکا از این توافق و وضع مجدد تحریم هایی که وفق برجام و پیوست شماره دو آن رفع شده بود؛ موضوعی که عمیقا موجب تاسف اعضای کمیسیون مشترک گردیده است، تشکیل شد.',
    draggable: true,
    name: 'text',
  });
  group.add(text2);



  var tr = new Konva.Transformer({
    nodes: [],
    keepRatio: false,
    /!*enabledAnchors: [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',

    ],*!/
    draggable: true,

  });
  layer.add(tr);
*!/

// sample add button
 /!* const deleteButton = new Konva.Circle({
    radius: 10,
    fill: 'red'
  });
  tr.add(deleteButton);*!/
 /!* function updatePos() {
    //console.log(tr.findOne('.top-right').position());

    let pos = tr.findOne('.top-right')//.position();
    // at first lets find position of text node relative to the stage:
    var textPosition = pos.getAbsolutePosition();
    console.log(textPosition);

    // then lets find position of stage container on the page:
    var stageBox = stage.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    const btn = document.getElementById('test');
    btn.style.position = 'absolute';
    btn.style.top = areaPosition.y + 'px';
    btn.style.left = areaPosition.x + 'px';


    console.log(pos)

    /!* const btn=document.getElementById('test');
     //console.log(test.value.position);
     btn.style.position = 'absolute';
     btn.style.top = pos.y + 'px';
     btn.style.left = pos.x + 'px';*!/
    /!* test.style.width = textNode.width();*!/
    // deleteButton.position({x:pos.x+30,y:pos.y+20});
  }

  updatePos();

  rect1.on('transform', updatePos);*!/


  // add a new feature, lets add ability to draw selection rectangle
  /!*var selectionRectangle = new Konva.Rect({
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
   /!* if (!selectionRectangle.visible()) {
      return;
    }*!/
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });

    //.rect,.text
    var shapes = stage.find('.rect,.text');
    //var shapes = stage.getChildren();
    console.log(shapes,"this is shapes");
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    console.log(selected,"this is selected");
    stageStore.selectedElements=selected;

    tr.nodes(selected);
  });

  // clicks should select/deselect shapes
  stage.on('click tap', function (e) {
    //alert('sdfsdf');
    // if we are selecting with rect, do nothing
   /!* if (selectionRectangle.visible()) {
      return;
    }*!/

    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
  /!*  if (!e.target.hasName('rect')) {
      return;
    }*!/

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
      const sh : Shape=e.target as Shape
      stageStore.selectedElements=[sh];
      stageStore.opacity=sh.opacity() * 100;
      console.log([e.target],"this is 1")
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
      stageStore.selectedElements=nodes as Shape[];
      console.log(nodes,"trhis is 2");
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
      stageStore.selectedElements=nodes as Shape[];
      console.log(nodes,"this is 3");
    }*!/
  //});

}*/


onMounted(() => {
  /*stage = new Konva.Stage({
    container: container.value,
    width: width.value,
    height: height.value ,
  });*/
  stageStore.addPage('container-0',width.value,height.value);
  //draw();
  /*document.getElementsByTagName('canvas').bind("contextmenu",function(e){
    return false;
  });*/

  /*$('canvas').bind("contextmenu",function(e){
    return false;
  });*/

 // document.oncontextmenu = new Function("return false");
 // let canvas = document.getElementsByTagName('canvas')[0];
 // canvas.oncontextmenu = function() {return false};
  //canvas.oncontextmenu = new Function("return false");
  //[0].addEventListener('contextmenu', function (e) {  return false; });
  //console.log("dsfsdfd",canvas);
})
</script>

<style>
/*#large-container {
  width: 800px;
  height: 800px;
  overflow: hidden;
}

#scroll-container {
  width: calc(100% - 22px);
  height: calc(100vh - 300px);
  overflow: auto;
  margin: 10px;
  border: 1px solid grey;
}*/
</style>
