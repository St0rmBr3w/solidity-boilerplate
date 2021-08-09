//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract LazyGreeter {
  event GreetingSet(string _greeting);
  event GreeterTired();

  string public greeting;
  uint256 public count;

  constructor(string memory _greeting) {
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public returns (bool _changedGreet) {
    require(bytes(_greeting).length > 0, 'Greeter: empty greeting');

    if (count < 10) {
      greeting = _greeting;
      _changedGreet = true;
      emit GreetingSet(_greeting);
    } else {
      emit GreeterTired();
    }
    count += 1;
  }
}
