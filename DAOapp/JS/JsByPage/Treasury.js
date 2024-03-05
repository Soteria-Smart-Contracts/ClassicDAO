//TreasuryCLD Balance and TreasuryETC balance set ids
async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

    
    console.log("Logged in");
}

runCodeWhenLoggedIn();