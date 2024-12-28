function checking_win(dict_win, play_n1, play_n2) {

    checker = "";
    win_box = document.body.querySelector(".winner_declaration")
    game_box = document.body.querySelector(".Game-box")
    win_para = document.getElementById("win_text")
    showing_chance = document.querySelector(".sub-title")
    tie_check = 9

    for (let index = 1; 8 > index; index += 3) {
        if ((dict_win[index] == dict_win[index + 1]) && (dict_win[index] == dict_win[index + 2])) {
            console.log(index);
            console.log(dict_win);
            checker = dict_win[index];
            console.log("1=", checker);
        }
    }


    for (let index = 1; 4 > index; index++) {
        if ((dict_win[index] == dict_win[index + 3] && (dict_win[index] == dict_win[index + 6]))) {
            checker = dict_win[index];
            console.log(dict_win);
            console.log(index);
            console.log("2=", checker);
        }
    }

    if ((dict_win[1] == dict_win[5]) && (dict_win[5] == dict_win[9])) {
        checker = dict_win[1];
        console.log(dict_win);
        console.log(dict_win[index])
        console.log("3=", checker);
    }

    if ((dict_win[3] == dict_win[5]) && (dict_win[5] == dict_win[7])) {
        checker = dict_win[3];
        console.log(dict_win);
        console.log(dict_win[index])
        console.log("3=", checker);
    }

    if ('x' == checker) {
        win_box.style.display = "flex";
        game_box.style.display = "none";
        showing_chance.style.display = "none";
        win_para.innerHTML = ["Winner is " + play_n1];
    }


    else if ('O' == checker) {
        win_box.style.display = "flex";
        game_box.style.display = "none";
        showing_chance.style.display = "none";
        win_para.innerHTML = ["Winner is " + play_n2];
    }

    for (let index = 1; index <= 9; index++) {
        if (index != dict_win[index]) {
            tie_check = tie_check-1;
        }
        if (tie_check == 0) {
            win_box.style.display = "flex";
            game_box.style.display = "none";
            showing_chance.style.display = "none";
            win_para.innerHTML = ["Game Tie, Play Again"];
        }
    }
}

function checking_taken_value(dict_pos, id_pos) {
    if (dict_pos[id_pos] == "x" || dict_pos[id_pos] == "O") {
        alert("Warning: This position is already occupied \nPlease Retry");
        return 0;
    }
    return 1

}



function take_input(play1, play2, chance, index, id_name, dict_pos) {
    let i = 0;
    i = checking_taken_value(dict_pos, id_name);
    if (index % 2 == 0 && i == 1) {
        chance.innerHTML = "Chance of " + play2;
        document.getElementById(id_name).querySelector(".cross").style.display = "block";
        dict_pos[id_name] = "x";
    }


    else if (index % 2 != 0 && i == 1) {
        chance.innerHTML = ["Chance of " + play1];
        document.getElementById(id_name).querySelector(".circle").style.display = "block";
        dict_pos[id_name] = "O";
    }

    if (i == 1) {
        return { i, dict_pos };
    }
    return { i, dict_pos };

}


function box_select(name1, name2, chance, index, dict_pos, i) {
    const box = document.querySelectorAll(".box");

    box.forEach(box => {

        box.addEventListener("click", () => {
            var id_no = box.id;
            let result = take_input(name1, name2, start, index, id_no, dict_pos);
            checking_win(dict_pos, name1, name2)
            if (result.i == 1) {
                return index++, result.dict_pos;
            }
            return index, result.dict_pos;
        })
    })
}


function player_name() {

    let play1 = document.getElementById("name1").value;
    let play2 = document.getElementById("name2").value;
    if (play1 == "") {
        play1 = "X"
    }
    if (play2 == "") {
        play2 = "O"
    }
    return [play1, play2];

}


const butn_play = document.querySelector(".play-button")
const start_butn = document.getElementById("start")
const stop_butn = document.getElementById("stop")

let start = document.getElementById("chance")
start.innerHTML = "Start"

const stop_ele = 1;
let dict_posi = { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9" }

let classname = document.getElementsByClassName("box")
let index = 2
let i = 0


start_butn.addEventListener("click", () => {
    document.querySelector(".Game-box").style.display = "flex"
    start_butn.style.display = "none"
    stop_butn.style.display = "block"
    document.querySelector(".user-name").style.display = "none"


    let [name1, name2] = player_name()
    chance.innerHTML = "Chance of " + name1
    index, dict_posi = box_select(name1, name2, start, index, dict_posi, i)


})

stop_butn.addEventListener("click", () => {
    start_butn.style.display = "block"
    stop_butn.style.display = "none";
    document.querySelector(".user-name").style.display = "flex"
    location.reload()
})