var NEXT = false,
	GOOD_ANSWER = 0,
	BAD_ANSWER = 0,
	SUM = 0,
	learning_session = {},
	number_and_guest = {},
	saved_data;

jQuery(document).ready(function($){
	

	$("input#check_number").live("keypress", function(evt){
		var code = evt.which || evt.keyCode, number = $('#numbers').text(), guest = $('#check_number').val();
		//enter

		if( code === 13 ){
			
			if ( !NEXT ){
				
				number_and_guest[SUM] = number + ":" + guest;
				SUM++;
				$('#count').text(SUM);
				
				if( number === guest ) {
					$("#image_ok").show();
					$('#numbers_hide').hide();
					$('#numbers').show();
					NEXT = true;
					GOOD_ANSWER++;
				}
				else{
					$("#image_fail").show();
					$('#numbers_hide').hide();
					$('#numbers').show();
					NEXT = true;
					BAD_ANSWER++;
				}
			} else {
				next_number();
				NEXT = false;			
			}
		}

	});

	$('#start').click(function() {
		
		GOOD_ANSWER = 0;
		BAD_ANSWER = 0;
		SUM = 0;
		NEXT = false;
		number_and_guest = {}
		
		generateNumbers();

		$('#start').hide();
		$('#stop').show();
		$('#statistics').html("");
	});

	$('#stop').click(function() {
		
		//SUM = GOOD_ANSWER+BAD_ANSWER;
		var statisctics = "", 
			avg = ( GOOD_ANSWER / SUM ) * 100;

		save_learning_session();

		statisctics += "Overall numbers in this round: " + SUM + "<br>";
		statisctics += "Good answers in this round: " + GOOD_ANSWER + "<br>";
		statisctics += "Bad answers in this round: " + BAD_ANSWER + "<br>";
		statisctics += "% in this round: " + avg + "%";

		$('#statistics').html(statisctics);

		$('#start').show();
		$('#stop').hide();
	});


});
	
function generateNumbers(){

	var number_length = parseInt( $('#numbers_select option:selected').text() ),
		number_display_time = parseInt( $('#numbers_select_time option:selected').text() ),
		number = '1',
		temp_number_length,
		additional_numbers;

	$('#numbers').show();
	$('#numbers_hide').hide();

	// generating 
	for( var i = number_length ;i--; ){
		number += "0";
	}

	number = parseInt(number);
	number = Math.floor( Math.random() * number ) - 1;


	temp_number_length = ( number+'' ).length;
	/*console.log('number length'+temp_number_length);
	if( number_length !== temp_number_length ) {
		additional_numbers = temp_number_length - number_length;
		console.log('ad:'+additional_numbers);
		console.log('n:'+number);

		for( var i = additional_numbers; i-- ;){
			number = "0" + number;
		}
	}*/
	
	if( number_length !== temp_number_length ) {
		number = "0" + number;
	}

	$('#numbers').text(number);
	
	setTimeout(function() {
		$('#numbers').hide();
		$('#numbers_hide').show();
	}, number_display_time);
}

function next_number(){
	$('#check_number').val("");
	$("img").hide();
	generateNumbers();
}

function toggle_numbers(){
	$('#numbers').toggle();
	$('#numbers_hide').toggle();
}

function test_generating_numbers1(){
	console.time('someFunction timer');
	generateNumbers();
	console.timeEnd('someFunction timer')
}

function save_learning_session(){
	
	if (SUM > 0) { //without saving empty sessions
		var today = new Date();
		today = today.getTime();
		localStorage.setItem(today, JSON.stringify(number_and_guest));
	};
}

function get_sessions_data(){
	var retrieved_object = localStorage.getItem('1370166246371'); //example load session from localStorage 
	saved_data = JSON.parse(retrieved_object);

	// parse date time to human readable format
	var newDate = new Date();
	newDate.setTime(1370166246371);
	dateString = newDate.toUTCString();

	console.log('retrievedObject: ', saved_data);
	console.log('Date: ', dateString);
}