// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract CLD_Crowdsale {
    address payable CLD;
    uint256 public CLD_Sale_Allocation;
    uint256 public Total_ETC_Deposited; 
    uint256 public Allocation_Exchange_Rate = 0;
    uint256 public Total_CLD_Distributed;
    address public CrowdSale_Operator;
    uint256 public Crowdsale_End_Unix;
    
    //DEV WALLETS (MAKE SURE TO CHANGE THESE BEFORE NEXT TEST)
    
    address payable LiquidityAddress = payable(0xC61A70Fb5F8A967C71c1E9A42374FbE460D0a341); //This address will be used to add the 80% of crowdsale funds as liquidity for wETC-CLS
    address payable TreasuryFund = payable(0xC61A70Fb5F8A967C71c1E9A42374FbE460D0a341); //This address will be used to add the 20% of crowdsale funds as liquidity for wETC-CLS
    
    address payable Dev_1 = payable(0x0000000000000000000000000000000000000000); //Personal Wallet of one of the developers () 62%
    address payable Dev_2 = payable(0xc932b3a342658A2d3dF79E4661f29DfF6D7e93Ce); //Personal Wallet of one of the developers (Kosimoto) 4.5%

    
    //Crowdsale Mode struct 
    struct Mode {
        string Sale_Mode_Text;
        uint8 Sale_Mode;
    }
    
    Mode Crowdsale_Mode;
    //Crowdsale Modes
    //1: Before sale preperation Mode
    //2: Sale is Open to buy CLS
    //3: Sale is over, CLS buyer withdrawal period
    //99 Emergency Shutdown mode, in case any issues or bugs need to be dealt with, Safe for buyers, and ETC withdrawls will be available
    
    
    //Crowdsale Contract constructor
    constructor(uint256 Sale_Allocation, address payable _CLD){
        CLD_Sale_Allocation = Sale_Allocation;
        CLD = _CLD;
        Crowdsale_Mode = Mode("Before sale preperation", 1);
        CrowdSale_Operator = msg.sender;
    }
    
    //Event Declarations
    event CrowdsaleStarted(address Operator, uint256 Crowdsale_Allocation, uint256 Unix_End);
    event CrowdsaleEnded(address Operator, uint256 wETCraised, uint256 BlockTimestamp);
    event ETCdeposited(address Depositor, uint256 Amount);
    event ETCwithdrawn(address Withdrawee, uint256 Amount);
    event CLSwithdrawn(address Withdrawee, uint256 Amount);
    event VariableChange(string Change);
    
    
    
    //Deposit Tracker
    mapping(address => uint256) ETC_Deposited;
    
    
    //Buyer Functions
    
    function DepositETC() public payable returns(bool success){ //TESTED - WORKS
        require(Crowdsale_Mode.Sale_Mode == 2);
        require(block.timestamp < Crowdsale_End_Unix);
        require(msg.value >= 1000000000000000);
        
        ETC_Deposited[msg.sender] = (ETC_Deposited[msg.sender] + msg.value);
        
        Total_ETC_Deposited = (Total_ETC_Deposited + msg.value);
        emit ETCdeposited(msg.sender, msg.value);
        return(success);
    } 
    
    //There is a 5% fee for withdrawing deposited wETC
    function WithdrawETC(uint256 amount) public returns(bool success){
        require(amount <= ETC_Deposited[msg.sender]);
        require(Crowdsale_Mode.Sale_Mode != 3 && Crowdsale_Mode.Sale_Mode != 1);
        require(amount >= 1000000000000000);
        uint256 amount_wFee;
        amount_wFee = (amount * 95 / 100);
        
        ETC_Deposited[msg.sender] = (ETC_Deposited[msg.sender] - amount);
        
        (payable(msg.sender)).transfer(amount_wFee);
        
        Total_ETC_Deposited = (Total_ETC_Deposited - amount_wFee);
        emit ETCwithdrawn(msg.sender, amount);
        return(success);
    }
    
    function WithdrawCLD() public returns(uint256 _CLSwithdrawn){ //TESTED - WORKS
        require(Crowdsale_Mode.Sale_Mode == 3);
        require(block.timestamp > Crowdsale_End_Unix);
        require(ETC_Deposited[msg.sender] >= 1000000000000000);
        
        
        uint256 CLDtoMintandSend;
        CLDtoMintandSend = (((ETC_Deposited[msg.sender] / 100000000) * Allocation_Exchange_Rate) / 100000000);
        require((Total_CLD_Distributed + CLDtoMintandSend) <= CLD_Sale_Allocation);
        
        ETC_Deposited[msg.sender] = 0;
        
        ERC20(CLD).Mint(msg.sender, CLDtoMintandSend);
        
        Total_CLD_Distributed = (Total_CLD_Distributed + CLDtoMintandSend);
        emit CLSwithdrawn(msg.sender, CLDtoMintandSend);
        return(CLDtoMintandSend);
    }
    
    
    
    //Operator Functions
    function StartCrowdsale() public returns(bool success){ //TESTED - WORKS
        require(msg.sender == CrowdSale_Operator);
        require(ERC20(CLD).CheckMinter(address(this)) == 1);
        require(Crowdsale_Mode.Sale_Mode == 1);
        require(Setup == 1);
        
        Crowdsale_End_Unix = (block.timestamp + 300);
        Crowdsale_Mode.Sale_Mode_Text = ("Sale is Open to buy CLS");
        Crowdsale_Mode.Sale_Mode = 2;
        
        emit CrowdsaleStarted(msg.sender, CLD_Sale_Allocation, Crowdsale_End_Unix);
        return success;
        
    }
    
    function EndCrowdsale() public returns(bool success){
        require(msg.sender == CrowdSale_Operator);
        require(ERC20(CLD).CheckMinter(address(this)) == 1);
        require(Crowdsale_Mode.Sale_Mode == 2);
        require(block.timestamp > Crowdsale_End_Unix);
        
        Crowdsale_Mode.Sale_Mode_Text = ("Sale is over, Time to withdraw CLS!");
        Crowdsale_Mode.Sale_Mode = 3;
        
        
        Allocation_Exchange_Rate = (((CLD_Sale_Allocation * 100000000) / (Total_ETC_Deposited / 100000000))); 
        
        emit CrowdsaleEnded(msg.sender, Total_ETC_Deposited, block.timestamp);
        return(success);
        
    }
    //This function only works when the crowdsale is in the post-sale mode(3), or in the Emergency mode(99)
    function PullETC() public returns(bool success){
        require(Crowdsale_Mode.Sale_Mode == 3 || Crowdsale_Mode.Sale_Mode == 99);
        require(block.timestamp > Crowdsale_End_Unix);
        
        bool Multisig;
        Multisig = MultiSignature();
        
        
        uint256 Contract_ETC_Balance;
        Contract_ETC_Balance = (address(this).balance);
        
        uint256 LiquidityFunds;
        LiquidityFunds = ((Contract_ETC_Balance * 60) / 100);
        
        uint256 DevFunds;
        DevFunds = ((Contract_ETC_Balance * 20) / 100);
        
        if (Multisig == true){
            (LiquidityAddress).transfer(LiquidityFunds);
            (TreasuryFund).transfer(((DevFunds * 160) / 1000));
            (Dev_1).transfer(((DevFunds * 620) / 1000));
            (Dev_2).transfer(((DevFunds * 45) / 1000));
        }

        return success;
    }
    
    function Emergency_Mode_Activate() public returns(bool success){
        bool Multisig;
        Multisig = MultiSignature();
        
        if (Multisig == true){
            
        Crowdsale_Mode.Sale_Mode_Text = ("The Developers have multisigned to activate emergencymode on this smart contract");
        Crowdsale_Mode.Sale_Mode = 99;
        
        return(success);
        }
    }

    function Resume_Sale() public returns(bool success){
        bool Multisig;
        Multisig = MultiSignature();
        require(Crowdsale_Mode.Sale_Mode == 99);
        require(block.timestamp < Crowdsale_End_Unix);
        
        if (Multisig == true){
            
        Crowdsale_Mode.Sale_Mode_Text = ("Sale is Open to buy CLS");
        Crowdsale_Mode.Sale_Mode = 2;
        
        return(success);
        }
    }
    
    //Redundancy
    function ChangeCLSaddy(address payable NewAddy)public returns(bool success, address CLSaddy){
        require(msg.sender == CrowdSale_Operator);
        require(Crowdsale_Mode.Sale_Mode != 3);
        CLD = NewAddy;
        emit VariableChange("Changed CLS Address");
        return(true, CLD);
    }
    
    //Call Functions
    function GetContractMode() public view returns(uint256, string memory){
        return (Crowdsale_Mode.Sale_Mode, Crowdsale_Mode.Sale_Mode_Text);
        
    }
    
    function GetETCdeposited(address _address) public view returns(uint256){
        return (ETC_Deposited[_address]);
    }

    //Make this contract accept ETH instead of WETH


    //_______________________________________________________________________________________________________________________________________________________________            
    //_______________________________________________________________________________________________________________________________________________________________
    
    
    //Multi-Sig Requirement for Fund Extraction post crowsale by Dev Team to reduce attack likelyness aswell as remove central point of authority
    uint8 public Signatures;
    address public SigAddress1;
    address public SigAddress2;
    address public SigAddress3;
    uint8 public Setup;
    bool public Verified;
    
    mapping(address => uint8) Signed;
    
    event MultiSigSet(bool Success);
    event MultiSigVerified(bool Success);
    

    
    function MultiSigSetup(address _1, address _2, address _3) public returns(bool success){
        require(Setup == 0);
        require(msg.sender == CrowdSale_Operator);
        require(Crowdsale_Mode.Sale_Mode == 1);
        
        SigAddress1 = _1;
        SigAddress2 = _2;
        SigAddress3 = _3;
        
        Setup = 1;
        
        emit MultiSigSet(true);
        return(success);
    }
    
    function MultiSignature() internal returns(bool AllowTransaction){
        require(msg.sender == SigAddress1 || msg.sender == SigAddress2 || msg.sender == SigAddress3);
        require(Signed[msg.sender] == 0);
        require(Setup == 1);
        Signed[msg.sender] = 1;
        
        if (Signatures == 1){
            Signatures = 0;
            Signed[SigAddress1] = 0;
            Signed[SigAddress2] = 0;
            Signed[SigAddress3] = 0;
            return(true);
        }
        
        if (Signatures == 0){
            Signatures = (Signatures + 1);
            return(false);
        }

    }
    
    function SweepSignatures() public returns(bool success){
        require(msg.sender == CrowdSale_Operator);
        require(Setup == 1);
        
        Signed[SigAddress1] = 0;
        Signed[SigAddress2] = 0;
        Signed[SigAddress3] = 0;
        
        Signatures = 0;
        
        return(success);
        
    }
    
    
    function MultiSigVerification() public returns(bool success){
        require(Verified == false);
        bool Verify;
        Verify = MultiSignature();
        
        if (Verify == true){
            Verified = true;
            emit MultiSigVerified(true);
        }
        
        return(Verify);
    }
    
    
    
    
    
    



    
    
    
}


interface ERC20 {
  function balanceOf(address owner) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint value) external returns (bool);
  function Mint(address _MintTo, uint256 _MintAmount) external;
  function transfer(address to, uint value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool); 
  function totalSupply() external view returns (uint);
  function CheckMinter(address AddytoCheck) external view returns(uint);
}

//      $$$$$$                     /$$                                /$$           /$$                      /$$      /$$               /$$                                               /$$                      
//    /$$__  $$                   | $$                               | $$          | $$                     | $$  /$ | $$              | $$                                              | $$                      
//   | $$  \__/ /$$$$$$ /$$$$$$$ /$$$$$$   /$$$$$$ /$$$$$$  /$$$$$$$/$$$$$$        | $$$$$$$ /$$   /$$      | $$ /$$$| $$ /$$$$$$  /$$$$$$$ /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$ /$$$$$$   /$$$$$$ /$$$$$$$ 
//   | $$      /$$__  $| $$__  $|_  $$_/  /$$__  $|____  $$/$$_____|_  $$_/        | $$__  $| $$  | $$      | $$/$$ $$ $$/$$__  $$/$$__  $$/$$__  $$/$$__  $$/$$__  $$|____  $$/$$__  $|_  $$_/  /$$__  $| $$__  $$
//   | $$     | $$  \ $| $$  \ $$ | $$   | $$  \__//$$$$$$| $$       | $$          | $$  \ $| $$  | $$      | $$$$_  $$$| $$$$$$$| $$  | $| $$$$$$$| $$  \__| $$  \ $$ /$$$$$$| $$  \__/ | $$   | $$$$$$$| $$  \ $$
//   | $$    $| $$  | $| $$  | $$ | $$ /$| $$     /$$__  $| $$       | $$ /$$      | $$  | $| $$  | $$      | $$$/ \  $$| $$_____| $$  | $| $$_____| $$     | $$  | $$/$$__  $| $$       | $$ /$| $$_____| $$  | $$
//   |  $$$$$$|  $$$$$$| $$  | $$ |  $$$$| $$    |  $$$$$$|  $$$$$$$ |  $$$$/      | $$$$$$$|  $$$$$$$      | $$/   \  $|  $$$$$$|  $$$$$$|  $$$$$$| $$     |  $$$$$$|  $$$$$$| $$       |  $$$$|  $$$$$$| $$  | $$
//   \______/ \______/|__/  |__/  \___/ |__/     \_______/\_______/  \___/        |_______/ \____  $$      |__/     \__/\_______/\_______/\_______|__/      \____  $$\_______|__/        \___/  \_______|__/  |__/
//                                                                                         /$$  | $$                                                       /$$  \ $$                                             

//