if(document.cookie != 0){
    document.cookie++;
}else{
    document.cookie = 1;
}

var text = document.getElementById("userVisit");
text.innerHTML = document.cookie + " userVisit";