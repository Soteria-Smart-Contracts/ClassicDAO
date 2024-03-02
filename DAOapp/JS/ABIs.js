window.CoreABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			}
		],
		"name": "FailedExecution",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FallbackToTreasury",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "NewTreasury",
				"type": "address"
			}
		],
		"name": "NewTreasurySet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			}
		],
		"name": "SucceededExecution",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "CLDAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "CLD",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			}
		],
		"name": "ExecutionFailed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FoundationAddress",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			}
		],
		"name": "HandleEndedProposal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "IsActiveContract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LatestSale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MRIdentifier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ProposalCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ProposalInfos",
		"outputs": [
			{
				"internalType": "string",
				"name": "Memo",
				"type": "string"
			},
			{
				"internalType": "enum Winslow_Core_V1.ProposalTypes",
				"name": "ProposalType",
				"type": "uint8"
			},
			{
				"internalType": "enum Winslow_Core_V1.SimpleProposalTypes",
				"name": "SimpleType",
				"type": "uint8"
			},
			{
				"internalType": "enum Winslow_Core_V1.ProposalStatus",
				"name": "Status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "VotingInstanceID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Proposals",
		"outputs": [
			{
				"internalType": "address",
				"name": "AddressSlot",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "RequestedEtherAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "RequestedAssetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "RequestedAssetID",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "OptionsAvailable",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "Multi",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Executed",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "Proposer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SaleActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SaleCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SaleFactoryContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Sales",
		"outputs": [
			{
				"internalType": "address",
				"name": "Winslow_Sale_V2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "CLDSaleAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "StartTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EndTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			}
		],
		"name": "SetProposalVoting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ProposalAddress",
				"type": "address"
			}
		],
		"name": "SubmitErosProposal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "Memo",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "AddressSlot",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "UintSlot",
				"type": "uint256"
			},
			{
				"internalType": "enum Winslow_Core_V1.SimpleProposalTypes",
				"name": "SimpleType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "RequestedEther",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "RequestedAssetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "RequestedAssetID",
				"type": "uint8"
			}
		],
		"name": "SubmitSimpleProposal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TreasuryContract",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Version",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "VoteLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "VotingContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

window.VotingABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "Proposer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Timestamp",
				"type": "uint256"
			}
		],
		"name": "InstanceCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "NewAddress",
				"type": "address"
			}
		],
		"name": "NewDAOAddress",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "donator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountDonated",
				"type": "uint256"
			}
		],
		"name": "ProposalIncentivized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "Voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "TotalSent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "IncentiveShare",
				"type": "uint256"
			}
		],
		"name": "TokensReturned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "Voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "option",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "votesCasted",
				"type": "uint256"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "Result",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "Multi",
				"type": "uint8"
			}
		],
		"name": "VotingEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "StartTime",
				"type": "uint256"
			}
		],
		"name": "VotingStarted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ActiveInstances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BeginNextVote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BurnCut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CLDAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "CLD",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "enum Winslow_Voting_V1.Vote",
				"name": "VoteChoice",
				"type": "uint8"
			},
			{
				"internalType": "enum Winslow_Voting_V1.MultiOptions",
				"name": "OptionChoice",
				"type": "uint8"
			}
		],
		"name": "CastMultiVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "enum Winslow_Voting_V1.Vote",
				"name": "VoteChoice",
				"type": "uint8"
			}
		],
		"name": "CastVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAddr",
				"type": "address"
			}
		],
		"name": "ChangeDAO",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newQuorum",
				"type": "uint256"
			}
		],
		"name": "ChangeQuorum",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CurrentOngoingVote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DAO",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ExecutorCut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_VoteInstance",
				"type": "uint256"
			}
		],
		"name": "GetVoteResult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "Result",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "Multi",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_VoteInstance",
				"type": "uint256"
			}
		],
		"name": "GetVotingInstance",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ProposalID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "VoteStarts",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "VoteEnds",
						"type": "uint256"
					},
					{
						"internalType": "enum Winslow_Voting_V1.VoteStatus",
						"name": "Status",
						"type": "uint8"
					},
					{
						"internalType": "address[]",
						"name": "Voters",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "TotalCLDVoted",
						"type": "uint256"
					},
					{
						"internalType": "uint8",
						"name": "MaxMulti",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "YEAvotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "NAYvotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "TotalIncentive",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "IncentivePerVote",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "CLDtoIncentive",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "CLDToBurn",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "CLDToExecutioner",
						"type": "uint256"
					}
				],
				"internalType": "struct Winslow_Voting_V1.VoteInstance",
				"name": "Instance",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetVotingQueue",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "IncentivizeProposal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "MaxMulti",
				"type": "uint8"
			}
		],
		"name": "InitializeVoteInstance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "VoteInstanceID",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "MultiVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "OptionOne",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "OptionTwo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "OptionThree",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "OptionFour",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "OptionFive",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OngoingVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Quorum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReturnAllVotedTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "VotingInstance",
				"type": "uint256"
			}
		],
		"name": "ReturnTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "NewExecCut",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "NewBurnCut",
				"type": "uint256"
			}
		],
		"name": "SetTaxAmount",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserUnreturnedVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserUnreturnedVotesIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Version",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "VoterInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "VotesLocked",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "CLDReturned",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "VotingInstances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ProposalID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "VoteStarts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "VoteEnds",
				"type": "uint256"
			},
			{
				"internalType": "enum Winslow_Voting_V1.VoteStatus",
				"name": "Status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "TotalCLDVoted",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "MaxMulti",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "YEAvotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "NAYvotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TotalIncentive",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "IncentivePerVote",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CLDtoIncentive",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CLDToBurn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CLDToExecutioner",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "VotingQueue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "VotingQueueIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.CLDABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_TokenCap",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "burner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "buramount",
                "type": "uint256"
            }
        ],
        "name": "BurnEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newminter",
                "type": "address"
            }
        ],
        "name": "ManageMinterEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_BurnAmount",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TokenCap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "Address",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]