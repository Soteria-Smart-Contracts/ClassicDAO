let votechoice;

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
    document.getElementById("ProposalMemo").innerText = (CurrentProposalInfo[1].Memo).split("//")[0];
    document.getElementById("desc").innerText = (CurrentProposalInfo[1].Memo).split("//")[1];

    //if the vote start time is greater than the current time, the vote has not started yet, so disable the vote buttons at votebuttons id and write Proposal is in Debate Period in id votebuttonstext
    if (CurrentProposalInfo[2].VoteStarts > Math.floor(Date.now() / 1000)) {
        document.getElementById("votebuttons").style.display = "none";
        document.getElementById("votebuttonstext").innerText = "Proposal is in Debate Period";
    }

    //HeaderTimeLeft id found in 3rd array of CurrentProposalInfo as VoteEnds in unix time, convert to format as such (2 days 6 hours)
    document.getElementById("VoteEnds").innerText = ToDateAndTime(CurrentProposalInfo[2].VoteEnds);

    //there are yea and nay bars, the width of the bars are the percentage of the total votes, calculate the percentage of the total votes for each and set the width of the bars to that percentage. IDs are yeabar and naybar. do the calculations and the updating in the same line
    //start by getting all yae votes and nay votes, convert them from bigint wei to float using fromWei, then calculate the percentage of the total votes for each, then set the width of the bars to that percentage
    YEAvotes = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].YEAvotes, 'ether'));
    NAYvotes = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].NAYvotes, 'ether'));
    TotalVotes = YEAvotes + NAYvotes;
    document.getElementById("yeabar").style.width = (YEAvotes / TotalVotes) * 100 + "%";
    document.getElementById("naybar").style.width = (NAYvotes / TotalVotes) * 100 + "%";  

    //yeapercent and naypercent ids are the percentage of the total votes for each, set the text to the percentage of the total votes for each
    document.getElementById("yeapercent").innerText = ((YEAvotes / TotalVotes) * 100).toFixed(2);
    document.getElementById("naypercent").innerText = ((NAYvotes / TotalVotes) * 100).toFixed(2);

    //set the number of votes for and against in the yeavotes and nayvotes ids
    document.getElementById("yeavotes").innerText = YEAvotes.toFixed(2);
    document.getElementById("nayvotes").innerText = NAYvotes.toFixed(2);

    CLDtokenholdings = await CLDtoken.methods.balanceOf(account).call();
    document.getElementById("CLDtokenholdings").innerText = Number(web3.utils.fromWei(CLDtokenholdings, 'ether')).toFixed(2);
    //set max on rangeIncentive id to the number of tokens the user has
    document.getElementById("rangeIncentive").max = Number(web3.utils.fromWei(CLDtokenholdings, 'ether')).toFixed(2) - 0.0001;
}

async function CheckApproveVotingCLDContitional(){
    //see if the user has approved the voting contract, if they have not, approve the voting contract for 696969696969969696969696969696969669696 tokens
    let approved = await CLD.methods.allowance(account, DAOvoting._address).call();
    if(approved < 696969696969969696969696969696969669696){
        let gasEstimate = await CLD.methods.approve(DAOvoting._address, 696969696969969696969696969696969669696).estimateGas({ from: account });
        await CLD.methods.approve(DAOvoting._address, 696969696969969696969696969696969669696).send({ from: account, gas: gasEstimate });
    }
}

//set votingchoicedisplay id to the voting choice input true or false
async function SetVoteChoiceDisplay(choice){
    await CheckApproveVotingCLDContitional();
    //if the choice is true, set the votingchoicedisplay id to " Yea", else set it to " Nay"
    if(choice){
        document.getElementById("VoteChoiceDisplay").innerText = " Yea";
    }
    else{
        document.getElementById("VoteChoiceDisplay").innerText = " Nay";
    }

    votechoice = choice ? 0 : 1;
}

//submit vote witht the castVote function in the voting contract, the input is the votechoice, 0 for yea, 1 for nay, amount speficfied in id


//

runCodeWhenLoggedIn();