

// //set a countdown to genesiscountdown id, the unix start time is: 1709335406, in the format of X hours
// setInterval(function() {
//     var countDownDate = 1709381409 * 1000;
//     var now = new Date().getTime();

//     //if the countdown is over, display Voting on id PropStatus, and display Ongoing on genesiscountdown id
//     if (now > countDownDate) {
//         document.getElementById("PropStatus").innerHTML = "Voting";
//         document.getElementById("genesiscountdown").innerHTML = "Ongoing";
//     }
//     else{
//         var distance = countDownDate - now;
//         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
//         document.getElementById("genesiscountdown").innerHTML = "in " + hours + " hours ";
//     }
// });


//Load the proposal queue and the proposal details for each proposal in the queue. Here are the details needed: ID, Status, ProposalInfo.ProposalType, VotingInstanceID, VotingInstance.Status, VotingInstance.CLDtoIncentive
async function LoadProposals() {

    
    