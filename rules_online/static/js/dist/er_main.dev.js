"use strict";

var gameCanvas;
var avatarImage;
var enemyImage;
var mouse = new Object();
var magnify = true;
var newCanvas = $("<canvas>").attr("width", 70).attr("height", 70)[0];
mouse.clickTime = 0;
var paused = true;
var debugMode = false; // used to trace out event listeners

var listeners = new Array();
var canvases = new Array();
var mouseReleaseCallbacks = new Array();
var game = new Object();
game.loops = new Array();
var display = new Object();
display.objects = new Array();
display.index = 0;
var Event = new Object();
Event.CLICK = "click";
Event.RELEASE = "release";
var currentTarget;
var hasClicked = false;
var mouse = {
  x: 0,
  y: 0
};
var drag = {
  isDragging: false,
  target: null
};
var num = 0;
var ipad;
setInterval(myLoop, 30);

function initCanvas(canvas) {
  gameCanvas = document.getElementById(canvas);
  canvases.push(gameCanvas);
  var myColor = "#FF0000";
  var myFont = "14px Arial";
  var mySize = 14; //writeText("no obj! "+canvas,50,250,myFont,myColor)
  // if(canvas== "gameCanvas1")myText1 = new display.newText("no obj! "+canvas+" - "+display.objects.length,50,200,myFont,mySize,myColor);
  //  if(canvas== "gameCanvas2")myText2 = new display.newText("no obj! "+canvas+" - "+display.objects.length,50,200,myFont,mySize,myColor);

  iphone = window.navigator.userAgent.match('iPhone') || window.navigator.userAgent.match('iPod') ? true : false;
  ipad = window.navigator.userAgent.match('iPad') ? true : false; //if(!role){

  if (iphone || ipad) {
    gameCanvas.addEventListener("touchmove", mouseMove, false);
    gameCanvas.addEventListener('touchstart', testClick, false);
    gameCanvas.addEventListener('touchend', mouseUp, false); //  $(gameCanvas).bind('touchmove',mouseMove);
    // $(gameCanvas).bind('touchstart',testClick);
    // $(gameCanvas).bind('touchmove',mouseUp);
  } else {
    if (gameCanvas.addEventListener) {
      gameCanvas.addEventListener("mousedown", testClick);
      gameCanvas.addEventListener("mousemove", mouseMove);
      gameCanvas.addEventListener("mouseup", mouseUp);
    } else if (gameCanvas.attachEvent) {
      //el.attachEvent('onclick', modifyText);
      gameCanvas.attachEvent("mousedown", testClick);
      gameCanvas.attachEvent("mousemove", mouseMove);
      gameCanvas.attachEvent("mouseup", mouseUp);
    }
  } //  }

}

function myLoop() {
  loopDisplayObjects(); /// check for loops pushed into this loop

  for (var i = 0; i < game.loops.length; i++) {
    game.loops[i]();
  }
}

function loopDisplayObjects() {
  var redraw = false; // var ar = display.objects.slice();; // create a clone of the display array

  var ar = display.objects; // loop through array to see if there's been any changes

  for (var i = 0; i < ar.length; i++) {
    if (ar[i].flag) {
      redrawDisplayObjects(ar);
      break;
    }
  }

  ar = []; // remove ar
} // draw all display objects


function redrawDisplayObjects(ar, updateAll) {
  // clear all canvases
  //  for(var i= 0;i<canvases.length;i++){
  //  clearCanvas(canvases[i]);
  // }
  clearCanvas(gameCanvas);
  var ob;

  for (var i = 0; i < ar.length; i++) {
    ob = ar[i]; //if(ob.type == "text" || ob.type == "rectangle"){
    //if(ob.flag == true){

    if (ob.canvas == gameCanvas || updateAll) {
      ob.update();
    } // }
    //  }

  }
} // check if mouse is up


function mouseUp(e) {
  gameCanvas = e.target;
  /*iphone = ((window.navigator.userAgent.match('iPhone'))||(window.navigator.userAgent.match('iPod')))?true:false;
    ipad = (window.navigator.userAgent.match('iPad'))?true:false;
  
  
  
  
  
  if(e.offsetX) {
          mouse.x = e.offsetX;
          mouse.y = e.offsetY;
      }
      else if(e.layerX) {
          mouse.x = e.layerX;
          mouse.y = e.layerY;
   }
     
     
  var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;
  
    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)
  
    mouse.x = e.pageX - totalOffsetX;
    mouse.y = e.pageY - totalOffsetY;
    
    
    
    
  
    if ((iphone)||(ipad)){ //iPad
        mouse.x = e.touches[0].clientX- totalOffsetX;
        mouse.y = e.touches[0].clientY- totalOffsetY;;
        
        
        
        alert("end x = "+mouse.x+" _ y = "+mouse.y);
    }
    
   */
  //console.log("upfunction");

  if (hasClicked) {
    hasClicked = false; // cycle through call backs

    for (i = 0; i < mouseReleaseCallbacks.length; i++) {
      mouseReleaseCallbacks[i].apply(null);
    }

    checkMouseUpListener(mouse, Event.RELEASE);
    if (drag.isDragging) drag.isDragging = false;
  }
} // move mouse on stage


function mouseMove(e) {
  //e.preventDefault()
  gameCanvas = e.target;

  if (e.offsetX) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  } else if (e.layerX) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  }

  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  } while (currentElement = currentElement.offsetParent);

  mouse.x = e.pageX - totalOffsetX;
  mouse.y = e.pageY - totalOffsetY;
  iphone = window.navigator.userAgent.match('iPhone') || window.navigator.userAgent.match('iPod') ? true : false;
  ipad = window.navigator.userAgent.match('iPad') ? true : false;

  if (iphone || ipad) {
    //iPad
    // mouse.x = e.touches[0].clientX- totalOffsetX;
    //mouse.y = e.touches[0].clientY- totalOffsetY;;
    // mouse.x = e.targetTouches[0].pageX - totalOffsetX;
    // mouse.y = e.targetTouches[0].pageY - totalOffsetY;
    mouse.x = e.targetTouches[0].pageX - totalOffsetX;
    mouse.y = e.targetTouches[0].pageY - totalOffsetY; // alert("x = "+clickX.x+" _ y = "+clickX.y);
  }

  if (drag.isDragging && drag.target.canvas == gameCanvas) {
    e.preventDefault();
    if (drag.target.lockY) var newY = drag.target.y;else newY = mouse.y - mouse.clickY; //drag.target.set({x:mouse.x-mouse.clickX,y:newY});
    ////console.log(drag.target.rect.width);

    drag.target.set({
      x: mouse.x - drag.target.rect.width / 2,
      y: newY
    });
  }

  if (drag.isDragging) showMagnify();
}

function showMagnify() {
  if (magnify && (iphone || ipad)) {
    $('#magnifyDiv').css('display', 'block'); //$('#magpicDiv').css('display','block');

    var $ii = $('#' + gameCanvas.id); //console.log($ii,gameCanvas.id);

    var posY = $ii.position().top + mouse.y;
    var posX = $ii.position().left + mouse.x;
    var currentElement = this;
    var totalOffsetX = 0;
    var totalOffsetY = 0;

    do {
      totalOffsetX += currentElement.offsetLeft;
      totalOffsetY += currentElement.offsetTop;
    } while (currentElement = currentElement.offsetParent);

    $('#magnifyDiv').css({
      left: posX - 70,
      top: posY - 180
    }); // $('#magpicDiv').css({
    //    left:  posX-70+4,
    //    top:   posY-180+4
    // });

    var ctx = gameCanvas.getContext("2d");
    var imgData = ctx.getImageData(mouse.x - 35, mouse.y - 35, 70, 70);
    var c = document.getElementById("magnify");
    var ctx2 = c.getContext("2d");
    c.width = 140; // 
    //ctx2.drawImage(gameCanvas, dx, dy, dw, dh)

    newCanvas.getContext("2d").putImageData(imgData, 0, 0); // circle clip
    //Draw the Circle Mask.

    ctx2.beginPath(); // (centerX, centerY, radius, starting angle, end angle, counter clockwise)

    ctx2.arc(70, 70, 70, 0, Math.PI * 2, false); //  ctx2.fill();
    //Makes the circle into a mask.

    ctx2.clip(); //ctx2.putImageData(imgData,0,0,140,140);

    ctx2.scale(2, 2);
    ctx2.drawImage(newCanvas, 0, 0);
  } else {
    $('#magnifyDiv').css('display', 'none'); // $('#magpicDiv').css('display','none');
  }
} //update listeners for the attached object
/// click mouse on stage


function testClick(e) {
  // check click
  gameCanvas = e.target;
  var timeInMs = Date.now();
  var timeDiff = timeInMs - mouse.clickTime;
  if (!timeDiff) timeDiff = 202; //console.log(timeDiff);

  mouse.clickTime = timeInMs;
  iphone = window.navigator.userAgent.match('iPhone') || window.navigator.userAgent.match('iPod') ? true : false;
  ipad = window.navigator.userAgent.match('iPad') ? true : false; /// CHECK HOW MUCH TIME HAS PASSED SINCE CLICKING

  if (timeDiff > 100 || !iphone && !ipad) {
    hasClicked = true; //console.log("TIME> "+(timeDiff));
    //e.preventDefault()

    var clickX = new Object();

    if (e.offsetX) {
      clickX.x = e.offsetX;
      clickX.y = e.offsetY;
    } else if (e.layerX) {
      clickX.x = e.layerX;
      clickX.y = e.layerY;
    }

    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
      totalOffsetX += currentElement.offsetLeft;
      totalOffsetY += currentElement.offsetTop;
    } while (currentElement = currentElement.offsetParent);

    clickX.x = e.pageX - totalOffsetX;
    clickX.y = e.pageY - totalOffsetY;

    if (iphone || ipad) {
      //iPad
      //clickX.x = e.touches[0].clientX- totalOffsetX;
      //clickX.y = e.touches[0].clientY- totalOffsetY;;
      clickX.x = e.targetTouches[0].pageX - totalOffsetX;
      clickX.y = e.targetTouches[0].pageY - totalOffsetY; // alert("x = "+clickX.x+" _ y = "+clickX.y);
    }

    mouse.x = clickX.x;
    mouse.y = clickX.y;
    /*
    
    iphone = ((window.navigator.userAgent.match('iPhone'))||(window.navigator.userAgent.match('iPod')))?true:false;
      ipad = (window.navigator.userAgent.match('iPad'))?true:false;
      if (((iphone)||(ipad))&&(e.touches[0])){ //iPad
          e._x = e.touches[0].clientX;
          e._y = e.touches[0].clientY;
      }
      else if (e.layerX || e.layerX == 0) { // Firefox
          e._x = e.layerX;
          e._y = e.layerY;
      }
      else if (e.offsetX || e.offsetX == 0) { // Opera
          e._x = e.offsetX;
          e._y = e.offsetY;
      }
    
            mouse.x = e._x;
            mouse.y = e._y;
    
    gameCanvas = e.target;
    
    var myColor = "#FF0000"
    var myFont = "14px Arial";
    
    */
    //if(debugMode)//console.log(mouse.x,mouse.y);
    //clearCanvas(gameCanvas);
    //writeText("clicked on canvas @ "+clickX.x+", "+clickX.y,50,250,myFont,myColor)
    //alert(e.target);
    //	alert(myText)
    //console.log("clickfunction");

    checkMouseListener({
      x: mouse.x,
      y: mouse.y
    }, Event.CLICK, e); //  //console.log(mouse.x+" - "+mouse.y);
  } //if( drag.isDragging)showMagnify();

}
/*

CHECK MOUSE UP LISTENER

*/


function checkMouseUpListener(ob, e) {
  $('#magnifyDiv').css('display', 'none');
  $('#magpicDiv').css('display', 'none');

  if (currentTarget) {
    // cycle through display obs
    for (i = 0; i < listeners.length; i++) {
      if (checkRect(listeners[i].parent, ob.x, ob.y) == true && listeners[i].canvas == gameCanvas && listeners[i].event == e && listeners[i].parent == currentTarget.parent) {
        //console.log(listeners[i]);// trace out event object if debug mode one
        listeners[i].clickX = mouse.clickX = ob.x - listeners[i].parent.x; // set where clicked inside the rect

        listeners[i].clickY = mouse.clickY = ob.y - listeners[i].parent.y;
        currentTarget = listeners[i]; //if(listeners[i].event == Event.RELEASE)currentTarget = null;

        /*
        
        //check if should start dragging
        if(listeners[i].parent.isDraggable && e == Event.CLICK){
          listeners[i].parent.startDrag();
          //
          // make index the highest
          
           listeners[i].parent.index = display.getNewIndex();
           
          // sort indexes
          
          display.sortIndex();
        
        }
        */
        //console.log(">current target = "+currentTarget.parent.text);

        var params = listeners[i].params.slice(); //optional paramaters passed to function

        params.reverse();
        params.push(listeners[i]);
        params.reverse();
        listeners[i].returnFunction.apply(null, params);
        break;
      }
    }
  }
}
/*

CHECK MOUSE LISTENER

*/


function checkMouseListener(ob, e, event) {
  //console.log("check mouse listener");
  // cycle through display obs
  for (i = 0; i < listeners.length; i++) {
    //if(listeners[i].canvas == gameCanvas)//console.log(">>"+listeners[i].event, e);
    if (checkRect(listeners[i].parent, ob.x, ob.y) == true && listeners[i].canvas == gameCanvas && listeners[i].event == e) {
      //console.log("mu listerners >"+listeners[i]);// trace out event object if debug mode one
      listeners[i].clickX = mouse.clickX = ob.x - listeners[i].parent.x; // set where clicked inside the rect

      listeners[i].clickY = mouse.clickY = ob.y - listeners[i].parent.y;
      currentTarget = listeners[i]; //event.preventDefault();  // stop iphone screen from scrolling
      //if(listeners[i].event == Event.RELEASE)currentTarget = null;

      /*
      
      //check if should start dragging
      if(listeners[i].parent.isDraggable && e == Event.CLICK){
        listeners[i].parent.startDrag();
        //
        // make index the highest
        
         listeners[i].parent.index = display.getNewIndex();
         
        // sort indexes
        
        display.sortIndex();
      
      }
      */
      //console.log("current target = "+currentTarget);

      var params = listeners[i].params.slice(); //optional paramaters passed to function

      params.reverse();
      params.push(listeners[i]);
      params.reverse();
      listeners[i].returnFunction.apply(null, params);
      break;
    }
  } //if(myob.rf)myob.rf();
  //alert(myob.mytemp);

}
/*

CREATE A NEW TEXT BOX

*/


display.newText = function (text, x, y, font, fontSize, fontColor, returnFunction) {
  // associate with a canvas
  this.name;
  this.index = display.getNewIndex();
  this.canvas = gameCanvas;
  this.taken = false; // taken is used for drop boxes.. to see if the slot is filled or not

  this.alpha = 1;
  this.type = "text";
  this.text = text; // the text to display

  this.x = x; // the x coord

  this.y = y; // the y coord

  this.height = fontSize; // get the width

  var ctx = this.canvas.getContext("2d");
  ctx.font = this.fontSize + "px " + this.font;
  var text_ctx = ctx.measureText(text);
  this.width = text_ctx.width;
  this.resetText = text;
  this.font = font; // font

  this.fontSize = fontSize;
  this.fontColor = fontColor;
  this.rect = new Rectangle({
    x: x,
    y: y,
    width: this.width,
    height: fontSize
  });
  this.showRect = false;
  this.highlight = false;
  this.underline = false;
  this.isDraggable = false;
  this.dragTarget = null;
  this.flag = true; // this flag checks if we need to update the text;

  this.listener; //this.rf = clickedText;
  //alert(this.rf);

  this.set = function (ob) {
    //  use this to change settings for the text
    // update alpha
    if (ob.alpha) {
      this.alpha = ob.alpha;
    } // update x


    if (ob.x) {
      this.x = this.rect.x = ob.x;
      this.rect.center.x = this.x + this.width / 2;
    } //update y


    if (ob.y) {
      this.y = this.rect.y = ob.y;
      this.rect.center.y = this.y + this.height / 2;
    } // update text


    if (ob.text) {
      this.text = ob.text;
      ctx.font = this.fontSize + "px " + this.font;
      var text_ctx = ctx.measureText(this.text);
      var newWidth = text_ctx.width;
      this.width = this.rect.width = newWidth;
      this.rect = new Rectangle({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.fontSize,
        parent: this
      });
      this.rect.center.x = this.x + this.width / 2;
      this.rect.center.y = this.y + this.height / 2;
      this.rect.x = this.x;
      this.rect.y = this.y;
    } //update font


    if (ob.font) {
      this.font = ob.font;
    } //update fontSize


    if (ob.fontSize) {
      this.fontSize = ob.fontSize;
    } //update fontColor


    if (ob.fontColor) {
      this.fontColor = ob.fontColor;
    } //set return function


    if (ob.rf) {
      this.rf = ob.rf;
    } // update width / center


    ctx.font = this.fontSize + "px " + this.font;
    var text_ctx = ctx.measureText(this.text);
    var newWidth = text_ctx.width;
    this.flag = true;
  };

  this.update = function () {
    // redraws the text object
    //update the width of the text
    //var ctx= this.canvas.getContext("2d");
    ctx.font = this.fontSize + "px " + this.font;
    var text_ctx = ctx.measureText(this.text);
    var newWidth = text_ctx.width; // if(newWidth!=this.width){

    this.width = this.rect.width = newWidth; //this.rect = new Rectangle({x:this.x,y:this.y,width:this.width,height:this.fontSize,parent:this});

    this.rect = new Rectangle({
      x: this.x - 2,
      y: this.y,
      width: this.width + 4,
      height: this.fontSize + 5,
      parent: this
    });
    this.rect.center.x = this.x + this.width / 2;
    this.rect.center.y = this.y + this.height / 2; //}
    // // shows the bouding box (or hightlights);
    // if(this.showRect){

    if (this.highlight) {
      ctx.fillStyle = "#FFFF00";
      ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    } else if (this.showRect) {
      if (drag.isDragging && drag.target == this) ctx.globalAlpha = 0.7; //works with images
      else ctx.globalAlpha = 0.8; //ctx.fillStyle = "#FFFFFF";

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
      ctx.strokeStyle = "#333333";
      ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
      ;
    } else if (this.underline) {
      ctx.fillStyle = "#F00000";
      ctx.fillRect(this.rect.x, this.rect.y + this.rect.height, this.rect.width, 2);
    } // }


    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.fontColor; // text color

    ctx.fillText(this.text, this.x, this.y + this.height);
    this.flag = false;
  }; //  check if should start draggin


  this.startDrag = function () {
    drag.isDragging = true;
    drag.target = this;
  }; // add an event listener to the text, we can pass event type and a return function


  this.addEventListener = function (event, returnFunction, ob) {
    var eventOb = new Object();
    eventOb.params = ob.params;
    eventOb.canvas = gameCanvas;
    eventOb.parent = this;
    eventOb.event = event;
    eventOb.returnFunction = returnFunction; //  if(debugMode)//console.log( eventOb.returnFunction);

    listeners.push(eventOb);
    this.listener = eventOb;
  };

  display.objects.push(this);
  this.set({
    text: text
  });
  return this; // return the object
};
/*

CREATE A NEW DISPLAY RECTANGLE

*/


display.newRect = function (x, y, width, height, color, text, font, fontSize, fontColor) {
  // associate with a canvas
  this.name;
  this.index = display.getNewIndex();
  this.canvas = gameCanvas;
  this.type = "rectangle";
  this.x = x; // the x coord

  this.y = y; // the y coord

  this.height = height;
  this.width = width;
  this.color = color;
  this.center = new Object();
  this.center.x = this.x + this.width / 2;
  this.center.y = this.y + this.height / 2;
  this.rect = new Rectangle({
    x: x,
    y: y,
    width: this.width,
    height: this.height
  });

  if (text) {
    this.text = text; // the text to display

    this.font = font; // font

    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.resetText = text;
  } else {
    this.text = false;
    this.resetText = false;
  }

  this.showRect = true;
  this.highlight = true;
  this.outline = false;
  this.isDraggable = false;
  this.flag = true; // this flag checks if we need to update the text;

  this.listener; //this.rf = clickedText;
  //alert(this.rf);
  // resets the text to what it was

  this.set = function (ob) {
    //  use this to change settings for the text
    // update text
    if (ob.text) {
      this.text = ob.text;
      this.flag = true;
    } // update x


    if (ob.x) {
      this.x = this.rect.x = ob.x;
      this.rect.center.x = this.x + this.width / 2;
    } //update y


    if (ob.y) {
      this.y = this.rect.y = ob.y;
      this.rect.center.y = this.y + this.height / 2;
    } // update width


    if (ob.width) {
      this.width = ob.width;
    } //update height


    if (ob.height) {
      this.height = ob.height;
    } //update font


    if (ob.font) {
      this.font = ob.font;
    } //update fontSize


    if (ob.fontSize) {
      this.fontSize = ob.fontSize;
    } //update fontColor


    if (ob.fontColor) {
      this.fontColor = ob.fontColor;
    } //update color


    if (ob.color) {
      this.color = ob.color;
    }

    this.flag = true;
  };

  this.update = function () {
    // redraws the text object
    //update the width of the text
    var ctx = this.canvas.getContext("2d"); // if(debugMode)//console.log(this);

    if (this.highlight) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      ctx.strokeStyle = "color";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    if (this.text) {
      ctx.font = this.fontSize + "px " + this.font;
      ctx.fillStyle = this.fontColor; // text color

      ctx.fillText(this.text, this.x, this.y + this.height);
    }

    this.flag = false;
  }; //  check if should start draggin


  this.startDrag = function () {
    drag.isDragging = true;
    drag.target = this;
  }; // add an event listener to the text, we can pass event type and a return function


  this.addEventListener = function (event, returnFunction, ob) {
    var eventOb = new Object();
    eventOb.params = ob.params;
    eventOb.canvas = gameCanvas;
    eventOb.parent = this;
    eventOb.event = event;
    eventOb.returnFunction = returnFunction; //console.log( eventOb.returnFunction);

    listeners.push(eventOb);
    this.listener = eventOb;
  };

  display.objects.push(this);
  return this; // return the object
};
/*

CREATE A NEW DISPLAY IMAGE

*/


display.newImage = function (image, src, x, y) {
  // associate with a canvas
  this.image = src;
  this.index = display.getNewIndex();
  this.name;
  this.canvas = gameCanvas;
  this.type = "image";
  this.x = x; // the x coord

  this.y = y; // the y coord

  this.image.src = image;
  var ctx = this.canvas.getContext("2d");
  ctx.drawImage(this.image, this.x, this.y);
  this.width = this.image.width;
  this.height = this.image.height;
  this.center = new Object();
  this.center.x = this.x + this.width / 2;
  this.center.y = this.y + this.height / 2;
  this.rect = new Rectangle({
    x: x,
    y: y,
    width: this.width,
    height: this.height
  });
  this.showRect = false;
  this.isDraggable = false;
  this.flag = true; // this flag checks if we need to update the text;

  this.listener; //this.rf = clickedText;
  //alert(this.rf);

  this.set = function (ob) {
    //  use this to change settings for the text
    // update image src
    if (ob.src) {
      this.image.src = ob.src;
    } // update x


    if (ob.x) {
      this.x = this.rect.x = ob.x;
      this.rect.center.x = this.x + this.width / 2;
    } //update y


    if (ob.y) {
      this.y = this.rect.y = ob.y;
      this.rect.center.y = this.y + this.height / 2;
    } // update width


    if (ob.width) {
      this.width = ob.width;
    } //update height


    if (ob.height) {
      this.height = ob.height;
    }

    this.flag = true;
  };

  this.update = function () {
    // redraws the text object
    //update the width of the text
    var ctx = this.canvas.getContext("2d"); //if(debugMode)//console.log(this);

    ctx.drawImage(this.image, this.x, this.y);
    this.flag = false;
  }; //  check if should start draggin


  this.startDrag = function () {
    drag.isDragging = true;
    drag.target = this;
  }; // add an event listener to the text, we can pass event type and a return function


  this.addEventListener = function (event, returnFunction, ob) {
    var eventOb = new Object();
    eventOb.params = ob.params;
    eventOb.canvas = gameCanvas;
    eventOb.parent = this;
    eventOb.event = event;
    eventOb.returnFunction = returnFunction; //console.log( eventOb.returnFunction);

    listeners.push(eventOb);
    this.listener = eventOb;
  };

  display.objects.push(this);
  return this; // return the object
};
/*

THIS WILL SORT THE DISPLAY LIST

*/


display.getNewIndex = function () {
  // increase index
  display.index += 1; // return new index

  return display.index;
};

display.sortIndex = function () {
  display.objects.sort(compareIndex);
};

function compareIndex(a, b) {
  return a.index - b.index;
}
/*

CREATE A NEW DISPLAY OBJECT BASE

*/


display.newObject = function (name, x, y) {
  // associate with a canvas
  this.name = name;
  this.canvas = gameCanvas;
  this.type = "displayobject";
  this.x = x; // the x coord

  this.y = y; // the y coord

  this.height = 0;
  this.width = 0;
  this.rect = new Rectangle({
    x: x,
    y: y,
    width: this.width,
    height: this.height
  });
  this.showRect = true;
  this.isDraggable = false;
  this.listener; //  check if should start draggin

  this.startDrag = function () {
    drag.isDragging = true;
    drag.target = this;
  }; // add an event listener to the text, we can pass event type and a return function


  this.addEventListener = function (event, returnFunction, ob) {
    var eventOb = new Object();
    eventOb.params = ob.params;
    eventOb.canvas = gameCanvas;
    eventOb.parent = this;
    eventOb.event = event;
    eventOb.returnFunction = returnFunction; //console.log( eventOb.returnFunction);

    listeners.push(eventOb);
    this.listener = eventOb;
  };

  return this; // return the object
};
/*

DRAWS A Rectangle

*/


function drawRect(ob, r) {
  var context = gameCanvas.getContext('2d');
  context.fillStyle = "rgb(250,250,0)";
  context.fillRect(r.x, r.y, ob.width, ob.height);
}

function Rectangle(ob, drawRect) {
  var r = new Object();
  r.parent = ob.parent;
  r.type = "rectangle";
  r.x = ob.x;
  r.y = ob.y;
  r.width = ob.width;
  r.height = ob.height;
  r.center = new Object();
  r.center.x = ob.x + ob.width / 2;
  r.center.y = ob.y + ob.height / 2;

  if (drawRect) {
    var context = gameCanvas.getContext('2d');
    context.fillStyle = "rgb(250,250,0)";
    context.fillRect(r.x, r.y, ob.width, ob.height);
  }

  return r;
}

function checkRect(ob, x, y) {
  var isCollision = false;
  var left = ob.x;
  var right = ob.x + ob.rect.width + 1;
  var top = ob.y;
  var bottom = ob.y + ob.rect.height;

  if (right >= x && left <= x && bottom >= y && top <= y) {
    isCollision = true;
  } //if(isCollision)//console.log("> "+x+"_"+y+"_"+isCollision)


  return isCollision;
}

function collides(rects, x, y) {
  var isCollision = false;

  for (var i = 0, len = rects.length; i < len; i++) {
    var left = rects[i].rect.x;
    var right = rects[i].rect.x + rects[i].rect.w;
    var top = rects[i].rect.y;
    var bottom = rects[i].rect.y + rects[i].rect.h;

    if (right >= x && left <= x && bottom >= y && top <= y) {
      isCollision = rects[i];
    }
  } //alert(rects.length+"_"+x+"_"+y+"_"+isCollision)


  return isCollision;
}

function getMouseCoords(e) {
  //	mouse.x = mouseEvent.offsetX;
  //	mouse.y = mouseEvent.offsetY;
  if (e.offsetX) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  } else if (e.layerX) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  }
}

function getTouchCoords(ev) {
  e.preventDefault(); //	mouse.x = e.targetTouches[0].pageX - gameCanvas.offsetLeft;
  //  mouse.y = e.targetTouches[0].pageY - gameCanvas.offsetTop;
  //  mouse.x = event.targetTouches[0].pageX,
  // mouse.y = event.targetTouches[0].pageY

  iphone = window.navigator.userAgent.match('iPhone') || window.navigator.userAgent.match('iPod') ? true : false;
  ipad = window.navigator.userAgent.match('iPad') ? true : false;

  if ((iphone || ipad) && ev.touches[0]) {
    //iPad
    ev._x = ev.touches[0].clientX;
    ev._y = ev.touches[0].clientY;
  } else if (ev.layerX || ev.layerX == 0) {
    // Firefox
    ev._x = ev.layerX;
    ev._y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) {
    // Opera
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
  }

  mouse.x = ev._x;
  mouse.y = ev._y; // alert(mouse.x+" - "+mouse.y);
}

function mainLoop() {
  if (!paused) {
    checkDrag();
    clearCanvas();
    renderText();
    renderInstructions();
  }
}

function drawLine() {
  var ctx = gameCanvas.getContext("2d");
  ctx.moveTo(enemyImage._x, enemyImage._y);
  ctx.lineTo(avatarImage._x, avatarImage._y);
  ctx.stroke();
}

function writeText(text, x, y, font, color) {
  var ctx = gameCanvas.getContext("2d");
  ctx.font = font;
  ctx.fillStyle = color; // text color

  ctx.fillText(text, x, y);
}

function clearCanvas(canvas) {
  var w = canvas.width;
  var h = canvas.height; //canvas.width = canvas.width; // erase contents of the page

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
} // handy clone object 


function cloneObject(source) {
  for (i in source) {
    if (typeof source[i] == 'source') {
      this[i] = new cloneObject(source[i]);
    } else {
      this[i] = source[i];
    }
  }
} //var obj1= {bla:'blabla',foo:'foofoo',etc:'etc'};
//var obj2= new cloneObject(obj1);
//setUp();