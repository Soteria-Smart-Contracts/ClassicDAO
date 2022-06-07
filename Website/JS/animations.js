if(window.location.href == "https://classicdao.one/dscrowdsale"){
    document.getElementById('menuone').className = "Mactive"; 
}
if(window.location.href == "https://classicdao.one/dsgovernance"){
    document.getElementById('menuone').className = "Mactive"; 
}
if(window.location.href == "https://classicdao.one/dscrowdsale"){
    document.getElementById('menuone').className = "Mactive"; 
}

function setActive(id) {
    document.getElementById('menuone').className = "Minactive"; 
    document.getElementById('menutwo').className = "Minactive"; 
    document.getElementById('menutre').className = "Minactive"; 

    document.getElementById(id).className = "Mactive"; 
}