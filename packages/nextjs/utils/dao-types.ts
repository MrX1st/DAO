// ~~/utils/dao-types.ts
export type StakedEvent = {
  args: {
    user: `0x${string}`;
    amount: bigint;
  };
  blockTimestamp?: number | string;
  name?: string;
};

export type WithdrawnEvent = {
  args: { user: `0x${string}`; amount: bigint };
  blockTimestamp?: number | string;
};

export type ProposalCreatedEvent = {
  args: { id: bigint; proposer: `0x${string}`; start: bigint; end: bigint; metadata: string };
  blockTimestamp?: number | string;
};

export type VotedEvent = { args: { id: bigint; voter: `0x${string}`; support: boolean; weight: bigint } };
export type ExecutedEvent = { args: { id: bigint } };
