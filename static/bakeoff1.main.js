//State Variables
const LOWER_CASE    = 0;
const UPPER_CASE    = 1;
const NUMBERS       = 2;
const SELECT_LETTER_LOWER = 3;
const SELECT_LETTER_UPPER = 4;

const BUTTON_MAX_HEIGHT = "2cm";
const BUTTON_MAX_WIDTH  = "2cm";

const BUTTON_HEIGHT = "0.66cm";
const BUTTON_WIDTH  = "0.66cm";

//current states
var cur_state     = 0;  //upper, lower, numbers, select a letter
var prev_state    = 0;
var letter_offset = 0;  //for when you click on a button, which 3 letters to display

//Toggle button Functionality
$('#Button1' ).click( function() {
    cur_state == NUMBERS ? cur_state = LOWER_CASE : cur_state++;
    updateInterface();
});

//Button specific code. CHANGE ME
$('#Button_TL' ).click( function() {
    letter_offset = 0;
    letterButtonEventHandler('#Button_TL');
});

$('#Button_TM' ).click( function() {
    letter_offset = 1;
    letterButtonEventHandler('#Button_TM');
});

$('#Button_TR' ).click( function() {
    letter_offset = 2;
    letterButtonEventHandler('#Button_TR');
});

$('#Button_ML' ).click( function() {
    letter_offset = 3;
    letterButtonEventHandler('#Button_ML');
});

$('#Button_MM' ).click( function() {
    letter_offset = 4;
    letterButtonEventHandler('#Button_MM');
});

$('#Button_MR' ).click( function() {
    letter_offset = 5;
    letterButtonEventHandler('#Button_MR');
});

$('#Button_BL' ).click( function() {
    letter_offset = 6;
    letterButtonEventHandler('#Button_BL');
});

$('#Button_BM' ).click( function() {
    letter_offset = 7;
    letterButtonEventHandler('#Button_BM');
});

$('#Button_BR' ).click( function() {
    letter_offset = 8;
    letterButtonEventHandler('#Button_BR');
});

$('#Button_clear' ).click( function() {
    var textObj = $('#TextArea1').val();
    $('#TextArea1').val("");
});

function letterButtonEventHandler(button_name){
    if(cur_state == LOWER_CASE) {
        prev_state = LOWER_CASE;
        cur_state = SELECT_LETTER_LOWER;
        updateInterface();
    }
    else if(cur_state == UPPER_CASE) {
        prev_state = UPPER_CASE;
        cur_state = SELECT_LETTER_UPPER;
        updateInterface();
    }
    else if(cur_state == NUMBERS) {
        clickLetter((letter_offset+1).toString());
    }
    else if(cur_state > NUMBERS){
        clickLetter($(button_name).html())
        cur_state = prev_state;
        updateInterface();
    }
}

//function to click letters
function clickLetter(letter) {
    var oldText = $('#TextArea1').val();
    $('#TextArea1').val(oldText + letter);
}

//Change input button text
function updateInterface(){
    closeCharacterButton();
    if(cur_state == LOWER_CASE){
        $("#Button_TL").html('abc');
        $("#Button_TM").html('def');
        $("#Button_TR").html('ghi');
        $("#Button_ML").html('jkl');
        $("#Button_MM").html('mno');
        $("#Button_MR").html('pqr');
        $("#Button_BL").html('stu');
        $("#Button_BM").html('vwx');
        $("#Button_BR").html('yz');
    }
    else if(cur_state == UPPER_CASE){
        $("#Button_TL").html('ABC');
        $("#Button_TM").html('DEF');
        $("#Button_TR").html('GHI');
        $("#Button_ML").html('JKL');
        $("#Button_MM").html('MNO');
        $("#Button_MR").html('PQR');
        $("#Button_BL").html('STU');
        $("#Button_BM").html('VWX');
        $("#Button_BR").html('YZ');
    }
    else if(cur_state == NUMBERS){
        $("#Button_TL").html('1');
        $("#Button_TM").html('2');
        $("#Button_TR").html('3');
        $("#Button_ML").html('4');
        $("#Button_MM").html('5');
        $("#Button_MR").html('6');
        $("#Button_BL").html('7');
        $("#Button_BM").html('8');
        $("#Button_BR").html('9');
    }
    else if(cur_state > NUMBERS){
        expandCharacterButton();
        updateInterfaceHelper();
    }
}

//Process clicking a button
function updateInterfaceHelper(){
    var char_offset = findCharOffset();
    $("#Button_TL").html( String.fromCharCode(65 + char_offset) );
    $("#Button_TM").html( String.fromCharCode(66 + char_offset) );
    $("#Button_TR").html( String.fromCharCode(67 + char_offset) );
}

function findCharOffset(){
    var char_offset = letter_offset*3;
    if(cur_state == SELECT_LETTER_LOWER){
        char_offset = char_offset + 32;
    }
    return char_offset;
}

//make the TL, TM, and TR buttons bigger and hide the other buttons.
function expandCharacterButton(){
    $("#Button_TL").height(BUTTON_MAX_HEIGHT);
    $("#Button_TM").height(BUTTON_MAX_HEIGHT);
    $("#Button_TR").height(BUTTON_MAX_HEIGHT);
    $("#Button_ML").hide();
    $("#Button_MM").hide();
    $("#Button_MR").hide();
    $("#Button_BL").hide();
    $("#Button_BM").hide();
    $("#Button_BR").hide();
}

function closeCharacterButton(){
    $("#Button_TL").height(BUTTON_HEIGHT);
    $("#Button_TM").height(BUTTON_HEIGHT);
    $("#Button_TR").height(BUTTON_HEIGHT);
    $("#Button_ML").show();
    $("#Button_MM").show();
    $("#Button_MR").show();
    $("#Button_BL").show();
    $("#Button_BM").show();
    $("#Button_BR").show();
}

