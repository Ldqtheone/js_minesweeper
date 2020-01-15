const startB = $("#start");
const timer = $("#hours");
const table = $("#table");


let timerID, start, end, diff, stoped, row, cell, col;
let opt = 9;
let k = 0;
let nbrMine = 10;
let previousNumber = 0;

var mineTab = [];

table.css('display', 'flex');
table.css('flexDirection', 'column');
table.css('alignItems','center');
table.css('marginTop', '70px');

function init() {
    timerID = 0;
    start = 0;
    end = 0;
    diff = 0;
    stoped = false;

    chrono();

    generateTable(opt);
     mine(10, 0, opt*opt);


}

function selectDifficultie() {
    opt = $('#difficultie').val();

    return opt;
}

function startGame() {
    init();
}


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

function chronoStopped() {
    clearTimeout(timerID);
    stoped = true;
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
    timer.text(min + ":" + sec);
    timerID = setTimeout(refresh, 50);
}

//generate grid with selected difficultie value
function generateTable(heigh) {
    table.text(" ");

    while (k < heigh * heigh) {
        for (let i = 0; i < heigh; i++) {
            row = $('<tr>');
            table.append(row);
            for (let j = 0; j < heigh; j++) {
                cell = $('<td>');
                row.append(cell);
                var imgBase = $('<img src="assets/images/normal.png" alt="normal">');
                cell.append(imgBase);
                cell.attr('id', k);
                cell.attr("onclick","onClickMine('" + k + "')");
                k++;
                /* cell.onclick = function() {
                    clickCell(this);
                };
                const mine = document.createAttribute("data-mine");
                mine.value = "false";
                cell.setAttributeNode(mine); */
            }
        }
    }
}

function endGame() {
    chronoStopped();
    reset();
}

function reset() {
    table.text("");
    startGame();
}

function mine(nbrMine, min, max) {
     mineTab = [];

    for(var i=0; i < nbrMine; i++){
        min = Math.ceil(min);
        max = Math.floor(max);
        var mineAlea = Math.floor(Math.random() * (max - min+1)) + min;
        while(mineTab.indexOf(mineAlea) !== -1 && mineTab.length < nbrMine){
            mineAlea = Math.floor(Math.random() * (max - min+1)) + min;
        }
        mineTab.push(mineAlea);

    }
    console.log(mineTab);
    return mineTab;


}

function onClickMine(id){
   var isBomb = false;
   for(var i = 0; i < mineTab.length; i++){
    if(mineTab[i] == id){
        isBomb=true;
        console.log("ok");
        var bombtest = $('#'+id);
        bombtest.empty();
        var imgBomb = $('<img src="assets/images/bomb.png" alt="bomb">');
        bombtest.append(imgBomb);
        console.log(mineTab.values());
    }

    }
}