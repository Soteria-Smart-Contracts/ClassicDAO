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
    //HeaderTimeLeft id found in 3rd array of CurrentProposalInfo as VoteEnds in unix time, convert to format as such (2 days 6 hours)
    document.getElementById("HeaderTimeLeft").innerText = timeLeft(CurrentProposalInfo[2].VoteEnds);
}

runCodeWhenLoggedIn();

function timeLeft(unixTime) {
    let timeLeft = unixTime - Math.floor(Date.now() / 1000);
    let days = Math.floor(timeLeft / (24 * 60 * 60));
    timeLeft -= days * 24 * 60 * 60;
    let hours = Math.floor(timeLeft / (60 * 60));
    timeLeft -= hours * 60 * 60;
    let minutes = Math.floor(timeLeft / 60);
    return days + " days " + hours + " hours";
}