"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreateProposalPage() {
  const { address } = useAccount();
  const [metadata, setMetadata] = useState("");
  const [duration, setDuration] = useState("60"); // seconds default

  const createWrite = useScaffoldWriteContract({ contractName: "StakeGov" });
  const { writeContractAsync: createTx, isMining } = createWrite;

  // optional: require minimum voting power check before allowing create
  const { data: myVp } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "votingPowerOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  const onCreate = async () => {
    if (!metadata) return alert("Enter metadata (e.g. ipfs://...)");
    const dur = Number(duration);
    if (dur <= 0) return alert("Duration must be > 0");
    try {
      await createTx?.({
        functionName: "createProposal",
        args: [metadata, BigInt(dur)],
      });
      setMetadata("");
      setDuration("60");
      alert("Proposal created (check events).");
    } catch (e) {
      console.error(e);
      alert("Create failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Proposal</h1>
      <div className="mb-4">
        <div>Connected: {address ?? "Not connected"}</div>
        <div>My voting power: {myVp ? Number(myVp as bigint) / 1e18 : "0"}</div>
      </div>

      <div className="flex flex-col gap-2 max-w-xl">
        <input
          type="text"
          placeholder="metadata (ipfs://...)"
          value={metadata}
          onChange={e => setMetadata(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="duration (seconds)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={onCreate} className="btn btn-primary" disabled={!!isMining}>
          {isMining ? "Creating..." : "Create Proposal"}
        </button>
      </div>
    </div>
  );
}
