function formatDataOdierna() {
    var data = new Date();
    return ("'" + data.getFullYear() + "-" + complementa(data.getMonth() + 1) + "-" + complementa(data.getUTCDate()) + "T00:00:00.000" + "'");
}

function complementa(valoreData) {
    if (valoreData >= 1 && valoreData <= 9) {
        return "0" + valoreData;
    }
    else if ((valoreData >= 10 && valoreData <= 31)) {
        return "" + valoreData;
    }

    else {
        return "valore data non ammissibile"
    }
}

var compiled = _.template("<h3>temperatura: <%= valore %> data e ora: <%= data %></h3>");
var data = formatDataOdierna();

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var res = JSON.parse(this.responseText);
        for (var i = 0; i < res.length; i++) {
            var riga = compiled(res[i]);
            document.body.innerHTML += riga;
            //document.getElementById("target").innerHTML += "temperatura: " + res[i].valore + " " + "data e ora: " + res[i].data + "<br>";
        }
    }
}

xhr.open("GET", "https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=12025&$where=data>=" + data + "&$order=data DESC", true);

xhr.send();

console.log(typeof (complementa(7)));
console.log(typeof (complementa(21)));
