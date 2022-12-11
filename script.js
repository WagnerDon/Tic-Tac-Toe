let turn = "red";
let sounds = {
    put: new Audio('sound/put.mp3'),
    win: new Audio('sound/win.mp3'),
    no: new Audio('sound/no.mp3'),
    clap: new Audio('sound/clap.mp3'),
}
let cross = ["cross", "cross", "cross"];
let circle = ["circle", "circle", "circle"];
count = 0;
let temp = [];
let winnerId = [];
let winner = "";
let save = [];

function click() {
    sounds.put.currentTime = 0.35;
    sounds.put.play();
}

function renderTicTacToe() {
    check();
    let content = document.getElementById('content');
    content.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        content.innerHTML += `
        <tr>
            <td class="position-relative">
                <div id="${i}0" onclick="set(${i}, '0')"class="d-flex justify-content-center align-items-center min-div"></div>
            </td>
            <td class="position-relative" >
                <div id="${i}1" onclick="set(${i}, '1')"class="d-flex justify-content-center align-items-center min-div"></div>
            </td>
            <td class="position-relative" >
                <div id="${i}2" onclick="set(${i}, '2')"class="d-flex justify-content-center align-items-center min-div"></div>
            </td>
        </tr>
        `;
    }
}

function win(value) {
    if (JSON.stringify(temp) === JSON.stringify(cross) || JSON.stringify(temp) === JSON.stringify(circle)) {
        document.getElementById('card').classList.remove("d-none");
        sounds.win.play();
        sounds.clap.play();
        save = temp;
        if (temp[0] === "cross") {
            winner = "Player 1";
        }
        else {
            winner = "Player 2";
        }
        mark();
        animation(value);
        setTimeout(endScreen, 2250);
    } else {
        temp = [];
        winnerId = [];
    }
}

function animation(value) {
    if (value === "d1") {
        let pos = winnerId[1];
        document.getElementById(pos).innerHTML += `
            <div class="strike" style="transform: rotate(45deg);"></div>
        `;
    }
    if (value === "d2") {
        let pos = winnerId[1];
        document.getElementById(pos).innerHTML += `
            <div class="strike" style="transform: rotate(135deg);"></div>
        `;
    }
    if (value === "v") {
        let pos = winnerId[1];
        document.getElementById(pos).innerHTML += `
            <div class="strike" style="transform: rotate(90deg);"></div>
        `;
    }
    if (value === "h") {
        let pos = winnerId[1];
        document.getElementById(pos).innerHTML += `
            <div class="strike"></div>
        `;
    }
}



function mark() {
    for (let x of winnerId) {
        document.getElementById(x).style.boxShadow = "0 0 80px rgba(144, 238, 144, 0.5)";
        document.getElementById(x).style.backgroundColor = "rgba(144, 238, 144, 0.7)";
        document.getElementById(x).style.borderRadius = "10px";
    }
}

function diagonal1() {
    for (let i = 0; i < 3; i++) {
        if (document.getElementById(i + i.toString()).firstChild) {
            temp.push(document.getElementById(i + i.toString()).firstChild.name);
            winnerId.push(i + i.toString())
        }
    }
    win("d1");
}

function diagonal2() {
    let x = 2;
    for (let i = 0; i < 3; i++) {
        if (document.getElementById(i + x.toString()).firstChild) {
            temp.push(document.getElementById(i + x.toString()).firstChild.name);
            winnerId.push(i + x.toString())
            x--;
        }
    }
    win("d2");
}

function vertical() {
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (document.getElementById(x + i.toString()).firstChild) {
                temp.push(document.getElementById(x + i.toString()).firstChild.name);
                winnerId.push(x + i.toString())
            }
        }
        win("v");
    }
}

function horizontal() {
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (document.getElementById(i + x.toString()).firstChild) {
                temp.push(document.getElementById(i + x.toString()).firstChild.name);
                winnerId.push(i + x.toString())
            }
        }
        win("h");
    }
}

function check() {
    let user = document.getElementById(turn);
    if (turn === "red") {
        user.style.boxShadow = "0 0 50px rgb(224, 35, 13)";
        user.style.opacity = "100%";
        document.getElementById('blue').style.boxShadow = "unset";
        document.getElementById('blue').style.opacity = "50%";
    } else if (turn === "blue") {
        user.style.boxShadow = "0 0 50px rgb(84 187 255)";
        user.style.opacity = "100%";
        document.getElementById('red').style.boxShadow = "unset";
        document.getElementById('red').style.opacity = "50%";
    }
}

function set(i, string) {
    let id = i + string;
    let get = document.getElementById(id);
    count++;
    whichOne(get);
    check();
    horizontal();
    diagonal2();
    vertical();
    diagonal1();
    even();
}

function even() {
    if (save.length < 3 && count === 9) {
        renderTicTacToe();
        sounds.no.play();
        count = 0;
    }
    temp = [];
    winnerId = [];
}

function whichOne(get) {
    if (turn === "red") {
        get.innerHTML = `<img name="cross" src="img/cross.png">`;
        turn = "blue";
    } else {
        get.innerHTML = `<img name="circle" src="img/circle.png">`;
        turn = "red";
    }
    get.parentNode.innerHTML += `<div class="unclick"></div>`;
    click();
}

function endScreen() {
    document.getElementById('card').innerHTML = `
    <div class="d-flex justify-content-center align-items-center text-center">
        <div class="card d-flex align-items-center" style="width: 18rem;">
            <div class="d-flex justify-content-center align-itemns-center">
                <img src="img/trophy.png" class="card-img-top">
            </div>
            <h3 class="card-title">${winner} is the winner!</h3>
            <a onclick="replay()" class="btn btn-primary">Revanche!</a>
        </div>
    </div>
    `;
}

function replay() {
    document.getElementById('card').classList.add("d-none");
    document.getElementById('card').innerHTML = "";
    count = 0;
    save = [];
    renderTicTacToe();
    click();
}