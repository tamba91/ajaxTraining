onmessage = function (e) {
    var args = (e.data)
    var sum = 0;
    var min = +Infinity;
    var max = -Infinity;
    for (var i = 0; i < args.length; i++) {
        var n = parseFloat(args[i]);
        if (n < min) {
            min = n;
        }

        if (n > max) {
            max = n;
        }

        sum += n;
    }

    var values = {
        media: Number((sum / args.length).toFixed(1)),
        minTemp: min,
        maxTemp: max,
        exTerm: Number((max - min).toFixed(1))
    };
    postMessage(values);
}