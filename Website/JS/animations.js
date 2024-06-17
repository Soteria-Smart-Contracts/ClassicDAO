document.getElementById('Welcome').style.display = "none";
document.getElementById('DAO').style.display = "none";
document.getElementById('Staking').style.display = "none";
document.body.style.overflow = "hidden";


function setActive(id) {
    document.getElementById('menuone').className = "Minactive"; 
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
        document.getElementById('closebutton').style.display = "none";
        document.getElementById('ideposit').style.display = "none";
        document.getElementById('functionality').style.backgroundColor = "#494949";
    }
    if (type == "deposit"){
        document.getElementById('functionality').style.backgroundColor = "#000000";
        document.getElementById('f1').style.display = "none";
        document.getElementById('ideposit').style.display = "initial";
        document.getElementById('closebutton').style.display = "initial";
    }
    if (type == "withdraw"){
        document.getElementById('functionality').style.backgroundColor = "#000000";
        document.getElementById('f1').style.display = "none";
        document.getElementById('iwithdraw').style.display = "initial";
        document.getElementById('closebutton').style.display = "initial";
    }
}

async function UpdateDetails(){
    await getBalance();
    await GetCLDleft();

    document.getElementById('totaldepo').innerText = totaldeposited;
    document.getElementById('bal').innerText = balance;
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

