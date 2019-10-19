//State Variables
const LOWER_CASE    = 0;
const UPPER_CASE    = 1;
const NUMBERS       = 2;
const SELECT_LETTER = 3;

const LOWER_ABC = 3;
const LOWER_DEF = 4;
const LOWER_GHI = 5;
const LOWER_JKL = 6;
const LOWER_MNO = 7;
const LOWER_PQR = 8;
const LOWER_STU = 9;
const LOWER_VWX = 10;
const LOWER_YZ  = 11;

//current states
var cur_state     = 0;  //upper, lower, numbers
var letter_offset = 0;  //for when you click on a button, which 3 letters to display

//Toggle button Functionality
$('#Button1' ).click( function() {
    cur_state == NUMBERS ? cur_state = LOWER_CASE : cur_state++;
    updateInterface();
});

//Button specific code. CHANGE ME
$('#Button_TL' ).click( function() {
    letter_offset = 0;
    if(cur_state == LOWER_CASE) {
        clickLetter("a");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("A");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("1");
    }
});

$('#Button_TM' ).click( function() {
    letter_offset = 1;
    if(cur_state == LOWER_CASE) {
        clickLetter("b");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("B");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("2");
    }
});

$('#Button_TR' ).click( function() {
    letter_offset = 2;
    if(cur_state == LOWER_CASE) {
        clickLetter("c");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("C");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("3");
    }
});

$('#Button_ML' ).click( function() {
    letter_offset = 3;
    if(cur_state == LOWER_CASE) {
        clickLetter("d");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("D");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("4");
    }
});

$('#Button_MM' ).click( function() {
    letter_offset = 4;
    if(cur_state == LOWER_CASE) {
        clickLetter("e");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("E");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("5");
    }
});

$('#Button_MR' ).click( function() {
    letter_offset = 5;
    if(cur_state == LOWER_CASE) {
        clickLetter("f");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("F");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("6");
    }
});

$('#Button_BL' ).click( function() {
    letter_offset = 6;
    if(cur_state == LOWER_CASE) {
        clickLetter("g");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("G");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("7");
    }
});

$('#Button_BM' ).click( function() {
    letter_offset = 7;
    if(cur_state == LOWER_CASE) {
        clickLetter("h");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("H");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("8");
    }
});

$('#Button_BR' ).click( function() {
    letter_offset = 8;
    if(cur_state == LOWER_CASE) {
        clickLetter("i");
    }
    else if(cur_state == UPPER_CASE) {
        clickLetter("I");
    }
    else if(cur_state == NUMBERS) {
        clickLetter("9");
    }
});

$('#Button_clear' ).click( function() {
    var textObj = $('#TextArea1').val();
    $('#TextArea1').val("");
});

//function to click letters
function clickLetter(letter) {
    var oldText = $('#TextArea1').val();
    $('#TextArea1').val(oldText + letter);
    cur_state = LOWER_CASE;
}

//Change input button text
function updateInterface(){
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
    else if(cur_state == SELECT_LETTER){
        expandCharacterButton();
        updateInterfaceHelper();
    }
}

//Process clicking a button
function updateInterfaceHelper(){
    var char_offset = 0;
    if(cur_state == LOWER_CASE){
        char_offset = letter_offset*3 + 32;
    }
    $("#Button_TL").html( String.fromCharCode(65 + letter_offset) );
    $("#Button_TM").html( String.fromCharCode(66 + letter_offset) );
    $("#Button_TR").html( String.fromCharCode(67 + letter_offset) );
}

/*function updateInterfaceHelper(state){
    if(state == LOWER_ABC){
        $("#Button_TL").html('a');
        $("#Button_TM").html('b');
        $("#Button_TR").html('c'); 
    }
    else if(state == LOWER_DEF){
        $("#Button_TL").html('d');
        $("#Button_TM").html('e');
        $("#Button_TR").html('f');         
    }
    else if(state == LOWER_GHI){
        $("#Button_TL").html('g');
        $("#Button_TM").html('h');
        $("#Button_TR").html('i');         
    }
    else if(state == LOWER_JKL){
        $("#Button_TL").html('j');
        $("#Button_TM").html('k');
        $("#Button_TR").html('l'); 
    }
    else if(state == LOWER_MNO){
        $("#Button_TL").html('m');
        $("#Button_TM").html('n');
        $("#Button_TR").html('o');         
    }
    else if(state == LOWER_PQR){
        $("#Button_TL").html('p');
        $("#Button_TM").html('q');
        $("#Button_TR").html('r');         
    }
    else if(state == LOWER_STU){
        $("#Button_TL").html('s');
        $("#Button_TM").html('t');
        $("#Button_TR").html('u'); 
    }
    else if(state == LOWER_VWX){
        $("#Button_TL").html('v');
        $("#Button_TM").html('w');
        $("#Button_TR").html('x');         
    }
    else if(state == LOWER_YZ){
        $("#Button_TL").html('y');
        $("#Button_TM").html('z');
        $("#Button_TR").html('');         
    }
    else if(state == UPPER_ABC){
        $("#Button_TL").html('A');
        $("#Button_TM").html('B');
        $("#Button_TR").html('D'); 
    }
    else if(state == UPPER_DEF){
        $("#Button_TL").html('D');
        $("#Button_TM").html('E');
        $("#Button_TR").html('F');         
    }
    else if(state == UPPER_GHI){
        $("#Button_TL").html('G');
        $("#Button_TM").html('H');
        $("#Button_TR").html('I');         
    }
    else if(state == UPPER_JKL){
        $("#Button_TL").html('J');
        $("#Button_TM").html('K');
        $("#Button_TR").html('L'); 
    }
    else if(state == UPPER_MNO){
        $("#Button_TL").html('M');
        $("#Button_TM").html('N');
        $("#Button_TR").html('O');         
    }
    else if(state == UPPER_PQR){
        $("#Button_TL").html('P');
        $("#Button_TM").html('Q');
        $("#Button_TR").html('R');         
    }
    else if(state == UPPER_STU){
        $("#Button_TL").html('S');
        $("#Button_TM").html('T');
        $("#Button_TR").html('U'); 
    }
    else if(state == UPPER_VWX){
        $("#Button_TL").html('V');
        $("#Button_TM").html('W');
        $("#Button_TR").html('X');         
    }
    else if(state == UPPER_YZ){
        $("#Button_TL").html('Y');
        $("#Button_TM").html('Z');
        $("#Button_TR").html('');         
    }
}*/

//make the TL, TM, and TR buttons bigger and hide the other buttons.
function expandCharacterButton(){
    $("#Button_TL").height("2cm");
    $("#Button_TM").height("2cm");
    $("#Button_TR").height("2cm");
    $("#Button_ML").hide();
    $("#Button_MM").hide();
    $("#Button_MR").hide();
    $("#Button_BL").hide();
    $("#Button_BM").hide();
    $("#Button_BR").hide();
}

