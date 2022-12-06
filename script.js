let turn = "red";
let sounds = {
    put: new Audio('sound/put.mp3'),
    win: new Audio('sound/win.mp3'),
    no: new Audio('sound/no.mp3'),
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

let cross = ["cross", "cross", "cross"];
let circle = ["circle", "circle", "circle"];
let temp = [];
let winnerId = [];

function win() {
    if (JSON.stringify(temp) === JSON.stringify(cross) || JSON.stringify(temp) === JSON.stringify(circle)) {
        sounds.win.play();
        console.log(winnerId);
        console.log(temp);
        document.getElementById('table').innerHTML += `<div class="unclick"></div>`;
    } else {
        temp = [];
        winnerId = [];
    }
}

function diagonal() {
    for (let i = 0; i < 3; i++) {
        if (document.getElementById(i + i.toString()).firstChild) {
            temp.push(document.getElementById(i + i.toString()).firstChild.name);
            winnerId.push(document.getElementById(i + i.toString()))
        }
    }
    win();
    let x = 2;
    for (let i = 0; i < 3; i++) {
        if (document.getElementById(i + x.toString()).firstChild) {
            temp.push(document.getElementById(i + x.toString()).firstChild.name);
            winnerId.push(document.getElementById(i + x.toString()))
            x--;
        }
    }
    win();
}

function vertical() {
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (document.getElementById(x + i.toString()).firstChild) {
                temp.push(document.getElementById(x + i.toString()).firstChild.name);
                winnerId.push(document.getElementById(x + i.toString()))
            }
        }
        win();
    }
}

function horizontal() {
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (document.getElementById(i + x.toString()).firstChild) {
                temp.push(document.getElementById(i + x.toString()).firstChild.name);
                winnerId.push(document.getElementById(i + x.toString()))
            }
        }
        win();
    }
}

function check() {
    let user = document.getElementById(turn);
    if (turn === "red") {
        user.style.boxShadow = "0 0 80px rgb(224, 35, 13)";
        user.style.opacity = "100%";
        document.getElementById('blue').style.boxShadow = "unset";
        document.getElementById('blue').style.opacity = "50%";
    } else if (turn === "blue") {
        user.style.boxShadow = "0 0 80px rgb(84 187 255)";
        user.style.opacity = "100%";
        document.getElementById('red').style.boxShadow = "unset";
        document.getElementById('red').style.opacity = "50%";
    }
}

function set(i, string) {
    let id = i + string;
    let get = document.getElementById(id);
    whichOne(get);
    check();
    horizontal();
    vertical();
    diagonal();
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
    sounds.put.currentTime = 0.35;
    sounds.put.play();
}