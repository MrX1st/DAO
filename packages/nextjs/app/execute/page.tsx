// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;
//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// export default function ExecutePage() {
//   const [proposalId, setProposalId] = useState("");
//   const execWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: execTx, isMining } = execWrite;

//   const onExecute = async () => {
//     if (!proposalId) return alert("Enter proposal id");
//     try {
//       await execTx?.({
//         functionName: "executeProposal",
//         args: [BigInt(proposalId)],
//       });
//       alert("Executed (if passed and end time reached).");
//       setProposalId("");
//     } catch (e) {
//       console.error(e);
//       alert("Execute failed (maybe duration not passed or not enough votes).");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           placeholder="Proposal id"
//           value={proposalId}
//           onChange={(e) => setProposalId(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Executing..." : "Execute"}
//         </button>
//       </div>
//       <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
//     </div>
//   );
// }

export default function ExecutePage() {
  const [proposalId, setProposalId] = useState("");
  const { writeContractAsync: execTx, isMining } = useScaffoldWriteContract({ contractName: "StakeGov" });

  const onExecute = async () => {
    if (!proposalId) return alert("Enter proposal ID");

    const id = Number(proposalId);
    if (isNaN(id) || id <= 0) return alert("Proposal ID must be a positive number");

    try {
      await execTx?.({
        functionName: "executeProposal",
        args: [BigInt(id)],
      });
      alert("Executed (if passed and end time reached).");
      setProposalId("");
    } catch (e) {
      console.error(e);
      alert("Execute failed (maybe duration not passed or not enough votes).");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Execute Proposal</h1>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Proposal id"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={onExecute} className="btn btn-primary" disabled={!!isMining}>
          {isMining ? "Executing..." : "Execute"}
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">Only works for passed proposals after the voting end time.</p>
    </div>
  );
}
