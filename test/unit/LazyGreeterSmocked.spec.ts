import chai, { expect } from 'chai';
import { ethers } from 'hardhat';
import { LazyGreeter, LazyGreeter__factory } from '@typechained';
import { FakeContract, MockContract, smock } from '@defi-wonderland/smock';

chai.use(smock.matchers);

describe('LazyGreeterSmocked', function () {
  let greeter: MockContract<LazyGreeter>;

  beforeEach(async () => {
    const greeterFactory = await smock.mock<LazyGreeter__factory>('LazyGreeter');
    greeter = await greeterFactory.deploy('Hello, world!');
  });

  it("Should return the new greeting once it's changed", async () => {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
  it('Should not change the greeting more than 10 times', async () => {
    greeter.setVariable('count', 10);
    expect(await greeter.callStatic.setGreeting('Hola, mundo!')).to.be.false;
  });
});
