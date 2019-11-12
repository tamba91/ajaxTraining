onmessage = function (e) {
    var args = (e.data)
    var sum = 0;
    var min = +Infinity;
    var max = -Infinity;
    for (var i = 0; i < args.length; i++) {
        if(args[i]<min){
            min = args[i];
        }

        if(args[i]>max){
            max = args[i];
        }

        sum += parseFloat(args[i]);
    }
    console.log(sum / args.length);
    console.log(min);
    console.log(max);
}