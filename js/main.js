// Tests

// Settings
var step = 0; // Number of the question
var station = 1;
var stationTotale = 3;
var correct = null; // Correct answer of the question
var user_data = [];
var duree = 6;
// General cookies settings
Cookies.defaults = {
    expires: Infinity
};

// Functions
function user_cookies(name, value) { // Get and update score, station, tickets, line with cookies    
    if ((name != null) && (value != null)) {
        Cookies.set(name, value);
        user_data[name] = value;
    } else if (Cookies.get('score') == undefined) {
        Cookies.set('score', 0);
        user_data["score"] = 0;
        Cookies.set('actual_line', 0);
        user_data["actual_line"] = 0;
        Cookies.set('actual_progression', 0);
        user_data["actual_progression"] = 0;
        Cookies.set('lines_finished', 0); // Levels accomplished
        user_data["lines_finished"] = 0;
    } else {
        user_data["score"] = Cookies.get('score');
        user_data["actual_line"] = Cookies.get('actual_line');
        user_data["actual_progression"] = Cookies.get('actual_progression');
        user_data["lines_finished"] = Cookies.get('lines_finished');
    }
}
user_cookies(); // Get user data with cookies

user_cookies();
user_cookies("score", 10);
console.log(user_data["score"]);

function get_question(user_response) { // Find a question in the JSON file
    if (user_response == null) {

        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/lines/1.json", function (json) {
                console.log("step: " + step);
                document.getElementById("question").innerHTML = json.questions[step].title;
                document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
                document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
                document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
                document.getElementById("rep4").innerHTML = json.questions[step].answers[3];

                correct = json.questions[step].correct;

            });

        });


    } else {
        if (user_response == correct) {
            console.log("correct");
        } else {
            console.log("faux");
        }
        step += 1;
        get_question();
    }
}
get_question();

function bad_guy() { // Ticket checker witch come 2 times at the first questions and 1 time after

}

var timerCh;
timerCh = setInterval(function () {chrono();}, 1000);
function chrono() {

        if (duree <= 0) {
            clearInterval(timerCh);
            resetChrono();
            station++;
        } else {
            duree--;
        }
    
    

    document.getElementById("temps").innerHTML = "durée=" + duree;
    document.getElementById("station").innerHTML = "station=" + station;
    
    if(station == stationTotale){clearInterval(timerCh);}

    
        
}

function resetChrono() {
    
    duree = 6;
    timerCh = setInterval("chrono()", 1000);
    chrono();
}


chrono();



function play_sound(sound_name) {
    if (no_sound == undefined) {
        $("#" + sound_name).play(); // ID of the sound
    }
}

function stop_souds() { // Pause every sound
    /// MUST ADD CLASS "media" TO EVERY SOUND
    var no_sound = true;
    var media = document.getElementsByClassName('media'),
        i = media.length;

    while (i--) {
        media[i].pause();
    }
}