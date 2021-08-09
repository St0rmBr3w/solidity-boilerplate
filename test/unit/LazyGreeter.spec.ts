import { expect } from 'chai';
import { ethers } from 'hardhat';
import { LazyGreeter, LazyGreeter__factory } from '@typechained';

describe('LazyGreeter', function () {
  let greeter: LazyGreeter;
  let greeterFactory: LazyGreeter__factory;
  before(async () => {
    greeterFactory = (await ethers.getContractFactory('LazyGreeter')) as LazyGreeter__factory;
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
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.callStatic.setGreeting('Hola, mundo!')).to.be.false;
  });
});
