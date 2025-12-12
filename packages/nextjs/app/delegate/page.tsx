// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { isAddress } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;
//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// export default function DelegatePage() {
//   const [to, setTo] = useState("");
//   const delegateWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
//   const { writeContractAsync: delegateTx, isMining } = delegateWrite;

//   const onDelegate = async () => {
//     if (!to) return alert("Enter address to delegate to");
//     try {
//       await delegateTx?.({
//         functionName: "delegate",
//         args: [to],
//       });
//       alert("Delegated");
//       setTo("");
//     } catch (e) {
//       console.error(e);
//       alert("Delegate failed.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="Delegate to address"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
//           {isMining ? "Delegating..." : "Delegate"}
//         </button>
//       </div>
//     </div>
//   );
// }

export default function DelegatePage() {
  const [to, setTo] = useState("");
  const { writeContractAsync: delegateTx, isMining } = useScaffoldWriteContract({ contractName: "StakeGov" });

  const onDelegate = async () => {
    if (!to) return alert("Enter address to delegate to");
    if (!isAddress(to)) return alert("Invalid Ethereum address");

    try {
      await delegateTx?.({
        functionName: "delegate",
        args: [to],
      });
      alert("Delegated");
      setTo("");
    } catch (e) {
      console.error(e);
      alert("Delegate failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delegate Voting Power</h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Delegate to address"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={onDelegate} className="btn btn-primary" disabled={!!isMining}>
          {isMining ? "Delegating..." : "Delegate"}
        </button>
      </div>
    </div>
  );
}
