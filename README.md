# Task Manager DApp

The Task Manager DApp is a decentralized application built to manage tasks on the Ethereum blockchain. This project is designed to demonstrate how to create and interact with a smart contract using Solidity and how to integrate it with a React-based frontend.

## Description

The Task Manager DApp allows users to perform basic task management operations, such as adding, completing, and removing tasks. Each task is stored on the Ethereum blockchain through a smart contract, ensuring immutability and transparency. The frontend of this DApp is built using React, and interaction with the blockchain is handled by ethers.js, a popular Ethereum library.

This project serves as an excellent introduction to decentralized applications, covering smart contract development, blockchain interaction, and building a user-friendly interface for blockchain-based applications.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js and npm**: Node.js is required to run the React development server and other build tools. You can download it from [Node.js official website](https://nodejs.org/).
- **MetaMask**: A browser extension wallet to interact with Ethereum blockchain. Download and install it from [MetaMask website](https://metamask.io/).

### Installing

1. **Clone the repository:**

   Start by cloning the repository from GitHub. This will give you all the files needed to run the application.

   ```bash
   git clone https://github.com/yourusername/task-manager-dapp.git
   cd task-manager-dapp
   ```

2. **Install dependencies:**

   Navigate to the project directory and install the required Node.js packages. This includes React, ethers.js, and other dependencies.

   ```bash
   npm install
   ```

3. **Configure the Ethereum provider:**

   Ensure MetaMask is installed in your browser. You'll use MetaMask to sign transactions and interact with the Ethereum network. Connect MetaMask to a test network like Ropsten or Rinkeby to avoid using real ETH.

4. **Deploy the smart contract:**

   The smart contract (`TaskContract.sol`) needs to be deployed on the Ethereum network. You can deploy it using Remix IDE or a framework like Truffle or Hardhat.

   - **Using Remix:**
     - Go to [Remix IDE](https://remix.ethereum.org/).
     - Create a new file and paste the smart contract code.
     - Compile and deploy the contract.
     - Copy the deployed contract address.

   - **Using Truffle/Hardhat:**
     - Follow the framework's deployment instructions.
     - Ensure you configure the deployment to the correct network.

   After deploying, update the `contractAddress` in `App.js` with the new address of your deployed contract.

### Executing the program

1. **Start the development server:**

   Run the following command to start the React application. This will launch the app in your default web browser.

   ```bash
   npm start
   ```

   The application should now be running on `http://localhost:3000`.

2. **Interact with the DApp:**

   - **Adding a Task**: Enter a task description in the input field and click "Add Task". This will trigger a transaction on the Ethereum network to store the task.
   - **Completing a Task**: Once a task is added, you can mark it as complete by clicking the "Complete" button next to it. This changes the task’s status on the blockchain.
   - **Removing a Task**: To delete a task, click the "Remove" button. This will remove the task from the blockchain.

   Each action triggers a blockchain transaction, which you need to approve via MetaMask.

## Project Structure

- **contracts/**: Contains the Solidity smart contract (`TaskContract.sol`).
- **src/**: Contains the React frontend code, including components and contract interaction logic.
- **public/**: Static files used by the React app.
- **App.js**: Main React component where contract interactions are handled.

## Help

If you run into issues:

1. **MetaMask is not connected**: Make sure MetaMask is properly installed and connected to the correct Ethereum network.
2. **Insufficient funds**: Ensure your MetaMask wallet has enough test ETH to cover transaction fees.
3. **Smart contract issues**: Verify that the contract address in `App.js` matches the one you deployed.

For more detailed error handling, open the browser’s console (F12 or right-click and select "Inspect") to see error messages.

## Authors

Your Name  
Sujitha

## License

This project is licensed under the MIT License
