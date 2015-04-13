// Tests
Cookies.set('boisson', 'eau pétillante');

// Functions
function user_data() { // Get and update score, station, tickets, line with cookies
    var score = null;
    var line = null;
    var station = null;

}

function get_question(user_response) { // Find a question in the JSON file
    var step = 0; // Number of the question
    if (id == null) {
        step += 1;
        $(document).ready(function () {
            $.getJSON("http://lionelpaulus.github.io/json/lines/1.json", function (json) {
                //console.log( json.questions[step].title );
                document.getElementById("question").innerHTML = json.questions[step].title;
                document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
                document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
                document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
            });
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