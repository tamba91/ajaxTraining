function formatData(data) {
    return ("'" + data.getFullYear() + "-" + complementa(data.getMonth() + 1) + "-" + complementa(data.getDate()) + "T00:00:00.000" + "'");
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

var rowView = "<td>temperatura: <%= valore %>°</td><td>data e ora: <%= data %></td>";
var compiled = _.template(rowView);
var xhr = new XMLHttpRequest();
var selezione = document.getElementById("selezione");
var data = new Date();
selezione.addEventListener("change", loadData);

var radios = document.getElementsByName("giorno");

for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        if (this.value == "0") {
            data = Date(Date.now());
            console.log(typeof(data));
        }
        else if (this.value == "-1") {
            data.setDate(data.getDate() - 1);
            console.log(typeof(data));
        }
        console.log(data);
    })
}

var dataFormatted = formatData(data);


function ajaxCall(url, callback) {
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback(this.responseText);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function loadData() {

    if (selezione.value != "") {
        ajaxCall("https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=" + selezione.value + "&$where=data>=" + dataFormatted + "&$order=data ASC", function (res) {
            var table = document.getElementById("data-table-body");
            table.innerHTML = "";
            var response = JSON.parse(res);
            for (var i = 0; i < response.length; i++) {
                var fTemplate = compiled(response[i]);


                var row = table.insertRow(0);
                row.innerHTML = fTemplate;
            }
        })
    }
    else {
        document.getElementById("data-table-body").innerHTML = "";
    }
}