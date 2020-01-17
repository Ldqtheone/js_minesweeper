const startB = $("#start");
const timer = $("#hours");
const table = $("#table");


let timerID, start, end, diff, stoped, row, cell, col, nbrMine, newLance;
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

                cell.attr('data-mine', false);

                var id = i + "." + j;
                cell.attr('id', id);
                cell.attr('class', "normal");


                for (let e = 0; e < mineTab.length; e++) {
                    console.log(mineTab)

                    if (mineTab[e] === id) {
                        cell.attr('data-mine', true);
                    }
                }



                cell.click(cellClick);

                cell.on('contextmenu', function () {
                    this.classList.toggle("flag");
                    this.toggleAttribute("isFlagged");
                    return false;
                });

                k++;
            }
        }
    }
}

function endGame() {
    if (cell.attr('data-mine', true)) {
        for (var k = 0; k < mineTab.length; k++) {
            document.getElementById(mineTab[k]).className = "mine";
        }
    }
    chronoStopped();
    alert("Vous avez perdu");
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

function cellClick() {

    let isBomb = false;
    let isFlag = false;
    document.getElementById(this.id).setAttribute("clicked","true");

    console.log(isBomb);

    if (cell.hasClass('flag')) {
         isFlag = true;
        console.log(cell)

    }

    if (cell.attr('data-mine', true)) {
        for (var e = 0; e < mineTab.length; e++) {
            if (mineTab[e] == this.id) {
                isBomb = true;
                endGame();
            }
        }
    }

     if(isBomb == false && isFlag == false){

        document.getElementById(this.id).className = "number0";

        var mineCount = 0;
        var cellRow = parseInt(this.id[0]);
        var cellCol = parseInt(this.id[2]);
        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,opt-1); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, opt - 1); j++) {
                if (document.getElementById(i+"."+j).getAttribute('data-mine') === "true") {
                    mineCount++;
                }
            }
        }

        console.log(mineCount);
        console.log(this.id);
        document.getElementById(this.id).className = "number" + mineCount;


        if (mineCount === 0) {
            console.log("rsgerdgrd");
            //Reveal all adjacent cells as they do not have a mine
            for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,opt-1); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, opt - 1); j++) {
                //Recursive Call
                if (document.getElementById(i+"."+j).className !== "number" + mineCount) {
                    console.log("relance ?");
                    newCell = document.getElementById(i+"."+j);
                    newCell.click();
                }
            }}
        }
        // checkLevelCompletion();
    }
}

function checkLevelCompletion() {
    var levelComplete = false;
    for (var i=0; i<opt; i++) {
        for(var j=0; j<opt; j++) {
            if ((document.getElementById(i+"."+j).getAttribute("data-mine") !== "false") && (document.getElementById(i+"."+j).getAttribute("clicked") == "true"))
            {
                levelComplete=true;
                console.log(i+  " "+j+" "+document.getElementById(i+"."+j).getAttribute("data-mine") + " " + (document.getElementById(i+"."+j).className));

            }
        }
    }

    if (levelComplete == true) {
        chronoStopped();
        alert("You Win!");
        endGame();
    }
}