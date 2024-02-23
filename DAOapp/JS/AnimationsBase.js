

async function GetHENS(){
    HENSname = await hens.js.getNameOfOwner(account)
    if(HENSname == ''){
        HENSname = "Connected"
    }

    console.log("If there is an error above, its normal and not a problem, try catch does not work for Metamask errors")
}