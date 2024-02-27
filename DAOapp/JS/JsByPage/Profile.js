
async function addFileToNode() {
    const node = await Ipfs.create()
    console.log('IPFS node is ready')
    console.log(node)
}