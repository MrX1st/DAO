// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import ProposalItem from "./ProposalItem";
import { useBlock } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );
//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };
//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }
//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";
// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);
//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>
//       {proposalCount === 0 && <p>No proposals yet.</p>}
//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// type ProposalView = {
//   id: number;
//   proposer: string;
//   metadata: string;
//   start: bigint;
//   end: bigint;
//   forVotes: bigint;
//   againstVotes: bigint;
//   executed: boolean;
// };

// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//   });
//   const proposalCount = Number(proposalCountRaw ?? 0);

//   // read a single proposal by id (1-based as your contract uses)
//   const proposalHooks = Array.from({ length: proposalCount }, (_, i) =>
//     useScaffoldReadContract({
//       contractName: "StakeGov",
//       functionName: "proposals",
//       args: [BigInt(i + 1)],
//     }),
//   );

//   const voteWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: voteTx } = voteWrite;

//   const [loadingId, setLoadingId] = useState<number | null>(null);

//   const onVote = async (id: number, support: boolean) => {
//     setLoadingId(id);
//     try {
//       await voteTx?.({
//         functionName: "vote",
//         args: [BigInt(id), support],
//       });
//       alert("Voted");
//     } catch (e) {
//       console.error(e);
//       alert("Vote failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   if (proposalCount === 0) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">No proposals yet</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>

//       <div className="space-y-4">
//         {proposalHooks.map((h, idx) => {
//           const id = idx + 1;
//           const p = h.data as any as ProposalView | undefined;
//           if (!p) {
//             return (
//               <div key={id} className="border p-4 rounded">
//                 <div>Loading proposal #{id} ...</div>
//               </div>
//             );
//           }

//           return (
//             <div key={id} className="border p-4 rounded">
//               <div className="flex justify-between">
//                 <div>
//                   <strong>#{id}</strong> by <code>{p.proposer}</code>
//                 </div>
//                 <div>{p.executed ? "Executed" : "Open"}</div>
//               </div>
//               <div className="mt-2">Metadata: {p.metadata}</div>
//               <div className="mt-2">
//                 Votes: For {Number((p.forVotes as bigint) / BigInt(1e18))} — Against{" "}
//                 {Number((p.againstVotes as bigint) / BigInt(1e18))}
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => onVote(id, true)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote For"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => onVote(id, false)}
//                   disabled={loadingId === id}
//                 >
//                   {loadingId === id ? "Working..." : "Vote Against"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useBlock } from "wagmi";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import ProposalItem from "./ProposalItem";

// export default function ProposalsPage() {
//   const { data: proposalCountRaw } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });

//   const proposalCount = Number(proposalCountRaw ?? 0);

//   // blockchain timestamp
//   const { data: latestBlock } = useBlock({ watch: true });
//   const now = Number(latestBlock?.timestamp ?? 0) * 1000;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Proposals</h1>

//       {proposalCount === 0 && <p>No proposals yet.</p>}

//       <div className="space-y-4">
//         {Array.from({ length: proposalCount }, (_, i) => (
//           <ProposalItem key={i + 1} id={i + 1} now={now} />
//         ))}
//       </div>
//     </div>
//   );
// }

export default function ProposalsPage() {
  const { data: proposalCountRaw } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "proposalCount",
    watch: true,
  });

  const count = Number(proposalCountRaw ?? 0);

  const { data: latestBlock } = useBlock({ watch: true });
  const now = Number(latestBlock?.timestamp ?? 0) * 1000;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proposals</h1>

      {count === 0 && <p>No proposals yet.</p>}

      <div className="space-y-4">
        {Array.from({ length: count }, (_, i) => (
          <ProposalItem key={i + 1} id={i + 1} now={now} />
        ))}
      </div>
    </div>
  );
}
