var xhr = new XMLHttpRequest();
function formatDataOdierna(){
    var data = new Date();
    console.log(data.getUTCFullYear() + "-" + data.getUTCMonth() + "-" + data.getUTCDay() + "T");
    return "'2019-10-03T23:00:00.000'";
}

function complementa(valoreData){
    if(valoreData >= 1 && valoreData <= 9){
        return "0" + valoreData;
    }
    else if((valoreData >= 10 && valoreData <= 31)){
        return toString(valoreData);
    }

    else{
        return "valore data non ammissibile"
    }
}

var data = formatDataOdierna();

xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var res = JSON.parse(this.responseText);
        for (var i = 0; i < res.length; i++) {
            document.getElementById("target").innerHTML += "temperatura: " + res[i].valore + " " + "data e ora: " + res[i].data + "<br>";
        }
    }
}

xhr.open("GET", "https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=12025&$where=data>=" + data + "&$order=data DESC", true);

xhr.send();

console.log(complementa(7));