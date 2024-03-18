import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export const fetchRecentBlockhash = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const blockhash = await connection.getLatestBlockhash();
  return blockhash.blockhash;
};

export const transfer = async (
    destinationAddress: string,
    sourceAccount: string,
    recentBlockhash: string,
    amount: string,
) => {
  try {
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
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
