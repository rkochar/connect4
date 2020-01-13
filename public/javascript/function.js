var element = document.getElementById("board");
var check = checkElement;
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
    var type = e.toElement.type+"";
    if(type.localeCompare("button")==0){    
    pop = '5'+pop.charAt(1);
    while (gameBoard3[pop.charAt(0)][pop.charAt(1)] == 1 || gameBoard3[pop.charAt(0)][pop.charAt(1)] == 2) {
        var fn = pop.charAt(0);
        var sn = pop.charAt(1);
        pop = fn -1+""+sn;
    }
     if (document.getElementById("current-player").innerHTML.localeCompare("Player 1") == 0) {
        gameBoard3[pop.charAt(0)][pop.charAt(1)] = 1;
        var button = document.getElementById(pop + "");
        button.style.background = '#bf2121';
        alert("next player");
        document.getElementById("current-player").innerHTML = "Player 2";

        var element = document.getElementById("other-player");
        element.innerHTML = "Player 1";
    }
    else {
        gameBoard3[pop.charAt(0)][pop.charAt(1)] = 2;
        var button = document.getElementById(pop + "");
        button.style.background = '#fffb1f';
        alert("next player");
        document.getElementById("current-player").innerHTML = "Player 1";

        var element = document.getElementById("other-player");
        element.innerHTML = "Player 2";
    }

    }
    // var pop = e.toElement.id;
    // pop = parseInt(pop, 10) + 35;
    // while (pop > 41) {
    //     pop = pop - 7;
    // }
    // while (gameBoard3[pop] == 1 || gameBoard3[pop] == 2) {
    //     pop = pop - 7;
    // }

    // if (document.getElementById("current-player").innerHTML.localeCompare("Player 1") == 0) {
    //     gameBoard3[pop] = 1;
    //     var button = document.getElementById(pop + "");
    //     button.style.background = '#bf2121';
    //     alert("next player");
    //     document.getElementById("current-player").innerHTML = "Player 2";

    //     var element = document.getElementById("other-player");
    //     element.innerHTML = "Player 1";
    // }
    // else {
    //     gameBoard3[pop] = 2;
    //     var button = document.getElementById(pop + "");
    //     button.style.background = '#fffb1f';
    //     alert("next player");
    //     document.getElementById("current-player").innerHTML = "Player 1";

    //     var element = document.getElementById("other-player");
    //     element.innerHTML = "Player 2";
    // }


}