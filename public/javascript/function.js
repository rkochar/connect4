var element = document.getElementById("board");
var check = checkElement;
element.addEventListener("click", check);
var gameBoard3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
function checkElement(e)
{
    var pop = e.toElement.id;
    pop = parseInt(pop,10) + 35;
    while(pop>41)
    {
        pop = pop - 7;
    }
    while(gameBoard3[pop]==1)
    {
        pop = pop -7;
    }
    gameBoard3[pop] = 1;
    var button = document.getElementById(pop+"");
    if(document.getElementById("current-player").innerHTML.localeCompare("Player 1")==0)
    {
    button.style.background = '#bf2121';
    alert("next player");
    document.getElementById("current-player").innerHTML = "Player 2";
    
    var element = document.getElementById("other-player");
    element.innerHTML="Player 1";
    }
    else{
    button.style.background = '#fffb1f';
    alert("next player");
    document.getElementById("current-player").innerHTML = "Player 1";
    
    var element = document.getElementById("other-player");
    element.innerHTML="Player 2";
    }
    

}
