//	................................................................................
//  bakeoff1.main.js
//	javascript for index page of BakeOff1: Tiny Keyboards, Fat Fingers
//  Written by: Daniel Fong, Mark Chen, Riyya Hari Iyer
//  Date Created: 10/15/2019
//  Last Modified: 10/22/2019
//	................................................................................

/*  --- Keyboard ---  */

// --- Label Initialization ---
document.getElementById("key_TL").textContent = "abc";
document.getElementById("key_TM").textContent = "def";
document.getElementById("key_TR").textContent = "ghi";
document.getElementById("key_ML").textContent = "jkl";
document.getElementById("key_MM").textContent = "mno";
document.getElementById("key_MR").textContent = "pqr";
document.getElementById("key_BL").textContent = "stu";
document.getElementById("key_BM").textContent = "vwx";
document.getElementById("key_BR").textContent = "yz\u2334";

// --- Variables ---
var keyboard_currentState = 0;
var keyboard_letterCase   = 0;                                                  // 0 = lowerCase, 1 = upperCase
var key_index             = 0;                          
var key_maxHeight    = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_maxWidth     = "2.66cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalHeight = "0.88cm";                                                /* Chrome has 0.75x factor on centimeter */
var key_normalWidth  = "0.88cm";                                                /* Chrome has 0.75x factor on centimeter */

var keyboard_stateNumber  = 3;                                                  // arranged in a 1D array
const SELECT_MODE         = -1;                                                  
const LETTERS             = 0;
const SELECT_LETTER       = 0.5;
const NUMBERS             = 1;
const SELECT_NUMBER       = 1.5;
const PUNCTUATIONS        = 2;
const SELECT_PUNCTUATION  = 2.5;



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
        document.getElementById("key_BR").textContent = (keyboard_letterCase == 0 ? "yz\u2334" : "YZ\u2334");
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

    if(keyboard_currentState == PUNCTUATIONS){
        document.getElementById("key_TL").textContent = ",";
        document.getElementById("key_TM").textContent = ".";
        document.getElementById("key_TR").textContent = "?";
        document.getElementById("key_ML").textContent = "!";
        document.getElementById("key_MM").textContent = ":";
        document.getElementById("key_MR").textContent = ";";
        document.getElementById("key_BL").textContent = "/";
        document.getElementById("key_BM").textContent = "-";
        document.getElementById("key_BR").textContent = "\u232B";
    }

}

/*  Set cursor position in textarea
 *  https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
 *  Set cursor position in textarea allows user to see what position the next
 *  character will be printed.
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
    if (keyboard_currentState == LETTERS) {								//display letters in grid
        key_shrinkButton();
        keyboard_changeState();
    }
    
    if (keyboard_currentState == NUMBERS) {								//display numbers in grid
        key_shrinkButton();
        keyboard_changeState();
    }

    if (keyboard_currentState == PUNCTUATIONS) {						//display punctuations in grid
        key_shrinkButton();
        keyboard_changeState();
    }

    if (keyboard_currentState == SELECT_LETTER) {						//display smaller grid for specific letter
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

// appends clicked button to the current text string
function keyboard_processKey(key_id) {
    var char = document.getElementById(key_id).textContent;

    //Toggle lower and upper case
    if (char == "\u21E7" || char == "\u2B06") {
        keyboard_letterCase = (keyboard_letterCase == 0 ? 1 : 0);
        key_shrinkButton();
        keyboard_changeState();
        $('#main-lastTypedChar').val(char);
    }

    //insert a space
    else if (char == "\u2334") {											
        $('#main-typedTextArea').append(" ");
        $('#main-lastTypedChar').val("\u2334" + " = whitespace");
    }

    //delete a character
    else if (char == "\u232B") {
        var text = document.getElementById('main-typedTextArea').textContent;
        text = text.substring(0, text.length - 1);
        document.getElementById('main-typedTextArea').textContent = text;
        $('#main-lastTypedChar').val("\u232B" + " = backspace");
    }

    //insert a newline
    else if (char == "\u23CE") {
         $('#main-typedTextArea').append("\u000A");
        $('#main-lastTypedChar').val(char);
    }

    //clear the current text
    else if (char == "clr") {
        document.getElementById('main-typedTextArea').textContent = "";
        $('#main-lastTypedChar').val("clr = Clear text!");
    }

    //otherwise, insert the given character
    else {
        $('#main-typedTextArea').append(char);
        $('#main-lastTypedChar').val(char);
    }
}

// Handle clicking the main buttons
function key_clickEventHandler(key_id) {
    if (keyboard_currentState == LETTERS) {
        keyboard_currentState = SELECT_LETTER;
        keyboard_updateInterface(key_id);
    }
    else if (keyboard_currentState == SELECT_LETTER) {
        keyboard_currentState = LETTERS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    } 
    else if (keyboard_currentState == NUMBERS) {
        keyboard_processKey(key_id);
    } 
    else if (keyboard_currentState == SELECT_NUMBER) {
        keyboard_currentState = NUMBERS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    }
    else if (keyboard_currentState == PUNCTUATIONS) {
        keyboard_processKey(key_id);
    } 
    else if (keyboard_currentState == SELECT_PUNCTUATION) {
        keyboard_currentState = PUNCTUATIONS;
        keyboard_processKey(key_id);
        keyboard_updateInterface(key_id);
    }
    else {}


    /*  Set cursor position in textarea
     *  https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
     *  Set cursor position in textarea allows user to see what position the next
     *  character will be printed.
     */
    var text = document.getElementById("main-typedTextArea").textContent;
    setCaretToPos($("#main-typedTextArea")[0], text.length);
}


// attach bunch of buttons to the button handler. The argument is used to define button function in key_clickEventHandler()
$("#key_TL").click(function(){
    key_clickEventHandler("key_TL");
});

$("#key_TM").click(function(){
    key_clickEventHandler("key_TM");
});

$("#key_TR").click(function(){
    key_clickEventHandler("key_TR");
});

$("#key_ML").click(function(){
    key_clickEventHandler("key_ML");
});

$("#key_MM").click(function(){
    key_clickEventHandler("key_MM");
});

$("#key_MR").click(function(){
    key_clickEventHandler("key_MR");
});

$("#key_BL").click(function(){
    key_clickEventHandler("key_BL");
});

$("#key_BM").click(function(){
    key_clickEventHandler("key_BM");
});

$("#key_BR").click(function(){
    key_clickEventHandler("key_BR");
});



/*  --- SwipeArea ---  */

/*  Touch swipe detection in pure JavaScript
 *  https://codepen.io/ganmahmud/pen/RaoKZa
 *  Touch swipe detection allows usere to add a whitespace, add a backspace,
 *  open/close expanded keys, and switch between ketboard states based on
 *  their swipe direction
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
var swipe_perpentdicular_constraint = 20;                                       // max distance allowed in prpendicular direction during a swipe
var swipe_allowedTime = 300;                                                    // max time allowed to finish a swipe

// --- Subroutine Functions ---
function swipe_processDirection (swipe_dir){
    $(document).off("touchstart", "SwipeArea", function(e){e.preventDefault()});     // enable default events
    $(document).off("touchmove", "SwipeArea", function(e){e.preventDefault()});      // enable default events
    $(document).off("touchend", "SwipeArea", function(e){e.preventDefault()});       // enable default events


    // swipe_dir contains either "none", "left", "right", "top", or "down"

    // Swipe right, so just input a space
    if(swipe_dir == "right"){
    	$('#main-typedTextArea').append(" ");
        $('#main-lastTypedChar').val("whitespace = " + "\uD83D\uDC46" + "\u2192");
    }

    // Swipe left, so input a backspace
    if(swipe_dir == "left"){
        var text = document.getElementById('main-typedTextArea').textContent;
        text = text.substring(0, text.length - 1);
        
        document.getElementById('main-typedTextArea').textContent = text;
        $('#main-lastTypedChar').val("backspace = " + "\uD83D\uDC46" + "\u2190" );
    }

    //Swipe up, so bring up menu for other characters
    if(swipe_dir == "up"){
        if (keyboard_currentState == LETTERS) {
            keyboard_currentState = SELECT_LETTER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "clr";			// clear the text
            document.getElementById("key_TM").textContent = (keyboard_letterCase == 0 ? "\u21E7" : "\u2B06");   // case change
            document.getElementById("key_TR").textContent = "\u23CE";		// newline
        }
        else if (keyboard_currentState == NUMBERS) {
            keyboard_currentState = SELECT_NUMBER;
            key_expandButton();
            document.getElementById("key_TL").textContent = "clr";			// clear the text
            document.getElementById("key_TM").textContent = "0";			// insert 0 since couldn't fit on keypad
            document.getElementById("key_TR").textContent = "\u23CE";		// newline
        }
        else if (keyboard_currentState == PUNCTUATIONS) {
            keyboard_currentState = SELECT_PUNCTUATION;
            key_expandButton();
            document.getElementById("key_TL").textContent = "clr";			// clear the text
            document.getElementById("key_TM").textContent = "@";			// insert 0 since couldn't fit on keypad
            document.getElementById("key_TR").textContent = "\u23CE";		// newline
        }
        else if (keyboard_currentState == SELECT_NUMBER) {
        	keyboard_currentState = NUMBERS;
        	keyboard_updateInterface();
        }
        else if (keyboard_currentState == SELECT_LETTER) {
        	keyboard_currentState = LETTERS;
        	keyboard_updateInterface();
        }
        else if (keyboard_currentState == SELECT_PUNCTUATION) {
        	keyboard_currentState = PUNCTUATIONS;
        	keyboard_updateInterface();
        }
        else{}
    }

    // Swipe down, so toggle between numbers and letters, and also cancel an "other characters" swipe
    if(swipe_dir == "down"){
        // toggle currently selected mode
        keyboard_currentState++;
        if (keyboard_currentState >= keyboard_stateNumber) keyboard_currentState = 
                        keyboard_currentState - keyboard_stateNumber;
        keyboard_changeState();
    }

    /*  Set cursor position in textarea
     *  https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
     *  Set cursor position in textarea allows user to see what position the next
     *  character will be printed.
     */
    var text = document.getElementById("main-typedTextArea").textContent;
    setCaretToPos($("#main-typedTextArea")[0], text.length);

    
    $("#main-swipeDirection").val(swipe_dir);
}


// --- SwipeArea In-Use ---
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
