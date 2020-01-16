var table = document.getElementById("table");
var timer = document.getElementById("hours");
var startB = document.getElementById("start");

let timerID, start, end, diff, stoped, nbrMine;
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
    //generate 10 by 10 grid
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
            cell.onclick = function() { clickCell(this); };
            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    addMines();
}

function addMines() {
    //Add mines randomly
    for (var i=0; i<=nbrMine; i++) {
        var row = Math.floor(Math.random() * opt);
        var col = Math.floor(Math.random() * opt);
        var cell = table.rows[row].cells[col];
        cell.setAttribute("data-mine","true");
    }
}

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<opt; i++) {
        for(var j=0; j<opt; j++) {
            var cell = table.rows[i].cells[j];
            if (cell.getAttribute("data-mine")=="true") cell.className="mine";
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
        alert("You Win!");
        revealMines();
    }
}

function clickCell(cell) {
    //Check if the end-user clicked on a mine
    if (cell.getAttribute("data-mine")=="true") {
        revealMines();
        alert("Game Over");
    } else {
        cell.className="clicked";
        //Count and display the number of adjacent mines
        var mineCount=0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        //alert(cellRow + " " + cellCol);
        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,8); i++) {
            for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,8); j++) {
                if (table.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
            }
        }
        cell.className="number" + mineCount;
        cell.innerHTML=mineCount;
        if (mineCount==0) {
            //Reveal all adjacent cells as they do not have a mine
            for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,opt); i++) {
                for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,opt); j++) {
                    //Recursive Call
                    if (table.rows[i].cells[j].innerHTML=="") clickCell(table.rows[i].cells[j]);
                }
            }
        }
        checkLevelCompletion();
    }
}