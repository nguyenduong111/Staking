// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
pragma abicoder v2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "./Token.sol";

contract StakingBonus{
    using Counters for Counters.Counter;
    Counters.Counter public ID;
    Token public immutable tokenA;
    Token public immutable tokenB;
    address public owner;
    uint256 public d3 = 30;    // r3 = 3%
    uint256 public d6 = 60;    // r6 = 6%
    uint256 public d9 = 90;    // r9 = 9%
    uint256 public d12 = 120;  // r12 = 12%
    uint256 public bonusWillPay = 0;

    struct StakingUserInfo{
        uint256 balanceStakeOf;
        uint256 timeStartStake;
        uint256 durationUser;
        uint256 IDStake;
        uint256 amountRewardClaimed;
        uint256 totalReward;
    }    
    
    mapping(address => StakingUserInfo[]) private stakingUserInfo; 

    constructor(address _tokenA,address _tokenB) {
        owner = msg.sender;
        tokenA = Token(_tokenA);
        tokenB = Token(_tokenB);
    }

    // modifier ------------------------------------------------------------------------------------------------------

    /**
     * @dev set stake of user = 0, time end stake of user = 0 and duration
     *      staking of user = 0
    */ 
    modifier resetStakeOfUser(uint256 _ID){
        _;
        uint256 bonus = calculateBonus(findStake(msg.sender,_ID).balanceStakeOf,findStake(msg.sender,_ID).durationUser);
        bonusWillPay -= bonus;
        bool check = false;
        uint256 stakeLength = stakingUserInfo[msg.sender].length;
        for(uint256 i=0;i< stakeLength; i++){
            if(_ID == stakingUserInfo[msg.sender][i].IDStake){
                stakingUserInfo[msg.sender][i] = stakingUserInfo[msg.sender][stakeLength - 1];
                check = true;
            }
        }
        if(check){
            stakingUserInfo[msg.sender].pop();
        }
    }

    modifier requireStartStaking(uint256 _amount,uint256 _duration){
        require(_duration == d3 || _duration == d6 || _duration == d9 || _duration == d12, "wrong duration");
        require(_amount > 0, "amount = 0");
        bonusWillPay += calculateBonus( _amount,_duration);
        require(tokenB.balanceOf(address(this)) >= bonusWillPay,"not enough balance to pay reward");
        _;
    }

    // function -----------------------------------------------------------------------------------------

    function totalStakingBalanceOfUser(address _account) view public returns(uint256){
        uint256 total;
        for(uint256 i = 0;i < stakingUserInfo[_account].length; i++){
            total += stakingUserInfo[_account][i].balanceStakeOf;
        }
        return total;
    }

    function findStake(address _account, uint256 _ID) view internal returns(StakingUserInfo storage){
        for(uint256 i=0;i< stakingUserInfo[_account].length; i++){
            if(_ID == stakingUserInfo[_account][i].IDStake){
                return stakingUserInfo[_account][i];
            }
        }
        revert('Not found');
    }

    function addStakeOfUser(uint256 _balanceStakeOf, uint256 _timeStartStake, uint256 _durationUser,address _account) internal{
        uint256 totalReward = calculateBonus( _balanceStakeOf,_durationUser); 
        StakingUserInfo memory newStake = StakingUserInfo(_balanceStakeOf,_timeStartStake,_durationUser,ID.current(),0,totalReward);
        stakingUserInfo[_account].push(newStake);
        ID.increment();
    }

    /**
     * @dev Stake
    */ 
    function stake(uint256 _amount,uint256 _duration) requireStartStaking(_amount,_duration) external{ 
        uint256 _timeStartStake = block.timestamp;
        addStakeOfUser(_amount,_timeStartStake, _duration, msg.sender);
        tokenA.transferFrom(msg.sender, address(this), _amount);
    }

    /**
     * @dev Withdraw when duration of staking is over
     * @dev Get staking tokenA and bonus tokenB   
    */ 
    function withdrawFulltime(uint256 _ID) external resetStakeOfUser(_ID){
        StakingUserInfo memory data = findStake(msg.sender, _ID);
        require(data.amountRewardClaimed == data.totalReward, "must claim all reward!!!");
        uint256 duration = data.durationUser;
        uint256 startTime = data.timeStartStake;
        require(startTime + duration < block.timestamp ,"haven't time yet");
          
        tokenA.transfer(msg.sender, data.balanceStakeOf);
          
    }
 
    /**
     * @dev User force withdraw when the time had not yet come
     * @dev When force withdraw, user get 1% bonus per every 10 second
    */ 
    // function forceWithdraw(uint256 _ID) external resetStakeOfUser(_ID){
    //     require(findStake(msg.sender,_ID).timeEndStake > block.timestamp ,"go to withdrawFullTime");
    //     uint256 bonus = calculateForceWithdrawBonus(findStake(msg.sender,_ID).balanceStakeOf,findStake(msg.sender,_ID).timeStartStake);
    //     require(tokenB.balanceOf(address(this)) >= bonus,"not enough balance");
    //     if(bonus > 0) {
    //         tokenA.transfer(msg.sender, findStake(msg.sender,_ID).balanceStakeOf);
    //         tokenB.transfer(msg.sender, bonus);
    //     }  
    // }

    function claimReward(uint256 _ID) external {
        StakingUserInfo storage data = findStake(msg.sender, _ID);
        require(data.amountRewardClaimed < data.totalReward, "bonus has been withdrawn");
        uint256 duration = data.durationUser;
        uint256 startTime = data.timeStartStake;
        uint256 amount = data.balanceStakeOf;
        uint256 bonus = 0;
        uint256 totalRewardClaimed = data.amountRewardClaimed;

        if(block.timestamp - startTime >= duration) {
          bonus = calculateBonus(amount, duration) - totalRewardClaimed;
        }else {
          bonus = calculateForceWithdrawBonus(amount, startTime) - totalRewardClaimed;
        }
        require(tokenB.balanceOf(address(this)) >= bonus,"not enough balance");
        data.amountRewardClaimed += bonus;
        tokenB.transfer(msg.sender, bonus);
    }

    // view function -------------------------------------------------------------------------------------

    /**
     * @dev Calculate forceWithdraw bonus
    */ 
    function calculateForceWithdrawBonus(uint256 _amount,uint256 _timeStartStake) public view returns(uint256 bonus){
        // describe how many `10 second` passed
        uint256 cycleBonus = (block.timestamp - _timeStartStake) / 20;
        // every 10 second equal 1% rate bonus
        bonus = cycleBonus*_amount*1/100;
        return bonus;
    }

    /**
     * @dev Calculate bonus full time
    */ 
    function calculateBonus(uint256 _amount,uint256 _duration) public view returns(uint256 bonus){
        require(_duration == d3 || _duration == d6 || _duration == d9 || _duration == d12);
        if(_duration == d3){
            bonus = _amount*3/100; // r3 = 3%;
        }
        else if(_duration == d6){
            bonus = _amount*6/100; // r6 = 6%;
        }
        else if(_duration == d9){
            bonus = _amount*9/100; // r9 = 9%;
        }
        else if(_duration == d12){
            bonus = _amount*12/100; // r12 = 12%;
        }
        return bonus;
    }
    
    /**
     * @dev Get skake info of `_account`
    */ 
    function getAllStakeUser(address _account) view external returns(StakingUserInfo[] memory){ 
        return stakingUserInfo[_account];
    }

    /**
     * @dev Get time left to earn reward of `_account`
    */ 
    function viewTimeUntilWithDrawFullTime(address _account,uint256 _ID) view external returns(uint256){ 
        return findStake(_account,_ID).timeStartStake + findStake(_account,_ID).durationUser - block.timestamp;
    }

    function viewAmountBonusCurrent(address user, uint256 _ID) view external returns(uint256 bonus) {
      StakingUserInfo memory data = findStake(user, _ID);
      uint256 duration = data.durationUser;
      uint256 startTime = data.timeStartStake;
      uint256 amount = data.balanceStakeOf;
      uint256 totalRewardClaimed = data.amountRewardClaimed;


      if(block.timestamp - startTime >= duration) {
        bonus = calculateBonus(amount, duration) - totalRewardClaimed;
      }else {
        bonus = calculateForceWithdrawBonus(amount, startTime) - totalRewardClaimed;
      }

      return bonus;
    }

}