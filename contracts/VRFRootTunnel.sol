// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { FxBaseRootTunnel } from './base/FxBaseRootTunnel.sol';

/** 
 * @title VRFRootTunnel
 */
contract VRFRootTunnel is FxBaseRootTunnel {
    bytes public latestData;

    constructor(address _checkpointManager, address _fxRoot)  FxBaseRootTunnel(_checkpointManager, _fxRoot) {}

    function _processMessageFromChild(bytes memory data) internal override {
        latestData = data;
    }

    function sendMessageToChild(bytes memory message) public {
        _sendMessageToChild(message);
    }
}