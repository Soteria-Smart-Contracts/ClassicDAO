
async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

    CurrentProposalInfo = await GetCurrentProposal();
    GetVotedProposals();
    console.log("Logged in");
}

//get proposal details and votting instance by id
async function GetProposalInfo(ProposalID){
    let ProposalStatus = await DAOvoting.methods.VotingInstances(ProposalID).call();
    return(ProposalStatus);
}

async function GetProposalIDfromUnreturnedVotes(index){
    let ProposalID = await DAOvoting.methods.UserUnreturnedVotes(account, index).call();
    return(ProposalID);
}


async function GetVotedProposals(){
    let VotedProposals = [];
    //loop through the first 10 proposals and push them to the VotedProposals array
    for(let i = 0; i < 10; i++){
            let Proposal;
            try {
                Proposal = Number(await GetProposalIDfromUnreturnedVotes(i));
            } catch (error) {
                console.log("Error above is normal")
                break;
            }
            VotedProposals.push(Proposal); 
        }

    UserVotedProposalsList.innerHTML = "";
    for(let i = 0; i < VotedProposals.length; i++){
        VotingInstances = await GetProposalInfo(VotedProposals[i]);
        VoteEnds = VotingInstances.VoteEnds;
        //if the vote ends is lower than the current time, the proposal has ended, so set the status to Ended, and set the time left to Over
        IsOver = VoteEnds < Math.floor(Date.now() / 1000);
        VoterInfo = await DAOvoting.methods.VoterInfo(VotedProposals[i], account).call();
        if (IsOver) {
            ProposalStatus = "Over";
            TimeLeft = "Over";
            IsOver = "flex";
        } else {
            ProposalStatus = "Voting";
            TimeLeft = timeLeft(VoteEnds);
            IsOver = "none";
        }
        ID = VotedProposals[i];
        //check if the ongoing proposal ID is the same as the proposal ID, if it is, set the status to Awaiting next proposal
        if (VotedProposals[i] == OngoingProposalID) {
            ProposalStatus = "Over";
            TimeLeft = "Awaiting next proposal";
            AmountButton = (web3.utils.fromWei(VoterInfo.VotesLocked);
            Onclick = "";
        } else {
            NextProposalStarted = "";
            AmountButton = "Claim";
            Onclick = "ClaimInstance(" + VotedProposals[i] + ")";
        }
        let ProposalHTML = `
        <div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
            <div style="flex: 1;">${VotedProposals[i]}</div>
            <div style="flex: 1;">
                <button style="width: auto; background-color: #16ECD3; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>${ProposalStatus}</button>
            </div>
            <div style="flex: 1;">${TimeLeft}</div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
                <a id="${ID}" onclick="${Onclick}" style="text-decoration: none; color: inherit; outline: none;">
                <button class="view_more_button">${AmountButton}</button>             
                </a>
            </div>
        </div>
        `;
        document.getElementById("UserVotedProposalsList").innerHTML += ProposalHTML;
    }
}
runCodeWhenLoggedIn();

async function ClaimInstance(ProposalID){
    //ReturnTokens ON THE DAOvoting contract, estimate the gas and send the transaction
    alert("Transaction sent, please wait for it to be mined, page will refresh when complete.");
    let gas = await DAOvoting.methods.ReturnTokens(ProposalID).estimateGas({from: account});
    await DAOvoting.methods.ReturnTokens(ProposalID).send({from: account, gas: gas});

    //refresh the page
    location.reload();
    console.log(ProposalID);
}