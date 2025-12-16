// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title StakeGov - staking + simple proposal/voting/execution
contract StakeGov {
    IERC20 public immutable token;

    uint256 public proposalCount;
    uint256 public constant MIN_DURATION = 60; // 60 seconds for tests
    uint256 public constant QUORUM_BPS = 1000; // 10% quorum (1000 bps)

    struct Proposal {
        address proposer;
        string metadata;
        uint256 start;
        uint256 end;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public stakes;
    uint256 public totalStaked;
    mapping(address => address) public delegates;
    mapping(address => uint256) public delegatedToMe;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event ProposalCreated(uint256 indexed id, address indexed proposer, uint256 start, uint256 end, string metadata);
    event Voted(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event Executed(uint256 indexed id);
    event DelegateChanged(address indexed delegator, address indexed from, address indexed to);

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "token zero");
        token = IERC20(tokenAddress);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Zero stake");
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
        stakes[msg.sender] += amount;
        totalStaked += amount;
        address to = delegates[msg.sender];
        if (to != address(0)) {
            delegatedToMe[to] += amount;
        }
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Zero withdraw");
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        stakes[msg.sender] -= amount;
        totalStaked -= amount;
        address to = delegates[msg.sender];
        if (to != address(0)) {
            delegatedToMe[to] -= amount;
        }
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function delegate(address to) external {
        address from = delegates[msg.sender];
        require(to != msg.sender, "Cannot delegate to self");
        if (from != address(0)) {
            delegatedToMe[from] -= stakes[msg.sender];
        }
        delegates[msg.sender] = to;
        if (to != address(0)) {
            delegatedToMe[to] += stakes[msg.sender];
        }
        emit DelegateChanged(msg.sender, from, to);
    }

    function votingPowerOf(address user) public view returns (uint256) {
        return stakes[user] + delegatedToMe[user];
    }

    /// @notice Create a proposal. Caller must have voting power > 0
    /// @param metadata arbitrary metadata string (could be IPFS hash or text)
    /// @param durationSeconds how long voting lasts (must be >= MIN_DURATION)
    function createProposal(string calldata metadata, uint256 durationSeconds) external returns (uint256) {
        require(votingPowerOf(msg.sender) > 0, "No voting power");
        require(durationSeconds >= MIN_DURATION, "Duration too short");
        uint256 id = ++proposalCount;
        uint256 start = block.timestamp;
        uint256 end = start + durationSeconds;
        proposals[id] = Proposal({
            proposer: msg.sender,
            metadata: metadata,
            start: start,
            end: end,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });
        emit ProposalCreated(id, msg.sender, start, end, metadata);
        return id;
    }

    /// @notice Cast vote. voting window is [start, end) — inclusive of start, exclusive of end.
    function vote(uint256 proposalId, bool support) external {
        Proposal storage p = proposals[proposalId];
        require(p.start != 0, "Unknown proposal");
        // use start <= now < end (exclusive end) to avoid ambiguous acceptance exactly at end second
        require(block.timestamp >= p.start && block.timestamp < p.end, "Voting closed");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        uint256 weight = votingPowerOf(msg.sender);
        require(weight > 0, "No voting power");
        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            p.forVotes += weight;
        } else {
            p.againstVotes += weight;
        }
        emit Voted(proposalId, msg.sender, support, weight);
    }

    function _passed(uint256 proposalId) internal view returns (bool) {
        Proposal storage p = proposals[proposalId];
        uint256 supply = totalStaked;
        if (supply == 0) return false;
        uint256 quorum = (supply * QUORUM_BPS) / 10000;
        return (p.forVotes > p.againstVotes) && (p.forVotes >= quorum);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(p.start != 0, "Unknown proposal");
        require(block.timestamp > p.end, "Voting not ended");
        require(!p.executed, "Already executed");
        require(_passed(proposalId), "Did not pass");
        p.executed = true;
        emit Executed(proposalId);
    }

    // -------------------------
    // Helpful view helpers for frontends/tests
    // -------------------------

    /// @notice Read full proposal fields
    function getProposal(
        uint256 proposalId
    )
        external
        view
        returns (
            address proposer,
            string memory metadata,
            uint256 start,
            uint256 end,
            uint256 forVotes,
            uint256 againstVotes,
            bool executed
        )
    {
        Proposal storage p = proposals[proposalId];
        require(p.start != 0, "Unknown proposal");
        return (p.proposer, p.metadata, p.start, p.end, p.forVotes, p.againstVotes, p.executed);
    }

    /// @notice True if voting window is currently open
    function isProposalActive(uint256 proposalId) external view returns (bool) {
        Proposal storage p = proposals[proposalId];
        if (p.start == 0) return false;
        return (block.timestamp >= p.start && block.timestamp < p.end);
    }

    /// @notice True if voting has ended (block.timestamp >= end)
    function hasProposalEnded(uint256 proposalId) external view returns (bool) {
        Proposal storage p = proposals[proposalId];
        if (p.start == 0) return false;
        return block.timestamp >= p.end;
    }
}
