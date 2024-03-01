

//set a countdown to genesiscountdown id, the unix start time is: 1709335406
setInterval(function() {
    var countDownDate = 1709335406 * 1000;
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("genesiscountdown").innerText = days + "d";
}