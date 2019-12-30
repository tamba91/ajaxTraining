function formatData(data, time) {
    return ("'" + data.getFullYear() + "-" + complementa(data.getMonth() + 1) + "-" + complementa(data.getDate()) + "T" + time + "'");
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

function ajaxCall(url, callback) {
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback(this.responseText);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function loadData(date) {
    document.getElementById("data-table-body").innerHTML = "";
    document.getElementById("media").innerHTML = "";
    document.getElementById("minima").innerHTML = "";
    document.getElementById("massima").innerHTML = "";
    document.getElementById("ex-term").innerHTML = "";
    temperature.length = 0;
    if (selezione.value != "") {
        ajaxCall("https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=" + selezione.value + "&$where=data between" + formatData(date, "00:00:00.000") + "and" + formatData(date, "23:59:59.000") + "&$order=data ASC", function (res) {
            var table = document.getElementById("data-table-body");
            var response = JSON.parse(res);
            for (var i = 0; i < response.length; i++) {
                temperature.push(response[i].valore);
                var fTemplate = compiled(response[i]);
                var row = table.insertRow(0);
                row.innerHTML = fTemplate;
            }
            w.postMessage(temperature);
        })
    }
}

var rowView = "<td><%= data %></td><td><%= valore %>°</td>";
var compiled = _.template(rowView);
var xhr = new XMLHttpRequest();
var w = new Worker('worker.js');
var selezione = document.getElementById("selezione");
var radios = document.getElementsByName("giorno");
var data = new Date();
var temperature = [];
var dateYest = new Date();
var dateToda = new Date();

dateYest.setDate(dateYest.getDate() - 1);


selezione.addEventListener("change", function () {
    loadData(dateToda);
});

$("#show-list").click(function(){
    $("#table-container").toggle("slow", function(){});
})

for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        if (this.value == "0") {
            
            loadData(dateToda);
        }
        else if (this.value == "-1") {
            
            loadData(dateYest);
        }

    })
}

w.onmessage = function (e) {
    document.getElementById("media").innerHTML = "Temperatura media: " + e.data.media;
    document.getElementById("minima").innerHTML = "Temperatura minima: " + e.data.minTemp;
    document.getElementById("massima").innerHTML = "Temperatura massima: " + e.data.maxTemp;
    document.getElementById("ex-term").innerHTML = "Escursione termica: " + e.data.exTerm;
}




