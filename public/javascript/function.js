var element = document.getElementById("board");
var check = checkElement;
element.addEventListener("click", check);
var gameBoard3 = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
]
function checkElement(e)
{
    var pop = e.toElement.id;
    pop = parseInt(pop,10) + 35;
    while(pop>41)
    {
        pop = pop - 7;
    }
    alert(pop);
    var element = document.getElementById("board");
}
