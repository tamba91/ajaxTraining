var xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var res = JSON.parse(this.responseText);
        for (var i = 0; i < res.length; i++) {
            if (res[i].idsensore == 9938) {
                document.getElementById("target").innerHTML = "temperatura: " + res[i].valore + "<br>" + "data e ora: " + res[i].data;
            }

        }
    }
}

xhr.open("GET", "https://www.dati.lombardia.it/resource/647i-nhxk.json", true);

xhr.send();