// Tests

// Settings
var step = 0; // Number of the question
var station = 1;
var correct = null; // Correct answer of the question
var user_data = [];
var duree = 0;
var duree_totale = 6;
var station_from;
var station_to;
var no_sound = false;
var bad_guy_stops = [];
var tickets_to_end = 0; // Number of tickets needed to complete the level
var num_stations = 0; // Total
var num_questions = 0; // Total

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
    $('#score').html("Score: " + user_data["score"]);
}
user_cookies(); // Get user data with cookies

function reset_score() { /////// DEBUG ONLY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    user_cookies("score", 0);
    $('#score').html("Score: " + user_data["score"]);
}

function get_question(user_response) { // Find a question in the JSON file
    if((step == num_questions)&&(num_questions != 0)){
        // No more question
        window.alert("End of questions");
        
        // Stop the chrono
        clearInterval(timerCh);
    }else if (user_response == null) {
        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/line_1.json?nocache=" + (new Date()).getTime(), function (json) {
                // Counter for stations & questions
                if(num_stations == 0){
                    var key = 0;
                    for(key in json.stations) {
                      if(json.stations.hasOwnProperty(key)) {
                        num_stations++;
                      }
                    }
                    key = 0;
                    for(key in json.questions) {
                      if(json.questions.hasOwnProperty(key)) {
                        num_questions++;
                      }
                    }
                    event_handler(); // Generate the events
                }
                
                // Tickets needed to complete the level
                if(tickets_to_end == 0){
                    tickets_to_end = parseInt(json.tickets_to_end);
                }
                
                // Question
                $('#question').html(json.questions[step].title);

                // Possible answers
                $('#rep1').html(json.questions[step].answers[0]);
                $('#rep2').html(json.questions[step].answers[1]);
                $('#rep3').html(json.questions[step].answers[2]);
                $("#rep4").html(json.questions[step].answers[3]);

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
            $('#score').html("Score: " + user_data["score"]);
            
            // Progression update
            user_cookies("actual_progression", (user_data["score"] * 100 / tickets_to_end));
        } else {
            console.log("faux");
        }
        get_question();
    }
}
get_question();


function update_stations() {
    $(document).ready(function () {
        $.getJSON("http://metropolitain.tk/json/line_1.json", function (json) {
            station_from = json.stations[station - 1];
            station_to = json.stations[station];

            // Stations update
            $('#station_from').html(station_from);
            $('#station_to').html(station_to);
            $('#voyage').html(station_from + " -> " + station_to);
        });
    });
}
update_stations(); // First required update_stations



function events(which_ID){
if(which_ID==1){
    if (user_data["score"]<Math.floor((station-1)/2)){
        station=1;
    }
}
    
    else if(which_ID==2){
        station=station-2;
    }
    
    else if(which_ID==3){
        station=station-2;
    }
    
    else if(which_ID==4){
        user_cookies("score", (user_data["score"] / 2));
    }

    else if(which_ID==5){
        user_cookies("score", (user_data["score"] - 2));
    }
    
    event_stations[station-1]=0;
}


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
        eventsHappening(event_stations[station-1]);
        get_question();
    } else {
        duree--;
    }
    
    // Radial progress bar update
    var radial_progress_bar = (duree / (duree_totale-1));
    $('#circle').circleProgress({value: radial_progress_bar});
    $('#temps').html(duree);
    $('#statio ').html("station=" + station);

    if (station == num_stations) {
        clearInterval(timerCh);
        // End of the level
    }
}


function eventsHappening(which_ID){
    for (var i=0;i< event_stations.length;i++){
        if(event_stations[i]==which_ID){
            events(which_ID);
        }
}
}
            

function resetChrono() {
    duree = duree_totale;
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
        var media = document.getElementsByClassName('media'); // C'était une virgule à la base au lieu de ;
        i = media.length;

        while (i--) {
            media[i].pause();
        }
    } else {
        no_sound = false;
    }
}

function event_handler(){
    // Full board with 0
    var event_stations = [];
    for(var i = 0; i<num_stations; i++){
        event_stations[i] = 0;
    }

    // How many times the event must come
    var event_passages = [2, 1, 1, 1];
    
    for (var bm = 1; bm < event_passages.length + 1; bm++) {
        // bm = valeure à mettre dans le tableau (ID de l'event)

        for (var k = 0; k < event_passages[bm - 1]; k++) {
            var added = false;
            while (added != true) {
                n = Math.floor(Math.random()*num_stations);
                if ((event_stations[n] == 0)&&(n > 0)) {
                    event_stations[n] = bm;
                    added = true;
                }
            }
        }
    }
    console.log(event_stations);
}