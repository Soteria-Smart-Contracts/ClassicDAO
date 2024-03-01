async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    CurrentProposalInfo = await GetCurrentProposal();
    LoadDashboard();
    console.log(CurrentProposalInfo);
}

async function LoadDashboard() {
    document.getElementById("id").innerText = (CurrentProposalInfo[2].ProposalID).toString();
    //HeaderProposer id
    document.getElementById("proposer").innerText = (CurrentProposalInfo[0].Proposer).substring(0, 7) + '...' + (CurrentProposalInfo[0].Proposer).substring(account.length - 3, CurrentProposalInfo[0].Proposer);
    //HeaderMemo found as memo in 2nd array of CurrentProposalInfo
    document.getElementById("ProposalMemo").innerText = CurrentProposalInfo[1].Memo;
    //HeaderTimeLeft id found in 3rd array of CurrentProposalInfo as VoteEnds in unix time, convert to format as such (2 days 6 hours)
    document.getElementById("VoteEnds").innerText = ToDateAndTime(CurrentProposalInfo[2].VoteEnds);

    //there are yea and nay bars, the width of the bars are the percentage of the total votes, calculate the percentage of the total votes for each and set the width of the bars to that percentage. IDs are yeabar and naybar
    let totalVotes = parseInt(CurrentProposalInfo[2].VotesFor) + parseInt(CurrentProposalInfo[2].VotesAgainst);
    let yeaPercent = (parseInt(CurrentProposalInfo[2].VotesFor) / totalVotes) * 100;
    let nayPercent = (parseInt(CurrentProposalInfo[2].VotesAgainst) / totalVotes) * 100;
    document.getElementById("yeabar").style.width = yeaPercent + "%";
    document.getElementById("naybar").style.width = nayPercent + "%";
}

runCodeWhenLoggedIn();