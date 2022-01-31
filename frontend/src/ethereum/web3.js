import Web3 from 'web3'

const getData = async () => {
    const web3 = new Web3(window.web3.currentProvider)
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    console.log("getData: network", network);
    console.log("getData: accounts", accounts);

    return web3
}

getData()

export const web3 = new Web3(window.web3.currentProvider)