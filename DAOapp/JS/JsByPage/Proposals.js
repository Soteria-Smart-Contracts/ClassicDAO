

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
    let ProposalQueue = await DAOvoting.methods.ProposalQueue().call();
    let ProposalQueueList = document.getElementById("ProposalQueueList");
    ProposalQueueList.innerHTML = "";
    for (let i = 0; i < ProposalQueue.length; i++) {
        let ProposalID = ProposalQueue[i];
        let ProposalInfo = await DAOvoting.methods.ProposalInfo(ProposalID).call();
        let VotingInstance = await DAOvoting.methods.VotingInstances(ProposalID).call();
        let ProposalType = ProposalInfo.ProposalType;
        let Status = VotingInstance.Status;
        let CLDtoIncentive = web3.utils.fromWei(VotingInstance.CLDtoIncentive, 'ether');
        let Proposal = document.createElement("div");
        Proposal.classList.add("Proposal");
        Proposal.innerHTML = `
        <div class="ProposalID">${ProposalID}</div>
        <div class="ProposalType">${ProposalType}</div>
        <div class="Status">${Status}</div>
        <div class="CLDtoIncentive">${CLDtoIncentive}</div>
        <div class="VotingInstanceID">${VotingInstance.VotingInstanceID}</div>
        <div class="VotingInstanceStatus">${Status}</div>
        <button class="VoteButton" onclick="Vote(${ProposalID})">Vote</button>
        `;
        ProposalQueueList.appendChild(Proposal);
    }
}
    