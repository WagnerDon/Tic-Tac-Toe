let turn = "red";
let sounds = {
    put: new Audio('sound/put.mp3'),
    win: new Audio('sound/win.mp3'),
    no: new Audio('sound/no.mp3'),
}

let cross = 0;
let circle = 0;

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

function vertical() {
    for (let i = 0; i < 3; i++) {
        if (document.getElementById("0" + i).firstChild && document.getElementById("1" + i).firstChild && document.getElementById("2" + i).firstChild) {
            let first = document.getElementById("0" + i).firstChild.id;
            let second = document.getElementById("1" + i).firstChild.id;
            let third = document.getElementById("2" + i).firstChild.id;
            if (first === second && second === third) {
                sounds.win.play();
            }
        }
    }
}

function horizontal() {
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (document.getElementById(i + x.toString()).firstChild) {
                let get = document.getElementById(i + x.toString()).firstChild.id;
                if (get === "cross") {
                    cross++;
                    winCondition(cross);
                }
                if (get === "circle") {
                    circle++;
                    winCondition(circle);
                }
            }
        }
        cross = 0;
        circle = 0;
    }
}

function winCondition(x) {
    if (x === 3) {
        sounds.win.play();
    }
}

function check() {
    let user = document.getElementById(turn);
    if (turn === "red") {
        user.style.boxShadow = "0 0 80px rgb(224, 35, 13)";
        document.getElementById('blue').style.boxShadow = "unset";
        document.getElementById('redd').style.opacity = "100%";
        document.getElementById('blued').style.opacity = "50%";
    } else {
        user.style.boxShadow = "0 0 80px rgb(84 187 255)";
        document.getElementById('red').style.boxShadow = "unset";
        document.getElementById('blued').style.opacity = "100%";
        document.getElementById('redd').style.opacity = "50%";
    }
}

function set(i, string) {
    let id = i + string;
    let get = document.getElementById(id);
    whichOne(get);
    check();
    horizontal();
    vertical();
}

function sound(value) {
    if (value === "click") {
        sounds.put.currentTime = 0.35;
        sounds.put.play();
    } else {
        sounds.no.play();
    }
}

function whichOne(get) {
    if (turn === "red") {
        get.innerHTML = `<img id="cross" src="img/cross.png">`;
        turn = "blue";
    } else {
        get.innerHTML = `<img id="circle" src="img/circle.png">`;
        turn = "red";
    }
    get.parentNode.innerHTML += `<div class="unclick"></div>`;
    sound('click');
}