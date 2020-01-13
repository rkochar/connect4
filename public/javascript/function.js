var element = document.getElementById("board");
var check = checkElement;
var ws = new WebSocket('ws://localhost:3000');
ws.onopen = function (event) {
    console.log('Connection is open ...');
};
element.addEventListener("click", check);
var gameBoard3 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [, 0, 0, 0, 0, 0, 0]]
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
        if (document.getElementById("current-player").innerHTML.localeCompare("Player 1") == 0) {
            gameBoard3[pop.charAt(0)][pop.charAt(1)] = 1;
            var button = document.getElementById(pop + "");
            button.style.background = '#bf2121';
            alert("next player");
            document.getElementById("current-player").innerHTML = "Player 2";
            if(win())
            {
                alert("u won");
            }
            var element = document.getElementById("other-player");
            element.innerHTML = "Player 1";
        }
        else {
            gameBoard3[pop.charAt(0)][pop.charAt(1)] = 2;
            var button = document.getElementById(pop + "");
            button.style.background = '#fffb1f';
            alert("next player");
            document.getElementById("current-player").innerHTML = "Player 1";
            if(win())
            {
                alert("u won");
            }
            var element = document.getElementById("other-player");
            element.innerHTML = "Player 2";
        }

    }
}

function win() {
    var height = 6;
    var width = 7;
    var n = 0;
    var player
    for ( r = 0; r < height; r++) { // iterate rows, bottom to top
        for ( c = 0; c < width; c++) { // iterate columns, left to right
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

