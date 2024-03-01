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
    //HeaderMemo found as memo in 2nd array of CurrentProposalInfo (under .Memo). the memo and the description are combined in the same field in the contract, so the the memo is the first part of the description, the description is the second part of the description. they are devided by a comma, so split the description by "//".
    Memo = CurrentProposalInfo[0].Memo;
    Memo = Memo.split("//");
    console.log(Memo);
    // document.getElementById("memo").innerText = (CurrentProposalInfo[0].Memo).split("//")[0];
    // document.getElementById("description").innerText = (CurrentProposalInfo[0].Memo).split("//")[1];






    //HeaderTimeLeft id found in 3rd array of CurrentProposalInfo as VoteEnds in unix time, convert to format as such (2 days 6 hours)
    document.getElementById("VoteEnds").innerText = ToDateAndTime(CurrentProposalInfo[2].VoteEnds);

    //there are yea and nay bars, the width of the bars are the percentage of the total votes, calculate the percentage of the total votes for each and set the width of the bars to that percentage. IDs are yeabar and naybar. do the calculations and the updating in the same line
    let totalVotes = parseInt(CurrentProposalInfo[2].YEAvotes) + parseInt(CurrentProposalInfo[2].NAYvotes);
    document.getElementById("yeabar").style.width = (parseInt(CurrentProposalInfo[2].VotesFor) / totalVotes) * 100 + "%";
    document.getElementById("naybar").style.width = (parseInt(CurrentProposalInfo[2].VotesAgainst) / totalVotes) * 100 + "%";

    //set the number of votes for and against in the yeavotes and nayvotes ids
    document.getElementById("yeavotes").innerText = CurrentProposalInfo[2].YEAvotes;
    document.getElementById("nayvotes").innerText = CurrentProposalInfo[2].NAYvotes;
}

runCodeWhenLoggedIn();