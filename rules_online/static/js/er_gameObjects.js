
var exercises = new Array();

var myExercises = new Array();

var answerArray = new Array();  // used when compiling answers\
var numberCorrect = 0; //  number of correct answers
var questionNum = 0;
var valid = true;

var userobs = new Object();

var isviewable = 0;

var dragArrays = new Array();    

var markerArray = new Array();       

var dragMarker; 


var submitFunction;


var showAnswer = 1;



var spellingWord;

var selectedWord;
var selectedTarget;


var blueColor = "#06C";
var blackColor = "#000000";
var redColor = "#ff0000";
var greyDots = "#BBB";
var blockColor = "#f1f4f4";
var blueLightColor = "#80abdc";
var greenColor = "#0C0";

var lightGreenColor = "#e6f7cc";
var lightRedColor = "#ffdbdb";

var rowheight = 40;
 var topPad = 5;
var leftPad = 50;
 var maxWidth = 740;

var rowNumber = 1;
var rowNumberA = 1;

var zindex = 10;


var imageComma;
var imageSemicolon;
var imageHyphen;
var imageFullstop;
var image66;
var image99;

var imageApostrophe;
var imageBracketLeft;
var imageBracketRight;
var imageQuestionMark;
var imageExclamationMark;
var imageForwardSlash;


var endlineMarker = "                                                                         ";
var startlineMarker = "                              ";

var baseURL = window.location.origin;

var commaURL=baseURL+'/wp/wp-content/themes/wordswork/images/comma.png';
var hyphenURL=baseURL+'/wp/wp-content/themes/wordswork/images/hyphen.png';
var fullstopURL=baseURL+'/wp/wp-content/themes/wordswork/images/fullstop.png';
var URL66=baseURL+'/wp/wp-content/themes/wordswork/images/66.png';
var URL99=baseURL+'/wp/wp-content/themes/wordswork/images/99.png';

var colonURL=baseURL+'/wp/wp-content/themes/wordswork/images/colon.png';
var semicolonURL=baseURL+'/wp/wp-content/themes/wordswork/images/semicolon.png';


var apostropheURL=baseURL+'/wp/wp-content/themes/wordswork/images/apostrophe.png';
var bracketLeftURL=baseURL+'/wp/wp-content/themes/wordswork/images/bracketLeft.png';
var bracketRightURL=baseURL+'/wp/wp-content/themes/wordswork/images/bracketRight.png';
var questionMarkURL=baseURL+'/wp/wp-content/themes/wordswork/images/questionMark.png';
var forwardSlashURL=baseURL+'/wp/wp-content/themes/wordswork/images/forwardSlash.png';
var exclamationMarkURL=baseURL+'/wp/wp-content/themes/wordswork/images/exclamation.png';


var sample = false;


var images = [[imageComma,commaURL],
                [imageSemicolon,semicolonURL],
                [imageHyphen,hyphenURL],
                [imageFullstop,fullstopURL],
                [image66,URL66],
                [image99,URL99],
                [imageApostrophe,apostropheURL],
                [imageBracketLeft,bracketLeftURL],
                [imageBracketRight,bracketRightURL],
                [imageQuestionMark,questionMarkURL],
                [imageForwardSlash,forwardSlashURL],
                [imageExclamationMark,forwardSlashURL]];

            


var dropDowns = [];

var r = "";






    function dummyFunction(e){
    
    }
    
    
    function randomiseArray(myarray){
    
        myarray.sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled
    
    }
    
    

    
    function isEven(value) {
        return (value%2 == 0);
    }
    
    
    
    function create(){
    
        jQuery('#spellingDIV').append('<select></select>');
    
    }
    
    
    
    function hideAllDropDowns(){
    
        for(var i = 0;i<dropDowns.length;i++){
        
             var $a = $("#"+dropDowns[i]);
            $a.css('display','none');
        
        }
        
        //////console.log("hiding");
    
    
    }
    
    
    function showHideDropDown(id,y,d){
    
        hideAllDropDowns();
    
    
        var $a = $("#exercise_"+id+"_"+y+"_d");
        $a.css('display',d);
        $a.css('left',mouse.x+"px");
        
         var $ii = $('#gameCanvas'+id);

            
        var pos = $ii.position().top+50;
         $a.css('top',pos+(mouse.y)-35+"px");
        
        //////console.log(d);
        
    }
    

    
    
    
    function createDropDown(obj,id,y){
    
    
         var exercise = "exercise_"+id;
    
         var create = '<div id="'+exercise+"_"+y+'_d" class="dropBlock">';
        
           //  create += '<li><a onclick="javascript:showlayer('exercise')"> Profile</a></li>;
        
             create += '<ul class="styled-select">';
             
              create += '<li id="topDrop" onclick="javascript:clickDropDown(\'reset\')" >reset</li>'
              
              create += "<hr>"
        
        for(var i = 0; i < obj.length;i++)
        {
        
             //   create += '<option value="'+obj[i]+'">'+obj[i]+'</option>';
             
             //////console.log(" OB = "+obj[i]);
                
                var mytext = obj[i];
                
                mytext =   soilString(mytext);
                
                mytext = encodeURIComponent(mytext)
                
                //////console.log("MYTEXT = "+mytext);
                
                
                create += '<li onclick="javascript:clickDropDown(\''+String(mytext)+'\')" >'+obj[i]+'</li>'
        }
    
        create += "</ul></div>";
       jQuery('#'+exercise).append(create);
                       
        

     var $ii = $('#gameCanvas'+id);
        
        
        
            
        var pos = $ii.position().top+50;
        
        //////console.log("pos = "+pos);
        //////console.log("y = :"+y);
        
        
        var $a = $("#"+exercise+"_"+y+"_d");
        
        var newY = ($a.position().top - pos);
        
        //////console.log($a.position());
        $a.css('position', 'absolute');
         $a.css('clear', 'both');
        $a.css('left',770+"px");
        $a.css('top',pos+(y)-55+"px");  // OLD
      // $a.css('top',newY+"px");
        $a.css('z-index',zindex);
        $a.css('display','none');
        
        zindex = zindex+1;
        
        
        //////console.log($a.position());

    
        dropDowns.push(exercise+"_"+y+"_d");
    
    
    }
    
    
    
    
    // check the value of an option
    
    function checkOptions(id){
    
       
    
         var $a = $("#"+id);
         
          //////console.log("-- "+id+"  - "+$a.val());
        
        return $a.val();
    
    
    }
    
    //obj is the list of option values
function createOptions(obj,id,y,answer)
{

        var exercise = "exercise_"+id;

        var create = '<div id="optDiv_'+id+'_'+y+'" class="styled-select"><select id="opt_'+id+'_'+y+'">';
        
        
        if(answer == "" || !answer){
        
        
             create += '<option value="null">Select</option>';
        
        for(var i = 0; i < obj.length;i++)
        {
                create += '<option value="'+obj[i]+'">'+obj[i]+'</option>';
        }
        
        
        }else{
            create += '<option value="null">'+answer+'</option>';
        
        }
    
        create += '</select></div>';
        jQuery('#'+exercise).append(create);
        
        
            // position DIV
  //  var $b = $('#'+id);
//$a.css('position', 'absolute');
        
        
        var $ii = $('#gameCanvas'+id);
        
        
        
        //////console.log(id+" pos = "+$ii.position().top);
        
        var pos = $ii.position().top+50;
        
        //////console.log("pos = "+pos);
        //////console.log("y = :"+y);
        
        
        var $a = $("#opt_"+id+"_"+y);
        
        var newY = ($a.position().top - pos);
        
        //////console.log($a.position());
        $a.css('position', 'absolute');
         $a.css('clear', 'both');
        $a.css('left',770+"px");
        $a.css('top',pos+(y)-55+"px");  // OLD
      // $a.css('top',newY+"px");
        $a.css('z-index',zindex);
        
        zindex = zindex+1;
        
        
        //////console.log($a.position());
        
      //   var $a = $('#'+id);

//$a.css('z-index',10);


}

    
    var  changeQuotes = false;
    
    /// import the game objects
   	
	function gameCodeInit(obj, res, myobs,_sample){
    
    //alert("test 2");
    
    
    
   if(_sample == true)sample = true;
   
   
    submitFunction = myobs;
    
  //  alert("role = "+role);
    
    if(role != "Super Admin"){
        if(role == "Teacher" || role == "School" || role == "sample"){
        r = role;
           role = true;
    
        }else{
            role = false;
        }
        
    }else{
        role = "Admin";
    }
        
        
    
   //  //////console.log("** "+myobs.book,myobs.page,myobs.url,myobs.studentid);
    
   
    
     isviewable = Number(viewable);
     
    // alert(">"+isviewable);
     

    if(res.length != 0 || isviewable == 0 || role){
    changeQuotes = true;
     answerArray = res;
      var $a = $("#submit-text");
        $a.css('display','none');
    
    }

    if(isviewable == 0 || role){

         var $a = $(".submitBlock");
        $a.css('display','none');
    }
    
    
    
    
    
    if(res.length == 20 && isviewable == 2){
       
       
        
        var correctAnswers = 0;
        
        // find out how many correct answers there are
        for(var i = 0;i<answerArray.length;i++){
            if(answerArray[i].result == 1)correctAnswers++;
            }
        
        
        $("#answer-text1").html("<p>"+correctAnswers+" / 20</p>");
         $("#answer-text2").html("<p>"+correctAnswers+" / 20</p>");
        
        $("#answer-text1").css('display','block');
          $("#answer-text2").css('display','block');
        
    }
    
    
    

        //////console.log("YAAAAAAAAAAAA ",res.length,completed,"userrole = "+role);
        ////////console.log(obj.toSource());

        var myColor = "#FF0000";
        var myFont = "Arial";
        var mySize = 14;
        // var test = new display.newText(obj[i].exercise_type,150,50,myFont,mySize,myColor);

            
        for(i = 0;i<obj.length;i++){
        
            gameCanvas = canvases[i];
            
            var newArray = [obj[i].exercise_type,obj[i]];
            exercises.push(newArray);
        
        }
        
        
        
    
        
       // setUpScenarios();
        
        
      //  mouseReleaseCallbacks.push(stopDragWord);
        
        
        // begin downloading images 
        loader.start(); 
       

    }
    
    
    
    // Create the loader and queue our 3 images. Images will not 
// begin downloading until we tell the loader to start. 
var loader = new PxLoader(), 
     imageComma = loader.addImage(commaURL),
    imageHyphen = loader.addImage(hyphenURL),
    imageFullstop = loader.addImage(fullstopURL),
    image66 = loader.addImage(URL66),
    image99 = loader.addImage(URL99),
    imageColon = loader.addImage(colonURL),
    imageSemicolon = loader.addImage(semicolonURL),
    imageApostrophe = loader.addImage(apostropheURL),
    imageBracketLeft = loader.addImage(bracketLeftURL),
    imageBracketRight = loader.addImage(bracketRightURL),
    imageQuestionMark = loader.addImage(questionMarkURL),
    imageExclamationMark = loader.addImage(exclamationMarkURL),
    imageForwardSlash = loader.addImage(forwardSlashURL);


 
// callback that will be run once images are ready 
loader.addCompletionListener(function() { 



switch(completed){


    case 0:
    //////console.log("set up normal!");
        setUpScenarios();
        
    break;
    
    
    case 1:
    //////console.log("set up finished!");
       setUpFinishedScenarios();
      
    break;


}



   // ctx.drawImage(backgroundImg, 0, 0); 

}); 



function increaseQnum(i){

    cosole.log("i = "+i);


var questions;

    switch (exercises[i][0]){
        

                
                case "add_words":
                    questions   = exercises[i][1].add_word_sentences;
                break;
                
                
                case "underline_circle_highlight":
                    questions   = exercises[i][1].sentences;
                break;
                
                case "move_characters":
                    questions   = exercises[i][1].sentences;
                break;
                
                case "custom_choice":
                    questions   = exercises[i][1].questions;
                break;
                
                
                case "custom_choice_detailed":
              //  alert (exercises[i][1].questions[0].word);
                 questions   = exercises[i][1].questions;
                 
                break;

        
        }


        qnum = qnum + questions.length;


}
 

    

    function checkAnswerArray(num){

        var found = false;

        for(var i = 0;i<answerArray.length;i++){

            //  console.log("> array = "+answerArray[i].question+" --- "+(num+1))

            if(answerArray[i].question == num+1){
                found = true;
                break;
            }

        }




        return found;

    }
    
    
    // put the text onto the screen for each scenario type    
    
var qnum = 1;


    function setUpScenarios(){
    
    rowNumber = 1;
    rowNumberA = 0; // row number for answers


if(viewAsStudent == "yes")role="Admin";


    // THIS WILL CHECK IF THE ANSWER HAS ALREADY BEEN ANSWERED OR NOT
    qnum = 0;
    
    
        for(var i = 0; i<exercises.length;i++){
            
            
            // set the canvas to the current exercise
            gameCanvas = canvases[i];
            
            //////console.log("*>"+exercises[i][0]);
            
            // now check which type of game it is


            
            switch(exercises[i][0]){
            

                
                case "spelling_test":
                    setUpSpellingTest(i);
    
                break;

                
                case "add_words":

                   if(!checkAnswerArray(qnum)) setUpAddWords(i);
                   else drawAnswer(i);
                break;
                
                
                case "underline_circle_highlight":
                    if(!checkAnswerArray(qnum)) setUnderlineCircleHighlight(i);
                    else drawAnswer(i);
                break;
                
                case "move_characters":
                     if(!checkAnswerArray(qnum)) setUpMoveCharacters(i);
                     else drawAnswer(i);
                   
                break;
                
                case "custom_choice":
                   if(!checkAnswerArray(qnum)) setUpCustomChoice(i);
                   else drawAnswer(i);
                    
                break;
                
                
                case "custom_choice_detailed":
              //  alert (exercises[i][1].questions[0].word);
                   if(!checkAnswerArray(qnum)){
                        if(exercises[i][1].questions[0].word == "new")setUpNewGame(i);  // this game you can change the words to any word
                        else setUpCustomChoiceDetailed(i);
                   }else{
                       drawAnswer(i);
                    }
                break;
        
    
            
            }


            // if not spelling test, increase which number we are up to
           // if(exercises[i][0] != "spelling_test")increaseQnum(i);
// increase qnum

           // increaseQnum(i);
            
        }
        
        
        
        // redraw all to begin
        
        redrawDisplayObjects(display.objects,true);
        
      //  
        //setMe();

    
    }
    
    
    
function setUpFinishedScenarios(){

    rowNumber = 1;
    rowNumberA = 0;
    
    gameCanvas = canvases[0];
    
     setUpSpellingTest(0);  // keep spelling test working
    
        for(var i = 1; i<exercises.length;i++){
            
            
                // set the canvas to the current exercise
                gameCanvas = canvases[i];

                drawAnswer(i);
 
            
            
            }
            
          // redraw all to begin
        
        redrawDisplayObjects(display.objects,true);


            
}
    
       
    



    
    function setUpSpellingTest(i){
    
    
  //  #canvas-wrap { position:relative } /* Make this a positioned parent */
//#overlay     { position:absolute; top:20px; left:30px; }

    
    var $c = $("#mycontainer");
    $c.css('position','relative');
    
    


var id = i+1;
 var $ii = $('#gameCanvas'+id);
 //////console.log(id+" pos = "+$ii.position().top);
        
  var pos = $ii.position().top;
    
            // position DIV
    var $a = $("#spellingDIV");
$a.css('position', 'absolute');
$a.css('top', pos+"px");
$a.css('left',0);
$a.css('z-index',10);
$a.css('display', 'none');
$a.css('layer-background-color','#00000');

var $s = $("#textContainer");
$s.css('position', 'relative');
$s.css('top', 60);
    
   
 
    
        var myColor = blueColor;
        var myFont = "Arial";
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].spelling_words;
        
        var num = i;
    
       
        var rowY = 0;
        var column = 0;
        var maxRows = 3;
        var rowheight = 30;
        var wordY = 0;
        
        
        //////console.log("set up spelling");
    
        for(var i = 0;i<questions.length;i++){
        
        //////console.log("word = "+questions[i].word);
        
            wordY = topPad+(rowY*rowheight)
        
            var test = new display.newText(questions[i].word,leftPad+(170*column),wordY,myFont,mySize,myColor);
            test.addEventListener(Event.CLICK,testSpelling,{params:[]});
            test.num = i;
            
            
            rowY++;
            
            
            if(rowY >maxRows){
                rowY = 0;
                column++;
            
            }
            
        //    questions[i].exercise_textbox = test;
        
        
            
        }
    
    
    
    
    
       // gameCanvas.height = wordY+topPad;
         gameCanvas.height = 130;
         
         
       //  addButton(99);
    
    
    }
    
    
       
    
    
    function addButton(i){
    
    ////console.log("ADDING BUTTON,"+i);
    
        if(role == "Admin" && sample == false){
    
            if(i!=0) block = new display.newRect(5,5,10,10,blockColor);
            else block = new display.newText("SUBMIT",10,5,"Arial",10,"#FF0000");
            block.i = i;
        
            block.addEventListener(Event.CLICK,checkButton,{params:[]});
        
        
        }
        
    }
    
    
    function checkAll(e){
    
       //console.log("check all");
    }



function removeListenersFromCanvas(i){


     var gameCanvas = document.getElementById("gameCanvas"+i);


     if ((iphone)||(ipad)){
    
        gameCanvas.removeEventListener("touchmove",mouseMove, false)
        gameCanvas.removeEventListener('touchstart',testClick, false);
        gameCanvas.removeEventListener('touchend',mouseUp, false);
        
      //  $(gameCanvas).bind('touchmove',mouseMove);
       // $(gameCanvas).bind('touchstart',testClick);
       // $(gameCanvas).bind('touchmove',mouseUp);
    
    }else{
    
        
        if (gameCanvas.removeEventListener){
              gameCanvas.removeEventListener("mousedown",testClick)
             gameCanvas.removeEventListener("mousemove",mouseMove)
             gameCanvas.removeEventListener("mouseup",mouseUp) 
        } else if (gameCanvas.attachEvent){
          //el.attachEvent('onclick', modifyText);
             gameCanvas.detachEvent("mousedown",testClick)
             gameCanvas.detachEvent("mousemove",mouseMove)
             gameCanvas.detachEvent("mouseup",mouseUp)
        }
    
    }


}



var refreshPage = false;
var selectedExercise;

function checkOne(e){


    selectedExercise = e;
    refreshPage = false;

 valid = true;

var num = Number(e)-2;



answerArray = [];


var i = num;

 switch(myExercises[num].type){
               
               
               case "add_words":
                    checkAnswer_addwords(myExercises[i],i);
                break;
                
                
                case "underline_circle_highlight":
                   checkAnswer_underlineCircleHighlight(myExercises[i],i);
                break;


                case "move_characters":
                    checkAnswer_movecharacters(myExercises[i],i);
                break;
                
                
                case "custom_choice":
                    checkAnswer_customchoice(myExercises[i],i);
                break;
               
               
                case "custom_choice_detailed":
                    checkAnswer_customchoicedetailed(myExercises[i],i);
                break;



            }


            if(valid && !role){

                submitResults(answerArray);  // submit to the server

                 jQuery('#submit-text'+e).html("<img src='"+baseURL+"/wp/wp-content/themes/wordswork/images/ajax-loader.gif'></img>");
    
        
            }


            if(valid == false){
        
            alert("You need to complete the questions");
        
           }


            
            answerArray = [];
           



}

    
    function checkButton(e){
 

 refreshPage = true;

   // if(completed == 0){  
   
   //////console.log(e);
   
   
   //if(e.parent.i == 99){
        //magnify = !magnify;
   
  //  alert("magnify = "+magnify);
  // }
   answerArray = [];
   
   if(e=="ALL"){
        
        var e = new Object();
        e.parent = new Object();
        
        e.parent.i = 0;
   
   }
   
   valid = true;
    
        //////console.log("clicked button - "+e.parent.i,"answer array = "+answerArray);
        
        if(e.parent.i == 0)answerArray = [];  // clear answer array if we need to
        
        
        for(var i = 0;i<myExercises.length;i++){
        
            //////console.log("<",e.parent.i , myExercises[i].num || e.parent.i == 0);
        
            if((e.parent.i == myExercises[i].num || e.parent.i == 0) ){
            
        
            
            //////console.log(">>>",myExercises[i].type);
                
                var correctAnswer = false;
                
               switch(myExercises[i].type){
               
               
               case "add_words":
                    checkAnswer_addwords(myExercises[i],i);
                break;
                
                
                case "underline_circle_highlight":
                   checkAnswer_underlineCircleHighlight(myExercises[i],i);
                break;


                case "move_characters":
                    checkAnswer_movecharacters(myExercises[i],i);
                break;
                
                
                case "custom_choice":
                    checkAnswer_customchoice(myExercises[i],i);
                break;
               
               
                case "custom_choice_detailed":
                    checkAnswer_customchoicedetailed(myExercises[i],i);
                break;
               
               
               }
             
            
            }
            
           // //////console.log(answerArray);
        }
        
       // }
       
       //////console.log("clicked button - "+e.parent.i,"answer array = "+answerArray);
        //////console.log("** "+e.parent.i,"isvalid = "+valid);
        
        
        if(e.parent.i == 0 && valid && !role){
        
        //submitResults();
        
        //////console.log(answerArray);
        
            //////console.log("submitting answer");

           // jQuery('#submit-text').html("SAVING");
           jQuery('#submit-text').html("<img src='"+baseURL+"/wp/wp-content/themes/wordswork/images/ajax-loader.gif'></img>");
    
        
            submitResults(answerArray);  // submit to the server
            answerArray = [];
           
           showAnswer++;
           
            if(showAnswer == 3)showAnswer = 0;
            
            
            display.objects = [];
            display.index = 0;
            listeners = [];
              
              // redraw scenarios
              
             // setUpScenarios();
        
           // setUpFinishedScenarios();
            
        }
        
        if(valid == false){
        
            alert("You need to complete all the exercises");
        
        }
    
    }
    
    
    
    function checkAnswer_underlineCircleHighlight(ob,num){
    
    
        var ar = ob.array;
        
        var underlineArray = [];
        var circleArray = [];
        var highlightArray = [];
        
        var underlineArray2 = [];
        var circleArray2 = [];
        var highlightArray2 = [];
    
    
        var underlineAnswer = true;
        var circleAnswer = true;
        var hightlightAnswer = true;
        
        
        var underlineString = "";
        var circleString = "";
        var highlightString = "";
        var blockString = "";
        
        
        var answerOb;
        
        
        
        // new------------
        
        for(var i= 0;i<ar.length;i++){
        
        answerOb = new Object(); // will compile answers here
        
        
                    ob.questions[i].underline = decryptMe(ob.questions[i].underline);
                   ob.questions[i].circle = decryptMe(ob.questions[i].circle);
                   ob.questions[i].highlight = decryptMe(ob.questions[i].highlight);
                    ob.questions[i].sentence = decryptMe(ob.questions[i].sentence);
        
        
         underlineString = "";
         circleString = "";
         highlightString = "";
         
         
         blockString = "";

         
         underlineArray2 = [];
         circleArray2 = [];
         highlightArray2 = [];
        
        
         underlineAnswer = true;
         circleAnswer = true;
         highlightAnswer = true;
        
        if(ob.questions[i].underline!="")underlineArray2 = ob.questions[i].underline.split("+")[1].split(" ");  // this is getting the answers array
        
        if(ob.questions[i].circle!="")circleArray2 = ob.questions[i].circle.split("+")[1].split(" ");
        
        if(ob.questions[i].highlight!="")highlightArray2 = ob.questions[i].highlight.split("+")[1].split(" ");
        
        
        //////console.log("underline array = ",underlineArray2);
        //////console.log("underline array = ",circleArray2);
        //////console.log("underline array = ",highlightArray2);
        
        //--  
        
         var prevUnder = 0;
         var prevCirc = 0
         var prevHigh = 0;
         
         //------------

            for(var j = 0;j<ar[i].length;j++){   // LOOP THROUGH ALL WORDS
            
            //////console.log(">",ar[i][j].text,ar[i][j].underline,ar[i][j].num,ar[i][j].num);
            
                var underlineFound = false;
                var circleFound = false;
                var highlightFound = false;
            
            
                // lets add the block string to our answers string
                
                blockString = blockString+ar[i][j].text+"*";
            
            
            
                for(var u= 0;u<underlineArray2.length;u++){  // NOW LOOP THROUGH UNDERLINE ARRAY 
                
               
                
                    if(underlineArray2[u] == ar[i][j].num){  // IF UNDERLINE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(!ar[i][j].underline)underlineAnswer = false; // THEN MAKE SURE IT MATCHES
                        
                        underlineFound = true;
                    
                    }

                }
                
                     if(!underlineFound){  // IF UNDERLINE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(ar[i][j].underline)underlineAnswer = false; // THEN MAKE SURE IT MATCHES
                    
                    }
                    
                
                //  now make a string to save to database
                
                 if(ar[i][j].underline){
                    underlineString = underlineString+(j+1)+" ";
                    //prevUnder = ar[i][j].num;
                }
                
                
                //-----------
                
                
                for(u= 0;u<circleArray2.length;u++){  // NOW LOOP THROUGH UNDERLINE ARRAY 
                
                    if(circleArray2[u] == ar[i][j].num){  // IF CIRCLE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(!ar[i][j].showRect)circleAnswer = false; // THEN MAKE SURE IT MATCHES
                    
                            circleFound = true;
                    
                    }
     
                    
                }
                
                  if(!circleFound){  // IF CIRCLE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(ar[i][j].showRect)circleAnswer = false; // THEN MAKE SURE IT MATCHES
                    
                    }
                //  now make a string to save to database
                
                  if(ar[i][j].showRect){
                    circleString = circleString+(j+1)+" ";
                    //prevCirc = ar[i][j].num;
                }
                
                
                //---------------
                
                for(u= 0;u<highlightArray2.length;u++){  // NOW LOOP THROUGH UNDERLINE ARRAY 
                
                    if(highlightArray2[u] == ar[i][j].num){  // IF CIRCLE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(!ar[i][j].highlight)highlightAnswer = false; // THEN MAKE SURE IT MATCHES
                        
                        highlightFound = true;
                    
                    }

 
                }
                
                    if(!highlightFound){  // IF CIRCLE ARRAY NUM = THE SAME AS THE WORD NUM
                        //////console.log("HIGHLIGHT NOT FOUND");
                                            
                        if(ar[i][j].highlight){
                            highlightAnswer = false; // THEN MAKE SURE IT MATCHES
                            //////console.log("*** THIS SHOULDNT BE HIGHLIGHTED ***");
                            }
                    
                    }
                
                //  now make a string to save to database
                    if(ar[i][j].highlight){
                        highlightString = highlightString+(j+1)+" ";
                        //prevHigh = ar[i][j].num;
                    }
                
               // //////console.log("num > "+ar[i][j].num);
               
               
            
            }
            

     
            
            
            var correct = true;
            
            
            //////console.log("---------");
            
            if(!underlineAnswer || !circleAnswer || !highlightAnswer)correct = false;
    
          //  if(underlineString != underlineArray2)correct = false;
 
         //  if(circleString != circleArray2)correct = false;
    
         //   if(highlightString != highlightArray2)correct = false;
                       
            //////console.log("THIS IS CORRECT + "+correct);
            if(role == "Admin"){
            if(correct){
                ar[i][0].block.set({color:lightGreenColor});
            }else{
                ar[i][0].block.set({color:lightRedColor});
            
            }
            }
            
                if(correct)correct = 1;
        else correct = 0;
        
        
        // CHECK VALID
        
        if(underlineString == "" && circleString == "" && highlightString == "" && role != "Admin")valid = false;
        
        
        // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 0;
       // answerOb.question = answerArray.length+1;
       answerOb.question = ob.questions[i].num;  // which number the question is
        answerOb.answer = blockString+"+"+underlineString+"-"+circleString+"-"+highlightString;
        answerOb.result = correct;
        
        answerArray.push(answerOb);
        
        ////--------------------------
        
        
                   ob.questions[i].underline = encryptMe(ob.questions[i].underline);
                   ob.questions[i].circle = encryptMe(ob.questions[i].circle);
                    ob.questions[i].highlight = encryptMe(ob.questions[i].highlight);
                    ob.questions[i].sentence = encryptMe(ob.questions[i].sentence);
        
            
        }
        
    
        
        
        
      //  //////console.log(ob.questions);
        ////////console.log(ob.questions[i].circle);
        ////////console.log(ob.questions[i].highlight);
    
    }
    
    
    
    function checkAnswer_movecharacters(ob,num){
    
    
        var answerOb;
    
        var ar = ob.array;
    
    
        for(var i= 0;i<ar.length;i++){
        
        
        ob.questions[i].sentence = decryptMe(ob.questions[i].sentence);
         ob.questions[i].character = decryptMe(ob.questions[i].character);
        
         answerOb = new Object(); // will compile answers here
        
            var str = "";
        
            for(var j = 1;j<ar[i].length-1;j++){
            
                
                 str = str+ar[i][j].text;
                
        
            }
            
            // get the answer
            
            var str2 = ob.questions[i].sentence;
            
            var answerStr = str;
            
            // take out all spaces
            str = str.replace(/\s/g,'');
            str2 = str2.replace(/\s/g,'');
            
            
            
            
             str = cleanString(str);
             
             str2 = cleanString(str2);
             

            
            //////console.log("------");
            //console.log("answer > "+str);
            //console.log("sentence > "+str2);
            
            var mybloc;
        
            for(var m = 0;m<ar[i].length;m++){
                if(ar[i][m].block){
                    mybloc = ar[i][m].block;
                    break;
                }
            }

            
            var correct = 1;
            
            if(str == str2){
                 if(role == "Admin")mybloc.set({color:lightGreenColor});
                correct = 1;
            }else{
               if(role == "Admin") mybloc.set({color:lightRedColor});
               correct = 0;
            
            }
            
            
            // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 1;
       // answerOb.question = answerArray.length+1;
       answerOb.question =  ob.questions[i].num;  // which number the question is
        answerOb.answer = ob.questions[i].sentence;
        if(correct == 0)answerOb.answer = answerStr;
        answerOb.result = correct;
        answerArray.push(answerOb);
        
        ////--------------------------
        
         ob.questions[i].sentence = encryptMe(ob.questions[i].sentence);
         ob.questions[i].character = encryptMe(ob.questions[i].character);
        
        }
        
    }
    
    
    
    function checkAnswer_customchoicedetailed(ob,num){
    
        var ar = ob.array;
        var answerOb;
        
        var answerStr;
        
        //////console.log(">>> "+ob.questions.length);
        //////console.log(">> "+ar.length);
    
    
        for(var i= 0;i<ar.length;i++){
        
        
            
                    ob.questions[i].word = decryptMe(ob.questions[i].word);
                    ob.questions[i].sentence = decryptMe(ob.questions[i].sentence);
                    ob.questions[i].drop_down = decryptMe(ob.questions[i].drop_down);
                     ob.questions[i].answer = decryptMe(ob.questions[i].answer);
           
        
         answerOb = new Object(); // will compile answers here
         
         answerStr = "";
        
            var str = "";
        
            for(var j = 0;j<ar[i].length;j++){
            
                
                 str = str+ar[i][j].text;
                
                answerStr = str+" ";
        
            }
            
            // get the answer
            
            correct = true;
            
            var str2 = ob.questions[i].sentence;
            
            var opt = "";
            
            
            if(ob.questions[i].word != "new"){
              
                opt = checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]);
            
                if(ob.questions[i].answer != opt)correct = false;
            
            
            }
            
             if(ob.questions[i].word == "new")str2 = ob.questions[i].answer;
            
            
            
            // take out all spaces
            str = str.replace(/\s/g,'');
            str2 = str2.replace(/\s/g,'');
            
            
            str = cleanString(str);
            str2 = cleanString(str2);
            
            //////console.log("------");
            //console.log(str);
            //console.log(str2);
            
            
            
            
            
            if(str != str2)correct = false;
            
            if(correct){
                 if(role == "Admin")ar[i][0].block.set({color:lightGreenColor});
                correct = 1;
            }else{
                if(role == "Admin") ar[i][0].block.set({color:lightRedColor});
                correct = 0;
            }
            
            
            
            
            // check valid
            
            if(answerStr.split(getDots(5)).length != 1  && role != "Admin")valid = false;
            // check valid
        
        if(ob.questions[i].word != "new" && (opt == "null" || opt == null) && role != "Admin")valid = false;
            
            
            // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 2;
       // answerOb.question = answerArray.length+1;
       answerOb.question =  ob.questions[i].num;  // which number the question is
        answerOb.answer = answerStr+"+"+opt;
        if(correct == 1)answerOb.answer = answerStr+"+"+opt;

        answerOb.result = correct;
        
        answerArray.push(answerOb);
        
        
        
        ob.questions[i].word = encryptMe(ob.questions[i].word);
                    ob.questions[i].sentence = encryptMe(ob.questions[i].sentence);
                    ob.questions[i].drop_down = encryptMe(ob.questions[i].drop_down);
                     ob.questions[i].answer = encryptMe(ob.questions[i].answer);
        
        ////--------------------------
        
        }
    
    
    }
    
    
    
    
    
    function checkAnswer_customchoice(ob,num){
    
    
       var ar = ob.array;
       var answerOb;
       var underlineString = "";
       var blockString = "";
    
    /*
        for(var i= 0;i<ar.length;i++){
        
            var str = "";
            underlineString = "";
            
            ////////console.log("> "+checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]));
           // //////console.log(">>"+ob.questions[i].correct_item);
        
            for(var j = 0;j<ar[i].length;j++){
            
                
                 str = str+ar[i][j].text;
                 
                 if(ar[i][j].underline){
                 //////console.log("unserline = "+ar[i][j].text);
                    underlineString = underlineString+(j+1);
                    if(j+1 != ar[i].length)underlineString = underlineString+" ";
                }
                
        
            }
            
            
        var testUnderlineString = ob.questions[i].underline.split("+")[1];
        
        
        testUnderlineString = testUnderlineString.replace(/\s/g,'');
        underlineString = underlineString.replace(/\s/g,'');
        
        
        var correct = true;
        
        if(underlineString != testUnderlineString)correct = false;
        
        if(ob.questions[i].correct_item != checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]))correct = false;
        
             */
             
             for(var i= 0;i<ar.length;i++){
             
             
             ob.questions[i].sentence = decryptMe(ob.questions[i].sentence);
             ob.questions[i].underline = decryptMe(ob.questions[i].underline);
             ob.questions[i].correct_item = decryptMe(ob.questions[i].correct_item);
             
             
             
              answerOb = new Object(); // will compile answers here
             
             var str = "";
             var correct = true;
             
             underlineString = "";
             blockString = "";
             
             
             // first check drop down box

            var opt = checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]);
             
             if(ob.questions[i].correct_item != opt)correct = false;

                        
            //////console.log("-> "+ob.questions[i].correct_item);
             
             
             // NOW CHECK IF CORRECT ITEM IS UNDERLINED
             underlineArray = [];
             
             
             if(ob.questions[i].underline.split("+").length>1)underlineArray = ob.questions[i].underline.split("+")[1]; 
             
             var numm = 0;
             
             
             for(var j = 0;j<ar[i].length;j++){
             
             
             
             
             
             // lets add the block string to our answers string
                
              if(ar[i][j].text != ""){
              
                blockString = blockString+ar[i][j].text+"*";
            
                
                // str = str+ar[i][j].text;
               var underlineArray;
               var underlineFound = false;
               
               //////console.log("num = "+ar[i][j].num);
               //////console.log("<> "+ar[i][j]);
                
                
                for(var u= 0;u<underlineArray.length;u++){  // NOW LOOP THROUGH UNDERLINE ARRAY 
                
                   
                    if(underlineArray[u] == ar[i][j].num){  // IF UNDERLINE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(!ar[i][j].underline)correct = false; // THEN MAKE SURE IT MATCHES
                        
                        underlineFound = true;
                    
                    }

                }
                
                     if(!underlineFound){  // IF UNDERLINE ARRAY NUM = THE SAME AS THE WORD NUM
                                            
                        if(ar[i][j].underline)correct = false; // THEN MAKE SURE IT MATCHES
                    
                    }
                    

                
                
                if(ar[i][j].underline)underlineString = underlineString+numm+" ";
                
                
                numm++;
                
                
                }
        
            }
            
            
            
            // now add the drop down
            underlineString = underlineString+"+"+opt;
            
            
            ////////console.log(">"+str);
             
             
           // //////console.log("------");
           // //////console.log("> underline "+underlineString);
           // //////console.log("> test-underline "+testUnderlineString);
            
            if(correct){
                if(role == "Admin")ar[i][0].block.set({color:lightGreenColor});
                correct = 1;
            }else{
                if(role == "Admin")ar[i][0].block.set({color:lightRedColor});
                correct = 0;
            }
            
            
        
        
        // check valid
        
        if((opt == "null" || opt == null) && role != "Admin")valid = false;
            
            
            // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 3;
       // answerOb.question = answerArray.length+1;
       answerOb.question =  ob.questions[i].num;  // which number the question is
        answerOb.answer = blockString+"+"+underlineString;
        answerOb.result = correct;
        
        answerArray.push(answerOb);
        
        
            ob.questions[i].sentence = encryptMe(ob.questions[i].sentence);
            ob.questions[i].underline = encryptMe(ob.questions[i].underline);
            ob.questions[i].correct_item = encryptMe(ob.questions[i].correct_item);
        
        
        ////--------------------------
        
        
        }
    
            //////console.log("*******************");
            
    
    
    }
    
    
    
    
    
    
    function checkAnswer_customchoice_old(ob,num){
    
    
       var ar = ob.array;
       var answerOb;
       
       var underlineString = "";
    
    
        for(var i= 0;i<ar.length;i++){
        
         answerOb = new Object(); // will compile answers here
        
            var str = "";
            underlineString = "";
            
            ////////console.log("> "+checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]));
           // //////console.log(">>"+ob.questions[i].correct_item);
        
            for(var j = 0;j<ar[i].length;j++){
            
                
                 str = str+ar[i][j].text;
                 
                 if(ar[i][j].underline){
                 //////console.log("unserline = "+ar[i][j].text);
                    underlineString = underlineString+(j+1);
                    if(j+1 != ar[i].length)underlineString = underlineString+" ";
                }
                
        
            }
            
            
        var testUnderlineString = ob.questions[i].underline.split("+")[1];
        
        
        testUnderlineString = testUnderlineString.replace(/\s/g,'');
        underlineString = underlineString.replace(/\s/g,'');
        
        
        var correct = true;
        
        if(underlineString != testUnderlineString)correct = false;
        
        if(ob.questions[i].correct_item != checkOptions("opt_"+ob.opArray[i][0]+"_"+ob.opArray[i][1]))correct = false;
        
             
             
            //////console.log("------");
            //////console.log("> underline "+underlineString);
            //////console.log("> test-underline "+testUnderlineString);
            
            if(correct){
                 if(role == "Admin")ar[i][0].block.set({color:lightGreenColor});
            }else{
                if(role == "Admin")ar[i][0].block.set({color:lightRedColor});
            
            }
            
            
            
            // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 44;
       // answerOb.question = i+1;
        answerOb.question =  ob.questions[i].num;  // which number the question is
        answerOb.answer = "...";
        answerOb.result = correct;
        
        answerArray.push(answerOb);
        
        ////--------------------------
        
        
        
        }
    
            //////console.log("*******************");
            
    
    
    }
    
    
    
    
    
    function checkAnswer_addwords(ob,num){
    
    
       var ar = ob.array;
        var answerOb;
    
        for(var i= 0;i<ar.length;i++){
        
         answerOb = new Object(); // will compile answers here
         
         
            ob.questions[i].word = decryptMe(ob.questions[i].word);
                ob.questions[i].answer = decryptMe(ob.questions[i].answer);
         
        
            var str = "";
            
            var answerStr = "";
        
            for(var j = 0;j<ar[i].length;j++){
            
                
                 str = str+ar[i][j].text;
                 
                 
                answerStr = str+" ";
        
            }
            
            // get the answer
            
            var str2 = ob.questions[i].answer;
            
            // take out all spaces
            str = str.replace(/\s/g,'');
            str2 = str2.replace(/\s/g,'');
            
            
            str = cleanString(str);
            str2 = cleanString(str2);
            
            //////console.log("------");
            //////console.log(str);
            //////console.log(str2);
            
            var correct;
            
            if(str == str2){
                //////console.log("CORRECT");
                 if(role == "Admin")ar[i][0].block.set({color:lightGreenColor});
                correct = 1;
            }else{
                 if(role == "Admin")ar[i][0].block.set({color:lightRedColor});
                correct = 0;
            
            }
            
            
            
            // check valid
            if(answerStr.split(getDots(5)).length != 1 && role != "Admin")valid = false;
            
            
            // SET UP ANSWER APP   ---------------------
        
        answerOb.exercise = 4;
       // answerOb.question = answerArray.length+1;
        answerOb.question =  ob.questions[i].num;  // which number the question is
        answerOb.answer = answerStr;
        if(correct == 1)answerOb.answer = ob.questions[i].answer;
        answerOb.result = correct;
        
        answerArray.push(answerOb);
        
        
           
                ob.questions[i].word = encryptMe(ob.questions[i].word);
                ob.questions[i].answer = encryptMe(ob.questions[i].answer);
      
        ////--------------------------
            
        
        }
    
            
            
    
    
    }
    
    
    
    function addBlock(x,y,i){
    
           if(!isEven(i)){
                
                block = new display.newRect(x,y,920,rowheight,blockColor);
             
             }else{
             
                block = new display.newRect(x,y,920,rowheight,"#ffffff");
             
             }
             
             
             // now add a number...
             
              var num = new display.newText(rowNumber+":",10,y+10,"Arial",16,blackColor);
              num = new display.newText(rowNumber+":",10,y+10,"Arial",16,blackColor);
    
        rowNumber++;
        
        
        
           // if(!isEven(i)){
                
                return block;
             
            // }
    
    }
    
    
       
   function splitObs(str){
   
   
    var myOb = new Object();
    var myArray = str.word.split("+");
    
    myOb.blocks = myArray[0].split("*");
    myOb.nums = myArray[1].split(" ");
    myOb.decoys = [];
    // check for decoys
    if(myArray[2]){
        myOb.decoys = myArray[2].split(" ");
        
        }
   
   
   //alert(myOb.toSource());
   
    return myOb;
   
   }
    
    
    
    
    
    
    /// SET UP RE-DRAW ANSWER
    
    
    function drawAnswer(i){



        gameCanvas = canvases[i];
    
        // get rid of save button
        jQuery('#submit-text'+(i+1)).html("");
        jQuery('#submit-text'+(i+1)).hide();


    
    
    //console.log("drawing answer");
    
         var myColor = "#FF0000";
        var myFont = "Arial"; 
        var mySize = 16;

    
        var type = exercises[i][0];
        
        var questions;
        
        var splitAsterisk = false;
        
        
        var droptext = false;


        
        switch (type){
        

                case "add_words":
                    questions   = exercises[i][1].add_word_sentences;
                break;
                
                
                case "underline_circle_highlight":
                    questions   = exercises[i][1].sentences;
                    splitAsterisk = true;
                break;
                
                case "move_characters":
                    questions   = exercises[i][1].sentences;
                break;
                
                case "custom_choice":
                    questions   = exercises[i][1].questions;
                    splitAsterisk = true;
                    droptext = true;
                break;
                
                
                case "custom_choice_detailed":
              //  alert (exercises[i][1].questions[0].word);
                 questions   = exercises[i][1].questions;
                 splitAsterisk = true;
                 
                break;

        
        
        
        
        }


        qnum = qnum + questions.length;
        
        


        
        

        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var rowX = leftPad;
        var column = 1;
        var columns = 4;
        

        //var rowheight = 30;
        
        addButton(i);
        
  
        var dragArray = new Array();
        
        var wordX = leftPad;
        wordY = topPad;
        
    
        
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.array = new Array();
        
         myExercises.push(emptyOb)
         
    
        for(var i = 0;i<questions.length;i++){
        
         //   wordY = topPad+(rowY*rowheight)

       //  console.log(">>"+i)
        // console.log(answerArray);
 
          
            
            //var questions[i].my = new Object();
            
                      myColor = blackColor;
           
           
             // add grey line for visibility
           var myBlock = addBlock(0,wordY-10,i);
           
          
           // check to show if correct or not
          if(showAnswer == 1 && isviewable == 2 && completed != 0){
        //  console.log("row number = "+rowNumberA);
         //  console.log("green should be ",answerArray[rowNumberA].result);
           if(answerArray[rowNumberA].result == 1){
                myBlock.set({color:lightGreenColor});
            }else{
                myBlock.set({color:lightRedColor});
            
            }
           
           }
            
         
           
           var myrow = 1;
           
           var showBlock = true;
           
           var blockArray = [];
          
                         
                if(showBlock == true){
                    myColor = blackColor;
            
  
                                  
                        var mySplitBlock = answerArray[rowNumberA].answer.split(" ");
                        
                        if(splitAsterisk)mySplitBlock = answerArray[rowNumberA].answer.split("+")[0].split("*");

                        
                            //////console.log("mySplitBlock = ",mySplitBlock);
                        
                        
                        for(var sb = 0;sb<mySplitBlock.length;sb++){

                        
                        var mytext = cleanString(mySplitBlock[sb]);
                        
                        var test3 = new display.newText(mytext,rowX,wordY,myFont,mySize,myColor);
                        test3.row = false;
                        test3.block = myBlock;
                        rowX = rowX+test3.width;
                        
                        
                        blockArray.push(test3);
                        
                        
                      
                        
                        if(mySplitBlock[sb] != ""){
                        
                        var myspace = new display.newText(" ",rowX,wordY,myFont,mySize,myColor);
                        myspace.row = false;
                        rowX = rowX+myspace.width;
                        
                                               
                        
                        
                        /// NOW we have to add a SPACE

                        
                        
                         // check if gone too far - add second row
                        
                            if(rowX>maxWidth+90 ){
                                
                               // alert("ALERT");
                                rowX = leftPad;
                               // rowY++;
                                
                               //  wordY = topPad+(rowY*rowheight)-10;
                                 
                                  wordY = wordY+(rowheight)-10;
                                 
                                 myspace.set({x:leftPad,y:wordY});
                                 
                                  myspace.row = true;
                                 
                               //  myBlock.set({height:(rowheight*2)});
                                  myBlock.set({height:(wordY+rowheight)});

                            }
                            
                            
                            }
                            
                        }

                 
                         if(type == "custom_choice" ){         
                               /// add drop text
                
                        var dropText = answerArray[rowNumberA].answer.split("+")[2];
                
                        var newtext = new display.newText(dropText,750,wordY,myFont,mySize,myColor);
                        newtext.showRect = true;
                        
                        }
                   
                        
                         if(type == "custom_choice_detailed"){         
                               /// add drop text
                
                        var dropText = answerArray[rowNumberA].answer.split("+")[1];
                		if(dropText){
                        	var newtext = new display.newText(dropText,750,wordY,myFont,mySize,myColor);
                        	newtext.showRect = true;
						}
                        
                        }
                
                
                
                        
                        wordY = wordY+(rowheight);
                        
                        
                        
                            
                            // end check add second row
                
                
            }
            
            
            
            
            // now..  loop through blocks and see if we should underline.
            
            if(type == "custom_choice"){          
            
              
                  var underlineArray = answerArray[rowNumberA].answer.split("+")[1].split(" ");
                  //////console.log("****************");
                  
                 
                  
                   //////console.log("****************");
         
                var userno = false;
                
                if(questions[i].underline.split("+").length>2)if(questions[i].underline.split("+")[2] == "no")userno = true;
              
         
                //////console.log("underline array = ",underlineArray,userno);
                
            
                for(b = 0;b<blockArray.length;b++){
            
                    for(var u = 0;u<underlineArray.length;u++){
                    
                    if(userno){
                    
                        if(b == underlineArray[u] && underlineArray[u]!="")blockArray[b].underline = true;
                        
                    }else{
                    
                         if(b == underlineArray[u] && underlineArray[u] !="")blockArray[b].underline = true;
                    }
                    
                    }
                    
            
            
                }
                
                
               
                
                
             
            }
            
            
            
            //   you*have*one*hour*for*the*test*it*finishes*at*midday*+2 9 --5        
            
                 
                if(type == "underline_circle_highlight"){     

                    
            
              
                  var underlineArray = answerArray[rowNumberA].answer.split("+")[1].split("-")[0].split(" ");
                   var circleArray = answerArray[rowNumberA].answer.split("+")[1].split("-")[1].split(" ");
                    var highlightArray = answerArray[rowNumberA].answer.split("+")[1].split("-")[2].split(" ");
       
            
                for(b = 0;b<blockArray.length;b++){
            
                    for(var u = 0;u<underlineArray.length;u++){
                      
                        if(b+1 == underlineArray[u] && underlineArray[u]!="")blockArray[b].underline = true; 
          
                    }
                    
                    for( u = 0;u<circleArray.length;u++){
                      
                        if(b+1 == circleArray[u] && circleArray[u]!="")blockArray[b].showRect = true; 
          
                    }
                    
                    for( u = 0;u<highlightArray.length;u++){
                      
                        if(b+1 == highlightArray[u] && highlightArray[u]!="")blockArray[b].highlight = true; 
          
                    }
            
                }
                
                
          
             
            }     
            
            /// set row for next row

            rowNumberA++;
             rowY++;
             rowX = leftPad;
            
        }
    

    
        wordY+=50;gameCanvas.height = wordY+topPad;
    
    
    }
    
    
    
    
    
    
         // set up add words
    
    function setUpAddWords(i){
    
        var myColor = "#FF0000";
        var myFont = "Arial"; 
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].add_word_sentences;
        

        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var rowX = leftPad;
        var column = 1;
        var columns = 4;
        

        //var rowheight = 30;
        
        addButton(i);
        
  
        var dragArray = new Array();
        
        var wordX = leftPad;
        
        
        
        // set up drag boxes
        
        
             var myAnswers = [];
        
        var splitWords = [];
       /* 
        for(var i = 0;i<questions.length;i++){
        splitObs(questions[i]);

        
            splitWords = questions[i].word.split("*");
            
            for(var s = 0;s<splitWords.length;s++){
               if(splitWords[i]!="") myAnswers.push(splitWords[s]);
            }
        
        }*/
        

      //  qnum = qnum + questions.length;
        
        
           for(var i = 0;i<questions.length;i++){
                
                var myOb = splitObs(questions[i]);
                
                 //////console.log("*********************");
                
                //////console.log(questions[i].word);
                
                
                
              
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
                for(var n = 0;n<myOb.nums.length;n++){
                    if(s==(myOb.nums[n]-1)) myAnswers.push(myOb.blocks[s]);
                }
            }
        
            
            
            
               // now lets add decoy words if any 
            for(var s = 0;s<myOb.decoys.length;s++){
                
                  if(myOb.decoys[s]!="" && myOb.decoys[s]!=" ") myAnswers.push(myOb.decoys[s]);
               
               //////console.log(myOb.decoys[s]);
        
                
            }
            
            
            }
            
            
             //////console.log("*********************");

            
        
        // randomise the array
        randomiseArray(myAnswers);
        
        if(!role || role == "Admin"){   // IF NOT A TEACHER
           
        for( i = 0;i<myAnswers.length;i++){
        
            wordY = topPad+(rowY*rowheight);
        
                     
             myColor = "#06C";
             
              // clean the string
           // myAnswers[i] = myAnswers[i].replace(/&#039;/gi,"'");
            //myAnswers[i] = myAnswers[i].replace(/&quot;/gi,"''");
            myAnswers[i] = cleanString(myAnswers[i]);
            
            smallword = new display.newText(myAnswers[i],wordX,wordY,myFont,mySize,myColor);
            smallword.showRect = true;
            smallword.dragArray = dragArray;
            smallword.orginX = smallword.x;
            smallword.orginY = smallword.y;
            smallword.addEventListener(Event.CLICK,showRect,{params:[]});
            smallword.addEventListener(Event.RELEASE,checkDragDrop,{params:[]});
            smallword.isDraggable = true;
        

           // test.addEventListener(Event.RELEASE,highlightText,{params:[]});
            //test2.num = i;
            //test2.setText(
           // questions[i].exercise_textbox = test;
        
        
            wordX = smallword.x+smallword.width+20;
            
            //////console.log(wordX);
        
            if(wordX>maxWidth){
        
                wordX = leftPad;
                
                rowY++;
                
                wordY = topPad+(rowY*rowheight);
                
                smallword.set({x:wordX,y:wordY});
            
                smallword.orginX = smallword.x;
                smallword.orginY = smallword.y;
                
                
                 wordX = smallword.x+smallword.width+20;
            }
            
            
            
            
        }
        
        }
        
        
       
        
        
        
        rowY+=1;
        
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.array = new Array();
        
         myExercises.push(emptyOb)
         
    
        for(var i = 0;i<questions.length;i++){
        
            wordY = topPad+(rowY*rowheight)
 
            var splitword = questions[i].word.split("*")[0];
       
            var splitArray = questions[i].answer.split(splitword);
            
            
            //var questions[i].my = new Object();
            
                      myColor = blackColor;
           
           
             // add grey line for visibility
           var myBlock = addBlock(0,wordY-10,i);
           
           

           
           
           var myrow = 1;
          
            
             var myOb = splitObs(questions[i]);
              var droptarget;
              var droptext = "";
              var showBlock;
              
              var myBlockArray = new Array();
              
              
             
              
              emptyOb.array.push(myBlockArray)
              
             
              //questions[i].my.array = myBlockArray;
              
        
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
            
             showBlock = true;
             
             
            
                for(var n = 0;n<myOb.nums.length;n++){
                
                // check if we need to add the dotted lines
                    if(s==(myOb.nums[n]-1)){
                    
                        myColor = greyDots;
                     //   var myNum = myOb.blocks[s].length+(Math.random()*3);
                     //  droptext = "[ ";
                     //   for(j = 0;j<myNum;j++)droptext = droptext+". ";
                      //  droptext = droptext+"] ";
                        
                        droptext = getDots(myOb.blocks[s].length);
                        
                        
                        if(role && role!= "Admin"){
                            droptext = cleanString("[ "+myOb.blocks[s]+" ]");   // IF TEACHER
                            myColor = blueColor;
                        }
                        
                        
                        
                        droptarget = new display.newText(droptext,rowX,wordY,myFont,mySize,myColor);
                         droptarget.row = false;
                         droptarget.block = myBlock;
                        // var widthText = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+droptarget.width;
                        dragArray.push(droptarget);
                        showBlock = false;
                        
                        myBlockArray.push(droptarget);
                        droptarget.blockArray = myBlockArray;
                        
                        
                        // check if gone too far - add second row
                        
                            if(rowX>maxWidth+90){
                                
                                
                                rowX = leftPad;
                                rowY++;
                                
                               //  wordY = topPad+(rowY*rowheight)-10;
                                 
                                  wordY = wordY+(rowheight)-10;
                                 
                                 droptarget.set({x:leftPad,y:wordY});
                                 
                                  droptarget.row = true;
                                  
                                  rowX = rowX+droptarget.width;
                                 
                               //  myBlock.set({height:(rowheight*2)});
                                  myBlock.set({height:(wordY+rowheight)});

                            }
                            // end check add second row
                        
                        
                        }
                        
                        
                    }
                
                if(showBlock == true){
                    myColor = blackColor;
            
                         // clean the string
                // myOb.blocks[s] = myOb.blocks[s].replace(/&#039;/gi,"'");
                // myOb.blocks[s] = myOb.blocks[s].replace(/&quot;/gi,"''");
                 myOb.blocks[s] = myOb.blocks[s].replace(/"  "/gi," ");
                 
                 
                 myOb.blocks[s] = cleanString(myOb.blocks[s]);
            
            
                        /*var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        test3.row = false;
                        rowX = rowX+test3.width;
                        
                        myBlockArray.push(test3);
                        
                        */
                        
                        
                        
                        // NEW CODE.  SEE IF WE CAN SPLIT THIS A BIT MORE
                        
                       // var mySplitBlock = myOb.blocks[s].split(" ");
                        
                        var mySplitBlock = myOb.blocks[s];
                        
                        

                        
                        
                        for(var sb = 0;sb<mySplitBlock.length;sb++){

                        
                        var test3 = new display.newText(mySplitBlock[sb],rowX,wordY,myFont,mySize,myColor);
                        test3.row = false;
                        test3.block = myBlock;
                        rowX = rowX+test3.width;
                        
                        myBlockArray.push(test3);
                        
                        var myspace = new display.newText("",rowX,wordY,myFont,mySize,myColor);
                        myspace.row = false;
                        rowX = rowX+myspace.width;
                        
                        myBlockArray.push(myspace);
                        
                        
                        
                        /// NOW we have to add a SPACE

                        
                        
                         // check if gone too far - add second row
                        
                            if(rowX>maxWidth+90 && sb!=mySplitBlock.length-1 && test3.text == " "){
                                
                                
                                rowX = leftPad;
                                rowY++;
                                
                               //  wordY = topPad+(rowY*rowheight)-10;
                                 
                                  wordY = wordY+(rowheight)-10;
                                 
                                 myspace.set({x:leftPad,y:wordY});
                                 
                                  myspace.row = true;
                                 
                               //  myBlock.set({height:(rowheight*2)});
                                  myBlock.set({height:(wordY+rowheight)});

                            }
                            
                            
                        }
                            
                            // end check add second row
                }
                
            }
            
            
            
               
             // lets do this
           
             if(!role || role == "Admin"){  
                questions[i].word = encryptMe(questions[i].word);
                questions[i].answer = encryptMe(questions[i].answer);
                questions[i].num = rowNumber-1;
                qnum =  questions[i].num;
             }

        
             rowY++;
             rowX = leftPad;
            
        }
    
    
        wordY+=50;gameCanvas.height = wordY+topPad;
    
    
    }
    
    
    
    
    function getDots(num){
    
    
      //  var myNum = num+(Math.random()*3);
       var myNum = 5;        
         var tempText = "[ ";
         
        for(j = 0;j<myNum;j++)tempText = tempText+". ";
        
        tempText = tempText+"] ";  
    
    
        return tempText;
    
    }
    
    
    
    function realignBlocks(ar){
    
    
        var rowX = leftPad;
        
        // realign all text
        
        for(var s = 0;s<ar.length;s++){

            //var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
            ar[s].set({x:rowX});
            
            rowX = rowX+ar[s].width;
            
            
            //////console.log("> "+ar[s].text+" - "+ar[s].row);
            
            if(ar[s].row){
                rowX = leftPad;
                 ar[s].set({x:rowX});
                 rowX = rowX+ar[s].width;
            }
                 
            if(ar[s].taken)ar[s].symbiote.set({x:ar[s].x});
              
                
        }
        
        
        // check to realign text with its drop box
       /* 
        for(var i = 0;i<ar[0].dragArray.length;i++){
        
        
                 
               if(e.parent.dragArray[i].text == e.parent.dragArray[i].resetText){
                    e.parent.dragTarget = e.parent.dragArray[i];
                    e.parent.dragArray[i].symbiate = e.parent; // so I can tell which text is associated with the space
                    drop = true;
                    break;
                }
        
        
        
        }*/

    
    
    
    }
    
    
    
           
    
    
    
    // check if character is a full stop or comma and then adjust 
    
    function checkCharacter(t,t2){
    
       // let's check which values to test
       
        var val = false;
    
            if(t.text == "!")val =  true;
             if(t.text == ".")val =  true;
              if(t.text == ",")val =  true;
              
              
              
              // check previous word
              
              if(t2){
              
                if(t2.text == 'â€œ')val = true;
                if(t2.text == '"')val = true;
              
              }
    
    
        // if true, move the block back 5
       
        if(val)t.set({x:(t.x-5)});
        
        return val;
    
    }
    
    
    
            // set up Underline Circle Highlight
    
    
     function setUnderlineCircleHighlight(i){
    
        var myColor = "#FF0000";
        var myFont = "Arial";
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].sentences;
        
        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var column = 1;
        var columns = 4;
        //var rowheight = 20;
        
        var dragArray = [];
        var highlightArray = [];
        
        var textX = 50;
        
        
        
        
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.array = new Array();
        
        myExercises.push(emptyOb)
         
         
        var rowY = 0;
         
    
        for(var i = 0;i<questions.length;i++){
        
            wordY = topPad+(rowY*rowheight)
            
            myColor = blackColor;
            
              // add grey line for visibility
          var myBlock =  addBlock(0,wordY-10,i);


        
              //clean text
           // questions[i].sentence =  questions[i].sentence.replace(/&#039;/gi,"'");
           // questions[i].sentence = questions[i].sentence.replace(/&quot;/gi,'"');
           
           
            questions[i].sentence = cleanString(questions[i].sentence);
            
            
       
            var splitArray = questions[i].sentence.split(" ");
            textX = 50;
            dragArray = [];
            highlightArray = [];
            if(questions[i].underline !="")highlightArray.push("underline");
            if(questions[i].circle !="")highlightArray.push("showRect");
            if(questions[i].highlight !="")highlightArray.push("highlight");
            
            splitArray = questions[i].sentence.split("*");
            
            
            //////console.log("sentence = "+ questions[i].sentence);
            //////console.log("splitarray length = "+splitArray.length);
            //////console.log("splitarray = "+splitArray);
            
            var mynum = 1;
            var newSplitArray;
            
            for(var j = 0;j<splitArray.length;j++){
            
            
                 mynum = j+1;
                
                newSplitArray = splitArray[j].split(" ");
                
                
                var blockselect = false;
                
                var prevtest;
                
                
                if(questions[i].underline !="")if(questions[i].underline.split("+")[0] == "B")blockselect = true;
                if(questions[i].circle !="")if(questions[i].circle.split("+")[0] == "B")blockselect = true;
                if(questions[i].highlight !="")if(questions[i].highlight.split("+")[0] == "B")blockselect = true;
                
               // //////console.log("BLOCK SELECT  -"+blockselect);
                
                if(blockselect)newSplitArray = [splitArray[j]];
                
                
                for(k = 0;k<newSplitArray.length;k++){
                
                    var test = new display.newText(newSplitArray[k],textX,wordY,myFont,mySize,myColor);
                
                    if(newSplitArray[k] != "" && (!role || role == "Admin"))test.addEventListener(Event.CLICK,highlightText2,{params:[]});
                    
                    test.num = mynum;
                
                    test.highlightArray = highlightArray;
                    test.block = myBlock;
                    
                    
                        textX = textX+test.width+5;
                        
                        
                        // IF TEACHER, HIGHLIGHT TEXT
                        
                        if(role && role != "Admin"){
                        
                        
                           var underlineArray = [];
                            var circleArray = [];
                            var highlightArray = [];
                            
                            
                            if(questions[i].underline !="")  underlineArray = questions[i].underline.split("+")[1].split(" ");
                             if(questions[i].circle !="") circleArray = questions[i].circle.split("+")[1].split(" ");
                             if(questions[i].highlight !="") highlightArray = questions[i].highlight.split("+")[1].split(" ");
       
            
                      //  for(b = 0;b<blockArray.length;b++){
            
                            for(var u = 0;u<underlineArray.length;u++){
                      
                                if(j+1 == underlineArray[u] && underlineArray[u]!="")test.underline = true; 
          
                            }
                    
                            for( u = 0;u<circleArray.length;u++){
                      
                                if(j+1 == circleArray[u] && circleArray[u]!="")test.showRect = true; 
          
                            }
                            for( u = 0;u<highlightArray.length;u++){
                      
                                if(j+1 == highlightArray[u] && highlightArray[u]!="")test.highlight = true; 
          
                            }
            
                       // }

                        
                        }
                        
                        
                        
                         //////console.log("checking charactger >"+newSplitArray[k]+"<");

                        
                        //if(newSplitArray[k+1]){
                        
                            
                        // CHECK if the character is a full stop and space needs to be adjusted
                         if(checkCharacter(test,prevtest))textX = textX-5;;
                            
                           
                        prevtest = test;

                        
                            // check if gone too far - add second row
                        
                            if(textX>maxWidth+60 && k!=newSplitArray.length-1){
                                
                                
                                textX = leftPad;
                                rowY++;
                                
                                 wordY = topPad+(rowY*rowheight)-10;
                                 
                                // myspace.set({x:leftPad,y:wordY});
                                 
                                  //myspace.row = true;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                            }
                  
                  
                  
            
                   
                    dragArray.push(test);

            
                }
            
            
            
            }
            
                    
           /* for(var j = 0;j<splitArray.length;j++){
            
                if(splitArray[j] != questions[i].word){
                    var test = new display.newText(splitArray[j],textX,rowY,myFont,mySize,myColor);
                   if(splitArray[j]!= " " && splitArray[j]!="") test.addEventListener(Event.RELEASE,highlightText2,{params:[]});
                    test.highlightArray = highlightArray;
                    test.block = myBlock;
                    textX = textX+test.width+5;
                   
                    dragArray.push(test);
                 
                 }
            
            }*/
            
            rowY++;
            
            
            dragArrays.push(dragArray);
            
            emptyOb.array.push(dragArray);
            
                 // lets do this
           
             if(!role || role == "Admin"){ 
                    questions[i].underline = encryptMe(questions[i].underline);
                    questions[i].circle = encryptMe(questions[i].circle);
                    questions[i].highlight = encryptMe(questions[i].highlight);
                     questions[i].sentence = encryptMe(questions[i].sentence);
                     questions[i].num = rowNumber-1;
                     qnum =  questions[i].num;
                  }
                    
           // questions[i].exercise_textbox = test;
        
            myColor = "#0000FF";
        
                      
        }
    
        
    
        gameCanvas.height = wordY+50;
    
        addButton(num);
    }
    
    
    
    
    
         
    
    //  set up custom choice
    
    function setUpCustomChoice(i){
    
    
        var myColor = blackColor;
        var myFont = "Arial";
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].questions;
        var options = exercises[i][1].dropdown_items;
        
        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var rowX = leftPad;
        var column = 1;
        var columns = 4;
        //var rowheight = 30;
        var wordY = 0;
        
        var highlightArray = [];
        
        
        
        //var myOb = splitObs(questions[i]);
        
       
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.options = options;
        emptyOb.opArray = new Array();
        emptyOb.array = new Array();
        
         myExercises.push(emptyOb)
      
        
        /// NEW CODE ***********************************************************************
        
        for(var i = 0;i<questions.length;i++){
        
            wordY = topPad+(rowY*rowheight)
 
        //    var splitword = questions[i].word.split("*")[0];
       
          //  var splitArray = questions[i].answer.split(splitword);
            
            
         
            
              var myOb = new Object();
        var myArray = questions[i].underline.split("+");
    
        myOb.blocks = myArray[0].split("*");
        myOb.nums = [];
        if(myArray.length>1)myOb.nums = myArray[1].split(" ");
        myOb.user = "no";
        
        
        
        
          // check for decoys
        if(myArray[2])myOb.user = myArray[2];
            
                      myColor = blackColor;
                      
            var user = false;
        // add the underline option to the highlight array
            if(questions[i].underline.split("+").length == 3){
            if(myOb.user == "user" && !user){
                user = true;
                highlightArray.push("underline");
            }
           }
           
           
             // add grey line for visibility
           var myBlock = addBlock(0,wordY-10,i);
          
            
           //  var myOb = splitObs(questions[i]);
              var droptarget;
              var droptext = "";
              var showBlock;
              
              var myBlockArray = [];
              
              
            var mynum = 1;
            var newSplitArray;
              
            //  if(myOb.user == "user")myOb.blocks = questions[i].sentence.split(" ");
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
                 
                 
                    myColor = blackColor;
                    
                    
                    
                if(myOb.user != "user"){
            
                         // clean the string
               // myOb.blocks[s] = myOb.blocks[s].replace(/&#039;/gi,"'");
               // myOb.blocks[s] = myOb.blocks[s].replace(/&quot;/gi,"''");
               
               myOb.blocks[s] = cleanString(myOb.blocks[s]);
            
                        var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+test3.width;
                        test3.block = myBlock;
                        
                        test3.num  = s+1;
                        
                                                
                        myBlockArray.push(test3);
                        
                        
                                     
                
                 for(var n = 0;n<myOb.nums.length;n++){
                
                // check if we need to underline the text
                    if(s==(myOb.nums[n]-1)){
                    
                        test3.underline = true;

                     }
                    }
               
                
                
                
                    // check if gone too far - add second row
                        
                            if(rowX>maxWidth+20){
                                
                                // if( myOb.blocks[s+1][0] != "." &&  myOb.blocks[s+1][0] != ","){
                                rowX = leftPad;
                                rowY++;
                                
                                 wordY = topPad+(rowY*rowheight)-10;
                                 
                                 
                                  var myspace = test3;
                                
                                 
                                 
                                 myspace.set({x:leftPad,y:wordY});
                                 
                                  myspace.row = true;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                                
                                //}
                            }
                
                
                
                
                }else{ // IF USER CHOICE
                
                
                    //////console.log("block> "+myOb.blocks[s]);
                
                    /*newSplitArray = myOb.blocks[s].split(" ")
                    
                    
                    num = s+1;
                    
                     for(k = 0;k<newSplitArray.length;k++){
                
                    var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+test3.width;
                        test3.block = myBlock;     
                                    
                    
                     test3.addEventListener(Event.RELEASE,highlightText2,{params:[]});
                    test3.highlightArray = highlightArray;

                    
                    test3.num = mynum;
         
                    
              
                    myBlockArray.push(test3);*/

            
               // }
               
               
               
                         // clean the string
               // myOb.blocks[s] = myOb.blocks[s].replace(/&#039;/gi,"'");
               
               myOb.blocks[s] = cleanString(myOb.blocks[s]);
               
               newSplitArray = myOb.blocks[s].split(" ")
               
               // myOb.blocks[s] = myOb.blocks[s].replace(/&quot;/gi,"''");
               
              
            
            
                 mynum = s+1;
                    
                     for(k = 0;k<newSplitArray.length;k++){

                        var test3 = new display.newText(newSplitArray[k],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+test3.width;
                        test3.block = myBlock;
                        test3.num = mynum;
                        
                        //test3.num  = s;
                        
                                                
                        myBlockArray.push(test3);
                        
                        // CHECK if the character is a full stop and space needs to be adjusted
                         if(!checkCharacter(test3)){
                 
                         var test4 = new display.newText(" ",rowX,wordY,myFont,mySize,myColor);
                         
                        rowX = rowX+test4.width;
                        
                        }
                        
                        
                        if(rowX>maxWidth+20){
                                
                                // if( myOb.blocks[s+1][0] != "." &&  myOb.blocks[s+1][0] != ","){
                                rowX = leftPad;
                                rowY++;
                                
                                 wordY = topPad+(rowY*rowheight)-10;
                                 
                                 
                                  var myspace = test3;
                                
                                 
                                 
                                 myspace.set({x:leftPad,y:wordY});
                                 
                                 rowX = rowX+myspace.width;
                                 
                                  myspace.row = true;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                                
                                
                                
                                
                                       // CHECK if the character is a full stop and space needs to be adjusted
                         if(!checkCharacter(test3)){
                 
                         var test4 = new display.newText(" ",rowX,wordY,myFont,mySize,myColor);
                         
                        rowX = rowX+test4.width;
                        
                        }
                                
                                //}
                            }

                        
                 if(test3.text != "" && (!role || role == "Admin")){
                     test3.addEventListener(Event.CLICK,highlightText2,{params:[]});
                    test3.highlightArray = highlightArray;
                }
                
                
                    // IF TEACHER, HIGHLIGHT TEXT
                        
                        if(role && role !="Admin"){
                        
                           for(var n = 0;n<myOb.nums.length;n++){
                
                        // check if we need to underline the text
                            if(s==(myOb.nums[n]-1)){
                    
                                test3.underline = true;

                            }
                            }
               
            
                       // }

                        
                        }
                
                
                                
                    }                        
                                                                
                                                                                                
                }
                
                
                
                
                
            
                
            }
            
            emptyOb.array.push(myBlockArray);

                
                    // add optoins
                
                var newArray = new Array();
          
          
          for(var ar = 0;ar<options.length;ar++){
          
            newArray.push(options[ar].dropdown_item);
          
          }
          
          
          emptyOb.opArray.push([num+1,wordY]);
          
          var answer = questions[i].correct_item;
          
          if(!role || role == "Admin")answer = "";
          
          
           createOptions(newArray,(num+1),wordY, answer);
        
             rowY++;
             rowX = leftPad;
             
             
              // lets do this
           
             if(!role || role == "Admin"){ 
                questions[i].sentence = encryptMe(questions[i].sentence);
                questions[i].underline = encryptMe(questions[i].underline);
                questions[i].correct_item = encryptMe(questions[i].correct_item);
                questions[i].num = rowNumber-1;
                qnum =  questions[i].num;
             }
             
             
            
        }


/// NEW CODE END ***********************************************************************
        
    /*
        for(var i = 0;i<questions.length;i++){
        
            rowY = topPad+(i*rowheight)
 
       
          // add grey line for visibility
           addBlock(0,rowY-10,i);
           
           var splitArray = [];  // check if we should split the array or just have a sentence
           var underlineArray = questions[i].underline.split("+")[0].split("*");
           
           var user = false;
           
           var highlightArray = []
           
           if(questions[i].underline.split("+").length == 3){
            if(questions[i].underline.split("+")[2] == "user" && !user){
                user = true;
                highlightArray.push("underline");
            }
           }
           
           
           //////console.log("and user = "+user);
           
           splitArray = questions[i].sentence.split(" ");
           
                    
            
           myColor = blackColor;
           rowX = leftPad;
           
           for(var s = 0;s<splitArray.length;s++){
           
                 var test = new display.newText(splitArray[s],rowX,rowY,myFont,mySize,myColor);
                 
                 
                 // if user is meant to highlight the text
                 if(user){
                    test.addEventListener(Event.RELEASE,highlightText2,{params:[]});
                    test.highlightArray = highlightArray;
                    }
           // test.addEventListener(Event.RELEASE,highlightText,{params:[]});
            test.num = s;
            rowX=rowX+test.width+3;
            for(var u = 0;u<underlineArray.length;u++){
            
                if(splitArray[s] == underlineArray[u] && !user){
                    test.underline = true;
                
                }
           }
           
           }
           
    
          
          var newArray = new Array();
          
          
          for(var ar = 0;ar<options.length;ar++){
          
            newArray.push(options[ar].dropdown_item);
          
          }
          
           createOptions(newArray,(num+1),rowY);
            
        }
        
        */
    
    
        gameCanvas.height = wordY+50;
    
    
        addButton(num);
    
    }
    
    
    
    
    //  set up custom choice
    
    function setUpNewGame(i){
    
  
    
      var myColor = "#FF0000";
        var myFont = "Arial"; 
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].questions;
        
        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var rowX = leftPad;
        var column = 1;
        var columns = 4;
        //var rowheight = 30;
        
        
               
         var dragArray = new Array();
        
        var wordX = leftPad;
        
        
        
        // set up drag boxes
        
        
             var myAnswers = [];
        
        var splitWords = [];
        
        
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.array = new Array();
        
         myExercises.push(emptyOb)
        
        
           
        for(var i = 0;i<questions.length;i++){
        
            wordY = topPad+(rowY*rowheight)
            
            
            var split = questions[i].sentence.split("+");
 
            var splitword = split[0].split("*");
            
            var splitnum = [];
            
            if(split.length == 2)splitnum = split[1].split(" ");
            
            //////console.log("-----");
            //////console.log(split);
            //////console.log(splitnum);
             //////console.log("-----");
            
       
            var splitArray;
            
            
            if(splitword.length == 1)splitArray = questions[i].sentence.split(" ");
            else splitArray = splitword;
            
            
            if(role && role!="Admin")splitArray = [questions[i].answer];
            
                      myColor = blackColor;
           
           
             // add grey line for visibility
           var myBlock = addBlock(0,wordY-10,i);
           
           
          
            
            // var myOb = splitObs(questions[i]);
             var myOb = new Object();
             
             myOb.blocks = splitArray;
             
              var droptarget;
              var droptext = "";
              var showBlock;
              
              var myBlockArray = [];
              
              
               emptyOb.array.push(myBlockArray)
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
            
             showBlock = true;
             
             var shouldaddButton = false;
             
             if(splitnum.length == 0)shouldaddButton = true;
             
                
                if(showBlock == true){
                    myColor = blackColor; 
                    
            
                         // clean the string
              //  myOb.blocks[s] = myOb.blocks[s].replace(/&#039;/gi,"'");
              //  myOb.blocks[s] = myOb.blocks[s].replace(/&quot;/gi,"''");
              
              myOb.blocks[s] = cleanString(myOb.blocks[s]);
              
            
                        var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        test3.row = false;
                        test3.block = myBlock;
                        
                         rowX = rowX+test3.width;      
                       
                         myBlockArray.push(test3);
                        test3.blockArray = myBlockArray;
                        
                        
                       
                       // check if we should add a button click to a word
                        
                         for(var b = 0;b<splitnum.length;b++){
                         
                            //////console.log(splitnum[b]);
                            //////console.log(s+1);
                         
                            if(Number(splitnum[b]) == (s+1)){
                                shouldaddButton = true;
                                break;
                            }
                        }
                           
                    if(shouldaddButton)test3.addEventListener(Event.CLICK,changeTextDropDown2,{params:[]});
                       
                         
                         test3.selectName = 'opt_'+(num+1)+'_'+wordY;
                         test3.num = num+1;
                         test3.i = i+1;
                    
                    
                    // check to add a space after...
                    var showspace = true;
                    //first.. let print out the next character..
                    if(myOb.blocks[s+1]){
                        var nextChar = myOb.blocks[s+1];
                        //////console.log("nextchar = "+nextChar[0]);
                        
                        if(nextChar == "." || nextChar == ",")showspace = false;
                    }
                        
                        if(showspace){
                       
                         var myspace = new display.newText(" ",rowX,wordY,myFont,mySize,myColor);
                        myspace.row = false;
                        rowX = rowX+myspace.width;      
                        myBlockArray.push(myspace);
                          myspace.blockArray = myBlockArray;
                          
                          
                          
                          
                             // check if gone too far - add second row
                        
                            if(rowX>maxWidth && s != myOb.blocks.length-1){
                                
                                
                                rowX = leftPad;
                                rowY++;
                                
                                 wordY = topPad+(rowY*rowheight)-10;
                                 
                                 myspace.set({x:leftPad,y:wordY});
                                 
                                  myspace.row = true;
                                  
                                  rowX = rowX+myspace.width;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                            }
                            
                            }else{
                            
                                     // check if gone too far - add second row
                        
                            if(rowX>maxWidth && s != myOb.blocks.length-1){
                                
                                
                                rowX = leftPad;
                                rowY++;
                                
                                 wordY = topPad+(rowY*rowheight)-10;
                                 
                                 test3.set({x:leftPad,y:wordY});
                                 
                                  test3.row = true;
                                 
                                 rowX = rowX+test3.width;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                            }
                            
                            
                            }
                          
                        
                }
                
                
                
            }


             var options = questions[i].drop_down.split(", ");
           var option;
           var prevOption;
           var div;
           
           
           var newArray = new Array();
          
          for(var ar = 0;ar<options.length;ar++){
          
            newArray.push(options[ar]);
          
          }
          
        //  alert(options);
          
          // createOptions(newArray,(num+1),wordY);
             createDropDown(newArray,(num+1),(i+1));

        
             rowY++;
             rowX = leftPad;
             
             
             
                    
              // lets do this
           
             if(!role || role == "Admin"){  
                questions[i].sentence = encryptMe(questions[i].sentence);
                questions[i].word = encryptMe(questions[i].word);
                questions[i].drop_down = encryptMe(questions[i].drop_down);
                questions[i].answer = encryptMe(questions[i].answer);
                questions[i].num = rowNumber-1;
                qnum =  questions[i].num;
             }
                    
            
        }
    
    
        wordY+=50;gameCanvas.height = wordY+topPad;
    
    
    
        addButton(num);
    
    }
    
    
    
    function clickDropDown(str){
    
    
        str = cleanString(str);
        
        str = decodeURIComponent(str)
        
         str = cleanString(str);
         
    
        if(str == "reset"){
            str = selectedTarget.resetText;
            selectedTarget.fontColor = blackColor;
        }
        else selectedTarget.fontColor = blueColor;
        
        selectedTarget.set({text:str});
        
        if(selectedTarget.blockArray)realignBlocks(selectedTarget.blockArray);
        
        showHideDropDown(selectedTarget.num,selectedTarget.i,"none");
        
    
    }
    
    
    function changeTextDropDown2(e){
    
        selectedTarget = e.parent;
        
        showHideDropDown(e.parent.num,e.parent.i,"block");
        
        
    //    document.getElementById('topDrop').innerHTML = e.parent.resetText;
        
      //  alert(e.parent.num);
            
    }
    
    
    
    function changeTextDropDown(e){
    
            var $a = $("#"+e.parent.selectName);
    
    
        if($a.val()!="null"){
              e.parent.set({text:$a.val()});
               if(e.parent.blockArray)realignBlocks(e.parent.blockArray);
              
        }else{
             e.parent.set({text:e.parent.resetText});
              if(e.parent.blockArray)realignBlocks(e.parent.blockArray);
        }
    
    }

    
    
    
    function addOptions(options,rowY,i){
         /*
    
        var myColor = blackColor;
        var myFont = "Arial";
        var mySize = 16;
    
         var option;
           var prevOption;
           var div;
           
           for(j = options.length-1;j>-1;j--){
           
                
                if(j==options.length-1){
                 option = new display.newText(options[j].dropdown_item, 500,rowY,myFont,mySize,myColor);
                 option.set({x:850-option.width});
                }else{
                 option = new display.newText(options[j].dropdown_item, prevOption.x-prevOption.width-30,rowY,myFont,mySize,myColor);
                 option.set({x:prevOption.x-option.width-30});
                 div = new display.newText("/", prevOption.x-15,rowY,myFont,mySize,myColor);
                }

                option.addEventListener(Event.RELEASE,highlightText,{params:[]});
                
                prevOption = option;
           
           }
        */
        
        
        
       
    }

    
    
     //  set up custom choice
             // set up add words
    
    function setUpCustomChoiceDetailed(i){
    
        var myColor = "#FF0000";
        var myFont = "Arial"; 
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].questions;
        
        var num = i;
    
        //var topPad = 50;
        var rowY = 0;
        var rowX = leftPad;
        var column = 1;
        var columns = 4;
        //var rowheight = 30;
        
        
               
        var dragArray = new Array();
        
        var wordX = leftPad;
        
        
        
        // set up drag boxes
        
        
             var myAnswers = [];
        
        var splitWords = [];
       /* 
        for(var i = 0;i<questions.length;i++){
        splitObs(questions[i]);

        
            splitWords = questions[i].word.split("*");
            
            for(var s = 0;s<splitWords.length;s++){
               if(splitWords[i]!="") myAnswers.push(splitWords[s]);
            }
        
        }*/
        
        
        
           for(var i = 0;i<questions.length;i++){
                
                var myOb = splitObs(questions[i]);
              
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
                for(var n = 0;n<myOb.nums.length;n++){
                    if(s==(myOb.nums[n]-1)) myAnswers.push(myOb.blocks[s]);
                }
                }
                
                
                
                
                
                
                  //////console.log("decoys = "+myOb.decoys);
            
            // now lets add decoy words if any
            for(var s = 0;s<myOb.decoys.length;s++){
                
                  if(myOb.decoys[s]!="" && myOb.decoys[s]!=" "){
                   myAnswers.push(myOb.decoys[s]);
                   
                   }
               
        
            }
                
                
        
            }
            
            
          
            
        
        // randomise the array
        randomiseArray(myAnswers);
        
        
        if(!role || role == "Admin"){  // if not teacher
    
        for( i = 0;i<myAnswers.length;i++){
        
            wordY = topPad+(rowY*rowheight);
        
                     
             myColor = "#06C";
             
              // clean the string
           // myAnswers[i] = myAnswers[i].replace(/&#039;/gi,"'");
            //myAnswers[i] = myAnswers[i].replace(/&quot;/gi,"''");
            
            myAnswers[i] = cleanString(myAnswers[i]);

            
            smallword = new display.newText(myAnswers[i],wordX,wordY,myFont,mySize,myColor);
            smallword.showRect = true;
            smallword.dragArray = dragArray;
            smallword.orginX = smallword.x;
            smallword.orginY = smallword.y;
            smallword.addEventListener(Event.CLICK,showRect,{params:[]});
            smallword.addEventListener(Event.RELEASE,checkDragDrop,{params:[]});
            smallword.isDraggable = true;
        

           // test.addEventListener(Event.RELEASE,highlightText,{params:[]});
            //test2.num = i;
            //test2.setText(
           // questions[i].exercise_textbox = test;
        
        
            wordX = smallword.x+smallword.width+20;
            
            //////console.log(wordX);
        
            if(wordX>900){
        
                wordX = leftPad;
                
                rowY++;
                
                wordY = topPad+(rowY*rowheight);
                
                smallword.set({x:wordX,y:wordY});
            
                smallword.orginX = smallword.x;
                smallword.orginY = smallword.y;
                
                wordX = smallword.x+smallword.width+20;
            }
            
            
            
            
        }
        
        
        rowY+=1;
        
        
        }

         var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.options = options;
        emptyOb.opArray = new Array();
        emptyOb.array = new Array();
        
         myExercises.push(emptyOb)



    
        for(var i = 0;i<questions.length;i++){
        
            wordY = topPad+(rowY*rowheight)
 
            var splitword = questions[i].word.split("*")[0];
       
            var splitArray = questions[i].answer.split(splitword);
            
                      myColor = blackColor;
           
           
             // add grey line for visibility
           var myBlock = addBlock(0,wordY-10,i);
          
            
             var myOb = splitObs(questions[i]);
              var droptarget;
              var droptext = "";
              var showBlock;
              
              var myBlockArray = [];
            
           // lets add the words taken from the sentence
            
            for(var s = 0;s<myOb.blocks.length;s++){
            
             showBlock = true;
             
             
            
                for(var n = 0;n<myOb.nums.length;n++){
                
                // check if we need to add the dotted lines
                    if(s==(myOb.nums[n]-1)){
                    
                        myColor = greyDots;
                     //   var myNum = myOb.blocks[s].length+(Math.random()*3);
                     //  droptext = "[ ";
                     //   for(j = 0;j<myNum;j++)droptext = droptext+". ";
                      //  droptext = droptext+"] ";
                        
                        droptext = getDots(myOb.blocks[s].length);
                        
                         myOb.blocks[s] = cleanString(myOb.blocks[s]);
                        
                        if(role && role!="Admin"){
                            droptext = "[ "+myOb.blocks[s]+" ]";
                            myColor = blueColor;
                        }
                        
                        
                        droptarget = new display.newText(droptext,rowX,wordY,myFont,mySize,myColor);
                        droptarget.block = myBlock;
                        
                        // var widthText = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+droptarget.width;
                        dragArray.push(droptarget);
                        showBlock = false;
                        
                        myBlockArray.push(droptarget);
                        droptarget.blockArray = myBlockArray;
                        
                       
                        
                     }
                     
                }
                
                
                
                if(showBlock == true){
                    myColor = blackColor;
            
                         // clean the string
               // myOb.blocks[s] = myOb.blocks[s].replace(/&#039;/gi,"'");
               // myOb.blocks[s] = myOb.blocks[s].replace(/&quot;/gi,"''");
            
                 myOb.blocks[s] = cleanString(myOb.blocks[s]);
                 
                 
                        var test3 = new display.newText(myOb.blocks[s],rowX,wordY,myFont,mySize,myColor);
                        rowX = rowX+test3.width;
                        
                        test3.block = myBlock;
                        
                        myBlockArray.push(test3);
                }

                
            }



             emptyOb.array.push(myBlockArray)

             var options = questions[i].drop_down.split(", ");
           var option;
           var prevOption;
           var div;
           
           
           var newArray = new Array();
          
          for(var ar = 0;ar<options.length;ar++){
          
            newArray.push(options[ar]);
          
          }
          
        //  alert(options);
            emptyOb.opArray.push([num+1,wordY]);
            
            var answer = "";
            if(role && role!="Admin")answer = questions[i].answer;
          
           createOptions(newArray,(num+1),wordY, answer);



              
            // lets do this
           
             if(!role || role == "Admin"){ 
                questions[i].sentence = encryptMe(questions[i].sentence);
                questions[i].word = encryptMe(questions[i].word);
                questions[i].drop_down = encryptMe(questions[i].drop_down);
                questions[i].answer = encryptMe(questions[i].answer);
                questions[i].num = rowNumber-1;
                qnum =  questions[i].num;
             }
                
              
        
             rowY++;
             rowX = leftPad;
            
        }
    
    
        wordY+=50;
        
        gameCanvas.height = wordY+topPad;
    
    
        addButton(num);
    
    }
    
    
    
    
function setUpMoveCharacters(i){
    
    
        //gameCanvas.addEventListener(Event.RELEASE,stopDragWord,{params:[]});
    
        var myColor = blackColor;
        var myFont = "Arial";
        var mySize = 16;

    
        var type = exercises[i][0];
        var questions = exercises[i][1].sentences;
        
        
        
        var num = i;
    
        //var topPad = 50;
        var rowY = 2;
        var column = 1;
        var columns = 4;
        //var rowheight = 30;
        
        var dragArray = [];
        
        var textX = leftPad;
        
        var markerX = 50;
        
        var characters = [];
        var addCharacter;
        
        var char_type = exercises[i][1].char_type;
        
        
        
        var emptyOb = new Object();
        emptyOb.num = num;
        emptyOb.type = type;
        emptyOb.questions = questions;   
        emptyOb.array = new Array();
        
        myExercises.push(emptyOb)
        
        markerArray = [];
        
        for(var i= 0;i<questions.length;i++){
        

           questions[i].character = cleanString(questions[i].character);
            
            var myPushCharacters = [];
            
            
            
           var tempArray = questions[i].character.split("*");
           
           //////console.log(tempArray);
           
            for(var t = 0;t<tempArray.length;t++){
           
                var tinyTemp;
                if(tempArray.length>1)tinyTemp = tempArray[t].split("+")[1].split(" ");
                else tinyTemp = tempArray[t].split("+")[1].split(" ");;
                
                for(var tt = 0;tt<tinyTemp.length;tt++)characters.push({ar:tempArray[t].split("+"),char:tempArray[t].split("+")[0],num:i});

           
           }
           
           
        }
           
           
            
       //  RANDOMISE THE CHARACTERS TO ADD
        randomiseArray(characters);
        
        
        
        rowY = 10;
        
        
        if(!role || role=="Admin"){  // IF TEACHER, DON"T SHOW THIS
            
            for(c = 0;c<characters.length;c++){
            

                myColor = blueLightColor;
                mySize = 16;
            
                   //mychar = new display.newText(characters[c],markerX,10,myFont,mySize,myColor);
                   
                   var url;
                   var src;
                   
                  // characters[c].char = characters[c].char.replace(/\s/g,'');
                    characters[c].char = cleanString(characters[c].char);
                   
                   if(characters[c].char == ".")url = fullstopURL;
                   if(characters[c].char == ",")url = commaURL;
                   if(characters[c].char == ":")url = colonURL;
                   if(characters[c].char == ";")url = semicolonURL;
                   if(characters[c].char == "-")url = hyphenURL;
                   if(characters[c].char == " -")url = hyphenURL;
                   if(characters[c].char == "6")url = URL66;
                   if(characters[c].char == "9")url = URL99;
                   
                   
                   if(characters[c].char == ".")src = imageFullstop;
                   if(characters[c].char == ",")src = imageComma;
                   if(characters[c].char == ":")src = imageColon;
                   if(characters[c].char == ";")src = imageSemicolon;
                   if(characters[c].char == "-")src = imageHyphen;
                    if(characters[c].char == " -")src = imageHyphen;
                   if(characters[c].char == "6")src = image66;
                    if(characters[c].char == "9")src = image99;
                   
                   
                   
                   if(characters[c].char == "'")url = apostropheURL;
                   if(characters[c].char == "(")url = bracketLeftURL;
                   if(characters[c].char == ")")url = bracketRightURL;
                   if(characters[c].char == "?")url = questionMarkURL;
                   if(characters[c].char == "/")url = forwardSlashURL;
                   if(characters[c].char == "!")url = exclamationMarkURL;
                   
                   
                   if(characters[c].char == "'")src = imageApostrophe;
                   if(characters[c].char == "(")src = imageBracketLeft;
                   if(characters[c].char == ")")src = imageBracketRight;
                   if(characters[c].char == "?")src = imageQuestionMark;
                   if(characters[c].char == "/")src = imageForwardSlash;
                   if(characters[c].char == "!")src = imageExclamationMark;


                   
                if(src!=undefined){
                    mychar = new display.newImage(url,src,markerX,rowY); ///  add the image if there is one
                    mychar.text = characters[c].char;
                }else{ 
                    mychar = new display.newText(characters[c].char,markerX,rowY,myFont,mySize,myColor); // else use text
                 }
                                       
                  
                        mychar.addEventListener(Event.CLICK,dragWord,{params:[]});
                        mychar.addEventListener(Event.RELEASE,checkJoinDrop2,{params:[]});
                                                //mychar.showRect = true;
                        //test.isDraggable = true;
                        mychar.lockY = false;
                       // mychar.set({x: markerX, y:10});
                         
                        mychar.originY = rowY; 
                        mychar.originX = markerX;
                         
                         mychar.dragDrop = true;
                         
                        mychar.num = characters[c].num;
                        
                        markerArray.push(mychar);
                        myPushCharacters.push(mychar);
                        
                        mychar.text = characters[c].char;
                        
                        if(mychar.text == " -")mychar.xoffset = 3;
                        
                        
                         markerX = markerX+30;
                         
                         
                         
                         if(characters[c].ar.length>2)if(characters[c].ar[2] == "add")mychar.add = true;
                         
                         
                         // check if gone too far right..
                         
                         if(markerX > 880){
                         
                            markerX = 50;
                            rowY = 60;
                         
                         }
            
            }
            
            }
            

        
     rowY = topPad+50+rowY;
     var rowNum = 0;
     var twoRows = false;
     
        for(var i = 0;i<questions.length;i++){
            
            myColor = blackColor;
            
            twoRows = false;

       
            // NEW CODE
            
            var characterOb = new Object();
            
            var myArray = questions[i].character.split("*");
            

           var push = false;
            
            
           // var mysentence  = questions[i].sentence;
            
            var mysentence = cleanString(questions[i].sentence);
                       
            var foundCharacter = 0;
            
            var tmpArray;
            
            
           /*********************************************
           
           THIS CODE IS TO PUT BACK ONLY THE STATIC COMMAS/CHARS
        
            ********************************************/
           
           if(!role || role == "Admin"){
           
           
           /// cycle through all character types
            for(var cc = 0;cc<myArray.length;cc++){  // then loop through amounts character types
            
            foundCharacter = 0;

                characterOb.ar = myArray[cc].split("+")[1].split(" ");   // get the array of numbers ( 1 means, first comma etc)

                characterOb.char =myArray[cc].split("+")[0];  // check what the character is

               tmpArray = mysentence.split(characterOb.char);
               
               mysentence = "";
               
               //////console.log("mytemparray = "+tmpArray);
               // let's rebuild the sentence now...
               
               for(var ar = 0;ar<tmpArray.length;ar++){

                 mysentence = mysentence+tmpArray[ar];
                
                 
                 var addChar = true;
                 

                 if(characterOb.ar[foundCharacter] == ar+1){
          
                    foundCharacter++;
                    addChar = false;
                 }
                 
                 
                 if( ar ==tmpArray.length-1 &&  characterOb.ar[foundCharacter] == undefined){
                     foundCharacter++;
                    addChar = false;

                    
                 }

                 
                 if(addChar)mysentence = mysentence+characterOb.char;
                
 
               
               }
                
                               
                
            }
           
                   
            // rebuild the sentence with the correct commas taken out
            
            var tempString = "";
            
             for(c = 0;c<mysentence.length;c++){
             
             
                tempString = tempString + mysentence[c];
             
             }
             
             }else{
             
                tempString = questions[i].sentence;
             
             
             }
             
                                
            
            // END NEW CODE

           
           tempString = cleanString(tempString);
           
           
               
            var splitArray = tempString.split(" ");
            
            if(char_type){
            
                splitArray = tempString.split("");
            
            }
            
            

                
                // add grey line for visibility
          var myBlock =  addBlock(0,rowY-10,i);
                
            
            rowX = leftPad;
            dragArray = new Array();
            
           
            
            var dar = 1;
            
            
            for(var j = 0;j<splitArray.length;j++){

                
                wordY = topPad+(rowY*rowheight);

                addCharacter = false;
                

                    myColor = blackColor;
                    mySize = 16;
                
                
                    var mytext = splitArray[j];
                    
                if(char_type == false)mytext = " "+splitArray[j];
                    
                    
                    mytext = cleanString(mytext);
                    
                    
                    // add a block at start
                    
                    if(j == 0){
                    
                        var test1 = new display.newText(startlineMarker,rowX,rowY,myFont,mySize,myColor);
                        dragArray.push(test1);
                        test1.row = false;
                        test1.dragDrop = true;
                            
                        rowX = leftPad;
                    
                    
                    }
      
                    
                    var test = new display.newText(mytext,rowX,rowY,myFont,mySize,myColor);
                                    
                    test.block = myBlock;
                    
                       dragArray.push(test);
                       
                    
                      //  test.markerArray = new Array();
                         rowX = rowX+test.width+1;
                        test.i = j;
                        test.row = false;
                        
                        test.rowNum = dar;
    
                      
                    
                    test.array = dragArray;
                    
                    //////console.log(">"+mytext+"<");
                    
                    // check if gone too far - add second row
                        
                         //  if(rowX>maxWidth && mytext == " "){ 
                             if(rowX>maxWidth && mytext[0] == " " && j != splitArray.length-1){
                           
                                rowX = rowX-test.width-1;
                           
                                var test2 = new display.newText(endlineMarker,rowX,rowY,myFont,mySize,myColor);
                                dragArray.push(test2);
                                test2.row = false;
                                test2.dragDrop = true;
    
                                rowNum++;
                           
                                dar = 2;
                                
                                rowX = leftPad;
                                rowY = rowY + topPad+(rowheight/3)+10
                                //rowY = topPad+(rowNum*(rowheight/2))+60;
                                
                               //  wordY = topPad+(rowY*rowheight)
                                 
                                 test.set({text:""});
                                // test.row = true;
                                 
                                // test.rowNum = dar;
                                 
                                if(myBlock) myBlock.set({height:(rowheight*2)});
                                
                               // rowX = rowX+test.width+1;
                                
                                twoRows = true;
                                
                                var test1 = new display.newText(startlineMarker,rowX,rowY,myFont,mySize,myColor);
                                dragArray.push(test1);
                                test1.row = false;
                                test1.dragDrop = true;   
                                
 
 
                            }
                            // end check add second row
                 
                 
                            // check if it's the last word..
                            
                            if(splitArray.length-1 == j){
                                 var test2 = new display.newText(endlineMarker,rowX,rowY,myFont,mySize,myColor);
                                dragArray.push(test2);
                                test2.row = false;
                                test2.dragDrop = true;
                            }
                 
                 
            
            }
            
                       
            
            // check markers and see if we should put them in there.
            
     
            
            for(var ma = 0;ma<markerArray.length;ma++){
            
                if(markerArray[ma].num == i && markerArray[ma].add == true){
                
                
                /*  var rand = Math.floor(Math.random()*dragArray.length);
                    
                    if(rand == 0)rand = 2;
                    if(rand == markerArray.length)rand = markerArray.length-2;



             var newX = dragArray[rand].x;
               var newY = dragArray[rand].y;
                
                markerArray[ma].set({y:newY,x:newX});
                
                 markerArray[ma].index = display.getNewIndex();
                    display.sortIndex();
                    
                    markerArray[ma].i = 5+ma;
                    
                     markerArray[ma].pinned = false;
                    markerArray[ma].block = myBlock;
                    
                    markerArray[ma].array = dragArray;
                     markerArray[ma].ar = dragArray;
                    
                    var tOb = new Object();
                    tOb.parent = markerArray[ma];
                    
                    checkJoinDrop2(tOb);
                    refreshArray(dragArray,99);
*/
                
              //  alert("new xy = "+newX+"_"+newY);
                
                // dragArray.splice(ma*2,0,markerArray[ma]);
                // markerArray[ma].pinned = true;
          //
                   markerArray[ma].dir = 1;
                    
                    var rand = Math.floor(Math.random()*(dragArray.length-3))+2;
                    
                    if(rand <2 ){
                    rand = 2;
                    // alert("NO WAI");
                    }
                    if(rand == markerArray.length)rand = markerArray.length-2;
                    
                    
                                       
                    markerArray[ma].i = rand;
                    
                    //////console.log(markerArray[ma].i);
                  

                    markerArray[ma].array = dragArray;
                     markerArray[ma].ar = dragArray;
                    //dragMarker.i = j;
                    
                  //   TAKE THIS OUT FOR TEST.  WHAT WAS I THINKIN
                  
                    var newY = dragArray[rand].y
                    
                    if(newY<0)newY = dragArray[rand+1].y
                    if(newY>920)newY = dragArray[rand-1].y
                    
                    markerArray[ma].set({y:newY});
                    
                    
                    
                    // test x
                    var newX = dragArray[rand].x;  // changed from .y 
                    
                   // if(newX<0)markerArray[ma].i++;
                    if(newX>920)markerArray[ma].i--;
                   // 
                   

                    dragArray.splice(rand,0,markerArray[ma]);
            
                   // markerArray[ma].set({x:newX});
 
            
                   // refreshArray(dragArray,99);
            
                    markerArray[ma].pinned = true;
                    markerArray[ma].block = myBlock;
                    
                    
                      markerArray[ma].index = display.getNewIndex();
                    display.sortIndex();
                    
                    

                    
                    }
                
            
            }
            
            
             emptyOb.array.push(dragArray);
            
            
            rowNum++;
           
            
           // // if(!twoRows)rowY = rowY +(rowheight);
            // else rowY = rowY +(rowheight/3);
            
            rowY = rowY +(rowheight)
           



         
            refreshArray(dragArray,99);
            
            dragArrays.push(dragArray);
            
          
           // questions[i].exercise_textbox = test;
        
         /*   myColor = "#0000FF";
        
            var smallword = new display.newText(questions[i].word,50+(100*i),20,myFont,mySize,myColor); 
            smallword.showRect = true;
           // smallword.dragTarget = droptarget;
            smallword.orginX = smallword.x;
            smallword.orginY = smallword.y;
            smallword.array = null;
            smallword.i = 0;
            smallword.addEventListener(Event.CLICK,showRect,{params:[]});
            smallword.addEventListener(Event.RELEASE,checkJoinSentence,{params:[]});
            smallword.isDraggable = true;
            */
            
            
              // lets do this
           
             if(!role || role == "Admin"){  
                questions[i].sentence = encryptMe(questions[i].sentence);
                questions[i].character = encryptMe(questions[i].character);
                questions[i].num = rowNumber-1;
                qnum =  questions[i].num;
             }
             
        
            
        }
    
    
        gameCanvas.height = rowY+50;
    
        addButton(num);
    
    }
    
    
    
        
    
    
    //  test spellingk kshow the DIV
    
    
    function testSpelling(e){
    
    
    spellingWord = e.parent;
        
            // position DIV
    var $a = $("#spellingDIV");
    
    
    var $b = $("#spellingText");
    
    
$a.css('display','block');
$a.show();
$b.show();

$b.val("");
$b.css('display','block');



// HIDE TEXT BUTTON


$("#button").css('display','none');


setTimeout(function() { $('input[name="spellingText"]').focus(); }, 100);
//var input = document.getElementById("spellingText").focus();



//$('#spellingText').select()



// set up temp text
    var $s = $("#hintText");
$s.css('display','block');

//var str = $("p:first").text();
    $s.html(spellingWord.text);
    
     $s.delay(600).fadeOut();



    
    }
    
    
    
    // check key press
    
    function checkKey(e){
    
    
        var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   //myfield.form.submit();
   checkSpelling();
   return false;
   }
else{

    $("#button").fadeIn();

   return true;
}
    
    
    }
    
    
    // when clicked, this checks the spelling
    
    function checkSpelling(){
    
    
    //////console.log("CHECK SPELLING!");
    
        var word = $("#spellingText").val();
        
        word = word.toLowerCase()
        
        
        //////console.log(word,spellingWord.text);
        
        if(word ==  spellingWord.text){
        
            spellingWord.fontColor = "#0C0";
            $("#spellingDIV").css('display','none');
            //////console.log("correct");
        
        }else{
        
            spellingWord.fontColor = redColor;
            $("#spellingDIV").css('display','none');
            
            //////console.log("WRONG");
            
        }

            

    spellingWord.set({});
    
    }
    
    

    
     function cleanString(str){
    
             
                               str = str.replace(/&#039;/g,"'");
            ////   str = str.replace(/&quot;/gi,'"');
               
                      // replace for 
            

//str = str.replace(/\./g,' ')


               
               // check for PLUS and change to +
               str = str.replace(/PLUS/g,'+');
                
               // str = str.replace(/%26%23039%3B/gi,"'");
                
               // str = str.replace(/%26quot%3B/gi,'"');
               
               str = str.replace(/&(lt|gt|quot);/g, function (m, p) { 
      //console.log(p);
    return (p == "lt") ? "<" : ((p == "gt") ? ">" : "''");
    });
    
             
                if(r == "Teacher"){
                    str = str.replace(/9/g,'"');
                    str = str.replace(/6/g,'"');
                    
                    } 

                
          
        return str;
    
    }
    
    
    
       function cleanString2(str){
    
                    // replace for 
                    
                

                               str = str.replace(/&#039;/gi,"'");
            ////   str = str.replace(/&quot;/gi,'"');
               
               
               // check for PLUS and change to +
               str = str.replace(/PLUS/g,'+');
                
               // str = str.replace(/%26%23039%3B/gi,"'");
                
               // str = str.replace(/%26quot%3B/gi,'"');
               
               str = str.replace(/&(lt|gt|quot);/g, function (m, p) { 
      //console.log(p);
    return (p == "lt") ? "<" : ((p == "gt") ? ">" : "''");
    });
    
     str = str.replaceAll("&#039;","'");

    str = str.replace(/6/gi,'"');
    str = str.replace(/9/gi,'"');
          
                
          
        return str;
    
    }
    
    
       function soilString(str){
    
                    // replace for 
                    
               //  str = str.replace(/"'"/gi,"&#039;");
               //str = str.replace(/'"'/gi,"&quot;");
                
      
          
         return str;
    
    }
    
    
    
    // drag word around
    
    function dragWord(e){
    
    if(!drag.isDragging){
    
     //if(!e.parent.pinned) e.parent.orginX = e.parent.x;
     
     
        //////console.log("clicked");
        dragMarker = e.parent;
        
        e.parent.index = display.getNewIndex();
        display.sortIndex();
        
        drag.target = e.parent;
        drag.isDragging = true;
        
        e.parent.startDrag();
        
        if(e.parent.pinned){
        //////console.log("removing from array");
            e.parent.pinned = false;
            removeMarker(e.parent)
        
        }
        
    }
    }
    
    function stopDragWord(){
    
     // if(dragMarker)//////console.log(dragMarker.x,dragMarker.y);
        //dragMarker = undefined;
    
    }
    
    
    
    function moveElement(ar,ob,dir){

        var tempOb = ob;
        

        ar.splice

        ar.splice(ob.i,1);

        ar.splice(ob.i+dir,0,ob);

        ob.i = ob.i+dir;

    }
    
    
    // check if word should be dropped into a sentence
    
    function checkJoinSentence(e){
    /*
        var foundDrop = false;
    
        for(var i = 0;i<dragArrays.length;i++){
        
            for(var j = 0;j<dragArrays[i].length;j++){
            
                if(checkRect(dragArrays[i][j],e.parent.rect.center.x,e.parent.rect.center.y)){
                    foundDrop = true;
                  //  //////console.log("TRUE!");
                  e.parent.array = dragArrays[i];
                    redrawArray(dragArrays[i],e.parent,j+1);
                    
                    break;
                }
            
            
            }
        
        }
        
        if(!foundDrop){
        
            e.parent.set({x:e.parent.orginX});
            e.parent.set({y:e.parent.orginY});
            
            if(e.parent.array){
            
                redrawArray(e.parent.array,e.parent,1000);
                e.parent.array = null;
            
            }
            
        }
        */
    
    }
    
    
    // redraw array
     function redrawArray(ar,insert,j){
        
        var textX = 50;
        
       //////console.log("fffff");
        
        for(var i = 0;i<ar.length;i++){
        
            if(i != j){
            
                ar[i].set({x:textX});
                textX = textX+ar[i].width+1;
            
            }else{
            
                insert.set({x:textX,y:ar[0].y});
                textX = textX+insert.width+1;
                
                ar[i].set({x:textX});
                textX = textX+ar[i].width+1;
                               
            }
        
        
        }
     
     
     }
    
    
    
    // 
    
    // drag loop for dragging words through a sentence
    
     function myDragLoop(){
     
     
     
     /// lets check if the kid has turned on spell checking
     
     //'<div id="textContainer" spellcheck="false">';
     
     var $a = $("#textContainer"); 
     
       // //////console.log($a, $("#textContainer").attr("spellcheck","false"));

        
$("#textContainer").attr("spellcheck",false);
$("#spellingText").attr("spellcheck",false);


     
    
        /*var myCanvas = false;
        for(i = 0;i<dragArrays.length;i++){
            if(dragArrays[i][0].canvas == gameCanvas){
            
                
               // dragMarker.x = mouse.x;
            
            
            }
        }*/
        /*
        
        if(dragMarker != undefined){
        
            dragMarker.set({x :mouse.x});
            
            
            if(dragMarker.i>0){
		
			var prevX = dragMarker.array[dragMarker.i-1].rect.center;
			
			if(mouse.x<prevX)moveElement(dragMarker.array,dragMarker,-1);
           // redrawArray(dragMarker.array,dragMarker,dragMarker.i);
		}
		
		
		if(dragMarker.i<(dragMarker.array.length-1)){
		
			var nextX = dragMarker.array[dragMarker.i+1].rect.center;
		
			if(mouse.x>nextX)moveElement(dragMarker.array,dragMarker,+1);
			
            
           // redrawArray(dragMarker.array,dragMarker,dragMarker.i);
		}//
            
        }*/
        
                
        if(dragMarker != undefined && drag.isDragging){
        
        
            var rect;
            var ob;
            var hit = false;
            
            dragMarker.array = null;
            
            var dc = new Object();  // drag coords center
        
            for( i = 0;i<dragArrays.length;i++){
            
            
            if(dragArrays[i][0].canvas == gameCanvas){
            
            for(var j = 0;j<dragArrays[i].length;j++){
            
            
                // check the space between letters
            
                rect = new Object();
                rect.rect = new Object();
                rect.x = dragArrays[i][j].x;
                rect.y = dragArrays[i][j].y;
                rect.rect.height = dragArrays[i][j].height;
                rect.rect.width = dragArrays[i][j].width;
                rect.rect.center = new Object();
                rect.rect.center.x = rect.x+(rect.width/2);
                rect.rect.center.y = rect.y+(rect.height/2);
                
                
                
                // check the whitespace between letters
                
                /*ob = new Object();
                ob.rect = new Object();
                ob.x = dragArrays[i][j].x+dragArrays[i][j].width;
                ob.y = dragArrays[i][j].y;
                ob.rect.height = dragArrays[i][j].height;
                ob.rect.width = 5;
                ob.rect.center = new Object();
                ob.rect.center.x = ob.x+(ob.width/2);
                ob.rect.center.y = ob.y+(ob.height/2);*/
                
                
                // find the center of the object being dragged
                
                dc.x = dragMarker.rect.center.x;
                dc.y = dragMarker.rect.center.y;
                
            
               // if(checkRect(dragArrays[i][j],dc.x,dc.y) || checkRect(ob,dc.x,dc.y)){
                if(checkRect(dragArrays[i][j],dc.x,dc.y)){
                
                  //  //////console.log(dragArrays[i][j]);
                  
                  //dragArrays[i][j].alpha = .5;
                  
                 // //////console.log("endlinemarker = "+dragArrays[i][j].text);
                    
                   if(dc.x>(dragArrays[i][j].x+(dragArrays[i][j].width/2)) && dragArrays[i][j].text != endlineMarker){
                    refreshArray(dragArrays[i],j+1);
                    dragMarker.dir = 1;
                    dragMarker.i = j+1;
                  } else{
                    refreshArray(dragArrays[i],j);
                    dragMarker.dir = -1;
                    dragMarker.i = j;
                   }
                   
                    hit = true;
                    
                    dragMarker.array = dragArrays[i];
                    //dragMarker.i = j;
                    
                    
                    }
                    
                 
                
                    
                    }
            
            
                if(!hit)refreshArray(dragArrays[i],99);
                
                hit = false;
         
         
        // //////console.log(dragArrays[0].length,dragArrays.length);
            }
        }
        
        
        
        }
    
        ////////console.log("dragloop",dragArrays[0].length)
    
        
    
    }
    
    game.loops.push(myDragLoop);
    
    
    
    
        // redraw array
     function refreshArray_(ar,j){
     
    // //////console.log("gg "+ar[0].text);
        
        
        var textX = leftPad;
        
        for(var i = 0;i<ar.length;i++){
        
         textX = leftPad;
        
        for(var k = 0;i<ar[i].length;k++){
        
            var ob = ar[i][k];
            
           //////console.log("OB = "+ob);
        
            if(j != j){
            
                if(ob.xoffset)textX = textX+ob.xoffset;
                
                ob.set({x:textX});
                
                
                
                if(ob.row){
                 //   textX = leftPad;
                  //  ob.set({x:textX});
                }
                
                
                textX = textX+ob.width+1;
                    
            
            }else{
            
               // insert.set({x:textX,y:ar[0].y});
               //if(j!=99) textX = textX+dragMarker.width+10;

                ob.set({x:textX});
                textX = textX+ob.width+1;
                
                            
            }
        
        
        }
        }
        
     
     
     }
     
     
     
  function refreshArray(ar,j){
     
   // //////console.log("gg "+ar[0].text);
        
        var templeftPad = leftPad-ar[0].width;
        var textX = templeftPad;
        
        for(var i = 0;i<ar.length;i++){
        
            ar[i].i = i;
        
            if(i != j){
            
                if(ar[i].xoffset)textX = textX+ar[i].xoffset;
                
                ar[i].set({x:textX});
                
                
                
               // if(ar[i].row && !ar[i].dragDrop){
              //      textX = leftPad;
              //      ar[i].set({x:textX});
              //  }
                
                
                textX = textX+ar[i].width+1;
               
                
              if(ar[i].text == endlineMarker)  {
                textX = templeftPad;
                  //  ar[i].set({x:textX});
                    }
              
              
                    
            
            }else{
            
               // insert.set({x:textX,y:ar[0].y});
               //if(j!=99) textX = textX+dragMarker.width+10;

                ar[i].set({x:textX});
                
                
              //   if(ar[i].row && !ar[i].dragDrop){
               //     textX = leftPad;
               //     ar[i].set({x:textX});
               // }
               
               textX = textX+ar[i].width+1;
               
                if(ar[i].text == endlineMarker)  {
                textX = templeftPad;
                  //  ar[i].set({x:textX});
                    }
                
                 
                            
            }
        
        
        }
        
     
     
     }
    
    
    
        // check if word should snap back or attach
    
    function checkJoinDrop2(e){
    
    
        
               
        if(e.parent.array){
        
        
            if(!e.parent.pinned){
             e.parent.showRect = false;
             
             var ar = e.parent.array;
             
            // //////console.log(ar);
             
            
           // e.parent.set({text:"Good job!"});
           // e.parent.set({x:e.parent.dragTarget.rect.center.x-(e.parent.width/2)});
           // e.parent.set({y:e.parent.dragTarget.rect.center.y-(e.parent.height/2)});
            
           
           // ar.splice(e.parent.i,1);
           
          // if(ar[e.parent.i]){
           
               // e.parent.set({y:ar[e.parent.i].y});
            
           // }else{
            
                //now loop to find somewhere to place this letter
                
                var foundchar = false;
                
                for(var i = 0;i<50;i++){
            
                   if(ar[e.parent.i-i]){
                        e.parent.set({y:ar[e.parent.i-i].y});
                        foundchar = true;
                        break;
                    }
                    
                }
            
            //}
            
            
            if(foundchar == true){
            
            ar.splice(e.parent.i,0,e.parent);
            
            
            
             //////console.log(">drop into position >"+e.parent.i+" - and array length = "+ar.length);
            
            refreshArray(ar,99);
            
            e.parent.pinned = true;
            
            }else{
                 resetMoveCharPos(e);
            }
            
            
            
            }else{
            
                //////console.log("pinned = "+e.parent.pinned);
               //resetMoveCharPos(e);
               //alert("nice tryâ€¦ Jim");

            }
        
        }else{
            
            resetMoveCharPos(e);
           
        }
    
    
    }
    
    
    function resetMoveCharPos(e){
    
    
         e.parent.showRect = true;
            
            //if(pinned)removeMarker(e.parent);
            
            e.parent.pinned = false;
    
            e.parent.set({x:e.parent.originX,y:e.parent.originY});
            //e.parent.set({y:e.parent.orginY});
            
            //////console.log(">parent array = "+e.parent.array);
    
    }
    
    
    //   Let's set up a funciton to insert into sentence
    
    function insertIntoSentence(char){
    
    
    
        char.showRect = false;
             
             var ar = char.array;
             
             //////console.log(ar);
             
            
           // e.parent.set({text:"Good job!"});
           // e.parent.set({x:e.parent.dragTarget.rect.center.x-(e.parent.width/2)});
           // e.parent.set({y:e.parent.dragTarget.rect.center.y-(e.parent.height/2)});
            
           
           // ar.splice(e.parent.i,1);
           
           char.set({y:ar[0].y});

            ar.splice(char.i,0,char);
            
            
            
             //////console.log(ar);
            
            refreshArray(ar,99);
            
            char.pinned = true;
    
    }
    
    
    
    // check drag and drop onto one of the targets
    
    function checkDragDrop(e){
    
    
        var drop = false;
        
        // loop through all the spots to drop the text
        
        for(var i = 0;i<e.parent.dragArray.length;i++){
        
            //check the bounding box for each
            
            if(checkRect(e.parent.dragArray[i],e.parent.rect.center.x,e.parent.rect.center.y) && e.parent.dragArray[i].taken == false){  
                
                // check if this text it taken
                //if(e.parent.dragArray[i].sybmiote){ 
               // if(e.parent.dragArray[i].text == e.parent.dragArray[i].resetText){
                //////console.log("all cool");
                    e.parent.dragTarget = e.parent.dragArray[i];
                    e.parent.dragArray[i].symbiote = e.parent; // so I can tell which text is associated with the space
                    e.parent.dragArray[i].taken = true;
                    drop = true;
                    break;
               // }
            }
        
        
        
        }
           
        if(drop){
        //////console.log("its a drop");
        
             e.parent.showRect = false;
            
            // e.parent.set({x:e.parent.dragTarget.rect.center.x-(e.parent.width/2)});
            //e.parent.set({y:e.parent.dragTarget.rect.center.y-(e.parent.height/2)});
            
            e.parent.set({x:e.parent.dragTarget.x});
            e.parent.set({y:e.parent.dragTarget.y});
            
           
            
            e.parent.dragTarget.set({text:e.parent.text});
           // e.parent.dragTarget.jjoiin
            
            
        
            if(e.parent.dragTarget.blockArray)realignBlocks(e.parent.dragTarget.blockArray);
            
            
        
        }else{
        
            e.parent.set({x:e.parent.orginX});
            e.parent.set({y:e.parent.orginY});
        }
    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    function removeMarker(ob){
    
    
        for(i = 0;i<ob.array.length;i++){
        
        
        
            if(ob == ob.array[i]){
            
            
                ob.array.splice(i,1);
                
                break;
                
            
            }
        
        
        
        }
    
    
    }
    
    
    
    // check if word should snap back or attach
    
    function checkJoinDrop(e){
    
               
        if(checkRect(e.parent.dragTarget,e.parent.rect.center.x,e.parent.rect.center.y)){
        
             e.parent.showRect = false;
            
           // e.parent.set({text:"Good job!"});
            e.parent.set({x:e.parent.dragTarget.rect.center.x-(e.parent.width/2)});
            e.parent.set({y:e.parent.dragTarget.rect.center.y-(e.parent.height/2)});
            
           
            
            
        
        }else{
    
            e.parent.set({x:e.parent.orginX});
            e.parent.set({y:e.parent.orginY});
        }
    
    
    }
    
    
    // show the rectangle around an object
    
    function showRect(e){
    
    
        e.parent.index = display.getNewIndex();
        display.sortIndex();
        
    
        // check to release dragTarget
        checkReleaseDragTarget(e.parent);
    
        e.parent.showRect = true;
        
        e.parent.index = display.getNewIndex();
        display.sortIndex();
        
        drag.target = e.parent;
        drag.isDragging = true;
    
        
        e.parent.startDrag();
    
    }
    
    
    
    function checkReleaseDragTarget(text){
    
    // checks to see if the text has a drag target,and resets the target text before releasing the text
        var dragTarget = text.dragTarget;
        
        if(dragTarget){
           // if(dragTarget.text != dragTarget.resetText){
            if(dragTarget.taken){
            
                dragTarget.taken = false;
            
          //  alert(dragTarget.resetText);
                dragTarget.set({text:dragTarget.resetText});
                if(dragTarget.blockArray)realignBlocks(dragTarget.blockArray);
        
                
            }
        }
        
        
        text.dragTarget = null;
        
    }
    
    //highlight text function
    
    function highlightText2(e){
    
               //e.parent.showRect = true;
    
       if(!e.parent.highlight && !e.parent.underline && !e.parent.showRect){
       
             e.parent[e.parent.highlightArray[0]] = true;
       
       }else if(e.parent[e.parent.highlightArray[0]] == true){
       
        
        
           if(e.parent.highlightArray[1]) e.parent[e.parent.highlightArray[1]] = true
           
             e.parent[e.parent.highlightArray[0]] = false;
           
            
       }else if(e.parent[e.parent.highlightArray[1]] == true){
       
             if(e.parent.highlightArray[2]) e.parent[e.parent.highlightArray[2]] = true
           
             e.parent[e.parent.highlightArray[1]] = false;     
             
        }else if(e.parent[e.parent.highlightArray[2]] == true){
        
            e.parent[e.parent.highlightArray[2]] = false; 
        }
        
         
      /*     if(e.parent.highlight == false && e.parent.underline == false && e.parent.showRect == false)e.parent.highlight = true;
        else if(e.parent.highlight){
            e.parent.underline = true;
            e.parent.highlight = false;
         }else if (e.parent.underline){
             e.parent.underline = false;
             e.parent.showRect = true;
         }else{
            e.parent.showRect = false;
         
         }*/
        
        e.parent.set({});
    
    }
    
    
    
       //highlight circle underline text function
    
    function highlightText(e){
    
               //e.parent.showRect = true;
    
        if(e.parent.highlight == false)e.parent.highlight = true;
        else if(e.parent.highlight){
            e.parent.highlight = false;
         }
        
        e.parent.set({});
    
    }
    
    
    function encryptMe(txt){
    
    
        txt = textToBase64(rc4(getKey(),txt));
        
        return txt;
    
    }
    
    function decryptMe(txt){
        txt = (rc4(getKey() ,base64ToText(txt)));
        return txt;
    
    }
    
    		function getKey(){
			
				return '<?php echo $key;?>';
			}
			
    

    
 //loadMe();
    
    
 