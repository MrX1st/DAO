// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }
"use client";

import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";
// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });
//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);
//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;
//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };
//   if (!p) return <div>Loading...</div>;
//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;
//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>
//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>
//       <div className="mt-1">Metadata: {p.metadata}</div>
//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>
//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}
//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import {
//     useScaffoldReadContract,
//     useScaffoldWriteContract,
// } from "~~/hooks/scaffold-eth";

// export default function ProposalItem({ id, now }: { id: number; now: number }) {
//   const { data: rawProposal } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposals",
//     args: [BigInt(id)],
//     watch: true,
//   });

//   // Force UI refresh every second (fix for proposal not updating)
//   const [, forceRefresh] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => forceRefresh((x) => x + 1), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const p = rawProposal
//     ? {
//         proposer: rawProposal[0] as string,
//         metadata: rawProposal[1] as string,
//         start: Number(rawProposal[2]) * 1000,
//         end: Number(rawProposal[3]) * 1000,
//         forVotes: rawProposal[4] as bigint,
//         againstVotes: rawProposal[5] as bigint,
//         executed: rawProposal[6] as boolean,
//       }
//     : null;

//   const { writeContractAsync: voteTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });

//   const vote = async (support: boolean) => {
//     await voteTx({
//       functionName: "vote",
//       args: [BigInt(id), support],
//     });
//   };

//   if (!p) return <div>Loading...</div>;

//   const isOpen = now >= p.start && now <= p.end && !p.executed;
//   const isExpired = now > p.end;

//   return (
//     <div className="border p-4 rounded">
//       <div className="flex justify-between">
//         <span>
//           <strong>#{id}</strong> by {p.proposer}
//         </span>

//         <span>
//           {p.executed
//             ? "Executed"
//             : isOpen
//             ? "Open"
//             : isExpired
//             ? "Closed"
//             : "Pending"}
//         </span>
//       </div>

//       <div className="mt-1">Metadata: {p.metadata}</div>

//       <div className="mt-2">
//         <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
//         <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
//       </div>

//       {isOpen && !p.executed && (
//         <div className="mt-2 flex gap-2">
//           <button className="btn btn-primary" onClick={() => vote(true)}>
//             Vote For
//           </button>
//           <button className="btn btn-secondary" onClick={() => vote(false)}>
//             Vote Against
//           </button>
//         </div>
//       )}

//       {!isOpen && !p.executed && (
//         <div className="text-xs opacity-70 mt-2">Voting not active.</div>
//       )}
//     </div>
//   );
// }

export default function ProposalItem({ id, now }: { id: number; now: number }) {
  const { data: rawProposal } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "proposals",
    args: [BigInt(id)],
    watch: true,
  });

  const p = rawProposal
    ? {
        proposer: rawProposal[0] as string,
        metadata: rawProposal[1] as string,
        start: Number(rawProposal[2]) * 1000,
        end: Number(rawProposal[3]) * 1000,
        forVotes: rawProposal[4] as bigint,
        againstVotes: rawProposal[5] as bigint,
        executed: rawProposal[6] as boolean,
      }
    : null;

  const { writeContractAsync: voteTx } = useScaffoldWriteContract({ contractName: "StakeGov" });

  const vote = async (support: boolean) => {
    await voteTx({
      functionName: "vote",
      args: [BigInt(id), support],
    });
  };

  if (!p) return <div>Loading...</div>;

  const isOpen = now >= p.start && now <= p.end && !p.executed;
  const isExpired = now > p.end;

  return (
    <div className="border p-4 rounded">
      <div className="flex justify-between">
        <span>
          <strong>#{id}</strong> by {p.proposer}
        </span>

        <span>{p.executed ? "Executed" : isOpen ? "Open" : isExpired ? "Closed" : "Pending"}</span>
      </div>

      <div className="mt-1">Metadata: {p.metadata}</div>

      <div className="mt-2">
        <strong>For:</strong> {Number(p.forVotes) / 1e18} &nbsp; | &nbsp;
        <strong>Against:</strong> {Number(p.againstVotes) / 1e18}
      </div>

      {isOpen && !p.executed && (
        <div className="mt-2 flex gap-2">
          <button className="btn btn-primary" onClick={() => vote(true)}>
            Vote For
          </button>
          <button className="btn btn-secondary" onClick={() => vote(false)}>
            Vote Against
          </button>
        </div>
      )}

      {!isOpen && !p.executed && <div className="text-xs opacity-70 mt-2">Voting not active.</div>}
    </div>
  );
}
