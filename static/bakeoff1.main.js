//	................................................................................
//  bakeoff1.main.js
//	javascript for index page of BakeOff1: Tiny Keyboards, Fat Fingers
//  Written by: Daniel Fong, Mark Chen, Riyya Hari Iyer
//  Date Created: 10/15/2019
//  Last Modified: 10/20/2019
//	................................................................................

/*  --- Keyboard --- 
 *
 *
 *
 * 
 */

// --- Label Initialization ---
document.getElementById("key_TL").textContent = "abc";
document.getElementById("key_TM").textContent = "def";
document.getElementById("key_TR").textContent = "ghi";
document.getElementById("key_ML").textContent = "jkl";
document.getElementById("key_MM").textContent = "mno";
document.getElementById("key_MR").textContent = "pqr";
document.getElementById("key_BL").textContent = "stu";
document.getElementById("key_BM").textContent = "vwx";
document.getElementById("key_BR").textContent = "yz\u21E7";


// --- Variables ---
var keyboard_currentState = 0; 
var keyboard_lastState    = 0;
var keyboard_letterCase   = 0;                                                  // 0 = lowerCase, 1 = upperCase
var key_index             = 0;                          
var key_maxHeight    = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_maxWidth     = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalHeight = "0.88cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalWidth  = "0.88cm";                                                /* Chrome has 0.75x factor on centimeter */

var keyboard_stateNumber  = 2;                                                  // arranged in a 1D array
const LETTERS             = 0;
const SELECT_LETTER       = 0.5;
const NUMBERS             = 1;
const SELECT_NUMBER       = 1.5;




// --- Subroutine Functions ---
function key_expandButton(){
    $("#key_TL").height(key_maxHeight);
    $("#key_TM").height(key_maxHeight);
    $("#key_TR").height(key_maxHeight);
    $("#key_ML").hide();
    $("#key_MM").hide();
    $("#key_MR").hide();
    $("#key_BL").hide();
    $("#key_BM").hide();
    $("#key_BR").hide();
}

function key_shrinkButton(){
    $("#key_TL").height(key_normalHeight);
    $("#key_TM").height(key_normalHeight);
    $("#key_TR").height(key_normalHeight);
    $("#key_ML").show();
    $("#key_MM").show();
    $("#key_MR").show();
    $("#key_BL").show();
    $("#key_BM").show();
    $("#key_BR").show();
}

function keyboard_changeState() {
    if(keyboard_currentState == LETTERS){
        document.getElementById("key_TL").textContent = (keyboard_letterCase == 0 ? "abc" : "ABC");
        document.getElementById("key_TM").textContent = (keyboard_letterCase == 0 ? "def" : "DEF");
        document.getElementById("key_TR").textContent = (keyboard_letterCase == 0 ? "ghi" : "GHI");
        document.getElementById("key_ML").textContent = (keyboard_letterCase == 0 ? "jkl" : "JKL");
        document.getElementById("key_MM").textContent = (keyboard_letterCase == 0 ? "mno" : "MNO");
        document.getElementById("key_MR").textContent = (keyboard_letterCase == 0 ? "pqr" : "PQR");
        document.getElementById("key_BL").textContent = (keyboard_letterCase == 0 ? "stu" : "STU");
        document.getElementById("key_BM").textContent = (keyboard_letterCase == 0 ? "vwx" : "VWX");
        document.getElementById("key_BR").textContent = (keyboard_letterCase == 0 ? "yz\u21E7" : "YZ\u21E7");
    }

    if(keyboard_currentState == NUMBERS){
        document.getElementById("key_TL").textContent = "1";
        document.getElementById("key_TM").textContent = "2";
        document.getElementById("key_TR").textContent = "3";
        document.getElementById("key_ML").textContent = "4";
        document.getElementById("key_MM").textContent = "5";
        document.getElementById("key_MR").textContent = "6";
        document.getElementById("key_BL").textContent = "7";
        document.getElementById("key_BM").textContent = "8";
        document.getElementById("key_BR").textContent = "9";
    }
}

/* set-cursor-position-in-text-area:
   Soruce:
   https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
*/
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", selectionEnd);
      range.moveStart("character", selectionStart);
      range.select();
    }
}
  
function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}


// --- Keyboard In-Use ---
function keyboard_updateInterface(key_id){
    if (keyboard_currentState == LETTERS) {
        key_shrinkButton();
        keyboard_changeState();
    }
    
    if (keyboard_currentState == NUMBERS) {
        key_shrinkButton();
        keyboard_changeState();
    }

    if (keyboard_currentState == SELECT_LETTER) {
        var key_chars = document.getElementById(key_id).textContent;
        var char1 = key_chars.substring(0,1);
        var char2 = key_chars.substring(1,2);
        var char3 = key_chars.substring(2,3);

        key_expandButton();
        document.getElementById("key_TL").textContent = char1;
        document.getElementById("key_TM").textContent = char2;
        document.getElementById("key_TR").textContent = char3;
    }
}

function keyboard_processKey(key_id) {
    var char = document.getElementById(key_id).textContent;
    if (char == "\u21E7") {
        keyboard_letterCase = (keyboard_letterCase == 0 ? 1 : 0);
        key_shrinkButton();
        keyboard_changeState();
        $('#main-lastTypedChar').val(char);
    }
    else if (char == "\u2334") {
        $('#main-typedTextArea').append(" ");
        $('#main-lastTypedChar').val(char);
    }
    else if (char == "\u232B") {
        var text = document.getElementById('main-typedTextArea').textContent;
        text = text.substring(0, text.length - 1);
        document.getElementById('main-typedTextArea').textContent = text;
        $('#main-lastTypedChar').val(char);
    }
    else if (char == "\u23CE") {
        // https://stackoverflow.com/questions/8627902/new-line-in-text-area
        // https://stackoverflow.com/questions/1279779/what-is-the-difference-between-r-and-n
        $('#main-typedTextArea').append("\u000A");
        $('#main-lastTypedChar').val(char);
    }
    else if (char == "clr") {
        document.getElementById('main-typedTextArea').textContent = "";
        $('#main-lastTypedChar').val("clr = Clear text!");
    }
    else {
        $('#main-typedTextArea').append(char);
        $('#main-lastTypedChar').val(char);
    }


}

function key_clickEventHandler(key_id) {
    if (keyboard_currentState == LETTERS) {
        keyboard_lastState = LETTERS;
        keyboard_currentState = SELECT_LETTER;
        keyboard_updateInterface(key_id);
    }
    else if (keyboard_currentState == SELECT_LETTER) {
        keyboard_lastState = SELECT_LETTER;
        keyboard_currentState = LETTERS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    } 
    else if (keyboard_currentState == NUMBERS) {
        keyboard_processKey(key_id);
    } 
    else if (keyboard_currentState == SELECT_NUMBER) {
        keyboard_lastState = SELECT_NUMBER;
        keyboard_currentState = NUMBERS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    }
    else {}
    var text = document.getElementById("main-typedTextArea").textContent;
    /* set-cursor-position-in-text-area:
        Soruce:
        https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
    */
    setCaretToPos($("#main-typedTextArea")[0], text.length);
}

$("#key_TL").click(function(){
    key_index = 0;
    key_clickEventHandler("key_TL");
});

$("#key_TM").click(function(){
    key_index = 1;
    key_clickEventHandler("key_TM");
});

$("#key_TR").click(function(){
    key_index = 2;
    key_clickEventHandler("key_TR");
});

$("#key_ML").click(function(){
    key_index = 3;
    key_clickEventHandler("key_ML");
});

$("#key_MM").click(function(){
    key_index = 4;
    key_clickEventHandler("key_MM");
});

$("#key_MR").click(function(){
    key_index = 5;
    key_clickEventHandler("key_MR");
});

$("#key_BL").click(function(){
    key_index = 6;
    key_clickEventHandler("key_BL");
});

$("#key_BM").click(function(){
    key_index = 7;
    key_clickEventHandler("key_BM");
});

$("#key_BR").click(function(){
    key_index = 8;
    key_clickEventHandler("key_BR");
});

$('#Button_clear').click( function() {
    document.getElementById('main-typedTextArea').textContent = "";
    $('#main-lastTypedChar').val("Clear text!");

    var text = document.getElementById("main-typedTextArea").textContent;
    
    /* set-cursor-position-in-text-area:
        Soruce:
        https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
    */
    setCaretToPos($("#main-typedTextArea")[0], text.length);
});

/*  --- SwipeArea --- 
 *  Source:
 *  Touch swipe detection in pure JavaScript -> https://codepen.io/ganmahmud/pen/RaoKZa
 *  https://stackoverflow.com/questions/45483276/unbinding-preventdefault-in-click-event
 *
 */

// --- Variables ---
var touch_init_X, touch_init_Y;
var touch_final_X, touch_final_Y;
var touch_distance_X, touch_distance_Y;
var touch_startTime;
var touch_finishTime;
var touch_elapsedTime;
var swipe_direction;

var swipe_distance_threshold = 30;                                              // min distance needed to become a swipe
var swipe_perpentdicular_constraint = 15;                                       // max distance allowed in prpendicular direction during a swipe
var swipe_allowedTime = 300;                                                    // max time allowed to finish a swipe

// --- Subroutine Functions ---
function swipe_processDirection (swipe_dir){
    $(document).off("touchstart", "SwipeArea", function(e){e.preventDefault()});     // enable default events
    $(document).off("touchmove", "SwipeArea", function(e){e.preventDefault()});      // enable default events
    $(document).off("touchend", "SwipeArea", function(e){e.preventDefault()});       // enable default events


    // swipe_dir contains either "none", "left", "right", "top", or "down"
    if(swipe_dir == "up"){
        if (keyboard_currentState == LETTERS) {
            keyboard_lastState = LETTERS;
            keyboard_currentState = SELECT_LETTER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "\u2334";
            document.getElementById("key_TM").textContent = "\u232B";
            document.getElementById("key_TR").textContent = "\u23CE";
        }

        if (keyboard_currentState == NUMBERS) {
            keyboard_lastState = NUMBERS;
            keyboard_currentState = SELECT_NUMBER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "\u2334";
            document.getElementById("key_TM").textContent = "\u232B";
            document.getElementById("key_TR").textContent = "\u23CE";
        }

    }
    
    if(swipe_dir == "down"){
        if (keyboard_currentState == LETTERS) {
            keyboard_lastState = LETTERS;
            keyboard_currentState = SELECT_LETTER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "\u2334";
            document.getElementById("key_TM").textContent = "\u232B";
            document.getElementById("key_TR").textContent = "clr";
        }

        if (keyboard_currentState == NUMBERS) {
            keyboard_lastState = NUMBERS;
            keyboard_currentState = SELECT_NUMBER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "\u2334";
            document.getElementById("key_TM").textContent = "0";
            document.getElementById("key_TR").textContent = "clr";
        }
    }
    
    if(swipe_dir == "left"){
        keyboard_currentState--;
        if (keyboard_currentState < 0) keyboard_currentState = 
                        keyboard_currentState + keyboard_stateNumber;

        if (keyboard_currentState == LETTERS) keyboard_lastState = SELECT_LETTER;
        if (keyboard_currentState == NUMBERS) keyboard_lastState = SELECT_NUMBER;
        keyboard_changeState();
    }
    if(swipe_dir == "right"){
        keyboard_currentState++;
        if (keyboard_currentState >= keyboard_stateNumber) keyboard_currentState = 
                        keyboard_currentState - keyboard_stateNumber;

        if (keyboard_currentState == LETTERS) keyboard_lastState = SELECT_LETTER;
        if (keyboard_currentState == NUMBERS) keyboard_lastState = SELECT_NUMBER;
        keyboard_changeState();
    }

    $("#main-swipeDirection").val(swipe_dir);
}


// --- SwiprArea In-Use ---
var swipeInput = document.getElementById("SwipeArea");

function swipe_detectSwipe(element){
    var touch_surface = element;

    touch_surface.addEventListener("touchstart", function(event) {
        var touchObject = event.changedTouches[0];
        touch_init_X = touchObject.pageX;                                           // get x-coordinate when finger first makes contact with touch surface
        touch_init_Y = touchObject.pageY;                                           // get y-coordinate when finger first makes contact with touch surface
        touch_startTime = new Date().getTime();                                     // get time when finger first makes contact with touch surface
        swipe_direction = "none";
    }, false);
    
    touch_surface.addEventListener("touchmove", function(event) {
    }, false);
    
    touch_surface.addEventListener("touchend", function(event) {
        var touchObject = event.changedTouches[0];
        touch_distance_X = touchObject.pageX - touch_init_X;                        // get x-axis (horizontal) distance traveled by finger 
        touch_distance_Y = touchObject.pageY - touch_init_Y;                        // get y-axis (vertical) distance traveled by finger
        touch_elapsedTime = new Date().getTime() - touch_startTime;                 // get elapsed time of this finger and touch surace contact
       
        if (touch_elapsedTime <= swipe_allowedTime) {                               // check if a swipe is made in allowed time
            if (Math.abs(touch_distance_X) >= swipe_distance_threshold &&           // check if a swipe is a horizontal swipe
            Math.abs(touch_distance_Y) <= swipe_perpentdicular_constraint){
                swipe_direction = (touch_distance_X < 0)? "left" : "right";         // negative travel distance -> left, positive travel distance -> right
            }
            if (Math.abs(touch_distance_Y) >= swipe_distance_threshold && 
            Math.abs(touch_distance_X) <= swipe_perpentdicular_constraint){         // check if a swipe is a vertical swipe
                swipe_direction = (touch_distance_Y < 0)? "up" : "down";            // negative travel distance -> up, positive travel distance -> down
            }
        }
        swipe_processDirection(swipe_direction);
    }, false);
    
    $(document).on("touchstart", "SwipeArea", function(e){e.preventDefault()});      // disable default events
    $(document).on("touchmove", "SwipeArea", function(e){e.preventDefault()});       // disable default events
    $(document).on("touchend", "SwipeArea", function(e){e.preventDefault()});        // disable default events
}

swipe_detectSwipe(swipeInput);
