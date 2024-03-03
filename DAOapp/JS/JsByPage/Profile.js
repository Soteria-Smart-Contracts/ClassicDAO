
async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

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
                Proposal = GetProposalIDfromUnreturnedVotes(i);
            } catch (error) {
                console.error(error);
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
        if (IsOver) {
            ProposalStatus = "Over";
            TimeLeft = "Over";
        } else {
            ProposalStatus = "Voting";
            TimeLeft = timeLeft(VoteEnds);
        }
        let ProposalHTML = `
        <div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
            <div style="flex: 1;">${VotedProposals[i]}</div>
            <div style="flex: 1;">${VotedProposals[i]}</div>
            <div style="flex: 1;">
                <button style="width: auto; background-color: #16ECD3; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>${ProposalStatus}</button>
            </div>
            <div style="flex: 1;">${TimeLeft}</div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
                <a href="CurrentVoting.html" style="text-decoration: none; color: inherit; outline: none;">
                <button class="view_more_button">View more</button>             
                </a>
            </div>
        </div>
        `;
        document.getElementById("UserVotedProposalsList").innerHTML += ProposalHTML;
    }
}
runCodeWhenLoggedIn();