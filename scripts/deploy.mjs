import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
  const TaskContract = await ethers.getContractFactory('TaskContract');
  const taskContract = await TaskContract.deploy();
  await taskContract.deployed();
  console.log('TaskContract deployed to:', taskContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
