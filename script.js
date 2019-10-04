var xhr = new XMLHttpRequest();
function formatData(){
    var data = new Date();
    
}

xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var res = JSON.parse(this.responseText);
        for (var i = 0; i < res.length; i++) {
            document.getElementById("target").innerHTML += "temperatura: " + res[i].valore + " " + "data e ora: " + res[i].data + "<br>";
        }
    }
}

xhr.open("GET", "https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=12025&$where=data>'2019-10-03T23:00:00.000'&$order=data DESC", true);

xhr.send();