
// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { FxBaseChildTunnel } from './base/FxBaseChildTunnel.sol';
import { VRFConsumerBase } from '@chainlink/contracts/src/v0.7/VRFConsumerBase.sol';

/** 
 * @title VRFChildTunnel - Polygon (Matic)
 */
contract VRFChildTunnel is FxBaseChildTunnel, VRFConsumerBase {

  /// @dev Polygon state bridge variables.
  uint256 public latestStateId;
  address public latestRootMessageSender;

  /// @dev Chainlink VRF variables.
  bytes32 keyHash;
  uint vrfFees;

  /// @dev Message types.
  bytes32 public constant REQUEST = keccak256("REQUEST");
  bytes32 public constant RESPONSE = keccak256("RESPONSE");

  /// @dev The request ID of the latest randomness request. 
  uint currentRequestId;

  /// @dev Mapping from randomness rewuest Id => random number received from Chalink VRF on matic.
  mapping(uint => uint) public randomNumber;

  /// @dev Mapping from Chainlink VRF's bytes request ID => this contracts uint request ID
  mapping(bytes32 => uint) public requestIds;

  /// @dev Events.
  event RandomnessRequest(address indexed requestor, uint requestId, bytes32 chainlinkBytesId);
  event RandomnessFulfilled(uint indexed requestId, bytes32 chainlinkBytesId, uint randomNumber); 

  constructor(
    address _fxChild,
    address _vrfCoordinator,
    address _linkToken,
    bytes32 _keyHash,
    uint _fees
  ) FxBaseChildTunnel(_fxChild) VRFConsumerBase(_vrfCoordinator, _linkToken) {
    
    // Set Chainlink variables.
    keyHash = _keyHash;
    vrfFees = _fees;
  }

  function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data) internal override validateSender(sender) {

    // Polygon state bridge variables.
    latestStateId = stateId;
    latestRootMessageSender = sender;

    // Get randomness request data.
    (bytes32 messageType, address requestor) = abi.decode(data, (bytes32, address));
    require(messageType == REQUEST, "VRF Child: Invalid message sent. Expected request.");

    uint requestId = requestRandomNumber(requestor);

    _sendMessageToRoot(abi.encode(REQUEST, requestId, requestor));
  }

  /// @dev Chainlink Functions

  function requestRandomNumber(address _requestor) internal returns (uint requestId) {
    require(LINK.balanceOf(address(this)) >= vrfFees, "Not enough LINK to fulfill randomness request.");

    // Send random number request.
    bytes32 bytesId = requestRandomness(keyHash, vrfFees);
    
    // Store request Id.
    requestId = _requestId();
    requestIds[bytesId] = requestId;

    emit RandomnessRequest(_requestor, requestId, bytesId);
  }

  function fulfillRandomness(bytes32 _chainlinkBytesId, uint _randomNumber) internal override {
    // Get integer requestId
    uint requestId = requestIds[_chainlinkBytesId];

    // Store random number
    randomNumber[requestId] = _randomNumber;

    // Send randomness to root.
    _sendMessageToRoot(abi.encode(RESPONSE, requestId, _randomNumber));

    emit RandomnessFulfilled(requestId, _chainlinkBytesId, _randomNumber);
  }

  function _requestId() internal returns (uint id) {
    id = currentRequestId;
    currentRequestId++;
  }
}