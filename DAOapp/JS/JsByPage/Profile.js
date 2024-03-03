//push a list of all the users voted proposals to the page by calling the UserUnreturnedVotes function on the voting contract, then for each proposal ID call the Proposals function on the core contract to get the proposal details and status
//here is the html to push to the UserVotedProposalsList
//<div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
{/* <div style="flex: 1;">Create new des...</div>
<div style="flex: 1;">3241345241234</div>
<div style="flex: 1;">
    <button style="width: auto; background-color: #16ECD3; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>Active</button>
</div>
<div style="flex: 1;">12/27 17:00 ~ 01/06 17:00</div>
<div style="flex: 1; display: flex; justify-content: flex-end;">
    <a href="CurrentVoting.html" style="text-decoration: none; color: inherit; outline: none;">
    <button class="view_more_button">View more</button>             
    </a>
</div>
</div */}

async function GetVotedProposals(){
    let VotedProposals = await DAOvoting.methods.UserUnreturnedVotes(account).call();
    let VotedProposalsList = document.getElementById("UserVotedProposalsList");
    VotedProposalsList.innerHTML = "";
    for(let i = 0; i < VotedProposals.length; i++){
        let Proposal = await DAOcore.methods.Proposals(VotedProposals[i]).call();
        let ProposalStatus = await DAOvoting.methods.VotingInstances(VotedProposals[i]).call();
        VoteEnds = ProposalInfo.VoteEnds;
        //if the vote ends is lower than the current time, the proposal has ended
        TimeLeft = timeLeft(VoteEnds);
        //if vote ends is not 0, the proposal has either st
        let ProposalStatusText = "Active";
        if(ProposalStatus[0] == 1){
            ProposalStatusText = "Ended";
        }
        let ProposalHTML = `
        <div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
            <div style="flex: 1;">${Proposal[0]}</div>
            <div style="flex: 1;">${VotedProposals[i]}</div>
            <div style="flex: 1;">
                <button style="width: auto; background-color: #16ECD3; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>${ProposalStatusText}</button>
            </div>
            <div style="flex: 1;">${ProposalInfo[0]} ~ ${ProposalInfo[1]}</div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
                <a href="CurrentVoting.html" style="text-decoration: none; color: inherit; outline: none;">
                <button class="view_more_button">View more</button>             
                </a>
            </div>
        </div>
        `;
        VotedProposalsList.innerHTML += ProposalHTML;
    }
}