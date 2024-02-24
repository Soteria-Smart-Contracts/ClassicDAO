async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    CurrentProposalInfo = await GetCurrentProposal();
    console.log(CurrentProposalInfo);
}

async function LoadDashboard() {
}

runCodeWhenLoggedIn();
