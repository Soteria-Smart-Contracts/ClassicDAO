if(window.)


function setActive(id) {
    document.getElementById('menuone').className = "Minactive"; 
    document.getElementById('menutwo').className = "Minactive"; 
    document.getElementById('menutre').className = "Minactive"; 

    document.getElementById(id).className = "Mactive"; 
}