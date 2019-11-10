onmessage = function(e){
    var args = (e.data)
    var sum = 0;
    for(var i = 0; i<args.length; i++){
        
        var parsed = parseInt(args[i]);
        console.log(args[i]);
        sum += parsed;
    }
    console.log(sum);
    console.log(args.length);
    console.log(sum/args.length);
}