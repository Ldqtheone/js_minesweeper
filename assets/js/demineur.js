var table = document.getElementById("table");
var timer = document.getElementById("hours");
var startB = document.getElementById("start");

let timerID, start, end, diff, stoped, nbrMine, isFlagged;
let opt = 9;

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
    opt = document.getElementById("difficultie").value;
    return opt;
}

function startGame() {
    init();
}

function chrono() {
    startB.disabled = true;
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
    timer.textContent = min + ":" + sec;
    timerID = setTimeout(refresh, 50);
}

function generateTable(opt) {

    table.innerHTML="";

    switch (opt) {
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

    for (var i=0; i<opt; i++) {
        row = table.insertRow(i);
        for (var j=0; j<opt; j++) {
            cell = row.insertCell(j);

            cell.onclick = function() {
                clickCell(this);
            };

            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            
            cell.oncontextmenu = function () {
                toggleFlag(this);
            };
        }
    }
    addMines();
}

function addMines() {

    for (var i=0; i<=nbrMine; i++) {
        var row = Math.floor(Math.random() * opt);
        var col = Math.floor(Math.random() * opt);
        var cell = table.rows[row].cells[col];
        cell.setAttribute("data-mine","true");
    }
}

function revealMines() {

    for (var i=0; i<opt; i++) {
        for(var j=0; j<opt; j++) {
            var cell = table.rows[i].cells[j];
            if (cell.getAttribute("data-mine")=="true") {
                cell.className = "mine";
                cell.setAttribute("onclick", "");
            }
        }
    }
}

function checkLevelCompletion() {
    var levelComplete = true;
    for (var i=0; i<opt; i++) {
        for(var j=0; j<opt; j++) {
            if ((table.rows[i].cells[j].getAttribute("data-mine")=="false") && (table.rows[i].cells[j].innerHTML=="")) levelComplete=false;
        }
    }
    if (levelComplete) {
        chronoStopped();
        alert("You Win!");
        revealMines();
    }
}
function toggleFlag(cell) {
    cell.classList.toggle("flag");
    cell.setAttribute("isFlagged", "true");
}


function clickCell(cell) {
    if (cell.getAttribute("data-mine")=="true") {
        chronoStopped();
        revealMines();
        alert("Game Over");
    } else {
        cell.className="clicked";

        var mineCount=0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;

        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,opt-1); i++) {
            for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,opt-1); j++) {
                if (table.rows[i].cells[j].getAttribute("data-mine")=="true")
                    mineCount++;
            }
        }

        cell.innerHTML=mineCount;
        cell.className="number" + mineCount;


        if (mineCount==0) {

            for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,opt-1); i++) {
                for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,opt-1); j++) {

                    if (table.rows[i].cells[j].innerHTML=="")
                        clickCell(table.rows[i].cells[j]);
                }
            }
        }
        checkLevelCompletion();
    }
}