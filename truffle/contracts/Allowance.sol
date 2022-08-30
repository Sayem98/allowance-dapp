// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.14;

import '../node_modules/@OpenZeppelin/contracts/access/Ownable.sol';
import '../node_modules/@OpenZeppelin/contracts/utils/math/SafeMath.sol';



contract Allowance is Ownable{

    struct Data{
        bool isAllowed;
        uint value;
    }
    using SafeMath for uint;
    mapping(address=> Data ) public Allowances;

    // Adding events 
    event DepositEvent(address _sender, uint _value);
    event AllowEvent(address _who, address _by, uint _ammount);
    event ReduceAllowanceEvent(address _who, uint _ammount);
    event WithdrawEvent(address _who, uint _ammount);

    constructor() {
        
    }


    function Deposit() public payable{
        //The owner deposits the money for allowance.
        emit DepositEvent(msg.sender, msg.value);
    }

    function Balance() public view returns(uint){
        return address(this).balance;
    }

    //Allowing a new person by only the owner the contract.
    function Allow(address _person, uint _value) public onlyOwner{
        Data storage data = Allowances[_person];

        data.isAllowed = true;
        data.value = data.value+_value;

        emit AllowEvent(_person, msg.sender, _value);


    }

    function ReduceAllowance(address _person, uint _value) private {

        Allowances[_person].value=Allowances[_person].value.sub(_value);

        emit ReduceAllowanceEvent(_person, _value);
    }

    function Withdraw(uint _value) public {
        require(owner() != msg.sender || Allowances[msg.sender].isAllowed == false,
         'Sorry you are not allowed to withdraw');

         if(msg.sender != owner()){
                require(Allowances[msg.sender].value>=_value, 'Ammount not allowed !');

         }
        address payable recipient = payable(msg.sender);
        recipient.transfer(_value);
        emit WithdrawEvent(msg.sender, _value);
        ReduceAllowance(msg.sender, _value);
        
    }




    function  transferOwnership(address _newOwner) public override pure{
        require(1 == 0, 'Can not transfer ownership.');
        _newOwner;
    }
    function renounceOwnership() public override view onlyOwner {
        require(1 == 0, 'Can not Renounce ownership.');
        
    }




    


}