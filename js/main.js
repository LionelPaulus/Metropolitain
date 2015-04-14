// Tests

// Settings
var user_data = [];

// Functions
function user_data(name,value) { // Get and update score, station, tickets, line with cookies
    // General cookies settings
    Cookies.defaults = {
        expires: Infinity
    };
    
    if((name != null)&&(value != null)){
        Cookies.set(name, value);
        user_data[name] = value;
    }else if(Cookies.get('score') == undefined){
        Cookies.set('score', 0);
        user_data["score"] = 0;
        Cookies.set('actual_line', 0);
        user_data["actual_line"] = 0;
        Cookies.set('actual_progression', 0);
        user_data["actual_progression"] = 0;
        Cookies.set('lines_finished', 0); // Levels accomplished
        user_data["lines_finished"] = 0;        
    }else{
        user_data["score"] = Cookies.get('score');
        user_data["actual_line"] = Cookies.get('actual_line');
        user_data["actual_progression"] = Cookies.get('actual_progression');
        user_data["lines_finished"] = Cookies.get('lines_finished');
    }
}
user_data();
user_data("score", 10);
console.log(user_data["score"]);

function get_question(user_response) { // Find a question in the JSON file
    console.log(user_response);
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

/*$('[data-response]').on('click',function(){
    var response_user=$(this).attr('data-response');
    var correct = json.questions[step].correct;
    if (response_user == correct){
        console.log("good")}
    else {console.log("no")};
});*/





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