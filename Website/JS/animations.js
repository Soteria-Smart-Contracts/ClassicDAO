
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

async function UpdateDetails(num){
    await getMode();
    await getBalance();

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
        document.getElementById('salemode').innerText = 'Emergency Mode';
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
