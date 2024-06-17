

async function UpdateDetails(){
    await getCLDbal();
    await getFlexDeposited();
    await getUnclaimed();

    document.getElementById('flexbal').innerText = CLDbal;
    document.getElementById('flexdepo').innerText = FlexBal;
    document.getElementById('statdepo').innerText = FlexBal;
    document.getElementById('statunclaimed').innerText = Unclaimed;
}

function DiplayBox(type){
    document.getElementById('ConfirmLeft').style.display = "initial";
    if(type == 1){
        document.getElementById('InputLeftDeposit').style.display = "block";
    }
    if(type == 2){
        document.getElementById('InputLeftWithdraw').style.display = "block";
    }
}

function setMaxDeposit(){
    document.getElementById('depositinputleft').value = CLDbal;
}

function CloseBox(){
    document.getElementById('ConfirmLeft').style.display = "none";
    document.getElementById('InputLeftDeposit').style.display = "none";
    document.getElementById('InputLeftWithdraw').style.display = "none";
}

function ClearLeft(){
    document.getElementById('ROIleft').style.display = "none";
    document.getElementById('OptionsLeft').style.display = "none";
    document.getElementById('StatsLeft').style.display = "none";
}

function DisplayLeft(){
    document.getElementById('ROIleft').style.display = "initial";
    document.getElementById('OptionsLeft').style.display = "flex";
    document.getElementById('StatsLeft').style.display = "flex";
}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}