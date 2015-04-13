// Functions

function user_data(){ // Get and update score, station, tickets, line with cookies
    var score = null;
    var line = null;
    var station = null;
    
}

function get_question(){ // Find a question in the JSON file
    var questions = JSON.parse(text); 
    var step = null; // Number of the question
    $.getJSON( "../json/lines/1.json", function( json ) {
      console.log( "JSON Data: " + json.stations[0] );
    });
    
}

function bad_guy(){ // Ticket checker witch come 2 times at the first questions and 1 time after
    
}