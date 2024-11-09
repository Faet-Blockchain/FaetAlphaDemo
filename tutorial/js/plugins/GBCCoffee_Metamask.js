/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc Created by coffee_chan of Fiverr on comission of Faet Studios. NFT-based portions and comments added by Faet Studios.
 * 
 * @param requireWalletConnectOnTitle
 * @text Require wallet connect on title
 * @desc When true, connect wallet button appears before Window_TitleCommand
 * @type boolean
 * @default true
 * 
 * @param autoConnectPreviousWallet
 * @text Auto connect previous connected wallet
 * @desc When true, auto connects previously connected wallet(s). Only works if requireWallectConnectOnTitle is true.
 * @type boolean
 * @default true
 * 
 * @param accountsChangedEval
 * @text On Accounts changed eval
 * @desc Code to run when connected wallet changes
 * @type note
 * 
 * @param chainChangedEval
 * @text On Chain changed eval
 * @desc Code to run when metamask chain changes
 * @type note
 * 
 * @param disconnectEval
 * @text On disconnect eval
 * @desc Code to run when wallet disconnects
 * @type note
 * 
 * @param accountsChangedCE
 * @text On Accounts changed common event
 * @desc Common event to run when connected wallet changes
 * @type Number
 * 
 * @param chainChangedCE
 * @text On Chain changed common event
 * @desc Common event to run when metamask chain changes
 * @type Number
 * 
 * @param disconnectCE
 * @text On disconnect common event
 * @desc Common event to run when wallet disconnects
 * @type Number
 * 
 * @command getWalletAddress
 * @text Get active wallet address
 * @desc Get active connected wallet address
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the value to this variable
 * 
 * @command personalSign
 * @text Personal sign
 * @desc Signs a message using the active wallet, and returns a signed response
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg message
 * @type text
 * @text Message
 * @desc Message to sign
 * 
 * @command getTokenBalance
 * @text Get token balance
 * @desc Get the token balance for an address
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg walletAddress
 * @type text
 * @text Address
 * @desc Get token balance for this address. Leave blank to query current active wallet.
 * 
 * @arg tokenContractAddress
 * @type text
 * @text Token contract address
 * @desc Contract address of the token to query
 * 
 * @arg tokenId
 * @type text
 * @text Token id
 * @desc (Optional parameter) Id of the token. For querying ERC-1155 tokens, make sure to define this one.
 * 
 * @command getUserEthBalance
 * @text Get eth balance
 * @desc Get eth balance for active address
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @command sendTransaction
 * @text Send transaction
 * @desc Call smart contract methods and send tx
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg contractAddress
 * @type text
 * @text Contract/Receive Address
 * @desc Contract address of the smart contract to call, or the Receiving Address
 * 
 * @arg contractAbi
 * @type note
 * @text Contract abi
 * @desc Application binary interface of the smart contract
 * 
 * @arg methodName
 * @type text
 * @text Method name
 * @desc Name of the smart contract's method to call
 * 
 * @arg methodParams
 * @type text
 * @text Method params
 * @desc Parameters of the smart contract's method to call. Use an array like so: [param1, param2, etc.]
 * 
 * @arg gasLimit
 * @type Number
 * @text Gas limit
 * @desc Leave blank to let Metamask decide the best one
 * 
 * @arg gasPrice
 * @type Number
 * @text Gas price
 * @desc Gas price in gwei. Leave blank to let Metmask decide the est one
 * 
 * @command fetchUserNFTs721a
 * @text Fetch User NFTs (721a)
 * @desc Fetches NFTs owned by the user within a specified range of token IDs.
 *
 * @arg contractAddress
 * @type text
 * @text Contract Address
 * @desc The contract address of the NFT.
 *
 * @arg contractAbi
 * @type note
 * @text Contract ABI
 * @desc The Application Binary Interface (ABI) of the NFT contract.
 *
 * @arg variableId
 * @type variable
 * @text Variable ID
 * @desc The ID of the game variable where the result will be stored.
 *
 * @arg startRange
 * @type number
 * @text Start Range
 * @desc The starting token ID for the range to query.
 * @default 0
 *
 * @arg endRange
 * @type number
 * @text End Range
 * @desc The ending token ID for the range to query (exclusive).
 * @default 1000
 * 
 * @command getOwnedNfts
 * @text Fetch User NFTs
 * @desc Fetches NFTs owned by the user within a specified range of token IDs.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg walletAddress
 * @type text
 * @text Address
 * @desc Get token balance for this address. Leave blank to query current active wallet.
 * 
 * @arg tokenContractAddress
 * @type text
 * @text Token contract address
 * @desc Contract address of the token to query
 * 
 * @arg startRange
 * @type number
 * @text Start Range
 * @desc The starting token ID for the range to query.
 * @default 0
 *
 * @arg endRange
 * @type number
 * @text End Range
 * @desc The ending token ID for the range to query (exclusive).
 * @default 1000
 * 
 * @command getTokenUri
 * @text Get token uri
 * @desc Get the uri of a token.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg tokenContractAddress
 * @type text
 * @text Token contract address
 * @desc Contract address of the token to query
 * 
 * @arg tokenId
 * @type Number
 * @text Token id
 * @desc Token id
 * 
 * @command getTokenMetadata
 * @text Get token metadata
 * @desc Get the metadata of a token.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg tokenContractAddress
 * @type text
 * @text Token contract address
 * @desc Contract address of the token to query
 * 
 * @arg tokenId
 * @type Number
 * @text Token id
 * @desc Token id
 * 
 * @command transferEth
 * @text Transfer ETH
 * @desc Transfer eth.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg toAddress
 * @type text
 * @text To address
 * @desc Transfer the token to this address.
 * 
 * @arg amount
 * @type Number
 * @text Amount
 * @desc Amount of tokens to transfer.
 * 
 * @arg gasPrice
 * @type Number
 * @text Gas price
 * @desc Gas price in gwei. Leave blank to let Metmask decide the est one
 * 
 * @command transferErc20
 * @text Transfer ERC20
 * @desc Transfer ERC20.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg toAddress
 * @type text
 * @text To address
 * @desc Transfer the token to this address.
 * 
 * @arg tokenAddress
 * @type text
 * @text To address
 * @desc Transfer the token to this address.
 * 
 * @arg amount
 * @type Number
 * @text Amount
 * @desc Amount of tokens to transfer.
 * 
 * @arg gasPrice
 * @type Number
 * @text Gas price
 * @desc Gas price in gwei. Leave blank to let Metmask decide the est one
 * 
 * @command transferErc721
 * @text Transfer ERC721
 * @desc Transfer ERC721.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg toAddress
 * @type text
 * @text To address
 * @desc Transfer the token to this address.
 * 
 * @arg tokenAddress
 * @type text
 * @text Token address
 * @desc Token address of the token to transfer.
 * 
 * @arg tokenId
 * @type text
 * @text Token ID
 * @desc Token ID.
 * 
 * @arg amount
 * @type Number
 * @text Amount
 * @desc Amount of tokens to transfer.
 * 
 * @arg gasPrice
 * @type Number
 * @text Gas price
 * @desc Gas price in gwei. Leave blank to let Metmask decide the est one
 * 
 * @command transferErc1155
 * @text Transfer ERC1155
 * @desc Transfer ERC1155.
 * 
 * @arg wait
 * @text Wait for completion
 * @desc Wait for completion before proceeding to next event code
 * @default false
 * @type boolean
 * 
 * @arg variableId
 * @type variable
 * @text Variable id
 * @desc Store the result to this variable
 * 
 * @arg toAddress
 * @type text
 * @text To address
 * @desc Transfer the token to this address.
 * 
 * @arg tokenAddress
 * @type text
 * @text Token address
 * @desc Token address of the token to transfer.
 * 
 * @arg tokenId
 * @type text
 * @text Token ID
 * @desc Token ID.
 * 
 * @arg amount
 * @type Number
 * @text Amount
 * @desc Amount of tokens to transfer.
 * 
 * @arg gasPrice
 * @type Number
 * @text Gas price
 * @desc Gas price in gwei. Leave blank to let Metmask decide the est one
 * 
 * @help
 */


// Create a namespace for GBCCoffee if it doesn't already exist
var GBCCoffee = GBCCoffee || {};

// Create a Metamask object within the GBCCoffee namespace
GBCCoffee.Metamask = {
    // Retrieve and evaluate plugin parameters
    requireWalletConnectOnTitle: eval(PluginManager.parameters("GBCCoffee_Metamask")["requireWalletConnectOnTitle"]),
    autoConnectPreviousWallet: eval(PluginManager.parameters("GBCCoffee_Metamask")["autoConnectPreviousWallet"]),
    accountsChangedEval: eval(PluginManager.parameters("GBCCoffee_Metamask")["accountsChangedEval"]),
    chainChangedEval: eval(PluginManager.parameters("GBCCoffee_Metamask")["chainChangedEval"]),
    disconnectEval: eval(PluginManager.parameters("GBCCoffee_Metamask")["disconnectEval"]),
    accountsChangedCE: Number(PluginManager.parameters("GBCCoffee_Metamask")["accountsChangedCE"]),
    chainChangedCE: Number(PluginManager.parameters("GBCCoffee_Metamask")["chainChangedCE"]),
    disconnectCE: Number(PluginManager.parameters("GBCCoffee_Metamask")["disconnectCE"]),
    titleConnectedAddress: ""
};

// Initialize the Metamask integration for the game
GBCCoffee.Metamask.initGame = function() {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return;
    }

    // Remove all existing listeners to avoid duplicate events
    ethereum.removeAllListeners();

    // Add event listeners for Metamask events (accounts changed, chain changed, disconnect)
    ethereum.on('accountsChanged', (accounts) => {
        GBCCoffee.Metamask.showSnackbar(`Wallet changed: ${accounts.join(', ')}`);
        console.log('Wallet changed:', accounts);
        
        eval(GBCCoffee.Metamask.accountsChangedEval);
        $gameTemp.reserveCommonEvent(GBCCoffee.Metamask.accountsChangedCE);
    });

    ethereum.on('chainChanged', (chainId) => {
        GBCCoffee.Metamask.showSnackbar(`Chain changed to: ${chainId}`);
        console.log('Chain changed to:', chainId);
        
        eval(GBCCoffee.Metamask.chainChangedEval);
        $gameTemp.reserveCommonEvent(GBCCoffee.Metamask.chainChangedCE);
    });

    ethereum.on('disconnect', (error) => {
        GBCCoffee.Metamask.showSnackbar('Wallet disconnected');
        console.log('Wallet disconnected:', error);
        
        eval(GBCCoffee.Metamask.disconnectEval);
        $gameTemp.reserveCommonEvent(GBCCoffee.Metamask.disconnectCE);
    });
};


//====================================================================================
// --------------------------- Command Registration ----------------------------------
//====================================================================================
/*  
    Commands: 
        getWalletAddress
        personalSign
        getTokenBalance
        getUserEthBalance
        sendTransaction
        Fetch NFTs
*/
// --------------------------- getWalletAddress ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "getWalletAddress", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let interpreter = args.interpreter;
    if (shouldWait) {
        interpreter.isGettingAddress = true;
        interpreter.setWaitMode("getWalletAddress");
    }
    GBCCoffee.Metamask.getCurrentAddressPromise().then((result) => {
        let activeAddress = result[0];
        $gameVariables.setValue(variableId, activeAddress);
        interpreter.isGettingAddress = false;
    }).catch(error => {
        interpreter.isGettingAddress = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.getCurrentAddress = async function() {
    try {
        const accounts = await GBCCoffee.Metamask.getCurrentAddressPromise();
        if (accounts.length > 0) {
            return accounts[0];
        } else {
            throw new Error('No accounts found');
        }
    } catch (error) {
        console.error('Error getting current address:', error);
        throw error;
    }
};

GBCCoffee.Metamask.getCurrentAddressPromise = async function() {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    return ethereum.request({ method: 'eth_accounts' });
};

// --------------------------- personalSign ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "personalSign", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let message = args.message;
    let interpreter = args.interpreter;
    if (shouldWait) {
        interpreter.isSigningMessage = true;
        interpreter.setWaitMode("personalSign");
    }
    GBCCoffee.Metamask.signMessagePromise(message).then((result) => {
        $gameVariables.setValue(variableId, result);
        interpreter.isSigningMessage = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isSigningMessage = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.signMessagePromise = async function(message) {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    const from = await this.getCurrentAddress();
    const method = "personal_sign";
    const params = [message, from];

    return ethereum.request({
        method,
        params,
    });
};

// --------------------------- getTokenBalance ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "getTokenBalance", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let walletAddress = args.walletAddress;
    let tokenContractAddress = args.tokenContractAddress
    let interpreter = args.interpreter;
    let tokenId = args.tokenId.trim() != "" ? parseInt(args.tokenId) : null;
    if (shouldWait) {
        interpreter.isGettingTokenBalance = true;
        interpreter.setWaitMode("getTokenBalance");
    }
    GBCCoffee.Metamask.getTokenBalancePromise(walletAddress, tokenContractAddress, tokenId).then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isGettingTokenBalance = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isGettingTokenBalance = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.getTokenBalancePromise = async function(walletAddress, tokenContractAddress, tokenId) {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    const web3 = new Web3(window.ethereum);
    const tokenABI = [
        {
            "constant": true,
            "inputs": [
                {"name": "_owner", "type": "address"},
                {"name": "_tokenId", "type": "uint256"}
            ],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {"name": "_owner", "type": "address"}
            ],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        }
    ];
    let account = "";
    if (walletAddress.trim() == "") account = await GBCCoffee.Metamask.getCurrentAddress();
    else account = walletAddress;
    console.log(account);
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);
    if (tokenId) {
        return tokenContract.methods.balanceOf(account, tokenId).call();
    } else {
        return tokenContract.methods.balanceOf(account).call();
    }
};

// --------------------------- getUserEthBalance ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "getUserEthBalance", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let interpreter = args.interpreter;
    if (shouldWait) {
        interpreter.isGettingEthBalance = true;
        interpreter.setWaitMode("getUserEthBalance");
    }
    GBCCoffee.Metamask.getUserEthBalance().then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isGettingEthBalance = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isGettingEthBalance = false;
        console.error(error);
    });
});


GBCCoffee.Metamask.getUserEthBalance = async function() {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    const web3 = new Web3(ethereum);
    const account = await this.getCurrentAddress();
    const balanceWei = await web3.eth.getBalance(account);
    return web3.utils.fromWei(balanceWei, 'ether');
};

// --------------------------- sendTransaction ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "sendTransaction", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let contractAddress = args.contractAddress;
    let contractAbi = args.contractAbi;
    let methodName = args.methodName;
    let methodParams = eval(args.methodParams);
    let gasLimit = eval(args.gasLimit);
    let gasPrice = eval(args.gasPrice);
    if (contractAbi.startsWith('"') && contractAbi.endsWith('"')) {
        contractAbi = contractAbi.slice(1, -1);
    } 
    contractAbi = JSON.parse(contractAbi.replace(/\\n/g, '').replace(/\\/g, '').replace(/\s+/g, ''));
    let interpreter = args.interpreter;
    if (shouldWait) {
        interpreter.isSendingTransaction = true;
        interpreter.setWaitMode("sendTransaction");
    }
    GBCCoffee.Metamask.sendTransactionPromise(contractAddress, contractAbi, methodName, methodParams, gasLimit, gasPrice).then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isSendingTransaction = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isSendingTransaction = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.sendTransactionPromise = async function(contractAddress, contractAbi, methodName, methodParams, gasLimit, gasPrice) {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    const web3 = new Web3(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    console.log(from);
    console.log(...methodParams);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const method = contract.methods[methodName](...methodParams);
    const txParams = {
        from: from,
        to: contractAddress,
        data: method.encodeABI(),
        gas: gasLimit, 
        gasPrice: gasPrice
    };

    return web3.eth.sendTransaction(txParams);
};

// --------------------------- Fetch NFTs ----------------------------------

//Specific to ERC-721aQueryable 
PluginManager.registerCommand("GBCCoffee_Metamask", "fetchUserNFTs721a", args => {
    const contractAddress = args.contractAddress;
    const contractAbi = args.contractAbi;
    const variableId = Number(args.variableId);
    const startRange = Number(args.startRange);  // Starting range for token IDs
    const endRange = Number(args.endRange);      // Ending range for token IDs

    // Ensure the ABI is correctly parsed
    let parsedABI = contractAbi;
    if (parsedABI.startsWith('"') && parsedABI.endsWith('"')) {
        parsedABI = parsedABI.slice(1, -1);
    }
    try {
        parsedABI = JSON.parse(parsedABI.replace(/\\n/g, '').replace(/\\/g, '').replace(/\s+/g, ''));
    } catch (e) {
        console.error("Failed to parse contract ABI:", e);
        return;
    }

    // Function to fetch NFTs within a range and retrieve their tokenURI
    const fetchNFTs = async (walletAddress, contractAddress, start, stop) => {
        const ethereum = window.ethereum;
        if (!ethereum) {
            console.error("MetaMask not found");
            return Promise.reject(new Error("MetaMask not found"));
        }

        const web3 = new Web3(ethereum);
        const contract = new web3.eth.Contract(parsedABI, contractAddress);

        try {
            console.log(`Fetching tokens owned by the address from ${start} to ${stop}...`);
            const tokenIds = await contract.methods.tokensOfOwnerIn(walletAddress, start, stop).call();

            const tokenData = [];

            for (let i = 0; i < tokenIds.length; i++) {
                const tokenId = tokenIds[i];
                console.log(`Fetching tokenURI for Token ID: ${tokenId}`);
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                console.log(`Token ID: ${tokenId}, Token URI: ${tokenURI}`);

                tokenData.push({ tokenId, tokenURI });
            }

            return tokenData;
        } catch (error) {
            console.error('Error fetching NFTs or token URIs:', error);
            return [];
        }
    };

    // Request account access
    ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            const walletAddress = accounts[0];
            console.log("Wallet Address:", walletAddress);
            fetchNFTs(walletAddress, contractAddress, startRange, endRange).then(tokenData => {
                $gameVariables.setValue(variableId, tokenData);
            }).catch(error => {
                console.error('Error fetching NFTs or token URIs:', error);
            });
        })
        .catch(error => {
            console.error('Error requesting accounts:', error);
        });
});

PluginManager.registerCommand("GBCCoffee_Metamask", "getOwnedNfts", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let walletAddress = args.walletAddress;
    let tokenContractAddress = args.tokenContractAddress;
    let interpreter = args.interpreter;
    let minTokenId = parseInt(args.startRange);
    let maxTokenId = parseInt(args.endRange);

    if (shouldWait) {
        interpreter.isGettingOwnedNFTs = true;
        interpreter.setWaitMode("getOwnedNfts");
    }

    GBCCoffee.Metamask.getOwnedNFTsPromise(walletAddress, tokenContractAddress, minTokenId, maxTokenId).then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isGettingOwnedNFTs = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isGettingOwnedNFTs = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.getOwnedNFTsPromise = async function(walletAddress, tokenContractAddress, minTokenId, maxTokenId) {
    const ethereum = window.ethereum;
    if (!ethereum) {
        throw new Error("Metamask not found");
    }

    const web3 = new Web3(window.ethereum);
    const tokenABI = [
        {
            "constant": true,
            "inputs": [{ "name": "_tokenId", "type": "uint256" }],
            "name": "ownerOf",
            "outputs": [{ "name": "owner", "type": "address" }],
            "type": "function"
        }
    ];

    let account = "";
    if (walletAddress.trim() === "") {
        account = await GBCCoffee.Metamask.getCurrentAddress();
    } else {
        account = walletAddress;
    }

    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    const ownedTokens = [];
    for (let tokenId = minTokenId; tokenId <= maxTokenId; tokenId++) {
        try {
            const owner = await tokenContract.methods.ownerOf(tokenId).call();
            if (owner.toLowerCase() === account.toLowerCase()) {
                ownedTokens.push(tokenId);
            }
        } catch (err) {
            // Rethrow the error to be caught in validateNftCount
            throw new Error(`Token ID ${tokenId} failed: ${err.message}`);
        }
    }

    return ownedTokens;
};


// --------------------------- Get token uri ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "getTokenUri", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let tokenContractAddress = args.tokenContractAddress;
    let tokenId = args.tokenId.trim() != "" ? parseInt(args.tokenId) : null;
    let interpreter = args.interpreter;

    if (shouldWait) {
        interpreter.isGettingTokenUri = true;
        interpreter.setWaitMode("getTokenUri");
    }

    GBCCoffee.Metamask.getTokenUriPromise(tokenContractAddress, tokenId).then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isGettingTokenUri = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isGettingTokenUri = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.getTokenUriPromise = async function(tokenContractAddress, tokenId) {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("Metamask not found"));
    }
    const web3 = new Web3(window.ethereum);
    const tokenABI = [
        {
            "constant": true,
            "inputs": [{ "name": "_tokenId", "type": "uint256" }],
            "name": "tokenURI",
            "outputs": [{ "name": "uri", "type": "string" }],
            "type": "function"
        }
    ];

    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    if (tokenId === null) {
        return Promise.reject(new Error("Token ID is required"));
    }

    try {
        const tokenUri = await tokenContract.methods.tokenURI(tokenId).call();
        return tokenUri;
    } catch (error) {
        return Promise.reject(new Error(`Failed to fetch token URI for token ID ${tokenId}: ${error.message}`));
    }
};

// --------------------------- Get token metadata ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "getTokenMetadata", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let tokenContractAddress = args.tokenContractAddress;
    let interpreter = args.interpreter;
    let tokenId = args.tokenId.trim() != "" ? parseInt(args.tokenId) : null;

    if (shouldWait) {
        interpreter.isGettingTokenMetadata = true;
        interpreter.setWaitMode("getTokenMetadata");
    }

    GBCCoffee.Metamask.getTokenMetadataPromise(tokenContractAddress, tokenId).then((result) => {
        console.log(result);
        $gameVariables.setValue(variableId, result);
        interpreter.isGettingTokenMetadata = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        interpreter.isGettingTokenMetadata = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.getTokenMetadataPromise = async function(tokenContractAddress, tokenId) {
    console.log(`Getting token metadata for token id ${tokenId}...`)
    try {
        // First, get the token URI
        const tokenUri = await GBCCoffee.Metamask.getTokenUriPromise(tokenContractAddress, tokenId);
        
        // Convert IPFS URL to a gateway URL
        let metadataUrl = tokenUri;
        if (tokenUri.startsWith("ipfs://")) {
            metadataUrl = tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }
        
        // Fetch the metadata content
        const response = await fetch(metadataUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.statusText}`);
        }

        const metadata = await response.json();
        return metadata;
    } catch (error) {
        return Promise.reject(new Error(`Failed to get token metadata: ${error.message}`));
    }
};

// --------------------------- Transfer ETH ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "transferEth", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let toAddress = args.toAddress;
    let amount = Number(args.amount);
    let interpreter = args.interpreter;
    let gasPrice = eval(args.gasPrice);

    if (shouldWait) {
        interpreter.isTransferringEth = true;
        interpreter.setWaitMode("transferEth");
    }

    GBCCoffee.Metamask.transferEthPromise(toAddress, amount, gasPrice).then(result => {
        $gameVariables.setValue(variableId, result);
        if (shouldWait) interpreter.isTransferringEth = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        if (shouldWait) interpreter.isTransferringEth = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.transferEthPromise = async function(toAddress, amount, gasPrice) {
    try {
        const ethereum = window.ethereum;
        if (!ethereum) {
            return Promise.reject(new Error("Metamask not found"));
        }
        const web3 = new Web3(window.ethereum);

        let fromAddress = await GBCCoffee.Metamask.getCurrentAddress();

        const transaction = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: gasPrice,
        };

        const receipt = await web3.eth.sendTransaction(transaction);
        return receipt;
    } catch (error) {
        return Promise.reject(new Error(`Failed to transfer ETH: ${error.message}`));
    }
};

// --------------------------- Transfer ERC20 Tokens ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "transferErc20", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let toAddress = args.toAddress;
    let amount = Number(args.amount);
    let tokenAddress = args.tokenAddress;
    let interpreter = args.interpreter;
    let gasPrice = eval(args.gasPrice);

    if (shouldWait) {
        interpreter.isTransferringErc20 = true;
        interpreter.setWaitMode("transferErc20");
    }

    GBCCoffee.Metamask.transferErc20Promise(toAddress, amount, tokenAddress, gasPrice).then(result => {
        $gameVariables.setValue(variableId, result);
        if (shouldWait) interpreter.isTransferringErc20 = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        if (shouldWait) interpreter.isTransferringErc20 = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.transferErc20Promise = async function(toAddress, amount, tokenAddress, gasPrice) {
    try {
        const ethereum = window.ethereum;
        if (!ethereum) {
            return Promise.reject(new Error("Metamask not found"));
        }
        const web3 = new Web3(window.ethereum);

        let fromAddress = await GBCCoffee.Metamask.getCurrentAddress();

        const erc20Abi = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "type": "function"
            }
        ];

        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

        const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
        const data = tokenContract.methods.transfer(toAddress, amountInWei).encodeABI();

        const transaction = {
            from: fromAddress,
            to: tokenAddress,
            data: data,
            gas: gasPrice,
        };

        const receipt = await web3.eth.sendTransaction(transaction);
        return receipt;
    } catch (error) {
        return Promise.reject(new Error(`Failed to transfer ERC-20 token: ${error.message}`));
    }
};

// --------------------------- Transfer ERC721 Tokens ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "transferErc721", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let toAddress = args.toAddress;
    let tokenId = Number(args.tokenId);
    let tokenAddress = args.tokenAddress;
    let interpreter = args.interpreter;
    let gasPrice = eval(args.gasPrice);

    if (shouldWait) {
        interpreter.isTransferringErc721 = true;
        interpreter.setWaitMode("transferErc721");
    }

    GBCCoffee.Metamask.transferErc721Promise(toAddress, tokenId, tokenAddress, gasPrice).then(result => {
        $gameVariables.setValue(variableId, result);
        if (shouldWait) interpreter.isTransferringErc721 = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        if (shouldWait) interpreter.isTransferringErc721 = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.transferErc721Promise = async function(toAddress, tokenId, tokenAddress, gasPrice) {
    try {
        const ethereum = window.ethereum;
        if (!ethereum) {
            return Promise.reject(new Error("Metamask not found"));
        }
        const web3 = new Web3(window.ethereum);

        let fromAddress = await GBCCoffee.Metamask.getCurrentAddress();

        const erc721Abi = [
            {
                "constant": false,
                "inputs": [
                    { "name": "from", "type": "address" },
                    { "name": "to", "type": "address" },
                    { "name": "tokenId", "type": "uint256" }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "type": "function"
            }
        ];
        const tokenContract = new web3.eth.Contract(erc721Abi, tokenAddress);
        const data = tokenContract.methods.safeTransferFrom(fromAddress, toAddress, tokenId).encodeABI();

        const transaction = {
            from: fromAddress,
            to: tokenAddress,
            data: data,
            gas: gasPrice,
        };

        const receipt = await web3.eth.sendTransaction(transaction);
        return receipt;
    } catch (error) {
        console.log(error);
        return Promise.reject(new Error(`Failed to transfer ERC-721 NFT: ${error.message}`));
    }
};

// --------------------------- Transfer ERC-1155 Tokens ----------------------------------

PluginManager.registerCommand("GBCCoffee_Metamask", "transferErc1155", args => {
    let shouldWait = eval(args.wait);
    let variableId = Number(args.variableId);
    let toAddress = args.toAddress;
    let tokenId = Number(args.tokenId);
    let amount = Number(args.amount);
    let tokenAddress = args.tokenAddress;
    let interpreter = args.interpreter;
    let gasPrice = eval(args.gasPrice);

    if (shouldWait) {
        interpreter.isTransferringErc1155 = true;
        interpreter.setWaitMode("transferErc1155");
    }

    GBCCoffee.Metamask.transferErc1155Promise(toAddress, tokenId, amount, tokenAddress, gasPrice).then(result => {
        $gameVariables.setValue(variableId, result);
        if (shouldWait) interpreter.isTransferringErc1155 = false;
    }).catch(error => {
        $gameVariables.setValue(variableId, error.message);
        if (shouldWait) interpreter.isTransferringErc1155 = false;
        console.error(error);
    });
});

GBCCoffee.Metamask.transferErc1155Promise = async function(toAddress, tokenId, amount, tokenAddress, gasPrice) {
    try {
        const ethereum = window.ethereum;
        if (!ethereum) {
            return Promise.reject(new Error("Metamask not found"));
        }
        const web3 = new Web3(window.ethereum);

        let fromAddress = await GBCCoffee.Metamask.getCurrentAddress();
        
        const erc1155Abi = [
            {
                "constant": false,
                "inputs": [
                    { "name": "from", "type": "address" },
                    { "name": "to", "type": "address" },
                    { "name": "id", "type": "uint256" },
                    { "name": "amount", "type": "uint256" },
                    { "name": "data", "type": "bytes" }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "type": "function"
            }
        ];
        const tokenContract = new web3.eth.Contract(erc1155Abi, tokenAddress);
        const data = tokenContract.methods.safeTransferFrom(fromAddress, toAddress, tokenId, amount, '0x').encodeABI();

        const transaction = {
            from: fromAddress,
            to: tokenAddress,
            data: data,
            gas: gasPrice,
        };

        const receipt = await web3.eth.sendTransaction(transaction);
        return receipt;
    } catch (error) {
        return Promise.reject(new Error(`Failed to transfer ERC-1155 token: ${error.message}`));
    }
};

//====================================================================================
// --------------------------- UI Functions ----------------------------------
//====================================================================================
/*  
    Contexts:
        Wait Mode
        Plugin Command Handler
        Notification Bar (Snackbar)
        Connect Wallet Button
        
*/
// --------------------------- Wait Mode ----------------------------------

// Handles the different wait modes for wallet-related commands
let gbccoffee_metamask_gameinterpeter_updatewaitmode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode == "getWalletAddress") {
        return this.isGettingAddress;
    } else if (this._waitMode == "personalSign") {
        return this.isSigningMessage;
    } else if (this._waitMode == "getTokenBalance") {
        return this.isGettingTokenBalance;
    } else if (this._waitMode == "getUserEthBalance") {
        return this.isGettingEthBalance;
    } else if (this._waitMode == "sendTransaction") {
        return this.isSendingTransaction;
    } else if (this._waitMode == "getOwnedNfts") {
        return this.isGettingOwnedNFTs;
    } else if(this._waitMode == "getTokenUri") {
        return this.isGettingTokenUri;
    } else if(this._waitMode == "getTokenMetadata") {
        return this.isGettingTokenMetadata;
    } else {
        return gbccoffee_metamask_gameinterpeter_updatewaitmode.call(this);
    }
};

// --------------------------- Plugin Command Handler ----------------------------------

// Extends the command357 method to handle GBCCoffee_Metamask plugin commands
let gbccoffee_metamask_gameinterpeter_command357 = Game_Interpreter.prototype.command357;
Game_Interpreter.prototype.command357 = function(params) {
    if (params[0] == "GBCCoffee_Metamask") {
        const pluginName = Utils.extractFileName(params[0]);
        params[3].interpreter = this;
        PluginManager.callCommand(this, pluginName, params[1], params[3]);
        return true;
    } else {
        return gbccoffee_metamask_gameinterpeter_command357.call(this, params);
    }
};

// --------------------------- Notification Bar (Snackbar) ----------------------------------

GBCCoffee.Metamask.showSnackbar = function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
};


// --------------------------- Connect Wallet Button ----------------------------------

GBCCoffee.Metamask.connectWallet = function() {
    const ethereum = window.ethereum;
    if (!ethereum) {
        return Promise.reject(new Error("No active provider found"));
    }
    return ethereum.request({ method: 'eth_requestAccounts' });
};

// Initializes the Metamask integration when the title screen is created
let gbccoffee_metamask_scenetitle_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    gbccoffee_metamask_scenetitle_create.call(this);
    GBCCoffee.Metamask.initGame();
    if (GBCCoffee.Metamask.requireWalletConnectOnTitle && GBCCoffee.Metamask.autoConnectPreviousWallet) {
        this.commandConnectWallet();
    }
};

// Adds the Connect Wallet command to the title command window
let gbccoffee_metamask_scenetitle_createcommandwindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    gbccoffee_metamask_scenetitle_createcommandwindow.call(this);
    this._commandWindow.setHandler("connectWallet", this.commandConnectWallet.bind(this));
};

// Defines the behavior for the Connect Wallet command
Scene_Title.prototype.commandConnectWallet = function() {
    GBCCoffee.Metamask.connectWallet()
    .then(accounts => {
        console.log(accounts);
        if (accounts.length > 0) {
            GBCCoffee.Metamask.showSnackbar(`Connected wallet: ${accounts[0]}`);
            GBCCoffee.Metamask.titleConnectedAddress = accounts[0];
            this._commandWindow._paneIndex = 1;
            this._commandWindow.refresh();
            this._commandWindow.activate();
        } else {
            this._commandWindow.activate();
        }
    }).catch(error => {
        console.log("Error on commandConnectWallet");
        console.log(error);
        if (error.code === -32002) {
            GBCCoffee.Metamask.showSnackbar("MetaMask is already processing a request. Please check the MetaMask extension.");
        } else {
            GBCCoffee.Metamask.showSnackbar(`Error connecting wallet: ${error.message}`);
        }
        this._commandWindow.activate();
    })
};

// Initializes the title command window with a custom pane index
let gbccoffee_metamask_windowtitlecommand_initialize = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function(rect) {
    this._paneIndex = 0;
    gbccoffee_metamask_windowtitlecommand_initialize.call(this, rect);
};

// Creates the command list for the title command window
let gbccoffee_metamask_windowtitlecommand_makecommandlist = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    if (GBCCoffee.Metamask.requireWalletConnectOnTitle && this._paneIndex == 0) {
        this.addCommand("Connect Wallet", "connectWallet");
        this.height = Scene_Base.prototype.calcWindowHeight(1, true);
        this.contents.destroy();
        this.createContents();
    } else {
        gbccoffee_metamask_windowtitlecommand_makecommandlist.call(this);
        this.height = Scene_Base.prototype.calcWindowHeight(3, true);
        this.contents.destroy();
        this.createContents();
    }
};

// Draws the commands in the title command window
Window_TitleCommand.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    console.log(this.commandName(index));
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};


//====================================================================================
// --------------------------- window.ethereum mini-doc ------------------------------
//====================================================================================
/*
----------------Methods
request(Object): Sends JSON-RPC requests.
    Example: ethereum.request({ method: 'eth_requestAccounts' })

isConnected(): Checks if the provider is connected to the current chain.
    Returns: true if connected, false otherwise.

_metamask.isUnlocked(): (Experimental) Checks if MetaMask is unlocked by the user.
    Returns: A promise that resolves to true if unlocked, false otherwise.
    
---------------Events
accountsChanged: Emitted when the user's account changes.
    Handler Parameters: Array<string>

chainChanged: Emitted when the currently connected chain changes.
    Handler Parameters: string (chainId)

connect: Emitted when the provider is able to connect to the chain.
    Handler Parameters: Object (with chainId property)

disconnect: Emitted when the provider disconnects from the chain.
    Handler Parameters: Object (with code and message properties)

message: Emitted when the provider receives a message that should be notified to the user.
    Handler Parameters: Object (with type and data properties)

error: Emitted when there is an error.
    Handler Parameters: Object (error details)

*/
