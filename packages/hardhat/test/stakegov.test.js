const { expect } = require("chai");
const { ethers } = require("hardhat");

// helper to increase time
async function timeIncrease(seconds) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

describe("StakeGov", function () {
  let GovToken, StakeGov;
  let token, gov;
  let deployer, alice, bob, carol;

  beforeEach(async function () {
    [deployer, alice, bob, carol] = await ethers.getSigners();

    GovToken = await ethers.getContractFactory("GovToken");
    token = await GovToken.deploy("Governance Token", "GOVT", ethers.parseEther("1000"));
    await token.waitForDeployment();

    await token.mint(alice.address, ethers.parseEther("100"));
    await token.mint(bob.address, ethers.parseEther("100"));
    await token.mint(carol.address, ethers.parseEther("100"));

    const tokenAddress = await token.getAddress();

    StakeGov = await ethers.getContractFactory("StakeGov");
    gov = await StakeGov.deploy(tokenAddress);
    await gov.waitForDeployment();
  });

  it("stake increases voting power and emits event", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("10"));
    await expect(gov.connect(alice).stake(ethers.parseEther("10")))
      .to.emit(gov, "Staked")
      .withArgs(alice.address, ethers.parseEther("10"));

    expect(await gov.stakes(alice.address)).to.equal(ethers.parseEther("10"));
    expect(await gov.votingPowerOf(alice.address)).to.equal(ethers.parseEther("10"));
    expect(await gov.totalStaked()).to.equal(ethers.parseEther("10"));
  });

  it("createProposal emits ProposalCreated and requires voting power", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("5"));
    await gov.connect(alice).stake(ethers.parseEther("5"));

    await expect(gov.connect(alice).createProposal("ipfs://QmTest", 60))
      .to.emit(gov, "ProposalCreated");

    expect(await gov.proposalCount()).to.equal(1);

    const p = await gov.proposals(1);
    expect(p.proposer).to.equal(alice.address);
    expect(p.metadata).to.equal("ipfs://QmTest");
  });

  it("vote increases forVotes and prevents double voting", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("10"));
    await gov.connect(alice).stake(ethers.parseEther("10"));
    await gov.connect(alice).createProposal("test", 60);

    await token.connect(bob).approve(await gov.getAddress(), ethers.parseEther("8"));
    await gov.connect(bob).stake(ethers.parseEther("8"));

    await expect(gov.connect(bob).vote(1, true)).to.emit(gov, "Voted");
    const pAfter = await gov.proposals(1);
    expect(pAfter.forVotes).to.equal(ethers.parseEther("8"));

    await expect(gov.connect(bob).vote(1, false)).to.be.revertedWith("Already voted");
  });

  it("voting without stake reverts", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("5"));
    await gov.connect(alice).stake(ethers.parseEther("5"));
    await gov.connect(alice).createProposal("test2", 60);

    await expect(gov.connect(carol).vote(1, true)).to.be.revertedWith("No voting power");
  });

  it("executeProposal requires voting ended and passed", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("10"));
    await gov.connect(alice).stake(ethers.parseEther("10"));
    await gov.connect(alice).createProposal("exec", 60);

    await token.connect(bob).approve(await gov.getAddress(), ethers.parseEther("10"));
    await gov.connect(bob).stake(ethers.parseEther("10"));
    await gov.connect(bob).vote(1, true);

    await timeIncrease(61);

    await expect(gov.connect(alice).executeProposal(1)).to.emit(gov, "Executed");

    const p = await gov.proposals(1);
    expect(p.executed).to.equal(true);

    await expect(gov.connect(alice).executeProposal(1)).to.be.revertedWith("Already executed");
  });

  it("delegation transfers voting power effects", async function () {
    await token.connect(alice).approve(await gov.getAddress(), ethers.parseEther("5"));
    await gov.connect(alice).stake(ethers.parseEther("5"));

    await expect(gov.connect(alice).delegate(bob.address)).to.emit(gov, "DelegateChanged");

    const bobVP = await gov.votingPowerOf(bob.address);
    expect(bobVP).to.equal(ethers.parseEther("5"));
  });
});
