
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

function setInterface(type){
    if (type == "none"){
        document.getElementById('f1').style.display = "initial";
        document.getElementById('f2').style.display = "initial";
        document.getElementById('interface').style.backgroundColor = "initial";
    }
    if (type == "deposit"){
        document.getElementById('interface').style.backgroundColor = "black";
        document.getElementById('f1').style.display = "none";
        document.getElementById('f2').style.display = "none";
    }
    if (type == "withdraw"){
        document.getElementById('interface').style.backgroundColor = "black";
        document.getElementById('f1').style.display = "none";
        document.getElementById('f2').style.display = "none";
    }
}

async function UpdateDetails(){
    await getMode();
    await getBalance();
    await getETCDeposited();

    document.getElementById('bal').innerText = balance;
    document.getElementById('dep').innerText = deposited;

    if (mode[0] == 1){
    document.getElementById('salemode').innerText = 'Not Started';
    }
    else if (mode[0] == 2){
        document.getElementById('salemode').innerText = 'Sale In Progress';
    }
    else if (mode[0] == 3){
    document.getElementById('salemode').innerText = 'Completed';
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
