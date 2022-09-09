

async function UpdateDetails{
    
    document.getElementById('totaldepo').innerText = totaldeposited;

}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}