// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");
//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;
//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });
//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });
//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });
//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       const allowed = allowance ?? 0n;
//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;
//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }
//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });
//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };
//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });
//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };
//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);
//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });
//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>
//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>
//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>
//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { formatEther, parseEther } from "viem";
// import { useAccount } from "wagmi";

// import deployedContracts from "~~/contracts/deployedContracts";
// import {
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";

// export default function StakePage() {
//   const { address } = useAccount();
//   const [amount, setAmount] = useState("");

//   const stakeGov = deployedContracts[31337].StakeGov;
//   const govToken = deployedContracts[31337].GovToken;

//   /** READS */
//   const { data: myStake } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "stakes",
//     args: [address ?? undefined],
//     watch: true,
//   });

//   const { data: myVp } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [address ?? undefined],
//     watch: true,
//   });

//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [address ?? undefined],
//     watch: true,
//   });

//   const { data: allowance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "allowance",
//     args: [address ?? undefined, stakeGov.address as `0x${string}`],
//     watch: true,
//   });

//   /** WRITES — FIXED */
//   const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });

//   const { writeContractAsync: approveTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });

//   const { writeContractAsync: mintTx } = useScaffoldWriteContract({
//     contractName: "GovToken",
//   });

//   /** ACTION: STAKE */
//   const onStake = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);

//     try {
//       const allowed = allowance ?? 0n;

//       if (allowed < val) {
//         const ok = confirm("Allowance insufficient. Approve?");
//         if (!ok) return;

//         await approveTx({
//           functionName: "approve",
//           args: [stakeGov.address as `0x${string}`, val],
//         });
//       }

//       await stakeTx({
//         functionName: "stake",
//         args: [val],
//       });

//       setAmount("");
//       alert("Stake executed.");
//     } catch (err) {
//       console.error("Stake failed:", err);
//       alert("Stake failed.");
//     }
//   };

//   /** ACTION: WITHDRAW */
//   const onWithdraw = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);

//     try {
//       await stakeTx({
//         functionName: "withdraw",
//         args: [val],
//       });

//       setAmount("");
//       alert("Withdraw executed.");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed.");
//     }
//   };

//   /** ACTION: MINT (owner-only) */
//   const onMint = async () => {
//     if (!amount) return alert("Enter amount");
//     const val = parseEther(amount);

//     try {
//       await mintTx({
//         functionName: "mint",
//         args: [address ?? "0x0000000000000000000000000000000000000000", val],
//       });

//       alert("Mint tx sent.");
//     } catch (err) {
//       console.error(err);
//       alert("Mint failed.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>

//       <div className="mb-4">
//         <div>Connected: {address ?? "Not connected"}</div>
//         <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"} GOVT</div>
//         <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
//         <div>My GOVT balance: {myBalance ? Number(formatEther(myBalance)) : "0"}</div>
//         <div>Allowance to StakeGov: {allowance ? Number(formatEther(allowance)) : "0"}</div>
//       </div>

//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Amount (GOVT)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 rounded"
//         />

//         <button onClick={onStake} className="btn btn-primary">
//           Stake
//         </button>

//         <button onClick={onWithdraw} className="btn btn-secondary">
//           Withdraw
//         </button>

//         <button onClick={onMint} className="btn btn-ghost">
//           Mint (owner)
//         </button>
//       </div>

//       <p className="mt-4 text-sm text-gray-600">
//         If allowance is too low, the UI will automatically ask you to approve first.
//       </p>
//     </div>
//   );
// }

export default function StakePage() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");

  // dynamic contract lookup
  const { data: stakeGov } = useDeployedContractInfo("StakeGov");
  const { data: govToken } = useDeployedContractInfo("GovToken");

  /** Reads */
  const { data: myStake } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "stakes",
    args: [address],
    watch: true,
  });

  const { data: myVp } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "votingPowerOf",
    args: [address],
    watch: true,
  });

  const { data: myBalance } = useScaffoldReadContract({
    contractName: "GovToken",
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: allowance } = useScaffoldReadContract({
    contractName: "GovToken",
    functionName: "allowance",
    args: [address, stakeGov?.address],
    watch: true,
  });

  /** Writes */
  const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
    contractName: "StakeGov",
  });

  const { writeContractAsync: approveTx } = useScaffoldWriteContract({
    contractName: "GovToken",
  });

  const { writeContractAsync: mintTx } = useScaffoldWriteContract({
    contractName: "GovToken",
  });

  /** Stake */
  const onStake = async () => {
    if (!amount) return alert("Enter amount");
    const val = parseEther(amount);

    try {
      if ((allowance ?? 0n) < val) {
        await approveTx({
          functionName: "approve",
          args: [stakeGov!.address, val],
        });
      }

      await stakeTx({
        functionName: "stake",
        args: [val],
      });

      setAmount("");
      alert("Stake successful");
    } catch (e) {
      console.error(e);
      alert("Stake failed");
    }
  };

  /** Withdraw */
  const onWithdraw = async () => {
    if (!amount) return alert("Enter amount");
    const val = parseEther(amount);

    try {
      await stakeTx({
        functionName: "withdraw",
        args: [val],
      });

      setAmount("");
      alert("Withdraw successful");
    } catch (e) {
      console.error(e);
      alert("Withdraw failed");
    }
  };

  /** Mint (owner-only) */
  const onMint = async () => {
    if (!amount) return alert("Enter amount");
    const val = parseEther(amount);

    try {
      await mintTx({
        functionName: "mint",
        args: [address, val],
      });

      alert("Mint sent");
    } catch (e) {
      console.error(e);
      alert("Mint failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stake / Withdraw</h1>

      <div className="mb-4">
        <div>Connected: {address ?? "Not connected"}</div>
        <div>My stake: {myStake ? Number(formatEther(myStake)) : "0"}</div>
        <div>Voting power: {myVp ? Number(formatEther(myVp)) : "0"}</div>
        <div>Balance: {myBalance ? Number(formatEther(myBalance)) : "0"} GOVT</div>
        <div>Allowance: {allowance ? Number(formatEther(allowance)) : "0"}</div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="btn btn-primary" onClick={onStake}>
          Stake
        </button>

        <button className="btn btn-secondary" onClick={onWithdraw}>
          Withdraw
        </button>

        <button className="btn btn-ghost" onClick={onMint}>
          Mint (owner)
        </button>
      </div>

      <p className="mt-4 text-sm opacity-70">If allowance is low, approval will be requested automatically.</p>
    </div>
  );
}
