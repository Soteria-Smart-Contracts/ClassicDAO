

// //set a countdown to genesiscountdown id, the unix start time is: 1709335406, in the format of X hours
// <div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
// <div style="flex: 1;">QueuePosition</div>
// <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">Memo</div>
// <div style="flex: 1;">ID</div>
// <div style="flex: 1;">
//     <button style="width: auto; background-color: #2908df; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" id="PropStatus" disabled>Status</button>
// </div>
// <div style="flex: 1;">
//     <button style="width: auto; background-color: #ffffff; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>TYPE (SIMPLE OR EROS)</button>
// </div>
// <div style="flex: 1; display: flex; justify-content: flex-end;">
//     <a href="CurrentVote.html" style="text-decoration: none; color: inherit; outline: none;">
//     <button class="view_more_button" style="background-color: #16ECD3;">View more</button>             
//     </a>
// </div>
// </div>

//new table code html
//<div style="display: flex; justify-content: space-between; padding: 20px; color: #fff; box-sizing: border-box;">
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">QueuePosition</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">Memo</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">Incentive</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">ID</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">Status</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;">Type</div>
    // <div style="flex: 1; font-family: GTWalsheim, bold; font-weight:700;"></div>
    // </div>

runCodeWhenLoggedIn();
let CLDtoIncentive = [];

//simple proposal types are a subset of simple proposals, with the following types, starting from 0 to 16, the types are as follows: 
// enum SimpleProposalTypes{
//     NotApplicable,
//     AssetSend,
//     AssetRegister,
//     ChangeRegisteredAssetLimit,
//     TreasuryReplacement,
//     VotingReplacement,
//     SaleFactoryReplacement,
//     CoreReplacement,
//     StartPublicSale,
//     ChangeProposalCost,
//     ChangeSaleRetractFee,
//     ChangeSaleMinimumDeposit,
//     ChangeSaleDefaultSaleLength,
//     ChangeSaleMaxSalePercent,
//     ChangeDefaultQuorum,
//     ChangeVotingLength,
//     ChangeVotingCuts
// }

async function ProposalTypeToString(type) {
    type = Number(type);
    switch (type) {
        case 0:
            return "Not Applicable";
        case 1:
            return "Asset Send";
        case 2:
            return "Asset Register";
        case 3:
            return "Change Registered Asset Limit";
        case 4:
            return "Treasury Replacement";
        case 5:
            return "Voting Replacement";
        case 6:
            return "Sale Factory Replacement";
        case 7:
            return "Core Replacement";
        case 8:
            return "Start Public Sale";
        case 9:
            return "Change Proposal Cost";
        case 10:
            return "Change Sale Retract Fee";
        case 11:
            return "Change Sale Minimum Deposit";
        case 12:
            return "Change Sale Default Sale Length";
        case 13:
            return "Change Sale Max Sale Percent";
        case 14:
            return "Change Default Quorum";
        case 15:
            return "Change Voting Length";
        case 16:
            return "Change Voting Cuts";
    }
}


async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

    LoadProposals();
    console.log("Logged in");
}

//Load the proposal queue and the proposal details for each proposal in the queue. Here are the details needed: ID, Status, ProposalInfo.ProposalType, VotingInstanceID, VotingInstance.Status, VotingInstance.CLDtoIncentive
async function LoadProposals() {
    let ProposalQueue = await DAOvoting.methods.GetVotingQueue().call();
    let ProposalQueueList = document.getElementById("ProposalQueueList");
    //sort the voting queue by the CLDtoIncentive, the highest CLDtoIncentive will be first, start by getting the CLDtoIncentive of all proposals in the queue
    for (let i = 0; i < ProposalQueue.length; i++) {
        CLDtoIncentive.push(await DAOvoting.methods.VotingInstances(ProposalQueue[i]).call());
    }
    console.log(CLDtoIncentive);
    //sort the CLDtoIncentive array by the CLDtoIncentive, the highest CLDtoIncentive will be first
    CLDtoIncentive.sort((a, b) => (a.CLDtoIncentive < b.CLDtoIncentive) ? 1 : -1);
    console.log(CLDtoIncentive);
    ProposalQueueList.innerHTML = "";
    for (let i = 0; i < CLDtoIncentive.length; i++) {
        console.log(CLDtoIncentive[i][0]);

        let VotingInstance = await DAOvoting.methods.VotingInstances(Number(CLDtoIncentive[i][0])).call();
        let ProposalInfo = await DAOcore.methods.ProposalInfos(Number(CLDtoIncentive[i][0])).call();
        let Status = "Queued Up";
        console.log(VotingInstance.ProposalID);
        //if the votestart is higher than the current time, the proposal is still in grace period, so set the status to Grace Period
        if (VotingInstance.VoteStart > Math.floor(Date.now() / 1000)) {
            Status = "Grace Period";
        }
        let ProposalType = "Simple";
        if (ProposalInfo.ProposalType == 1) {
            ProposalType = "Eros";
        }
        let ProposalHTML = `
        <div style="display: flex; justify-content: space-between; align-items:center; padding: 16px 20px; border-bottom:1.81818px solid rgb(255, 255, 255); font-size:16px; color:rgb(255, 255, 255); box-sizing: border-box;">
            <div style="flex: 1;">${i + 1}</div>
            <div style="flex: 1;">${await ProposalTypeToString(ProposalInfo.SimpleType)}</div>
            <div style="flex: 1;">${web3.utils.fromWei(VotingInstance.CLDtoIncentive, 'ether')} CLD</div>
            <div style="flex: 1;">${ProposalQueue[i]}</div>
            <div style="flex: 1;">
                <button style="width: auto; background-color: #ffffff; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" id="PropStatus" disabled>${Status}</button>
            </div>
            <div style="flex: 1;">
                <button style="width: auto; background-color: #ffffff; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 18px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>${ProposalType}</button>
            </div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
                <a href="CurrentVote.html" style="text-decoration: none; color: inherit; outline: none;">
                <button class="view_more_button" style="background-color: #16ECD3; font-size: 18px;">View more</button>             
                </a>
        </div>
        </div>
        `;
        ProposalQueueList.innerHTML += ProposalHTML;
    }
        
}
    