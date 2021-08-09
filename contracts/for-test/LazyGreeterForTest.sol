//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '../LazyGreeter.sol';

contract LazyGreeterForTest is LazyGreeter {
  constructor(string memory _greeting) LazyGreeter(_greeting) {}

  function setCounter(uint256 _count) external {
    count = _count;
  }
}
