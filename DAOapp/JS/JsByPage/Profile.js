
async function addFileToNode() {
    const node = await Ipfs.create()
    const results = await node.add('=^.^= meow meow')
    const cid = results[0].hash
    console.log('CID created via ipfs.add:', cid)
    const data = await node.cat(cid)
    console.log('Data read back via ipfs.cat:', new TextDecoder().decode(data))
}
