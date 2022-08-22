import algosdk from 'algosdk'

export const txAlgo = async(algodClient:algosdk.Algodv2, senderAddr:string, senderMnemonic:string, receiverAddr:string, amount:number) => {
  try {  

    const signer = algosdk.mnemonicToSecretKey(senderMnemonic).sk
    const params = await algodClient.getTransactionParams().do()

    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: senderAddr, 
      to: receiverAddr, 
      amount,
      suggestedParams: params
    });

    const signedTxn = txn.signTxn(signer);
    const tx = (await algodClient.sendRawTransaction(signedTxn).do());
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    console.log(`Transaction ID: ${tx.txId}`)

  }
  catch (err) {
      console.log("err", err);
  }
}