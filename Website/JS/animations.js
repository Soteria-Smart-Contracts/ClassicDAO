
function setActive(id) {
    document.getElementById('menuone').className = "Mactive"; 
    document.getElementById('menutwo').className = "Mactive"; 
    document.getElementById('menutre').className = "Mactive"; 

    document.getElementById(id).className = "Mactive"; 
}