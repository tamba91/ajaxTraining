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
    document.getElementById("data-table-body").innerHTML = "";
    if (selezione.value != "") {
        ajaxCall("https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=" + selezione.value + "&$where=data>=" + dataFormatted + "&$order=data DESC", function (res) {
            var table = document.getElementById("data-table-body");
            var response = JSON.parse(res);
            for (var i = 0; i < response.length; i++) {
                var fTemplate = compiled(response[i]);
                var row = table.insertRow(0);
                row.innerHTML = fTemplate;
            }
        })
    }
}

var rowView = "<td>temperatura: <%= valore %>°</td><td>data e ora: <%= data %></td>";
var compiled = _.template(rowView);
var xhr = new XMLHttpRequest();
var selezione = document.getElementById("selezione");
var radios = document.getElementsByName("giorno");
var data = new Date();
var dateStart = new Date();
var dateEnd = new Date();
dateStart.setDate(dateStart.getDate() - 1);
dateEnd.setDate(dateEnd.getDate() + 1);
console.log("yesterday-dateStart: ", dateStart);
console.log("tomorrow-DateEnd: ", dateEnd);
var dataFormatted = formatData(data);

selezione.addEventListener("change", loadData);


for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        if (this.value == "0") {
            data = new Date();
            dataFormatted = formatData(data);
            loadData();
            console.log(dataFormatted);
        }
        else if (this.value == "-1") {
            data.setDate(data.getDate() - 1);
            dataFormatted = formatData(data);
            loadData();
            console.log(dataFormatted);
        }

    })
}





