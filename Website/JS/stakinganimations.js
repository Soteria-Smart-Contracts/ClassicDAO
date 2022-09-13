

async function UpdateDetails(){
    await getCLDbal();
    await getFlexDeposited();
    await getUnclaimed();
    await getEstimated();
    await getActiveLocks();

    document.getElementById('flexbal').innerText = CLDbal;
    document.getElementById('Lockbal').innerText = CLDbal;
    document.getElementById('LockActive').innerText = (ActiveLocks + " / 3");
    document.getElementById('flexdepo').innerText = FlexBal;
    document.getElementById('statdepo').innerText = FlexBal;
    document.getElementById('statunclaimed').innerText = Unclaimed;
    document.getElementById('expected').innerText = Estimated;
}

function DiplayBoxLeft(type){
    document.getElementById('ConfirmLeft').style.display = "initial";
    if(type == 1){
        document.getElementById('InputLeftDeposit').style.display = "block";
    }
    if(type == 2){
        document.getElementById('InputLeftWithdraw').style.display = "block";
    }
}

function DiplayBoxRight(type){
    document.getElementById('ConfirmRight').style.display = "initial";
    if(type == 1){
        
    }
    if(type == 2){
        
    }
    if(type == 3){
        
    }
    if(type == 4){
        
    }
}

function DisplayInstance(t)

function setMaxDepositLeft(){
    document.getElementById('depositinputleft').value = (CLDbal - 0.01).toFixed(2);
}

function setMaxWithdrawLeft(){
    document.getElementById('withdrawinputleft').value = (FlexBal - 0.01).toFixed(2);
}

function CloseBoxLeft(){
    document.getElementById('ConfirmLeft').style.display = "none";
    document.getElementById('InputLeftDeposit').style.display = "none";
    document.getElementById('InputLeftWithdraw').style.display = "none";
}

function CloseBoxRight(){
    document.getElementById('ConfirmRight').style.display = "none";
}

function ClearLeft(){
    document.getElementById('ROIleft').style.display = "none";
    document.getElementById('OptionsLeft').style.display = "none";
    document.getElementById('StatsLeft').style.display = "none";
}

function ClearRight(){
    document.getElementById('Instances').style.display = "none";
    document.getElementById('Lock').style.display = "none";
}

function DisplayLeft(){
    document.getElementById('ROIleft').style.display = "initial";
    document.getElementById('OptionsLeft').style.display = "flex";
    document.getElementById('StatsLeft').style.display = "flex";
}

function DisplayRight(){
    document.getElementById('Lock').style.display = "initial";
    document.getElementById('Instances').style.display = "flex";
}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}