var cookiesArray = document.cookie.split('; ');


if(cookiesArray.length == 2){
    document.cookie = "0";
}else{
	// var cook = parseInt(document.cookie)
 //    cook += 1
 document.cookie = cookiesArray[2] - 1 + 2
}

var text = document.getElementById("userVisit");
text.innerHTML = document.cookie + " userVisit";	