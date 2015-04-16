// Tests

// Settings
var step = 0; // Number of the question
var station = 1;
var correct = null; // Correct answer of the question
var user_data = [];
var duree = 3;
var duree_totale = duree;
var station_from;
var station_to;
var no_sound = false;
var bad_guy_stops = [];
var tickets_to_end = 0; // Number of tickets needed to complete the level
var num_stations = 0; // Total
var num_questions = 0; // Total
var event_stations = [];
var answered = false;


// General cookies settings
Cookies.defaults = {
    expires: Infinity
};

// Loader
$(window).load(function () {
    $(".load").fadeOut("slow");
    $(".loader").fadeOut("slow");
});



// Functions
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

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
    $('#score').html(user_data["score"]);
}
user_cookies(); // Get user data with cookies

function reset_score() { /////// DEBUG ONLY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    user_cookies("score", 0);
    $('#score').html(user_data["score"]);
}

function get_question(user_response) { // Find a question in the JSON file
    if ((step == num_questions) && (num_questions != 0)) {
        // No more question
        window.alert("End of questions");

        // Stop the chrono
        clearInterval(timerCh);
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
                $('#rep1').html(json.questions[step].answers[0]+"<paper-ripple fit></paper-ripple>");
                $('#rep2').html(json.questions[step].answers[1]+"<paper-ripple fit></paper-ripple>");
                $('#rep3').html(json.questions[step].answers[2]+"<paper-ripple fit></paper-ripple>");
                $("#rep4").html(json.questions[step].answers[3]+"<paper-ripple fit></paper-ripple>");

                // Good answer
                correct = json.questions[step].correct;

                // Next question
                step += 1;
            });
        });
    } else {
        if(answered == false){        
            answered = true;
            $('#rep'+(correct+1)).addClass('greenq');
            if (user_response == correct) {
                // Score update
                user_cookies("score", (user_data["score"] + 1));
                $('#score').html( user_data["score"]);

                // Score progression update
                if((user_data["score"] * 100 / tickets_to_end) <= 100){
                    user_cookies("actual_progression", (user_data["score"] * 100 / tickets_to_end));
                }
            }else{
                $('#rep'+(user_response+1)).addClass('redq');
                var bad_answer = true;
            }
            setTimeout(function(){
                get_question();
                $('#rep'+(correct+1)).removeClass('greenq');
                if(bad_answer == true){
                    $('#rep'+(user_response+1)).removeClass('redq');
                }
                answered = false;
            }, 1500);
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
            $('#progress').css('width',((station - 1) * 100 / num_stations) + "%");
        });
    });
}
update_stations(); // First required update_stations


var timerCh;
timerCh = setInterval(function () {
    chrono();
}, 1000);

function chrono() {
    
   $(window).load(function(){
  $("#transition").hide();
});
    
    if (duree <= 0) {
        clearInterval(timerCh);
        
        
    $("#transition").fadeIn("fast");
        
        $("#button").click(function () {
    $("#transition").fadeOut("fast");
            update_stations();
            get_question();
        $("button2").click(function () {
            window.location.href='game.html';
        });

        });

        station++;
        
        eventsHappening();


    } else {
        duree--;
    }

    // Radial progress bar update
    var radial_progress_bar = (duree / (duree_totale - 1));
    $(document).ready(function () {
        $('#circle').circleProgress({
            value: radial_progress_bar
        });
    });
    $('#temps').html(duree+"'");
// possible +1 ??? 
    if (station == num_stations) {
        clearInterval(timerCh);
       $("#popup_win").fadeIn("fast");
    }
}


function eventsHappening() {
    if (event_stations[station - 2] > 0) {
        console.log("event_stations[" + (station - 2) + "]>0");
        events(event_stations[station - 2]);
    }
}

function events(which_ID) {
    console.log("STAAAART " + which_ID);
    var old_station = station;
    if(which_ID > 0){
        
        var positive_issue = true;
        
        if (which_ID == 1) { // Controleur
            if (user_data["score"] < Math.floor((station - 2) / 2)) {
                station = 1;
                positive_issue = false;
            }
        } else if (which_ID == 2) { // Musicienne
            user_cookies("score", Math.floor(user_data["score"] - 1));
            positive_issue = false;
        } else if ((which_ID == 3)||(which_ID == 4)) { // Grève ou incident voyageur
            station = station - 2;
            positive_issue = false;
        } else if (which_ID == 5) { // Pickpocket
            user_cookies("score", Math.floor(user_data["score"] / 2));
            positive_issue = false;
        }
        
        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/events.json", function (json) {
                if(positive_issue == true){
                    $('#popup_title').html(json.events[which_ID - 1].title.positive);
                    $('#popup_description').html(json.events[which_ID - 1].description.positive);
                    $('#popup_image').attr('src', 'imgs/'+json.events[which_ID - 1].image.positive);
                }else{
                    $('#popup_title').html(json.events[which_ID - 1].title.negative);
                    $('#popup_description').html(json.events[which_ID - 1].description.negative);
                    $('#popup_image').attr('src', 'imgs/'+json.events[which_ID - 1].image.negative);
                }
                $('popup').show();
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


function play_sound(sound_name) {
    if (no_sound == false) {
        $("#" + sound_name).play(); // ID of the sound
    }
}

function stop_souds() { // Pause every sound
        /// MUST ADD CLASS "media" TO EVERY SOUND
        if (no_sound == false) {
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
    //
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



function verifLevel(level){

    
    if (user_data["score"]<((level*50)-50)) {
        $("#popup2").fadeIn("fast");

}
    
    else if (user_data["score"]>=((level*50)-50)){
        window.location.href='game.html';
    }
}

function hidePopup(){
     $("#popup2").fadeOut("fast");
}