

//set a countdown to genesiscountdown id, the unix start time is: 1709335406, in the format of X hours
setInterval(function() {
    var countDownDate = 1709335406 * 1000;
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    document.getElementById("genesiscountdown").innerHTML = hours + " hours ";
});
