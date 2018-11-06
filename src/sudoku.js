const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const head = document.getElementById("head");

const timer = document.getElementById("timer");

canvas.width = window.innerWidth;
// leave 60px for top margin
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    // ToDo prob best to not allow turned phone...
    // redraw();
}

let images = {};
preLoad();

const outerBorderSize = 10;
const sizePerBox = Math.min(Math.floor((canvas.width - 4*outerBorderSize) / 9), Math.floor((canvas.height - 4*outerBorderSize) / 9));
const offsetLeft = Math.floor(((canvas.width - 4*outerBorderSize) - 9*sizePerBox)/2);
const offsetTop = Math.floor(((canvas.height - 4*outerBorderSize) - 9*sizePerBox)/2);
let running = false;

const grid = [];
function prepareGrid(hints) {
    for (let row = 0; row < 9; row++) {
        grid[row] = [3];
        for (let column = 0; column < 9; column++) {
            let hint = hints[row*9 + column];
            grid[row][column] = new Slot(hint, hint > 0, row, column);
            draw(grid[row][column]);
        }
    }
}

function draw(slot) {
    console.log("current value: " + slot.value);
    let offsetX = (Math.floor(slot.column / 3) + 1) * outerBorderSize + offsetLeft;
    let offsetY = (Math.floor(slot.row / 3) + 1) * outerBorderSize + offsetTop;
    ctx.drawImage(slot.getImage(), slot.column * sizePerBox + offsetX, slot.row * sizePerBox + offsetY, sizePerBox, sizePerBox);
}

function update() {
    document.title = "Sudoku";
    head.innerText = "Happy puzzling!";
}

function start() {
    running = true;
    prepareGrid([..."013000062020609008085214730204006053500100870801547090092380640050470980740900005"]);
    update();
    runTimer();
}
window.onload = start;

function won() {
    document.title = "You won!";
    head.innerText = "You won!";
    stopGame();
}

function stopGame() {
    running = false;
    clearTimeout(timerID);
}

function preLoad() {
    const border_big = new Image();
    border_big.src = "src/assets/border_big.png";
    const border_big_1 = new Image();
    border_big_1.src = "src/assets/border_big_1.png";
    const border_big_2 = new Image();
    border_big_2.src = "src/assets/border_big_2.png";
    const border_big_3 = new Image();
    border_big_3.src = "src/assets/border_big_3.png";
    const border_big_4 = new Image();
    border_big_4.src = "src/assets/border_big_4.png";
    const border_big_5 = new Image();
    border_big_5.src = "src/assets/border_big_5.png";
    const border_big_6 = new Image();
    border_big_6.src = "src/assets/border_big_6.png";
    const border_big_7 = new Image();
    border_big_7.src = "src/assets/border_big_7.png";
    const border_big_8 = new Image();
    border_big_8.src = "src/assets/border_big_8.png";
    const border_big_9 = new Image();
    border_big_9.src = "src/assets/border_big_9.png";
    const border_big_1_hint = new Image();
    border_big_1_hint.src = "src/assets/border_big_1_hint.png";
    const border_big_2_hint = new Image();
    border_big_2_hint.src = "src/assets/border_big_2_hint.png";
    const border_big_3_hint = new Image();
    border_big_3_hint.src = "src/assets/border_big_3_hint.png";
    const border_big_4_hint = new Image();
    border_big_4_hint.src = "src/assets/border_big_4_hint.png";
    const border_big_5_hint = new Image();
    border_big_5_hint.src = "src/assets/border_big_5_hint.png";
    const border_big_6_hint = new Image();
    border_big_6_hint.src = "src/assets/border_big_6_hint.png";
    const border_big_7_hint = new Image();
    border_big_7_hint.src = "src/assets/border_big_7_hint.png";
    const border_big_8_hint = new Image();
    border_big_8_hint.src = "src/assets/border_big_8_hint.png";
    const border_big_9_hint = new Image();
    border_big_9_hint.src = "src/assets/border_big_9_hint.png";

    images = {
        0: border_big,
        1: border_big_1,
        2: border_big_2,
        3: border_big_3,
        4: border_big_4,
        5: border_big_5,
        6: border_big_6,
        7: border_big_7,
        8: border_big_8,
        9: border_big_9,
        hint1: border_big_1_hint,
        hint2: border_big_2_hint,
        hint3: border_big_3_hint,
        hint4: border_big_4_hint,
        hint5: border_big_5_hint,
        hint6: border_big_6_hint,
        hint7: border_big_7_hint,
        hint8: border_big_8_hint,
        hint9: border_big_9_hint,
    };
}

let time = 0;
let timerID;
function runTimer() {
    displayTime();
    timerID = setTimeout(runTimer, 1000);
    time ++;
}

function displayTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timer.innerText = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

if('ontouchstart' in window) {
    canvas.addEventListener("touchstart", onTouchStart, false);
    canvas.addEventListener("touchend", onTouchEnd, false);
} else canvas.addEventListener("mousedown", onClick, false);

function getSlot(x, y) {
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x -= offsetLeft;
    y -= offsetTop;

    if (x < 0 || y < 0) return undefined;

    let outerColumn = Math.floor(x / (outerBorderSize + 3*sizePerBox));
    let outerRow = Math.floor(y / (outerBorderSize + 3*sizePerBox));

    if (outerColumn > 2 || outerRow > 2) return undefined;

    x -= outerColumn * (outerBorderSize + 3*sizePerBox);
    y -= outerRow * (outerBorderSize + 3*sizePerBox);

    x -= outerBorderSize;
    y -= outerBorderSize;

    if (x < 0 || y < 0) return undefined;

    let column = outerColumn*3 + Math.floor(x / sizePerBox);
    let row = outerRow*3 + Math.floor(y / sizePerBox);

    return grid[row][column];
}

function onClick(event) {
    if (!running) return;

    let x = event.x;
    let y = event.y;

    let slot = getSlot(x, y);
    if (slot === undefined) return;
    if (slot.hint) return;

    if (event.button === 0) {
        console.log("value: " + slot.value);
        if (slot.value >= 9) {
            slot.update.bind(slot)(0);
            return;
        } else {
            slot.update.bind(slot)(1 + parseFloat(slot.value));
            console.log("value now: " + slot.value);
        }
    }
    if (event.button === 2) return;
}

function onTouchStart(event) {
    if (event.changedTouches.length === 1) { //one finger touch
        let touch = event.changedTouches[0];

        let x = touch.pageX;
        let y = touch.pageY;

        let slot = getSlot(x, y);
        if (slot === undefined) return;
        if (slot.hint) return;

        if (slot.value >= 9) {
            slot.update.bind(slot)(0);
            return;
        } else {
            slot.update.bind(slot)(1 + parseFloat(slot.value));
        }
        event.preventDefault();
    }
}

function Slot(value, hint, row, column) {
    this.value = value;
    this.hint = hint;
    this.row = row;
    this.column = column;
    this.getImage = function () {
        if (hint) return images["hint" + this.value];
        return images[this.value];
    };
    this.update = function (newValue) {
        this.value = newValue;
        draw(this);
    };
}
