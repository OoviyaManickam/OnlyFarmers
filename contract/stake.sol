// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OnlyFarmers {
    struct Farm {
        uint256 id;
        string name;
        string piId;
        uint256 health;
        uint256 apy; // stored as percentage, e.g. 12 = 12%
        address owner;
    }

    struct StakeInfo {
        uint256 farmId;
        uint256 amount;
        uint256 startTime;
        uint256 duration; // in seconds
        bool withdrawn;
    }

    uint256 public farmCounter;
    mapping(uint256 => Farm) public farms;
    mapping(address => StakeInfo[]) public userStakes;
    mapping(uint256 => uint256) public totalStakedPerFarm;

    uint256 constant ONE_MONTH = 30 days;
    uint256 constant THREE_MONTHS = 90 days;
    uint256 constant SIX_MONTHS = 180 days;

    // Hardcoded addresses
    address public constant sustainabilityPool = 0x38B395898DaD5562b499cB89b00C5263ABb76c03;
    address public constant platformTreasury = 0x0CC161Ed7fD5D13cC71df654A504A3F6823dD5D5;

    event FarmRegistered(uint256 indexed farmId, string name);
    event FarmUpdated(uint256 farmId, uint256 newHealth, uint256 newApy);
    event Staked(address indexed user, uint256 farmId, uint256 amount, uint256 duration);
    event Withdrawn(address indexed user, uint256 amount, bool early, uint256 penalty);

    function registerFarm(
        string memory _name,
        string memory _piId,
        uint256 _health,
        uint256 _apy
    ) external {
        farmCounter++;
        farms[farmCounter] = Farm({
            id: farmCounter,
            name: _name,
            piId: _piId,
            health: _health,
            apy: _apy,
            owner: msg.sender
        });

        emit FarmRegistered(farmCounter, _name);
    }

    function updateFarmData(uint256 _farmId, uint256 _newHealth, uint256 _newApy) external {
        require(msg.sender == farms[_farmId].owner, "Not farm owner");
        farms[_farmId].health = _newHealth;
        farms[_farmId].apy = _newApy;
        emit FarmUpdated(_farmId, _newHealth, _newApy);
    }

    function stake(uint256 _farmId, uint256 _durationInMonths) external payable {
        require(farms[_farmId].id != 0, "Invalid farm");

        uint256 duration;
        if (_durationInMonths == 1) duration = ONE_MONTH;
        else if (_durationInMonths == 3) duration = THREE_MONTHS;
        else if (_durationInMonths == 6) duration = SIX_MONTHS;
        else revert("Invalid duration");

        userStakes[msg.sender].push(StakeInfo({
            farmId: _farmId,
            amount: msg.value,
            startTime: block.timestamp,
            duration: duration,
            withdrawn: false
        }));

        totalStakedPerFarm[_farmId] += msg.value;

        emit Staked(msg.sender, _farmId, msg.value, duration);
    }

    function withdraw(uint256 index) external {
        require(index < userStakes[msg.sender].length, "Invalid stake");
        StakeInfo storage stakeInfo = userStakes[msg.sender][index];
        require(!stakeInfo.withdrawn, "Already withdrawn");

        uint256 farmApy = farms[stakeInfo.farmId].apy;
        uint256 stakeDuration = block.timestamp - stakeInfo.startTime;
        bool early = stakeDuration < stakeInfo.duration;
        uint256 amount = stakeInfo.amount;
        uint256 reward;
        uint256 penalty;

        stakeInfo.withdrawn = true;
        totalStakedPerFarm[stakeInfo.farmId] -= amount;

        if (early) {
            penalty = (amount * 10) / 100;
            payable(sustainabilityPool).transfer(penalty / 2);
            payable(platformTreasury).transfer(penalty / 2);
            reward = amount - penalty;
            payable(msg.sender).transfer(reward);
            emit Withdrawn(msg.sender, reward, true, penalty);
        } else {
            uint256 interest = (amount * farmApy * stakeInfo.duration) / (365 days * 100);
            reward = amount + interest;

            uint256 userShare = (reward * 80) / 100;
            uint256 farmerShare = (reward * 17) / 100;
            uint256 poolShare = (reward * 2) / 100;
            uint256 platformShare = (reward * 1) / 100;

            payable(msg.sender).transfer(userShare);
            payable(farms[stakeInfo.farmId].owner).transfer(farmerShare);
            payable(sustainabilityPool).transfer(poolShare);
            payable(platformTreasury).transfer(platformShare);

            emit Withdrawn(msg.sender, userShare, false, 0);
        }
    }

    // View functions for frontend or UI integration

    function getFarmData(uint256 _farmId) external view returns (
        uint256 id,
        string memory name,
        string memory piId,
        uint256 health,
        uint256 apy,
        address owner
    ) {
        Farm memory f = farms[_farmId];
        return (f.id, f.name, f.piId, f.health, f.apy, f.owner);
    }

    function getTotalStakedForFarm(uint256 _farmId) external view returns (uint256) {
        return totalStakedPerFarm[_farmId];
    }

    function getUserStakeInfo(address user) external view returns (StakeInfo[] memory) {
        return userStakes[user];
    }

    function getAllFarms() external view returns (Farm[] memory) {
        Farm[] memory result = new Farm[](farmCounter);
        for (uint256 i = 1; i <= farmCounter; i++) {
            result[i - 1] = farms[i];
        }
        return result;
    }
}