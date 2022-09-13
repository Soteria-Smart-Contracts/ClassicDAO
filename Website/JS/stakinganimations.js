

async function UpdateDetails(){
    await getCLDbal();
    await getFlexDeposited();
    await getUnclaimed();
    await getEstimated();
    await getActiveLocks();
    await CheckPresaleUser();

    document.getElementById('flexbal').innerText = CLDbal;
    document.getElementById('Lockbal').innerText = CLDbal;
    document.getElementById('LockActive').innerText = (ActiveLocks + " / 3");
    document.getElementById('flexdepo').innerText = FlexBal;
    document.getElementById('statdepo').innerText = FlexBal;
    document.getElementById('statunclaimed').innerText = Unclaimed;
    document.getElementById('expected').innerText = Estimated;

    if(PreSaleUser == true){
        document.getElementById('30dp').innerText = "3";
        document.getElementById('90dp').innerText = "11";
        document.getElementById('180dp').innerText = "25";
        document.getElementById('365dp').innerText = "63";
        document.getElementById('ROIleft').innerText = "Fixed" + "30%" "return in CLD per annum";
    }
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
        document.getElementById('Input30').style.display = "block";
    }
    if(type == 2){
        document.getElementById('Input90').style.display = "block";
    }
    if(type == 3){
        document.getElementById('Input180').style.display = "block";
    }
    if(type == 4){
        document.getElementById('Input365').style.display = "block";
    }
}

function DisplayInstance(number){
    document.getElementById('ViewLock').style.display = "initial";
}

function CloseViewBox(){
    document.getElementById('ViewLock').style.display = "none";
}

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
    document.getElementById('Input30').style.display = "none";
    document.getElementById('Input90').style.display = "none";
    document.getElementById('Input180').style.display = "none";
    document.getElementById('Input365').style.display = "none";

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