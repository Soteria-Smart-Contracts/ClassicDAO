

async function UpdateDetails{
    await getCLDbal;

    document.getElementById('totaldepo').innerText = CLDbal;
}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}