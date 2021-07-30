// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { FxBaseRootTunnel } from './base/FxBaseRootTunnel.sol';

/** 
 * @title VRFRootTunnel - Ethereum.
 */
contract VRFRootTunnel is FxBaseRootTunnel {

  /// @dev Message types.
  bytes32 public constant REQUEST = keccak256("REQUEST");
  bytes32 public constant RESPONSE = keccak256("RESPONSE");

  /// @dev The request Id of the latest random number request
  uint currentRequestId;

  /// @dev Mapping from randomness request Id => random number received from Chalink VRF on matic.
  mapping(uint => uint) public randomNumber;

  /// @dev Mapping from randomness request Id => address of the requestor
  mapping(uint => address) public requestors;

  /// @dev Events.
  event RequestRandomness(address indexed requestor, uint requestId);
  event RequestFulfilled(uint indexed requestId, uint randomness);

  constructor(address _checkpointManager, address _fxRoot)  FxBaseRootTunnel(_checkpointManager, _fxRoot) {}

  /// @dev Receives message from child in Matic.
  function _processMessageFromChild(bytes memory data) internal override {
    
    // Get requestId and randomness from data.
    (bytes32 messageType, uint requestId, uint randomness) = abi.decode(data, (bytes32, uint, uint));
    require(messageType == RESPONSE, "VRF Root: Invalid message sent. Expected response.");

    // Store random number.
    randomNumber[requestId] = randomness;

    emit RequestFulfilled(requestId, randomness);
  }

  /// @dev Requests a random number from VRF child in matic.
  function requestRandomNumber() external returns (uint requestId) {
    // Get requestId
    requestId = _requestId();

    // Store requestor
    requestors[requestId] = msg.sender;

    // Send randomness request.
    _sendMessageToChild(abi.encode(REQUEST, msg.sender, requestId));

    emit RequestRandomness(msg.sender, requestId);
  }

  function _requestId() internal returns (uint requestId) {
    requestId = currentRequestId;
    currentRequestId++;
  }
}