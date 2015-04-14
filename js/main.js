// Tests

// Settings
var step = 0; // Number of the question
var station = 1;
var stationTotale = 25;
var correct = null; // Correct answer of the question
var user_data = [];
var duree = 6;
var station_from;
var station_to;
var no_sound = false;
var bad_guy_stops = [];
var tickets_to_end = 0; // Number of tickets needed to complete the level

// General cookies settings
Cookies.defaults = {
    expires: Infinity
};

// Loader
$(window).load(function() {
    $(".load").fadeOut("slow");
    $(".loader").fadeOut("slow");
});

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
        user_data["score"] = parseInt(Cookies.get('score'));
        user_data["actual_line"] = parseInt(Cookies.get('actual_line'));
        user_data["actual_progression"] = parseInt(Cookies.get('actual_progression'));
        user_data["lines_finished"] = Cookies.get('lines_finished');
    }
    document.getElementById("score").innerHTML = "Score: " + user_data["score"];
}
user_cookies(); // Get user data with cookies

function reset_score() { /////// DEBUG ONLY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    user_cookies("score", 0);
    document.getElementById("score").innerHTML = "Score: " + user_data["score"];
}

function get_question(user_response) { // Find a question in the JSON file
    if (user_response == null) {
        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/lines/1.json", function (json) {
                // Tickets needed to complete the level
                if(tickets_to_end == 0){
                    tickets_to_end = parseInt(json.tickets_to_end);
                }
                
                // Question
                document.getElementById("question").innerHTML = json.questions[step].title;

                // Possible answers
                document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
                document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
                document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
                document.getElementById("rep4").innerHTML = json.questions[step].answers[3];

                // Good answer
                correct = json.questions[step].correct;

                // Next question
                step += 1;
            });
        });
    } else {
        if (user_response == correct) {
            console.log("correct");
            
            // Score update
            user_cookies("score", (user_data["score"] + 1));
            document.getElementById("score").innerHTML = "Score: " + user_data["score"];
            
            // Progression update
            user_cookies("actual_progression", (user_data["score"] * 100 / ticket_to_end));
            console.log(user_data["actual_progression"]);
        } else {
            console.log("faux");
        }
        get_question();
    }
}
get_question();


function update_stations() {
    $(document).ready(function () {
        $.getJSON("http://metropolitain.tk/json/lines/1.json", function (json) {
            station_from = json.stations[station - 1];
            station_to = json.stations[station];

            // Stations update
            document.getElementById("voyage").innerHTML = station_from + " -> " + station_to;
        });
    });
}
update_stations(); // First required update_stations

function bad_guy() { // Ticket checker witch come 2 times at the first questions and 1 time after
    if(bad_guy_stops[1] == null){
        bad_guy_stops[1] = Math.floor((Math.random()*4)+1);
        bad_guy_stops[2] = Math.floor((Math.random()*5)+8);
        bad_guy_stops[3] = Math.floor((Math.random()*7)+18);
    }
    
    console.log("passage1="+bad_guy_stops[1]);
    console.log("passage2="+bad_guy_stops[2]);
    console.log("passage3="+bad_guy_stops[3]);
    
    if (station==bad_guy_stops[1] && user_data["score"]<1){
        console.log('watno');
    }
    else if(station==bad_guy_stops[2] && user_data["score"]<7){
        console.log('wat');
    }
    else if(station==bad_guy_stops[3] && user_data["score"]<12){
        console.log('watt');
    }
    
}
bad_guy();

var timerCh;
timerCh = setInterval(function () {
    chrono();
}, 1000);

function chrono() {
    if (duree <= 0) {
        clearInterval(timerCh);
        resetChrono();
        station++;
        update_stations();
        get_question();
        bad_guy();
    } else {
        duree--;
    }

    document.getElementById("temps").innerHTML = "durée=" + duree;
    document.getElementById("station").innerHTML = "station=" + station;

    if (station == stationTotale) {
        clearInterval(timerCh);
    }
}

function resetChrono() {
    duree = 6;
    timerCh = setInterval("chrono()", 1000);
    chrono();
}
chrono();

function robber(){
    
}

function play_sound(sound_name) {
    if (no_sound == false) {
        $("#" + sound_name).play(); // ID of the sound
    }
}

function stop_souds() { // Pause every sound
    /// MUST ADD CLASS "media" TO EVERY SOUND
    if(no_sound == false){
        no_sound = true;
        var media = document.getElementsByClassName('media'),
        i = media.length;

        while (i--) {
            media[i].pause();
        }
    } else {
        no_sound = false;
    }
}