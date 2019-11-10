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

function loadData(dateStart, dateEnd) {
    console.log(dateStart);
    console.log(dateEnd);
    document.getElementById("data-table-body").innerHTML = "";
    if (selezione.value != "") {
        ajaxCall("https://www.dati.lombardia.it/resource/647i-nhxk.json?idsensore=" + selezione.value  + "&$where=data between" +formatData(dateStart)+ "and" + formatData(dateEnd) + "&$order=data ASC", function (res) {
            var table = document.getElementById("data-table-body");
            var response = JSON.parse(res);
            for (var i = 0; i < response.length; i++) {
                temperature.push(response[i].valore);
                var fTemplate = compiled(response[i]);
                var row = table.insertRow(0);
                row.innerHTML = fTemplate;
            }
            console.log(JSON.stringify(temperature));
        })
    }
}

var rowView = "<td>temperatura: <%= valore %>°</td><td>data e ora: <%= data %></td>";
var compiled = _.template(rowView);
var xhr = new XMLHttpRequest();
var selezione = document.getElementById("selezione");
var radios = document.getElementsByName("giorno");
var data = new Date();
var temperature = [];
var dateStart = new Date();
var dateEnd = new Date();

dateEnd.setDate(dateEnd.getDate() + 1);
var dataFormatted = formatData(data);

selezione.addEventListener("change", function(){
    loadData(dateStart, dateEnd);
});


for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        if (this.value == "0") {
            dateStart = new Date();
            dateEnd = new Date();
            dateEnd.setDate(dateEnd.getDate() + 1);
            loadData(dateStart, dateEnd);
            console.log(dataFormatted);
        }
        else if (this.value == "-1") {
            dateStart = new Date();
            dateStart.setDate(dateStart.getDate()- 1);
            dateEnd = new Date();
            loadData(dateStart, dateEnd);
            console.log(dataFormatted);
        }

    })
}




