// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAccount, useBlock } from "wagmi";
import {
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useTargetNetwork,
} from "~~/hooks/scaffold-eth";

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";
// // import Link from "next/link";
// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">
// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>
// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>
// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>
// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>
// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>
// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";
// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";
// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };
// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();
//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });
//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });
//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });
//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });
//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });
//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });
//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });
//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);
//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];
//     const evs: Array<{ t: number; delta: number }> = [];
//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };
//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));
//     const buckets: Record<string, number> = {};
//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });
//     let acc = 0;
//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);
//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");
//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });
//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;
//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };
//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }
//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);
//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }
//     if (filter === "executed") return p.executed ?? false;
//     return true;
//   });
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>
//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>
//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>
//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>
//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>
//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>
//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>
//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>
//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>
//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// // "use client";

// // import Link from "next/link";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-10">

// //       <h1 className="text-4xl font-bold mb-8">Stake & Governance DAO</h1>

// //       <p className="opacity-80 mb-10 max-w-xl text-center">
// //         Welcome to your decentralized governance system.
// //         Stake tokens, create proposals, vote, delegate, and execute decisions.
// //       </p>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">

// //         <Link href="/stake" className="btn btn-primary w-full">
// //           Stake Tokens
// //         </Link>

// //         <Link href="/proposals" className="btn btn-secondary w-full">
// //           View Proposals
// //         </Link>

// //         <Link href="/create" className="btn btn-accent w-full">
// //           Create Proposal
// //         </Link>

// //         <Link href="/delegate" className="btn w-full">
// //           Delegate Voting Power
// //         </Link>

// //         <Link href="/execute" className="btn btn-warning w-full">
// //           Execute Proposal
// //         </Link>
// //       </div>

// //     </div>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useAccount } from "wagmi";

// import { Address } from "@scaffold-ui/components";
// import {
//   useScaffoldEventHistory,
//   useScaffoldReadContract,
//   useScaffoldWriteContract,
//   useTargetNetwork,
// } from "~~/hooks/scaffold-eth";

// // Small helpers
// const fmt = (v: any) => {
//   if (v === undefined || v === null) return "--";
//   try {
//     if (typeof v === "bigint") return Number(v).toLocaleString();
//     if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
//     return v.toString();
//   } catch {
//     return String(v);
//   }
// };

// export default function DAOHome() {
//   const { address: connectedAddress } = useAccount();
//   const { targetNetwork } = useTargetNetwork();

//   // ---- Reads ----
//   const { data: totalSupply } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "totalSupply",
//     watch: true,
//   });

//   const { data: myBalance } = useScaffoldReadContract({
//     contractName: "GovToken",
//     functionName: "balanceOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });

//   const { data: totalStaked } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "totalStaked",
//     watch: true,
//   });

//   const { data: myVotingPower } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "votingPowerOf",
//     args: [connectedAddress ?? undefined],
//     watch: true,
//   });

//   const { data: proposalCount } = useScaffoldReadContract({
//     contractName: "StakeGov",
//     functionName: "proposalCount",
//     watch: true,
//   });

//   // ---- Events ----
//   const { data: proposalsCreated } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "ProposalCreated",
//     watch: true,
//   });

//   const { data: stakeEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Staked",
//     watch: true,
//   });

//   const { data: withdrawEventsData } = useScaffoldEventHistory({
//     contractName: "StakeGov",
//     eventName: "Withdrawn",
//     watch: true,
//   });

//   // ---- Proposal IDs ----
//   const proposalIds = useMemo(() => {
//     const n = proposalCount ? Number(proposalCount.toString()) : 0;
//     return Array.from({ length: n }, (_, i) => i);
//   }, [proposalCount]);

//   // ---- Chart data ----
//   const chartData = useMemo(() => {
//     const stakeEvents = stakeEventsData ?? [];
//     const withdrawEvents = withdrawEventsData ?? [];

//     const evs: Array<{ t: number; delta: number }> = [];

//     const pushEv = (e: any, sign = 1) => {
//       try {
//         const ts = Number(e.blockTimestamp ?? Date.now() / 1000) * 1000;
//         const amt = Number(e.args?.amount?.toString?.() ?? 0);
//         evs.push({ t: ts, delta: sign * amt });
//       } catch {}
//     };

//     stakeEvents.forEach((e) => pushEv(e, 1));
//     withdrawEvents.forEach((e) => pushEv(e, -1));

//     const buckets: Record<string, number> = {};

//     evs
//       .sort((a, b) => a.t - b.t)
//       .forEach((e) => {
//         const key = new Date(e.t).toISOString().slice(0, 10);
//         buckets[key] = (buckets[key] ?? 0) + e.delta;
//       });

//     let acc = 0;

//     return Object.keys(buckets)
//       .sort()
//       .map((date) => {
//         acc += buckets[date];
//         return { date, staked: acc };
//       });
//   }, [stakeEventsData, withdrawEventsData]);

//   // ---- Proposal Filter ----
//   const [filter, setFilter] = useState<"all" | "active" | "executed">("all");

//   // ---- Delegate ----
//   const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
//     contractName: "StakeGov",
//   });

//   const onDelegate = async () => {
//     if (!connectedAddress) return alert("Connect wallet first");
//     const to = prompt("Delegate to address:");
//     if (!to) return;

//     try {
//       await delegateTx({ functionName: "delegate", args: [to] });
//       alert("Delegated!");
//     } catch (e) {
//       console.error(e);
//       alert("Delegation failed");
//     }
//   };

//   // ---- Build proposal list ----
//   const proposalsForUI = useMemo(() => {
//     if (proposalsCreated && proposalsCreated.length > 0) {
//       return proposalsCreated.map((ev: any, i: number) => ({
//         id: Number(ev.args?.id ?? i),
//         proposer: ev.args?.proposer,
//         metadata: ev.args?.metadata,
//         start: Number(ev.args?.start ?? 0),
//         end: Number(ev.args?.end ?? 0),
//         executed: Boolean(ev.args?.executed ?? false),
//         createdAt: ev.blockTimestamp ? Number(ev.blockTimestamp) * 1000 : Date.now(),
//       }));
//     }

//     return proposalIds.map((id) => ({
//       id,
//       metadata: null,
//       start: 0,
//       end: 0,
//       executed: false,
//       createdAt: Date.now(),
//     }));
//   }, [proposalsCreated, proposalIds]);

//   const filteredProposals = proposalsForUI.filter((p) => {
//     if (filter === "all") return true;

//     if (filter === "active") {
//       return Date.now() >= (p.start ?? 0) * 1000 && Date.now() <= (p.end ?? 0) * 1000;
//     }

//     if (filter === "executed") return p.executed ?? false;

//     return true;
//   });

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
//         <p className="text-sm opacity-70 mt-1">
//           Token-backed proposals, staking, delegation & execution
//         </p>
//       </motion.header>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {/* LEFT SIDE */}
//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* Stats */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Total Supply</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>

//             <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
//             <div className="text-xl">{fmt(myBalance)}</div>

//             <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
//             <div className="text-xl">{fmt(myVotingPower)}</div>
//           </motion.div>

//           {/* Chart */}
//           <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
//             <h3 className="text-sm opacity-60">Staking Overview</h3>
//             <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>

//             <div className="mt-4 h-48">
//               {chartData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="opacity-60">No staking activity yet</p>
//               )}
//             </div>

//             <div className="mt-4 flex gap-2">
//               <Link href="/create" className="btn btn-primary">
//                 Create Proposal
//               </Link>
//               <button className="btn" onClick={onDelegate}>
//                 Delegate Votes
//               </button>
//             </div>
//           </motion.div>

//           {/* Quick actions */}
//           <motion.div
//             className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
//             whileHover={{ scale: 1.01 }}
//           >
//             <h3 className="text-sm opacity-60">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3 mt-3">
//               <Link href="/stake" className="btn btn-outline">
//                 Stake
//               </Link>
//               <Link href="/create" className="btn btn-accent">
//                 Create
//               </Link>
//               <Link href="/proposals" className="btn btn-secondary">
//                 Proposals
//               </Link>
//               <Link href="/execute" className="btn btn-warning">
//                 Execute
//               </Link>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <aside className="bg-base-100 p-6 rounded-2xl shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm opacity-60">Connected</h4>
//               <Address address={connectedAddress} chain={targetNetwork} />
//             </div>

//             <div className="text-right">
//               <div className="text-sm opacity-60">Proposals</div>
//               <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
//             </div>
//           </div>

//           {/* Filter */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60">Filters</h5>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-ghost"}`}>
//                 All
//               </button>
//               <button onClick={() => setFilter("active")} className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-ghost"}`}>
//                 Active
//               </button>
//               <button
//                 onClick={() => setFilter("executed")}
//                 className={`btn btn-sm ${filter === "executed" ? "btn-primary" : "btn-ghost"}`}
//               >
//                 Executed
//               </button>
//             </div>
//           </div>

//           {/* Recent proposals */}
//           <div className="mt-6">
//             <h5 className="text-sm opacity-60 mb-2">Recent Proposals</h5>

//             {filteredProposals.length === 0 ? (
//               <p className="opacity-60">No proposals yet</p>
//             ) : (
//               <div className="space-y-3 max-h-72 overflow-auto pr-2">
//                 {filteredProposals
//                   .slice()
//                   .reverse()
//                   .map((p) => (
//                     <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-base-200 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="text-sm font-medium">Proposal #{p.id}</div>
//                           <div className="text-xs opacity-60 truncate max-w-[200px]">{p.metadata ?? "—"}</div>
//                         </div>
//                         <div className="text-xs opacity-70">
//                           {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
//                         </div>
//                       </div>

//                       <div className="flex gap-2 mt-3">
//                         <Link href={`/proposals/${p.id}`} className="btn btn-sm btn-outline">
//                           View
//                         </Link>
//                         <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(p.id))}>
//                           Copy ID
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>

//       <footer className="mt-10 text-center opacity-60">
//         Built with Scaffold-ETH — DAOs made easy.
//       </footer>
//     </div>
//   );
// }

// formatting helper
const fmt = (v: any) => {
  if (v === undefined || v === null) return "--";
  try {
    if (typeof v === "bigint") return Number(v).toLocaleString();
    if (typeof v === "string" && /^\d+$/.test(v)) return Number(v).toLocaleString();
    return v.toString();
  } catch {
    return String(v);
  }
};

export default function DAOHome() {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  // Blockchain timestamp for accurate OPEN/CLOSED state
  const { data: latestBlock } = useBlock({ watch: true });
  const now = Number(latestBlock?.timestamp ?? 0) * 1000;

  // re-render every 1s for time-based updates (Open -> Closed)
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const t = setInterval(() => forceUpdate(x => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Reads (top-level simple hooks only)
  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "GovToken",
    functionName: "totalSupply",
    watch: true,
  });

  const { data: myBalance } = useScaffoldReadContract({
    contractName: "GovToken",
    functionName: "balanceOf",
    args: [connectedAddress ?? undefined],
    watch: true,
  });

  const { data: totalStaked } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "totalStaked",
    watch: true,
  });

  const { data: myVotingPower } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "votingPowerOf",
    args: [connectedAddress ?? undefined],
    watch: true,
  });

  const { data: proposalCount } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "proposalCount",
    watch: true,
  });

  // Events — safe to use; we'll render ProposalItem components per id
  const { data: stakeEventsData } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Staked",
    watch: true,
  });

  const { data: withdrawEventsData } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Withdrawn",
    watch: true,
  });

  // Chart data (pure computation)
  const chartData = useMemo(() => {
    const stakeEvents = stakeEventsData ?? [];
    const withdrawEvents = withdrawEventsData ?? [];

    const evs: Array<{ t: number; delta: number }> = [];

    const pushEv = (e: any, sign = 1) => {
      try {
        const ts = Number(e.blockTimestamp ?? now / 1000) * 1000;
        const amt = Number(e.args?.amount?.toString?.() ?? 0);
        evs.push({ t: ts, delta: sign * amt });
      } catch {}
    };

    stakeEvents.forEach(e => pushEv(e, 1));
    withdrawEvents.forEach(e => pushEv(e, -1));

    const buckets: Record<string, number> = {};
    evs
      .sort((a, b) => a.t - b.t)
      .forEach(e => {
        const key = new Date(e.t).toISOString().slice(0, 10);
        buckets[key] = (buckets[key] ?? 0) + e.delta;
      });

    let acc = 0;

    return Object.keys(buckets)
      .sort()
      .map(date => {
        acc += buckets[date];
        return { date, staked: acc };
      });
  }, [stakeEventsData, withdrawEventsData, now]);

  // Delegate function (top-level write hook)
  const { writeContractAsync: delegateTx } = useScaffoldWriteContract({
    contractName: "StakeGov",
  });

  const onDelegate = async () => {
    if (!connectedAddress) return alert("Connect wallet first");
    const to = prompt("Delegate to address:");
    if (!to) return;
    try {
      await delegateTx({ functionName: "delegate", args: [to] });
      alert("Delegated!");
    } catch (e) {
      console.error(e);
      alert("Delegation failed");
    }
  };

  // Build safe proposal ID array (no hooks in loops)
  const proposalIds = useMemo(() => {
    const n = proposalCount ? Number(proposalCount.toString()) : 0;
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [proposalCount]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold">DAO — Governance Dashboard</h1>
        <p className="text-sm opacity-70 mt-1">Token-backed proposals, staking, delegation & execution</p>
      </motion.header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* LEFT SIDE */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
            <h3 className="text-sm opacity-60">Total Supply</h3>
            <div className="text-2xl font-semibold mt-2">{fmt(totalSupply)}</div>

            <h3 className="text-sm opacity-60 mt-4">Your Balance</h3>
            <div className="text-xl">{fmt(myBalance)}</div>

            <h3 className="text-sm opacity-60 mt-4">Your Voting Power</h3>
            <div className="text-xl">{fmt(myVotingPower)}</div>
          </motion.div>

          <motion.div className="bg-base-100 p-6 rounded-2xl shadow" whileHover={{ scale: 1.01 }}>
            <h3 className="text-sm opacity-60">Staking Overview</h3>
            <div className="text-2xl font-semibold mt-2">{fmt(totalStaked)}</div>

            <div className="mt-4 h-48">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="staked" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="opacity-60">No staking activity yet</p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Link href="/create" className="btn btn-primary">
                Create Proposal
              </Link>
              <button className="btn" onClick={onDelegate}>
                Delegate Votes
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-base-100 p-6 rounded-2xl shadow col-span-2 sm:col-span-1"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-sm opacity-60">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Link href="/stake" className="btn btn-outline">
                Stake
              </Link>
              <Link href="/create" className="btn btn-accent">
                Create
              </Link>
              <Link href="/proposals" className="btn btn-secondary">
                Proposals
              </Link>
              <Link href="/execute" className="btn btn-warning">
                Execute
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="bg-base-100 p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm opacity-60">Connected</h4>
              <Address address={connectedAddress} chain={targetNetwork} />
            </div>

            <div className="text-right">
              <div className="text-sm opacity-60">Proposals</div>
              <div className="text-2xl font-semibold">{fmt(proposalCount)}</div>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="text-sm opacity-60">Recent Proposals</h5>
            {proposalIds.length === 0 ? (
              <p className="opacity-60">No proposals yet</p>
            ) : (
              <div className="space-y-3 max-h-72 overflow-auto pr-2">
                {proposalIds
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map(id => (
                    <div key={id} className="p-3 bg-base-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium">Proposal #{id}</div>
                          {/* we avoid reading metadata here; link to detail page */}
                          <div className="text-xs opacity-60 truncate max-w-[200px]">View details</div>
                        </div>
                        <div className="text-xs opacity-70">{/* createdAt not available here */}</div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Link href={`/proposals/${id}`} className="btn btn-sm btn-outline">
                          View
                        </Link>
                        <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(String(id))}>
                          Copy ID
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <footer className="mt-10 text-center opacity-60">Built with Scaffold-ETH — DAOs made easy.</footer>
    </div>
  );
}
