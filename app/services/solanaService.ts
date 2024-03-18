import { ConnectionStatus } from "@/enums/ConnectionStatus";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const { NEXT_PUBLIC_SOLANA_API_URL } = process.env;

export const fetchRecentBlockhash = async () => {
  const connection = new Connection(
    NEXT_PUBLIC_SOLANA_API_URL || "https://api.devnet.solana.com",
    ConnectionStatus.Confirmed,
  );
  const blockhash = await connection.getLatestBlockhash();
  return blockhash.blockhash;
};

export const transfer = async (
  destinationAddress: string,
  sourceAccount: string,
  recentBlockhash: string,
  amount: string
) => {
  try {
    const connection = new Connection(
      NEXT_PUBLIC_SOLANA_API_URL || "https://api.devnet.solana.com",
      ConnectionStatus.Confirmed,
    );

    const destinationPublicKey = new PublicKey(destinationAddress);
    const sourcePublicKey = new PublicKey(sourceAccount);

    const transaction = new Transaction({ recentBlockhash }).add(
      SystemProgram.transfer({
        fromPubkey: sourcePublicKey,
        toPubkey: destinationPublicKey,
        lamports: parseInt(amount),
      })
    );

    transaction.feePayer = sourcePublicKey;

    const signature = await (window as any).solana.signTransaction(transaction);

    const transactionHash = await connection.sendRawTransaction(
      signature.serialize()
    );

    return `Transaction sent! Transaction Hash: ${transactionHash}`;
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};
