import { shouldVerifyContract } from '../utils/deploy';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  console.log(deployer);
  const args = ['Hallo Welt!'];

  const greeter = await hre.deployments.deploy('Greeter', {
    contract: 'contracts/Greeter.sol:Greeter',
    args: args,
    from: deployer,
    log: true,
  });

  if (await shouldVerifyContract(greeter)) {
    await hre.run('verify:verify', {
      contract: 'contracts/Greeter.sol:Greeter',
      address: greeter.address,
      constructorArguments: args,
    });
  }
};

deployFunction.tags = ['greeter'];

export default deployFunction;
