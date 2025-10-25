/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  KarratGovernor,
  Vote,
} from "../generated";

KarratGovernor.VoteCast.handler(async ({ event, context }) => {
  const entity: Vote = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    voter: event.params.voter,
    proposalId: event.params.proposalId,
    support: Number(event.params.support),
    weight: event.params.weight,
    reason: event.params.reason,
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: event.transaction.hash,
  };

  context.Vote.set(entity);
});
