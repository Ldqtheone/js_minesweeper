var startB = $("#start");
var timer = $("#hours");
var table = $("#table");

var timerID = 0;
var start = 0;
var end = 0;
var diff = 0;
var stoped = false;

function chrono(){
    startB.onclick = function started(){
        startB.disabled = true;
        if(!stoped)
            start = new Date();
        else{
            start = new Date() - diff;
            start = new Date(start);
        }
        refresh();
    };

    function refresh(){
        end = new Date();
        diff = end - start;
        diff = new Date(diff);

        var sec = diff.getSeconds();
        var min = diff.getMinutes();

        if (min < 10){
            min = "0" + min;
        }
        if (sec < 10){
            sec = "0" + sec;
        }
        console.log("test");
        timer.text(min + ":" + sec);
        timerID = setTimeout(refresh, 50);
    }
}

chrono();