const startB = $("#start");
const timer = $("#hours");
const table = $("#table");


let timerID, start, end, diff, stoped;

function chrono() {
    startB.attr('disabled', true);
    if (!stoped)
        start = new Date();
    else {
        start = new Date() - diff;
        start = new Date(start);
    }
    refresh();
}

function refresh() {
    end = new Date();
    diff = end - start;
    diff = new Date(diff);

    var sec = diff.getSeconds();
    var min = diff.getMinutes();

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    console.log("test");
    timer.text(min + ":" + sec);
    timerID = setTimeout(refresh, 50);
}

function init() {
    timerID = 0;
    start = 0;
    end = 0;
    diff = 0;
    stoped = false;

    chrono();
}

function startGame() {
    generateTable();
    init();
}

function generateTable() {

}

function reset() {

}