require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { INFURA_PROJECT_ID, DEPLOYER_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.0',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    }
  }
};
