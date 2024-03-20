async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    CurrentProposalInfo = await GetCurrentProposal();
    LoadDashboard();
    console.log(CurrentProposalInfo);
}

async function LoadDashboard() {
    document.getElementById("HeaderProposalID").innerText = (CurrentProposalInfo[2].ProposalID).toString();
    //HeaderProposer id
    document.getElementById("HeaderProposer").innerText = (CurrentProposalInfo[0].Proposer).substring(0, 7) + '...' + (CurrentProposalInfo[0].Proposer).substring(account.length - 3, CurrentProposalInfo[0].Proposer);
    //HeaderMemo found as memo in 2nd array of CurrentProposalInfo
    document.getElementById("ProposalMemo").innerText = (CurrentProposalInfo[1].Memo).split("//")[0];
    document.getElementById("desc").innerText = (CurrentProposalInfo[1].Memo).split("//")[1];
    document.getElementById("desc").innerHTML = document.getElementById("desc").innerHTML.replace((/&lt;&gt;/g), "<br><br>");
    //HeaderTimeLeft id found in 3rd array of CurrentProposalInfo as VoteEnds in unix time, convert to format as such (2 days 6 hours)
    document.getElementById("HeaderTimeLeft").innerText = timeLeft(CurrentProposalInfo[2].VoteEnds);
}

runCodeWhenLoggedIn();