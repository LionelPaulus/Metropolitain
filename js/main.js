
// Functions
function user_data(){ // Get and update score, station, tickets, line with cookies
    var score = null;
    var line = null;
    var station = null;
    
}

function get_question(){ // Find a question in the JSON file
    var step = null; // Number of the question
    $( document ).ready(function() {
        $.getJSON( "http://lionelpaulus.github.io/json/lines/1.json", function( json ) {
          console.log( json.questions[0].answers[0] );
        });
    });
    
}
get_question();

function bad_guy(){ // Ticket checker witch come 2 times at the first questions and 1 time after
    
}