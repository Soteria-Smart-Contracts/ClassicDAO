
async function addFileToNode() {
    const node = await Ipfs.create()
    const results = await node.add('ClassicDAO is the best DAO')
    const cid = results[0].hash
    console.log('CID created via ipfs.add:', cid)
    const data = await node.cat(cid)
    console.log('Data read back via ipfs.cat:', new TextDecoder().decode(data))
}
