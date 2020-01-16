const startB = $("#start");
const timer = $("#hours");
const table = $("#table");


let timerID, start, end, diff, stoped, row, cell, col, nbrMine, imgBase;
let opt = 9;
let k = 0;

var mineTab = [];

table.css('display', 'flex');
table.css('flexDirection', 'column');
table.css('alignItems', 'center');
table.css('marginTop', '70px');

function init() {
    timerID = 0;
    start = 0;
    end = 0;
    diff = 0;
    stoped = false;

    chrono();
    generateTable(opt);
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

    switch (heigh) {
        case "9":
            nbrMine = 10;
            break;
        case "16":
            nbrMine = 40;
            break;
        case "22":
            nbrMine = 100;
            break;
        case "30":
            nbrMine = 250;
            break;
        default:
            nbrMine = 10;
            break;
    }

    mine(nbrMine, 0, opt);

    while (k < heigh * heigh) {
        for (let i = 0; i < heigh; i++) {
            row = $('<tr>');
            table.append(row);
            for (let j = 0; j < heigh; j++) {
                cell = $('<td>');
                row.append(cell);
                imgBase = $('<img src="assets/images/normal.png" alt="normal">');
                cell.append(imgBase);
                var id = i + "." + j;
                cell.attr('id', id);
                cell.click(function () {
                    let isBomb = false;
                    for (var e = 0; e < mineTab.length; e++) {
                        if (mineTab[e] == this.id) {
                            isBomb = true;
                            console.log("ok");
                            $(this).empty();
                            $(this).append('<img src="assets/images/bomb.png" alt="bomb">');
                        }
                    }
                });
                k++;
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

    for (var i = 0; i < nbrMine; i++) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var minRow = Math.floor(Math.random() * (max - min)) + min;
        var minCol = Math.floor(Math.random() * (max - min)) + min;
        while (mineTab.indexOf(minRow + "." + minCol) !== -1 && mineTab.length < nbrMine) {
            minRow = Math.floor(Math.random() * (max - min)) + min;
            minCol = Math.floor(Math.random() * (max - min)) + min;
        }
        mineTab.push(minRow + "." + minCol);
    }
    console.log(mineTab);
    return mineTab;
}

function onClickMine(cell) {

}