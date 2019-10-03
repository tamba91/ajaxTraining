var xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var res = JSON.parse(this.responseText);
        console.log(res[0]);
    }
}

xhr.open("GET", "https://www.dati.lombardia.it/resource/nicp-bhqi.json");

xhr.send();