import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployGradesManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("GradesManager", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true, // ensures immediate mining local networks
  });
};

export default deployGradesManager;

deployGradesManager.tags = ["GradesManager"];
