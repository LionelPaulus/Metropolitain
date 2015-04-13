// Tests
Cookies.set('boisson', 'eau pétillante');
conole.log(Cookies.get('boisson'));

// Functions
function user_data() { // Get and update score, station, tickets, line with cookies
    var score = null;
    var line = null;
    var station = null;

}

function get_question(user_response) { // Find a question in the JSON file
    var step = 0; // Number of the question
<<<<<<< HEAD
    if (user_response == null) {
=======
<<<<<<< Updated upstream
    if (id == null) {
>>>>>>> origin/master
        step += 1;
        $(document).ready(function () {
            $.getJSON("http://lionelpaulus.github.io/json/lines/1.json", function (json) {
                //console.log( json.questions[step].title );
                document.getElementById("question").innerHTML = json.questions[step].title;
                document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
                document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
                document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
            });
=======
    $( document ).ready(function() {
        $.getJSON( "http://lionelpaulus.github.io/json/lines/1.json", function( json ) {
          //console.log( json.questions[step].title );
            document.getElementById("question").innerHTML = json.questions[step].title;
            
            document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
            document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
            document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
            document.getElementById("rep4").innerHTML = json.questions[step].answers[3];
            
            
            
            
>>>>>>> Stashed changes
        });
    }else{
        var correct = json.questions[step].correct;
        if(user_response == correct){
            console.log("correct");
        }else{
            console.log("faux");
        }
    }
}
get_question();

function bad_guy() { // Ticket checker witch come 2 times at the first questions and 1 time after

}