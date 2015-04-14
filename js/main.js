// Tests

// Settings

// Functions
function user_data(name,value) { // Get and update score, station, tickets, line with cookies
    // General cookies settings
    Cookies.defaults = {
        expires: Infinity
    };
    if(Cookies.get('score') == undefined){
        Cookies.set('score', 0);
        var user_data["score"] = 0;
        Cookies.set('actual_line', 0);
        var user_data["actual_line"] = 0;
        Cookies.set('actual_progression', 0);
        var user_data["actual_progression"] = 0;
        Cookies.set('lines_finished', 0); // Levels accomplished
        var user_data["lines_finished"] = 0;
    }else if((name != null)&&(value != null)){
        Cookies.set(name, value);
        user_data[name] = value;
    }else{
        var score = Cookies.get('score');
        var actual_line = Cookies.get('actual_line');
        var actual_progression = Cookies.get('actual_progression');
        var lines_finished = Cookies.get('lines_finished');
    }
}

function get_question(user_response) { // Find a question in the JSON file
    var step = 0; // Number of the question
    if (user_response == null) {
        step += 1;
        $(document).ready(function () {
            $.getJSON("http://metropolitain.tk/json/lines/1.json", function (json) {
                document.getElementById("question").innerHTML = json.questions[step].title;
                document.getElementById("rep1").innerHTML = json.questions[step].answers[0];
                document.getElementById("rep2").innerHTML = json.questions[step].answers[1];
                document.getElementById("rep3").innerHTML = json.questions[step].answers[2];
                document.getElementById("rep4").innerHTML = json.questions[step].answers[3];
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

function play_sound(sound_name){
    if(no_sound == undefined){
        if(sound_name == "example"){
            $("#example").play(); // ID of the sound
        }
    }
}

function stop_souds(){ // Pause every sound
    /// MUST ADD CLASS "media" TO EVERY SOUND
    var no_sound = true;
    var media = document.getElementsByClassName('media'),
        i = media.length;

    while (i--) {
        media[i].pause();
    }
}