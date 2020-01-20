var element = document.getElementById("board");
var check = checkElement;
element.addEventListener("click", check);
var ws = new WebSocket('ws://localhost:3000');
ws.onopen = function (event) {
    console.log('Connection is open ...');
};

var turn = false;
var gameBoard3 = [];
var check = 0;
ws.onmessage = function (message) {
    var msg = JSON.parse(message.data)
    if (msg.type.localeCompare("board") == 0) {
        gameBoard3 = msg.id;
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 7; j++) {
                console.log(gameBoard3[i][j]);
                if (gameBoard3[i][j] === 1) {
                    console.log("dhdu");
                    var button = document.getElementById(i + "" + j);
                    button.style.background = '#bf2121';
                }
                if (gameBoard3[i][j] === 2) {
                    console.log("dhdu");
                    var button = document.getElementById(i + "" + j);
                    button.style.background = '#fffb1f';
                }
            }
        }
    }
    if (msg.type.localeCompare("chal") == 0) {
        turn = true;
        check = msg.player;
        if (check.localeCompare("A") == 0) {
            document.getElementById("current-player").innerHTML = "Player 1";
            document.getElementById("other-player").innerHTML = "Player 2";
        } else {
            document.getElementById("current-player").innerHTML = "Player 2";
            document.getElementById("other-player").innerHTML = "Player 1";
        }
    }

    if (msg.type.localeCompare("lose") == 0) {
        turn = false;
        alert("You Lose")
    }

}


function checkElement(e) {
    var pop = e.toElement.id;
    var type = e.toElement.type + "";
    if (type.localeCompare("button") == 0) {
        pop = '5' + pop.charAt(1);
        while (gameBoard3[pop.charAt(0)][pop.charAt(1)] == 1 || gameBoard3[pop.charAt(0)][pop.charAt(1)] == 2) {
            var fn = pop.charAt(0);
            var sn = pop.charAt(1);
            pop = fn - 1 + "" + sn;
        }
        if (check.localeCompare("A") == 0) {
            if (turn) {

                gameBoard3[pop.charAt(0)][pop.charAt(1)] = 1;
                var button = document.getElementById(pop + "");
                button.style.background = '#bf2121';
                alert("next player ");
                document.getElementById("current-player").innerHTML = "Player 2";

                var element = document.getElementById("other-player");
                element.innerHTML = "Player 1";
                var msg = {
                    type: "turn",
                    id: gameBoard3
                };
                ws.send(JSON.stringify(msg));
                turn = false;
                if (win()) {
                    var won = {
                        type: "win",
                        id: "A"
                    };
                    alert("You won");
                    ws.send(JSON.stringify(won));
                }

            }
        } else {
            if (turn) {
                gameBoard3[pop.charAt(0)][pop.charAt(1)] = 2;
                var button = document.getElementById(pop + "");
                button.style.background = '#fffb1f';
                alert("next player");
                document.getElementById("current-player").innerHTML = "Player 1";

                var element = document.getElementById("other-player");
                element.innerHTML = "Player 2";
                var msg = {
                    type: "turn",
                    id: gameBoard3
                };
                ws.send(JSON.stringify(msg));
                turn = false;
                if (win()) {

                    var won = {
                        type: "win",
                        id: "B"
                    };
                    alert("You won");
                    ws.send(JSON.stringify(won));
                }
            }
        }

    }
}

function win() {
    var height = 6;
    var width = 7;
    var n = 0;
    var player
    for (r = 0; r < height; r++) { // iterate rows, bottom to top
        for (c = 0; c < width; c++) { // iterate columns, left to right
            player = gameBoard3[r][c];
            if (player == 0)
                continue; // don't check empty slots
            if (c + 3 < width &&
                player == gameBoard3[r][c + 1] && // look right
                player == gameBoard3[r][c + 2] &&
                player == gameBoard3[r][c + 3])
                return true;
            if (r + 3 < height) {
                if (player == gameBoard3[r + 1][c] && // look up
                    player == gameBoard3[r + 2][c] &&
                    player == gameBoard3[r + 3][c])
                    return true;
                if (c + 3 < width &&
                    player == gameBoard3[r + 1][c + 1] && // look up & right
                    player == gameBoard3[r + 2][c + 2] &&
                    player == gameBoard3[r + 3][c + 3])
                    return true;
                if (c - 3 >= 0 &&
                    player == gameBoard3[r + 1][c - 1] && // look up & left
                    player == gameBoard3[r + 2][c - 2] &&
                    player == gameBoard3[r + 3][c - 3])
                    return true;
            }
        }
    }
    return false;
}

