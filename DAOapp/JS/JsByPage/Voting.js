let votechoice;
let approved;
let Voters = [];

async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    CurrentProposalInfo = await GetCurrentProposal();
    LoadDashboard();
    console.log(CurrentProposalInfo);

    setInterval(function () {
        if (Math.floor(Date.now() / 1000) > CurrentProposalInfo[2].VoteEnds) {
            document.getElementById("VoteEnds").innerText = "Over";
        } else {
            document.getElementById("VoteEnds").innerText = timeLeft(CurrentProposalInfo[2].VoteEnds);
        }
        DetectVoterListChange();
    }, 1000);
}

async function LoadDashboard() {
    document.getElementById("id").innerText = (CurrentProposalInfo[2].ProposalID).toString();
    //HeaderProposer id
    document.getElementById("proposer").innerText = (CurrentProposalInfo[0].Proposer).substring(0, 7) + '...' + (CurrentProposalInfo[0].Proposer).substring(account.length - 3, CurrentProposalInfo[0].Proposer);
    //HeaderMemo found as memo in 2nd array of CurrentProposalInfo (under .Memo). the memo and the description are combined in the same field in the contract, so the the memo is the first part of the description, the description is the second part of the description. they are devided by a comma, so split the description by "//".
    document.getElementById("ProposalMemo").innerText = (CurrentProposalInfo[1].Memo).split("//")[0];
    document.getElementById("desc").innerText = (CurrentProposalInfo[1].Memo).split("//")[1];

    // for every (<>) in the description text, replace it with a line break
    document.getElementById("desc").innerHTML = document.getElementById("desc").innerHTML.replace((/&lt;&gt;/g), "<br><br>");
    //remove all brackets () from the description text
    document.getElementById("desc").innerHTML = document.getElementById("desc").innerHTML.replace((/[(]/g), "");
    document.getElementById("desc").innerHTML = document.getElementById("desc").innerHTML.replace((/[)]/g), "");
    console.log(document.getElementById("desc").innerHTML);

    //calculate the total incentive per vote, the total incentive per vote is the total incentive divided by the total votes, total incentive is CLDtoIncetive on  current proposal info 3rd array, total votes is TotalCLDVoted in 3rd array of CurrentProposalInfo
    TotalIncentive = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].CLDtoIncentive, 'ether')).toFixed(2);
    TotalIncentivePerVote = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].CLDtoIncentive, 'ether')) / parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].TotalCLDVoted, 'ether'));
    Uservotedbool = (await DAOvoting.methods.VoterInfo(CurrentProposalInfo[2].ProposalID, account).call()).VotesLocked > 0;
    //set the total incentive id to the total incentive
    document.getElementById("TotalIncentive").innerText = TotalIncentive;
    

    //if the vote start time is greater than the current time, the vote has not started yet, so disable the vote buttons at votebuttons id and write Proposal is in Debate Period in id votebuttonstext
    if (CurrentProposalInfo[2].VoteStarts > Math.floor(Date.now() / 1000)) {
        document.getElementById("votebuttons").style.display = "none";
        document.getElementById("votebuttonstext").innerText = "Proposal is in Debate Period";
    }
    //else if the vote end time is less than the current time, the vote has ended, so disable the vote buttons at votebuttons id and write Proposal has Ended in id votebuttonstext
    else if (CurrentProposalInfo[2].VoteEnds < Math.floor(Date.now() / 1000)) {
        document.getElementById("votebuttons").style.display = "none";
        document.getElementById("votebuttonstext").innerText = "Proposal has Ended";
        //display Begin Vote button for all users
        document.getElementById("BeginVote").style.display = "block";
    }


    //else if if the user has voted again (check with VoterInfo(user, proposalId)), disable the vote buttons at votebuttons id and write You have already voted in id votebuttonstext
    else if (Uservotedbool) {
        VotesLocked = web3.utils.fromWei((await DAOvoting.methods.VoterInfo(CurrentProposalInfo[2].ProposalID, account).call()).VotesLocked);
        console.log(VotesLocked);
        currentincentivereward = (VotesLocked) * TotalIncentivePerVote;
        ToFixedReward = parseFloat(currentincentivereward).toFixed(2);
        VotesLocked = parseFloat(VotesLocked).toFixed(2);
        document.getElementById("votebuttons").style.display = "none";
        document.getElementById("votebuttonstext").innerHTML = `You have already voted with ${VotesLocked} tokens<br><br>Your Current Incentive Reward: ` + ToFixedReward + " CLD";
        console.log("You have already voted");
    }
    //there are yea and nay bars, the width of the bars are the percentage of the total votes, calculate the percentage of the total votes for each and set the width of the bars to that percentage. IDs are yeabar and naybar. do the calculations and the updating in the same line
    //start by getting all yae votes and nay votes, convert them from bigint wei to float using fromWei, then calculate the percentage of the total votes for each, then set the width of the bars to that percentage
    YEAvotes = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].YEAvotes, 'ether'));
    NAYvotes = parseFloat(web3.utils.fromWei(CurrentProposalInfo[2].NAYvotes, 'ether'));
    TotalVotes = YEAvotes + NAYvotes;
    Quorum = parseFloat(web3.utils.fromWei(((BigInt(await DAOvoting.methods.Quorum().call()))).toString()));
    QuorumProgress = (TotalVotes / Quorum) * 100;
    if(QuorumProgress > 100){
        QuorumProgress = 100;
    }
    document.getElementById("Quorum").innerText = Quorum;
    document.getElementById("TotalVotes").innerText = TotalVotes.toFixed(2);
    document.getElementById("yeabar").style.width = (YEAvotes / TotalVotes) * 100 + "%";
    document.getElementById("naybar").style.width = (NAYvotes / TotalVotes) * 100 + "%";  
    document.getElementById("quorumbar").style.width = QuorumProgress + "%";

    LoadVoterList();

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

//create a load voter list function that will load the voter list, so that we only need to call the function to load the voter list, then another fucntion to detect changes in the voter list, so that we can call the load voter list function when the voter list changes
//load the voter list
async function LoadVoterList() {
    Voters = (await DAOvoting.methods.GetVotingInstance(CurrentProposalInfo[2].ProposalID).call()).Voters;
    document.getElementById("TotalVoters").innerText = Voters.length;
    document.getElementById("VoterList").innerHTML = "";
    var div = document.createElement("div");
    div.innerHTML = '<h1 id="votebuttonstext" style="font-size: 30px; margin-top: 0px; margin-bottom: 0px; font-family: GTWalsheim, bold; color: #fff;">Voters</h1> <hr style="border: 1px solid #fff; marginTop = "22px"; margin: 0;">';
    document.getElementById("VoterList").appendChild(div);


    VoterList = [];
    for (i = 0; i < Voters.length; i++) {
        VoterList.push({ "Voter": Voters[i], "Amount": parseFloat(web3.utils.fromWei((await DAOvoting.methods.VoterInfo(CurrentProposalInfo[2].ProposalID, Voters[i]).call()).VotesLocked, 'ether')).toFixed(2) });
    }
    VoterList.sort((a, b) => parseFloat(b.Amount) - parseFloat(a.Amount));
  for (i = 0; i < VoterList.length; i++) {
    var div = document.createElement("div");
    div.style.marginTop = "22px";
    var span = document.createElement("span");
    span.className = "address";
    span.style.width = "auto";
    span.style.backgroundColor = "#ffffff";
    span.style.marginBottom = "20px";
    span.style.color = "#000";
    span.style.border = "2px solid #000";
    span.style.padding = "5px 10px";
    span.style.borderRadius = "10px";
    span.style.fontSize = "20px";
    span.style.fontFamily = "GTWalsheim2, regular";
    span.style.cursor = "pointer";
    span.style.display = "flex";
    span.style.justifyContent = "center";
    span.style.alignItems = "center";
    span.style.lineHeight = "normal";
    userDisplay = await CheckHENS(VoterList[i].Voter);
    span.innerHTML = "<a target='_blank' href='https://etc.blockscout.com/address/" + VoterList[i].Voter + "' style='color: black; text-decoration: none;'>" + userDisplay + "</a> | " + VoterList[i].Amount + " CLD";
    div.appendChild(span);
    document.getElementById("VoterList").appendChild(div);
}
}

async function BeginVote() {
    //do the same user ui stuff as in the voting function
    let gasEstimate;
    try {
        gasEstimate = await DAOvoting.methods.BeginNextVote().estimateGas({ from: account });
    } catch (error) {
        console.error(error);
        alert("Transaction failed, No proposals in the queue!");
        return; // stop the rest of the code execution
    }
    await DAOvoting.methods.BeginNextVote().send({ from: account, gas: gasEstimate });
    location.reload();
}

//detect changes in the voter list
async function DetectVoterListChange() {
    NewVoters = (await DAOvoting.methods.GetVotingInstance(CurrentProposalInfo[2].ProposalID).call()).Voters;
    if (NewVoters.length != Voters.length) {
        LoadVoterList();
    }
}

async function CheckApproveVotingCLDContitional(){
    //see if the user has approved the voting contract, if they have not, approve the voting contract for 696969696969969696969696969696969669696 tokens
    approved = BigInt(await CLDtoken.methods.allowance(account, VotingAddress).call());

    if(approved == 0){
        gas = await CLDtoken.methods.approve(VotingAddress, BigInt(11579208923731619542357098500868790785326998466564056403945758400791312963993)).estimateGas({from: account});
        await CLDtoken.methods.approve(VotingAddress, BigInt(11579208923731619542357098500868790785326998466564056403945758400791312963993)).send({from: account, value: 0, gas: gas});
        approved = true;
    }
    else{
        approved = true;
        document.getElementById('voteoverlay').style.display = 'block';
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

    if(choice){
        votechoice = 0;
    }
    else{
        votechoice = 1;
    }
}

//submit vote witht the castVote function in the voting contract, the input is the votechoice, 0 for yea, 1 for nay, amount speficfied in id amountInput which you may need to convert to wei
async function SubmitVote(){
    //require the amountInput id to be greater than 0.01 ether
    if(document.getElementById("amountInput").value < 0.01){
        alert("You must vote with at least 0.01 CLD");
        return;
    }
    amount = web3.utils.toWei(document.getElementById("amountInput").value, 'ether');
    let gasEstimate = await DAOvoting.methods.CastVote(amount, votechoice).estimateGas({ from: account });
    TX = await DAOvoting.methods.CastVote(amount, votechoice).send({ from: account, gas: gasEstimate });
    transactionHash = TX.transactionHash;
    //loop and wait for the vote to be submitted, then reload the page
    //transaction send, alert the user that the vote has been submitted, with a link to the transaction on blockscout, 
    //then reload the page
    document.getElementById('voteoverlay').style.display = 'none';
    alert("Vote Submitted. The page will reload once the transaction is confirmed.");
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if ((await DAOvoting.methods.VoterInfo(CurrentProposalInfo[2].ProposalID, account).call()).CLDReturned > 0) {
            location.reload();
        }
    }
}


//

runCodeWhenLoggedIn();