import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deployer:", deployer);

  const token = await deploy("GovToken", {
    from: deployer,
    args: ["Governance Token", "GOVT", ethers.parseEther("1000000")],
    log: true,
  });

  const stake = await deploy("StakeGov", {
    from: deployer,
    args: [token.address],
    log: true,
  });

  console.log("GovToken:", token.address);
  console.log("StakeGov:", stake.address);
};
export default func;
func.tags = ["StakeGov"];
