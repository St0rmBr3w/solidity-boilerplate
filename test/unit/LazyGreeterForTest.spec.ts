import { expect } from 'chai';
import { ethers } from 'hardhat';
import { LazyGreeterForTest, LazyGreeterForTest__factory } from '@typechained';

describe('LazyGreeterForTest', function () {
  let greeter: LazyGreeterForTest;
  let greeterFactory: LazyGreeterForTest__factory;
  before(async () => {
    greeterFactory = (await ethers.getContractFactory('LazyGreeterForTest')) as LazyGreeterForTest__factory;
  });
  beforeEach(async () => {
    greeter = await greeterFactory.deploy('Hello, world!');
  });

  it("Should return the new greeting once it's changed", async () => {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
  it('Should not change the greeting more than 10 times', async () => {
    await greeter.setCounter(10);
    expect(await greeter.callStatic.setGreeting('Hola, mundo!')).to.be.false;
  });
});
