"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import {
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useTargetNetwork,
} from "~~/hooks/scaffold-eth";

/**
 * Small helpers to keep strict typing safe and avoid 'never[]' unions.
 * The hooks sometimes return undefined while loading; use defaults for arrays.
 */
const safeArray = <T,>(val: T[] | undefined | null) => (Array.isArray(val) ? val : []);
const safeNumber = (bn?: bigint | number | string) => {
  if (bn === undefined || bn === null) return 0;
  try {
    // if bigint
    if (typeof bn === "bigint") return Number(bn);
    // if string or number
    return Number(bn);
  } catch {
    return 0;
  }
};

export default function DAOHomePage() {
  const { address } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  // ---------- READS ----------
  const { data: totalStaked } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "totalStaked",
    watch: true,
  });

  const { data: proposalCount } = useScaffoldReadContract({
    contractName: "StakeGov",
    functionName: "proposalCount",
    watch: true,
  });

  // ---------- EVENTS ----------
  // All event hooks return either array or undefined; use safeArray to avoid length/forEach errors.
  const { data: stakedEvents } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Staked",
  });

  const { data: withdrawnEvents } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Withdrawn",
  });

  const { data: proposalCreatedEvents } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "ProposalCreated",
  });

  const { data: votedEvents } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Voted",
  });

  const { data: executedEvents } = useScaffoldEventHistory({
    contractName: "StakeGov",
    eventName: "Executed",
  });

  // ---------- AGGREGATIONS ----------
  const staked = safeArray(stakedEvents);
  const withdrawn = safeArray(withdrawnEvents);
  const proposalsCreated = safeArray(proposalCreatedEvents);
  const votes = safeArray(votedEvents);
  const executed = safeArray(executedEvents);

  // compute current circulating staked from events (defensive)
  const computedTotalStaked = useMemo(() => {
    // sum staked amounts
    let sumStaked = 0;
    staked.forEach((ev: any) => {
      const amount = ev?.args?.amount ?? ev?.args?._amount ?? 0;
      sumStaked += safeNumber(amount);
    });
    // subtract withdrawn
    let sumWithdrawn = 0;
    withdrawn.forEach((ev: any) => {
      const amount = ev?.args?.amount ?? ev?.args?._amount ?? 0;
      sumWithdrawn += safeNumber(amount);
    });
    return Math.max(0, sumStaked - sumWithdrawn);
  }, [staked, withdrawn]);

  // prepare chart data: time series of staked events (group by blockTimestamp if present)
  const chartData = useMemo(() => {
    // build an array of items { time: "...", total: number } by processing events in chronological order
    const all = [...staked, ...withdrawn]
      .map((ev: any) => ({
        ts: Number(ev?.blockTimestamp ?? 0),
        delta:
          ev?.event === "Withdrawn" || String(ev?.name) === "Withdrawn"
            ? -safeNumber(ev?.args?.amount)
            : safeNumber(ev?.args?.amount),
      }))
      .sort((a, b) => a.ts - b.ts);

    let running = 0;
    const out: { time: string; total: number }[] = [];

    all.forEach(it => {
      running += it.delta;
      const timeLabel = it.ts ? new Date(it.ts * 1000).toLocaleTimeString() : "now";
      out.push({
        time: timeLabel,
        total: Math.max(0, running),
      });
    });

    // if no events, show current totalStaked (read from contract)
    if (out.length === 0) {
      const t = safeNumber(totalStaked as any);
      return [{ time: "now", total: t }];
    }
    return out;
  }, [staked, withdrawn, totalStaked]);

  // ---------- WRITES (example) ----------
  const stakeContract = (deployedContracts as any)[31337]?.StakeGov;
  const { writeContractAsync: stakeTx } = useScaffoldWriteContract({
    contractName: "StakeGov",
  });

  const onStake = async (humanAmount: string) => {
    if (!humanAmount) return alert("Enter amount");
    try {
      await stakeTx({
        functionName: "stake",
        args: [parseEther(humanAmount)],
      });
    } catch (err) {
      console.error(err);
      alert("Stake tx failed (see console)");
    }
  };

  // ---------- RENDER ----------
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
        DAO — Stake & Governance Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Connected</div>
          <div className="font-medium">{address ?? "Not connected"}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total staked (on-chain)</div>
          <div className="font-medium">
            {totalStaked
              ? Number(formatEther(totalStaked as bigint))
              : computedTotalStaked
                ? (computedTotalStaked / 1e18).toFixed(6)
                : "0"}{" "}
            GOVT
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Proposals</div>
          <div className="font-medium">{proposalCount ? String(proposalCount) : proposalsCreated.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Staked over time</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" minTickGap={20} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Live events</h3>

          <div className="text-sm mb-2">New proposals: {proposalsCreated.length}</div>
          <div className="text-sm mb-2">Total votes: {votes.length}</div>
          <div className="text-sm mb-2">Executed proposals: {executed.length}</div>

          <div className="mt-3">
            <h4 className="font-medium">Recent proposals</h4>
            <div className="space-y-2 mt-2">
              {proposalsCreated.length === 0 ? (
                <div className="text-sm opacity-70">No proposals yet</div>
              ) : (
                proposalsCreated
                  .slice(-5)
                  .reverse()
                  .map((ev: any, idx: number) => {
                    // event shape: (uint256 indexed id, address indexed proposer, uint256 start, uint256 end, string metadata)
                    const id = Number(ev?.args?.id ?? ev?.args?._id ?? (ev?.args as any)?.[0] ?? -1);
                    const start = Number(ev?.args?.start ?? ev?.args?._start ?? 0);
                    const end = Number(ev?.args?.end ?? ev?.args?._end ?? 0);
                    const metadata = String(ev?.args?.metadata ?? ev?.args?._metadata ?? "");
                    return (
                      <div key={idx} className="border rounded p-2">
                        <div className="text-sm">#{id}</div>
                        <div className="text-xs opacity-70">{metadata || "(no metadata)"}</div>
                        <div className="text-xs opacity-60">
                          start: {start ? new Date(start * 1000).toLocaleString() : "—"} • end:{" "}
                          {end ? new Date(end * 1000).toLocaleString() : "—"}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Quick stake (example)</h3>
        <div className="flex gap-2">
          <input id="stakeAmount" className="input input-bordered" placeholder="0.1" />
          <button
            className="btn btn-primary"
            onClick={() => {
              const el = document.getElementById("stakeAmount") as HTMLInputElement;
              onStake(el?.value ?? "");
            }}
          >
            Stake
          </button>
          <div className="ml-4 text-sm opacity-70">Note: you must approve GOVT token first</div>
        </div>
      </div>
    </div>
  );
}
