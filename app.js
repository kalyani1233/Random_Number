// Button Element
// const Web3 = require('web3');
const generateButton = document.getElementById("generate-button");

// Result Element
const resultElement = document.getElementById("result");

// Generate Random Number
generateButton.addEventListener("click", async function() {
  // Connect to Web3 Provider
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  // Contract ABI
  const abi =[
	{
		"inputs": [],
		"name": "getRandomNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_randomNumber",
				"type": "uint256"
			}
		],
		"name": "setRandomNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

  // Contract Address
  const contractAddress = "0xBce5917E00C9b72a1Abe123c28D1D50563fB1E0c";

  // Contract Instance

  const contractInstance = new web3.eth.Contract(abi, contractAddress);
  // Function to generate a random number and send it to the contract
async function generateRandomNumber() {
	const gasLimit = web3.utils.toHex(2000000);
	const randomNumber = Math.floor(Math.random() * 1000000000);
	console.log('Generated random number:', randomNumber);
  
	const accounts = await web3.eth.getAccounts();
	const fromAccount = accounts[0];
  
	// Send the random number to the contract
	await contractInstance.methods.setRandomNumber(randomNumber).send({ from: fromAccount ,gas:gasLimit});
  
	console.log('Random number sent to contract');
  }

  generateRandomNumber()

  async function getCurrentRandomNumber() {
	const currentNumber = await contractInstance.methods.getRandomNumber().call();
	console.log('Current random number:', currentNumber);
  }
  getCurrentRandomNumber();
});

