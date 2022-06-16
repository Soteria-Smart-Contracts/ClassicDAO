
document.getElementById('Welcome').style.display = "none";
document.getElementById('DAO').style.display = "none";
document.getElementById('Staking').style.display = "none";
document.body.style.overflow = "hidden";


function setActive(id) {
    document.getElementById('menuone').className = "Minactive"; 
    document.getElementById('menutwo').className = "Minactive"; 
    document.getElementById('menutre').className = "Minactive"; 

    document.getElementById(id).className = "Mactive"; 
}

function setMaxDeposit(){
    document.getElementById('depositinput').value = (balance - 0.01);
}


function setMaxWithdraw(){
    document.getElementById('withdrawinput').value = deposited;
}

function setInterface(type){
    if (type == "none"){
        document.getElementById('f1').style.display = "inline-block";
        document.getElementById('f2').style.display = "inline-block";
        document.getElementById('closebutton').style.display = "none";
        document.getElementById('ideposit').style.display = "none";
        document.getElementById('iwithdraw').style.display = "none";
        document.getElementById('functionality').style.backgroundColor = "#494949";
    }
    if (type == "deposit"){
        document.getElementById('functionality').style.backgroundColor = "#000000";
        document.getElementById('f1').style.display = "none";
        document.getElementById('f2').style.display = "none";
        document.getElementById('ideposit').style.display = "initial";
        document.getElementById('closebutton').style.display = "initial";
    }
    if (type == "withdraw"){
        document.getElementById('functionality').style.backgroundColor = "#000000";
        document.getElementById('f1').style.display = "none";
        document.getElementById('f2').style.display = "none";
        document.getElementById('iwithdraw').style.display = "initial";
        document.getElementById('closebutton').style.display = "initial";
    }
}

async function UpdateDetails(){
    await getMode();
    await getBalance();
    await getETCDeposited();
    await getTotalDeposited();
    await getExchangeRate();
    let unclaimed = (deposited * exchangerate);

    document.getElementById('bal').innerText = balance;
    document.getElementById('dep').innerText = deposited;
    document.getElementById('totaldepo').innerText = totaldeposited;
    document.getElementById('exrate').innerText = exchangerate;

    if (mode[0] == 1){
    document.getElementById('salemode').innerText = 'Not Started';
    }
    else if (mode[0] == 2){
    document.getElementById('salemode').innerText = 'Sale In Progress';
    }
    else if (mode[0] == 3){
    document.getElementById('salemode').innerText = 'Completed';
    document.getElementById('unc').innerText = unclaimed;
    document.getElementById('bal1').style.display = "none";
    document.getElementById('bal2').style.display = "inline-block";
    document.getElementById('functionality').style.display = "inline-block";
    document.getElementById('functionality2').style.display = "inline-block";
    }
    else if (mode[0] == 99){
        document.getElementById('salemode').innerText = 'Emergency Mode';
    }
    else{
        document.getElementById('salemode').innerText = 'ERROR';
    }
}

function ChangeTab(id, newtab){
    setActive(id);

    document.getElementById('Welcome').style.display = "none";
    document.getElementById('Crowdsale').style.display = "none";
    document.getElementById('DAO').style.display = "none";
    document.getElementById('Staking').style.display = "none";

    document.getElementById(newtab).style.display = "initial";
}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}

function WelcomePage(){
    document.getElementById('menuone').className = "Minactive"; 
    document.getElementById('menutwo').className = "Minactive"; 
    document.getElementById('menutre').className = "Minactive"; 
    
    document.getElementById('Crowdsale').style.display = "none";
    document.getElementById('DAO').style.display = "none";
    document.getElementById('Staking').style.display = "none";

    document.getElementById('Welcome').style.display = "initial";
}
