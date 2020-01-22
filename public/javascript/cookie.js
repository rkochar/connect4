if(document.cookie!==0)
{
    document.cookie++
}
else{
    document.cookie=1
}
var text = document.getElementById('cookie');
text.innerHTML = "You have visited the page "+document.cookie+" times";