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

                cell.attr('data-mine', false);

                var id = i + "." + j;
                cell.attr('id', id);

                for (var e = 0; e < mineTab.length; e++) {
                    if (mineTab[e] === id) {
                        cell.attr('data-mine', true);
                    }
                }

                cell.click(cellClick);
                k++;
            }
        }
    }
}

function endGame() {
    for (var i = 0; i < opt; i++) {
        for (var j = 0; j < opt; j++) {
            if (cell.attr('data-mine', true)) {
                console.log(this.cell.id);
                $(this).empty();
                $(this).append('<img src="assets/images/bomb.png" alt="bomb">');
            }
        }
    }
    chronoStopped();
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
    for (var e = 0; e < mineTab.length; e++) {
        if (mineTab[e] == this.id) {
            isBomb = true;
            /* console.log("ok");
            console.log(this.id[0]);
            $(this).empty();
            $(this).append('<img src="assets/images/bomb.png" alt="bomb">'); */
            endGame();
        }

        if(isBomb == false){
            var mineCount = 0;
            var cellRow = this.id[0];
            var cellCol = this.id[2];
            for (var i = Math.max(cellRow - 1, 0); i < Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j < Math.min(cellCol + 1, 9); j++) {
                    if (mineTab[e] == this.id)
                        mineCount++;
                        $(this).empty();
                        $(this).append('<img src="assets/images/'+ mineCount +'.png" alt="number">');
                }
            }

            if (mineCount === 0) {
                //Reveal all adjacent cells as they do not have a mine
                for (var i = Math.max(cellRow - 1, 0); i < Math.min(cellRow + 1, 9); i++) {
                    for (var j = Math.max(cellCol - 1, 0); j < Math.min(cellCol + 1, 9); j++) {
                        //Recursive Call
                        if (this === '<img src="assets/images/0.png" alt="number">')
                            cellClick(this[cellRow][cellCol]);
                    }
                }
            }
            //checkLevelCompletion();

        }

        /* if(isBomb == false) {
            var mineCount = 0;
            var row = this.id[0];
            var col = this.id[2];
            console.log(row);
            console.log(col);
            var h = 0;
            var adj = [(this.id[0]+1)+ "." +(this.id[2]+1) , (this.id[0]+1)+ "." +this.id[2] , (this.id[0]+1)+ "." +(this.id[2]-1) , this.id[0]+ "." +(this.id[2]+1) , this.id[0]+ "." +this.id[2] , this.id[0]+ "." +(this.id[2]-1) , (this.id[0]-1)+ "." +(this.id[2]+1) , (this.id[0]-1)+ "." +this.id[2] , (this.id[0]-1)+ "." +(this.id[2]-1)];
            for (var e = 0; e < mineTab.length; e++) {
                console.log(adj[h])
                if(adj[h] != mineTab[e]){
                    $(this).empty();
                    $(this).append('<img src="assets/images/empty.png" alt="empty">');
                }
                h++;
            }
        }*/
    }
}