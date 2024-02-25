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
    document.getElementById("HeaderMemo").innerText = CurrentProposalInfo[1].Memo;
    //HeaderTimeLeft id found in 
}

runCodeWhenLoggedIn();
