

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
    let CLDtoIncentive = [];
    for (let i = 0; i < ProposalQueue.length; i++) {
        CLDtoIncentive.push(await DAOvoting.methods.VotingInstances(ProposalQueue[i]).call());
    }
    CLDtoIncentive.sort(function (a, b) {
        return CLDtoIncentive.CLDtoIncentive[b] - CLDtoIncentive.CLDtoIncentive[a];
    });
    console.log(CLDtoIncentive);
    ProposalQueueList.innerHTML = "";
    for (let i = 0; i < CLDtoIncentive.length; i++) {
        let VotingInstance = await DAOvoting.methods.VotingInstances(ProposalQueue[i]).call();
        let ProposalInfo = await DAOcore.methods.ProposalInfos(ProposalQueue[i]).call();
        let Status = "Queued Up";
        let ProposalType = "Simple";
        if (ProposalInfo.ProposalType == 1) {
            ProposalType = "Eros";
        }
        let ProposalHTML = `
        <div style="display: flex; justify-content: space-between; padding: 20px; color: #fff; box-sizing: border-box;">
            <div style="flex: 1; text-align: center; align-items: center; font-size: 20px;">${i + 1}</div>
            <div style="flex: 1; text-align: center; align-items: center; font-size: 20px;">${ProposalInfo.Memo.substring(0, 15) + '...'}</div>
            <div style="flex: 1; text-align: center; align-items: center; font-size: 20px;">${web3.utils.fromWei(VotingInstance.CLDtoIncentive, 'ether')} CLD</div>
            <div style="flex: 1; text-align: center; align-items: center; font-size: 20px;">${ProposalQueue[i]}</div>
            <div style="flex: 1; text-align: center; align-items: center;">
                <button style="width: auto; background-color: #2908df; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 22px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" id="PropStatus" disabled>${Status}</button>
            </div>
            <div style="flex: 1; text-align: center; align-items: center;">
                <button style="width: auto; background-color: #ffffff; color: #000; border: 2px solid #000; padding: 0px 10px; border-radius: 10px; font-size: 22px; font-family: GTWalsheim2, regular; cursor: pointer; height: 30px;" disabled>${ProposalType}</button>
            </div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
                <a href="CurrentVote.html" style="text-decoration: none; color: inherit; outline: none;">
                <button class="view_more_button" style="background-color: #16ECD3;">View more</button>             
                </a>
        </div>
        `;
        ProposalQueueList.innerHTML += ProposalHTML;
    }
        
}
    