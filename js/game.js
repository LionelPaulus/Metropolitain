// Settings
var step = parseInt(user_data["actual_station"]); // Number of the question
var station = user_data["line_progression"];
var correct = null; // Correct answer of the question
var duree = 21;
var duree_totale = duree;
var station_from;
var station_to;
var tickets_to_end = 0; // Number of tickets needed to complete the level
var num_stations = 0; // Total
var num_questions = 0; // Total
var event_stations = [];
var answered = false;

// Functions
function get_question(user_response) { // Find a question in the JSON file
    if ((step == num_questions) && (num_questions != 0)) {
        // No more question
        step = 0;
        user_cookies("actual_station", 0);
    } else if (user_response == null) {
        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/line_1.json", function (json) {
                // Counter for stations & questions
                if (num_stations == 0) {
                    var key = 0;
                    for (key in json.stations) {
                        if (json.stations.hasOwnProperty(key)) {
                            num_stations++;
                        }
                    }
                    key = 0;
                    for (key in json.questions) {
                        if (json.questions.hasOwnProperty(key)) {
                            num_questions++;
                        }
                    }
                    event_handler(); // Generate the events
                }

                // Tickets needed to complete the level
                if (tickets_to_end == 0) {
                    tickets_to_end = parseInt(json.tickets_to_end);
                }

                // Question
                $('#question').html(json.questions[step].title);

                // Possible answers
                $('#rep1').html(json.questions[step].answers[0] + "<paper-ripple fit></paper-ripple>");
                $('#rep2').html(json.questions[step].answers[1] + "<paper-ripple fit></paper-ripple>");
                $('#rep3').html(json.questions[step].answers[2] + "<paper-ripple fit></paper-ripple>");
                $("#rep4").html(json.questions[step].answers[3] + "<paper-ripple fit></paper-ripple>");

                // Good answer
                correct = json.questions[step].correct;

                // Next question
                step += 1;
                
                // Question save in cookies
                user_cookies("actual_station", parseInt(step));
                console.log(user_data["actual_station"]);
            });
        });
    } else {
        if (answered == false) {
            answered = true;
            $('#rep' + (correct + 1)).addClass('greenq');
            if (user_response == correct) {
                // Score update
                user_cookies("score", (user_data["score"] + 1));
                $('#score').html(user_data["score"]);

                // Score progression update
                if ((user_data["score"] * 100 / tickets_to_end) <= 100) {
                    user_cookies("actual_progression", (user_data["score"] * 100 / tickets_to_end));
                }
            } else {
                $('#rep' + (user_response + 1)).addClass('redq');
                var bad_answer = true;
            }
            setTimeout(function () {
                get_question();
                $('#rep' + (correct + 1)).removeClass('greenq');
                if (bad_answer == true) {
                    $('#rep' + (user_response + 1)).removeClass('redq');
                }
                answered = false;
            }, 900);
        }
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

            // Stations progression update
            $('#progress').css('width', ((station - 1) * 100 / num_stations) + "%");
        });
    });
}
update_stations(); // First required update_stations


var timerCh;
setTimeout(function () {
    timerCh = setInterval(function () {
        chrono();
    }, 1000);
}, 500);


function chrono() {

    $(window).load(function () {
        $("#transition").hide();
    });

    
    
    
    if (duree <= 1) {
        clearInterval(timerCh);


        $("#transition").fadeIn("fast");

        $("#button").click(function () {
            $("#transition").fadeOut("fast");
            update_stations();
            get_question();
            $("button2").click(function () {
                window.location.href = 'game.html';
            });

        });

        station++;
        
        // Line_progression update
        user_cookies("line_progression", station);

        eventsHappening();

    } else {
        duree--;
        if(duree==3){
            play_sound("alarme");
        }
    }

    // Radial progress bar update
    var radial_progress_bar = (duree / (duree_totale - 1));
    $(document).ready(function () {
        $('#circle').circleProgress({
            value: radial_progress_bar
        });
    });
    $('#temps').html(duree + "'");
    // possible +1 ??? 
    if (station == num_stations) {
        clearInterval(timerCh);
        $("#popup_win").fadeIn("fast");
    }
}


function eventsHappening() {
    if (event_stations[station - 2] > 0) {
        events(event_stations[station - 2]);
    }
}

function events(which_ID) {
    var old_station = station;
    if (which_ID > 0) {

        var positive_issue = true;

        if (which_ID == 1) { // Controleur
            var controleur_tickets = Math.floor((station - 2) / 2);
            if (user_data["score"] < controleur_tickets) {
                station = 1;
                positive_issue = false;
                if (controleur_tickets == 1) {
                    var controleur_phrase = " " + controleur_tickets + " ticket était nécessaire pour cette zone.";
                } else {
                    var controleur_phrase = " " + controleur_tickets + " tickets étaient nécessaires pour cette zone.";
                }
            } else {
                user_cookies("score", user_data["score"] - controleur_tickets);
                if (controleur_tickets == 1) {
                    var controleur_phrase = " Vous avez payé " + controleur_tickets + " ticket pour cette zone.";
                } else {
                    var controleur_phrase = " Vous avez payés " + controleur_tickets + " tickets pour cette zone.";
                }
            }
        } else if (which_ID == 2) { // Musicienne
            user_cookies("score", Math.floor(user_data["score"] - 1));
            positive_issue = false;
        } else if ((which_ID == 3) || (which_ID == 4)) { // Grève ou incident voyageur
            station = station - 2;
            positive_issue = false;
        } else if (which_ID == 5) { // Pickpocket
            user_cookies("score", Math.floor(user_data["score"] / 2));
            positive_issue = false;
        }

        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/events.json", function (json) {
                if (positive_issue == true) {
                    $('#popup_title').html(json.events[which_ID - 1].title.positive);
                    if (controleur_phrase != null) {
                        $('#popup_description').html(json.events[which_ID - 1].description.positive + controleur_phrase);
                    } else {
                        $('#popup_description').html(json.events[which_ID - 1].description.positive);
                    }
                    $('#popup_image').attr('src', 'imgs/' + json.events[which_ID - 1].image.positive);
                } else {
                    $('#popup_title').html(json.events[which_ID - 1].title.negative);
                    if (controleur_phrase != null) {
                        $('#popup_description').html(json.events[which_ID - 1].description.negative + controleur_phrase);
                    } else {
                        $('#popup_description').html(json.events[which_ID - 1].description.negative);
                    }
                    $('#popup_image').attr('src', 'imgs/' + json.events[which_ID - 1].image.negative);
                }
                $('#popup').fadeIn();
            });
        });
    }

    // Delete the event in the board
    event_stations[old_station - 2] = 0;
}

function resetChrono() {
    duree = duree_totale;
    timerCh = setInterval("chrono()", 1000);
    chrono();
}
chrono();

function event_handler() {
    // Full board with 0
    for (var i = 0; i < num_stations; i++) {
        event_stations[i] = 0;
    }

    // How many times the event must come
    var event_passages = [2, 1, 1, 1];

    for (var bm = 1; bm < event_passages.length + 1; bm++) {
        // bm = valeure à mettre dans le tableau (ID de l'event)

        for (var k = 0; k < event_passages[bm - 1]; k++) {
            var added = false;
            while (added != true) {
                n = Math.floor(Math.random() * num_stations);
                if ((event_stations[n] == 0) && (n > 1)) {
                    event_stations[n] = bm;
                    added = true;
                }
            }
        }
    }
    console.log(event_stations);
}