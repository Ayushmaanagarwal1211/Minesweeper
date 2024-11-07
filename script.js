let user = new Array(9);
let flags = 10;  
let minesCount = 10; 
let original = null; 
for (let i = 0; i < 9; i++) {
    user[i] = new Array(9).fill(-1); 
}
function updateFlag() {
    let flag = document.getElementById("flag");
    flag.innerHTML = flags;
}
updateFlag();
function createOriginal() {
    original = new Array(9);
    for (let i = 0; i < 9; i++) {
        original[i] = new Array(9).fill(0); 
    }
    let count = 0;
    while (count < minesCount) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (original[row][col] !== "b") {
            original[row][col] = "b"; 
            count++;
        }
    }
    write();  
    showCells();
}
function write() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (original[i][j] !== "b") {
                let mines = 0;
                // Check surrounding cells for mines
                if (i - 1 >= 0 && original[i - 1][j] === "b") mines++;
                if (i + 1 < 9 && original[i + 1][j] === "b") mines++;
                if (j - 1 >= 0 && original[i][j - 1] === "b") mines++;
                if (j + 1 < 9 && original[i][j + 1] === "b") mines++;
                if (i - 1 >= 0 && j - 1 >= 0 && original[i - 1][j - 1] === "b") mines++;
                if (i - 1 >= 0 && j + 1 < 9 && original[i - 1][j + 1] === "b") mines++;
                if (i + 1 < 9 && j - 1 >= 0 && original[i + 1][j - 1] === "b") mines++;
                if (i + 1 < 9 && j + 1 < 9 && original[i + 1][j + 1] === "b") mines++;
                original[i][j] = mines;
            }
        }
    }
}
function showCells() {
    let container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.classList = 'original';
        for (let j = 0; j < 9; j++) {
            let ele = document.createElement("div");
            ele.innerHTML = original[i][j] !== "b" ? original[i][j] : "";
            ele.classList = "child";
            div.appendChild(ele);
        }
        container.appendChild(div);
    }
    let container1 = document.getElementById("container1");
    container1.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.classList = 'original';
        for (let j = 0; j < 9; j++) {
            let ele = document.createElement("div");
            ele.innerHTML = user[i][j] === -1 ? "" : user[i][j];
            ele.classList = "child1";

            ele.addEventListener('contextmenu', (e) => {
                e.preventDefault(); 
                if (user[i][j] === -1 || user[i][j] === "f") {
                    if (user[i][j] === "f") {
                        flags++;  
                        user[i][j] = -1;
                        ele.innerHTML = "";
                    } else if (flags > 0) { 
                        user[i][j] = "f";
                        flags--;
                        ele.innerHTML = "F";
                    }
                }
                updateFlag(); 
            });

            ele.addEventListener("click", () => {
                if (user[i][j] === -1 && user[i][j] !== "f") {
                    if (original[i][j] === "b") {
                        handleLose();
                    } else {
                        revealCell(i, j,ele);
                    }
                }
            });

            div.appendChild(ele);
        }
        container1.appendChild(div);
    }
}
let directions = [[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]]
function revealCell(i, j) {
    if (user[i][j] === -1) {
        user[i][j] = original[i][j];
        let ele = document.getElementsByClassName("child1")[i * 9 + j];
        ele.innerHTML = user[i][j] !== 0 ? user[i][j] : "";
        ele.classList.add("active");

        if (user[i][j] === 0) {
            for (let [x,y] of directions) {
                    if (i + x >= 0 && i + x < 9 && j + y >= 0 && j + y < 9 && user[i + x][j + y] === -1) {
                        revealCell(i + x, j + y);
                    }
            }
        }
    }
    checkWin();
}

function handleLose() {
    alert("Game Over!");
    resetGame();
}

function checkWin() {
    let cells = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (user[i][j] !== -1 && user[i][j] !== "f") {
                cells++;
            }
        }
    }
    if (cells === 81 - minesCount) {
        alert("You Win!");
        resetGame();
    }
}

function resetGame() {
    flags = minesCount;
    original = null;
    user = new Array(9);
    for (let i = 0; i < 9; i++) {
        user[i] = new Array(9).fill(-1);
    }
    createOriginal();
}
createOriginal();
