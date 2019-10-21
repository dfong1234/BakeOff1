//	................................................................................
//  bakeoff1.main.js
//	javascript for index page of BakeOff1: Tiny Keyboards, Fat Fingers
//  Use Google Chrome as browser
//  Written by: Daniel Fong, Mark Chen, Riyya Hari Iyer
//  Date Created: 10/15/2019
//  Last Modified: 10/20/2019
//	................................................................................

/*  --- Keyboard --- 
 *  State table for 2x2:
 *   0  1
 *   2  3 
 * 
 *  State table for 3x3:
 *   0  1  2
 *   3  4  5 
 *   6  7  8
 */

// --- Label Initialization ---
document.getElementById("key_1").textContent = "abc";
document.getElementById("key_2").textContent = "def";
document.getElementById("key_3").textContent = "ghi";
document.getElementById("key_4").textContent = "jkl";
document.getElementById("key_5").textContent = "mno";
document.getElementById("key_6").textContent = "pqr";
document.getElementById("key_7").textContent = "stu";
document.getElementById("key_8").textContent = "vwx";
document.getElementById("key_9").textContent = "yz\u21E7";
document.getElementById('key_10').textContent = "\u2334";
document.getElementById('key_11').textContent = "\u232B";
document.getElementById('key_12').textContent = "\u23CE";

// --- Variables ---
var keyboard_currentState = 0; 
var keyboard_lastState    = 0.5;
var keyboard_letterCase   = 0;                                                  // 0 = lowerCase, 1 = upperCase
var key_index             = 0;                          
var key_maxHeight    = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_maxWidth     = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalHeight = "0.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalWidth  = "0.88cm";                                                /* Chrome has 0.75x factor on centimeter */

var keyboard_stateNumber  = 9;                                                  // arranged in a 3 by 3 matrix
var keyboard_row          = 3;
var keyboard_col          = 3;
const LETTERS             = 0;
const SELECT_LETTER       = 0.5;
const NUMBERS             = 1;
const SELECT_NUMBER       = 1.5;
const PUNCTUATIONS        = 2;
const SELECT_PUNCTUATION  = 2.5;
const LETTERS_1           = 3;
const LETTERS_2           = 4;
const LETTERS_3           = 5;
const NUMBERS_1           = 6;
const PUNCTUATIONS_1      = 7;
const MATHS_1             = 8;


// --- Subroutine Functions ---
function key_expandButton(){
    $("#key_1").height(key_maxHeight);
    $("#key_2").height(key_maxHeight);
    $("#key_3").height(key_maxHeight);
    $("#key_4").hide();
    $("#key_5").hide();
    $("#key_6").hide();
    $("#key_7").hide();
    $("#key_8").hide();
    $("#key_9").hide();
    $("#key_10").hide();
    $("#key_11").hide();
    $("#key_12").hide();
}

function key_shrinkButton(){
    $("#key_1").height(key_normalHeight);
    $("#key_2").height(key_normalHeight);
    $("#key_3").height(key_normalHeight);
    $("#key_4").show();
    $("#key_5").show();
    $("#key_6").show();
    $("#key_7").show();
    $("#key_8").show();
    $("#key_9").show();
    $("#key_10").show();
    $("#key_11").show();
    $("#key_12").show();
}

function keyboard_changeState() {
    if(keyboard_currentState == LETTERS){
        document.getElementById("key_1").textContent = (keyboard_letterCase == 0 ? "abc" : "ABC");
        document.getElementById("key_2").textContent = (keyboard_letterCase == 0 ? "def" : "DEF");
        document.getElementById("key_3").textContent = (keyboard_letterCase == 0 ? "ghi" : "GHI");
        document.getElementById("key_4").textContent = (keyboard_letterCase == 0 ? "jkl" : "JKL");
        document.getElementById("key_5").textContent = (keyboard_letterCase == 0 ? "mno" : "MNO");
        document.getElementById("key_6").textContent = (keyboard_letterCase == 0 ? "pqr" : "PQR");
        document.getElementById("key_7").textContent = (keyboard_letterCase == 0 ? "stu" : "STU");
        document.getElementById("key_8").textContent = (keyboard_letterCase == 0 ? "vwx" : "VWX");
        document.getElementById("key_9").textContent = (keyboard_letterCase == 0 ? "yz\u21E7" : "YZ\u21E7");
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "\u232B";
        document.getElementById('key_12').textContent = "\u23CE";
    }

    if(keyboard_currentState == NUMBERS){
        document.getElementById("key_1").textContent = "1";
        document.getElementById("key_2").textContent = "2";
        document.getElementById("key_3").textContent = "3";
        document.getElementById("key_4").textContent = "4";
        document.getElementById("key_5").textContent = "5";
        document.getElementById("key_6").textContent = "6";
        document.getElementById("key_7").textContent = "7";
        document.getElementById("key_8").textContent = "8";
        document.getElementById("key_9").textContent = "9";
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "0";
        document.getElementById('key_12').textContent = "\u232B";
    }

    if(keyboard_currentState == PUNCTUATIONS){
        document.getElementById("key_1").textContent = ",";
        document.getElementById("key_2").textContent = ".";
        document.getElementById("key_3").textContent = "?";
        document.getElementById("key_4").textContent = "!";
        document.getElementById("key_5").textContent = ":";
        document.getElementById("key_6").textContent = ";";
        document.getElementById("key_7").textContent = "/";
        document.getElementById("key_8").textContent = "\u2026";
        document.getElementById("key_9").textContent = "@";
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "clr";
        document.getElementById('key_12').textContent = "\u232B";
    }


    if(keyboard_currentState == LETTERS_1){
        document.getElementById("key_1").textContent = (keyboard_letterCase == 0 ? "a" : "A");
        document.getElementById("key_2").textContent = (keyboard_letterCase == 0 ? "d" : "D");
        document.getElementById("key_3").textContent = (keyboard_letterCase == 0 ? "g" : "G");
        document.getElementById("key_4").textContent = (keyboard_letterCase == 0 ? "j" : "J");
        document.getElementById("key_5").textContent = (keyboard_letterCase == 0 ? "m" : "M");
        document.getElementById("key_6").textContent = (keyboard_letterCase == 0 ? "p" : "P");
        document.getElementById("key_7").textContent = (keyboard_letterCase == 0 ? "s" : "S");
        document.getElementById("key_8").textContent = (keyboard_letterCase == 0 ? "v" : "V");
        document.getElementById("key_9").textContent = (keyboard_letterCase == 0 ? "y" : "Y");
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "\u232B";
        document.getElementById('key_12').textContent = "\u23CE";
    }

    if(keyboard_currentState == LETTERS_2){
        document.getElementById("key_1").textContent = (keyboard_letterCase == 0 ? "b" : "B");
        document.getElementById("key_2").textContent = (keyboard_letterCase == 0 ? "e" : "E");
        document.getElementById("key_3").textContent = (keyboard_letterCase == 0 ? "h" : "H");
        document.getElementById("key_4").textContent = (keyboard_letterCase == 0 ? "k" : "K");
        document.getElementById("key_5").textContent = (keyboard_letterCase == 0 ? "n" : "N");
        document.getElementById("key_6").textContent = (keyboard_letterCase == 0 ? "q" : "Q");
        document.getElementById("key_7").textContent = (keyboard_letterCase == 0 ? "t" : "T");
        document.getElementById("key_8").textContent = (keyboard_letterCase == 0 ? "w" : "W");
        document.getElementById("key_9").textContent = (keyboard_letterCase == 0 ? "z" : "Z");
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "\u232B";
        document.getElementById('key_12').textContent = "\u23CE";
    }

    if(keyboard_currentState == LETTERS_3){
        document.getElementById("key_1").textContent = (keyboard_letterCase == 0 ? "c" : "C");
        document.getElementById("key_2").textContent = (keyboard_letterCase == 0 ? "f" : "F");
        document.getElementById("key_3").textContent = (keyboard_letterCase == 0 ? "i" : "I");
        document.getElementById("key_4").textContent = (keyboard_letterCase == 0 ? "l" : "L");
        document.getElementById("key_5").textContent = (keyboard_letterCase == 0 ? "o" : "O");
        document.getElementById("key_6").textContent = (keyboard_letterCase == 0 ? "r" : "R");
        document.getElementById("key_7").textContent = (keyboard_letterCase == 0 ? "u" : "U");
        document.getElementById("key_8").textContent = (keyboard_letterCase == 0 ? "x" : "X");
        document.getElementById("key_9").textContent = (keyboard_letterCase == 0 ? "\u21E7" : "\u21E7");
        document.getElementById('key_10').textContent = "\u2334";
        document.getElementById('key_11').textContent = "\u232B";
        document.getElementById('key_12').textContent = "\u23CE";
    }

    if(keyboard_currentState == NUMBERS_1){
        document.getElementById("key_1").textContent = "1";
        document.getElementById("key_2").textContent = "2";
        document.getElementById("key_3").textContent = "3";
        document.getElementById("key_4").textContent = "4";
        document.getElementById("key_5").textContent = "5";
        document.getElementById("key_6").textContent = "6";
        document.getElementById("key_7").textContent = "7";
        document.getElementById("key_8").textContent = "8";
        document.getElementById("key_9").textContent = "9";
        document.getElementById('key_10').textContent = "0";
        document.getElementById('key_11').textContent = "%";
        document.getElementById('key_12').textContent = "clr";
    }

    if(keyboard_currentState == PUNCTUATIONS_1){
        document.getElementById("key_1").textContent = ",";
        document.getElementById("key_2").textContent = ".";
        document.getElementById("key_3").textContent = "?";
        document.getElementById("key_4").textContent = "!";
        document.getElementById("key_5").textContent = ":";
        document.getElementById("key_6").textContent = ";";
        document.getElementById("key_7").textContent = "/";
        document.getElementById("key_8").textContent = "_";
        document.getElementById("key_9").textContent = "@";
        document.getElementById('key_10').textContent = "(";
        document.getElementById('key_11').textContent = ")";
        document.getElementById('key_12').textContent = "clr";
    }

    if(keyboard_currentState == MATHS_1){
        document.getElementById("key_1").textContent = "+";
        document.getElementById("key_2").textContent = "\u002D";
        document.getElementById("key_3").textContent = "\u00D7";
        document.getElementById("key_4").textContent = "\u00F7";
        document.getElementById("key_5").textContent = "^";
        document.getElementById("key_6").textContent = "<";
        document.getElementById("key_7").textContent = ">";
        document.getElementById("key_8").textContent = "=";
        document.getElementById("key_9").textContent = "&";
        document.getElementById('key_10').textContent = "|";
        document.getElementById('key_11').textContent = "~";
        document.getElementById('key_12').textContent = "clr";
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
    
    if (keyboard_currentState == SELECT_LETTER) {
        var key_chars = document.getElementById(key_id).textContent;
        var char1 = key_chars.substring(0,1);
        var char2 = key_chars.substring(1,2);
        var char3 = key_chars.substring(2,3);

        key_expandButton();
        document.getElementById("key_1").textContent = char1;
        document.getElementById("key_2").textContent = char2;
        document.getElementById("key_3").textContent = char3;
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

function key_clickEventHandler(key_id, key_index) {
    if (keyboard_currentState == LETTERS) {
        if (key_index < 10){
            keyboard_lastState = LETTERS;
            keyboard_currentState = SELECT_LETTER;
            keyboard_updateInterface(key_id);
        }
        else {
            keyboard_processKey(key_id);
        }
    }
    else if (keyboard_currentState == SELECT_LETTER) {
        keyboard_lastState = SELECT_LETTER;
        keyboard_currentState = LETTERS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    } 
    else {
        keyboard_processKey(key_id);
    }

    var text = document.getElementById("main-typedTextArea").textContent;
    /* set-cursor-position-in-text-area:
        Soruce:
        https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
    */
    setCaretToPos($("#main-typedTextArea")[0], text.length);
}

$("#key_1").click(function(){
    key_index = 1;
    key_clickEventHandler("key_1", key_index);
});

$("#key_2").click(function(){
    key_index = 2;
    key_clickEventHandler("key_2", key_index);
});

$("#key_3").click(function(){
    key_index = 3;
    key_clickEventHandler("key_3", key_index);
});

$("#key_4").click(function(){
    key_index = 4;
    key_clickEventHandler("key_4", key_index);
});

$("#key_5").click(function(){
    key_index = 5;
    key_clickEventHandler("key_5", key_index);
});

$("#key_6").click(function(){
    key_index = 6;
    key_clickEventHandler("key_6", key_index);
});

$("#key_7").click(function(){
    key_index = 7;
    key_clickEventHandler("key_7", key_index);
});

$("#key_8").click(function(){
    key_index = 8;
    key_clickEventHandler("key_8", key_index);
});

$("#key_9").click(function(){
    key_index = 9;
    key_clickEventHandler("key_9", key_index);
});

$("#key_10").click(function(){
    key_index = 10;
    key_clickEventHandler("key_10", key_index);
});

$("#key_11").click(function(){
    key_index = 11;
    key_clickEventHandler("key_11", key_index);
});

$("#key_12").click(function(){
    key_index = 12;
    key_clickEventHandler("key_12", key_index);
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

var swipe_distance_threshold = 20;                                              // min distance needed to become a swipe
var swipe_perpentdicular_constraint = 15;                                       // max distance allowed in prpendicular direction during a swipe
var swipe_allowedTime = 300;                                                    // max time allowed to finish a swipe

// --- Subroutine Functions ---
function swipe_processDirection (swipe_dir){
    $(document).off("touchstart", "SwipeArea", function(e){e.preventDefault()});     // enable default events
    $(document).off("touchmove", "SwipeArea", function(e){e.preventDefault()});      // enable default events
    $(document).off("touchend", "SwipeArea", function(e){e.preventDefault()});       // enable default events

    var quotient;
    var remainder;

    // swipe_dir contains either "none", "left", "right", "top", or "down"
    if(swipe_dir == "down"){
        keyboard_currentState = keyboard_currentState - keyboard_col;
        if (keyboard_currentState < 0) keyboard_currentState = 
                        keyboard_currentState + keyboard_stateNumber;
        
        if (keyboard_currentState == LETTERS) keyboard_lastState = SELECT_LETTER;
        if (keyboard_currentState == NUMBERS) keyboard_lastState = SELECT_NUMBER;
        keyboard_changeState();
    }
    
    if(swipe_dir == "up"){
        keyboard_currentState = keyboard_currentState + keyboard_col;
        if (keyboard_currentState >= keyboard_stateNumber) keyboard_currentState = 
                        keyboard_currentState - keyboard_stateNumber;

        if (keyboard_currentState == LETTERS) keyboard_lastState = SELECT_LETTER;
        if (keyboard_currentState == NUMBERS) keyboard_lastState = SELECT_NUMBER;
        keyboard_changeState();
    }
    
    if(swipe_dir == "right"){
        quotient = Math.floor(keyboard_currentState / keyboard_col);
        remainder = keyboard_currentState % keyboard_col;
        remainder--;
        
        if (remainder < 0) remainder = 2;
        keyboard_currentState = (keyboard_col * quotient + remainder);

        if (keyboard_currentState == LETTERS) keyboard_lastState = SELECT_LETTER;
        if (keyboard_currentState == NUMBERS) keyboard_lastState = SELECT_NUMBER;
        keyboard_changeState();
    }
    if(swipe_dir == "left"){
        quotient = Math.floor(keyboard_currentState / keyboard_col);
        remainder = keyboard_currentState % keyboard_col;
        remainder++;

        if (remainder >= keyboard_col) remainder = 0;
        keyboard_currentState = (keyboard_col * quotient + remainder);

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
        touch_init_X = touchObject.pageX;                                            // get x-coordinate when finger first makes contact with touch surface
        touch_init_Y = touchObject.pageY;                                            // get y-coordinate when finger first makes contact with touch surface
        touch_startTime = new Date().getTime();                                      // get time when finger first makes contact with touch surface
        swipe_direction = "none";
    }, false);
    
    touch_surface.addEventListener("touchmove", function(event) {
    }, false);
    
    touch_surface.addEventListener("touchend", function(event) {
        var touchObject = event.changedTouches[0];
        touch_distance_X = touchObject.pageX - touch_init_X;                         // get x-axis (horizontal) distance traveled by finger 
        touch_distance_Y = touchObject.pageY - touch_init_Y;                         // get y-axis (vertical) distance traveled by finger
        touch_elapsedTime = new Date().getTime() - touch_startTime;                  // get elapsed time of this finger and touch surace contact
       
        if (touch_elapsedTime <= swipe_allowedTime) {                                // check if a swipe is made in allowed time
            if (Math.abs(touch_distance_X) >= swipe_distance_threshold &&            // check if a swipe is a horizontal swipe
            Math.abs(touch_distance_Y) <= swipe_perpentdicular_constraint){
                swipe_direction = (touch_distance_X < 0)? "left" : "right";          // negative travel distance -> left, positive travel distance -> right
            }
            if (Math.abs(touch_distance_Y) >= swipe_distance_threshold && 
            Math.abs(touch_distance_X) <= swipe_perpentdicular_constraint){          // check if a swipe is a vertical swipe
                swipe_direction = (touch_distance_Y < 0)? "up" : "down";             // negative travel distance -> up, positive travel distance -> down
            }
        }
        swipe_processDirection(swipe_direction);
    }, false);
    
    $(document).on("touchstart", "SwipeArea", function(e){e.preventDefault()});      // disable default events
    $(document).on("touchmove", "SwipeArea", function(e){e.preventDefault()});       // disable default events
    $(document).on("touchend", "SwipeArea", function(e){e.preventDefault()});        // disable default events
}

swipe_detectSwipe(swipeInput);
