import { ethers, upgrades } from 'hardhat';
import { publishAbi } from './utils';

async function upgradeSSVNetwork() {
  const version = publishAbi(); // TODO pass version to the initializer function when version PR merge

  const proxyAddress: any = process.env.SSVNETWORK_PROXY_ADDRESS;
  const [deployer] = await ethers.getSigners();
  console.log("Upgading contract with the account:", deployer.address);

  const SSVNetwork = await ethers.getContractFactory("SSVNetwork_V2");

  await upgrades.upgradeProxy(proxyAddress, SSVNetwork, { kind: 'uups' });
  console.log("SSVNetwork upgraded successfully");
}

upgradeSSVNetwork()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });