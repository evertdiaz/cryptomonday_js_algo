import algosdk from 'algosdk'

export const createASA = async(
    algodClient:algosdk.Algodv2, 
    senderAddr:string, 
    senderMnemonic:string, 
    unitName:string,
    assetName:string,
    supply:number,
    decimals:number
) => {
  try {  
    const signer = algosdk.mnemonicToSecretKey(senderMnemonic).sk
    const suggestedParams = await algodClient.getTransactionParams().do()
    const data = {
      from: senderAddr,
      unitName: unitName,
      assetName: assetName,
      total: supply,
      decimals: decimals,
      defaultFrozen: false,
      suggestedParams
    }

    // Creamos la transacción
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(data);
    // Firmamos la transaccion
    const rawSignedTxn = txn.signTxn(signer);
    // Ejecutamos la transacción
    const tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    // Obtenemos la data de la transacción
    console.log(`Asset ID: ${confirmedTxn["asset-index"]} - Tx ID: ${tx.txId} - Ronda: ${confirmedTxn["confirmed-round"]}`)

  }
  catch (err) {
      console.log("err", err);
  }
}

export const optinASA = async(
  algodClient:algosdk.Algodv2, 
  senderAddr:string, 
  senderMnemonic:string, 
  assetID: number
) => {
  try {  
    const suggestedParams = await algodClient.getTransactionParams().do()
    const signer = algosdk.mnemonicToSecretKey(senderMnemonic).sk

    const transactionOptions = {
      from: senderAddr,
      to: senderAddr,
      amount: 0,
      assetIndex: assetID,
      suggestedParams,
    };

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
      transactionOptions
    );
    // Firmamos la transaccion
    const rawSignedTxn = txn.signTxn(signer);
    // Ejecutamos la transacción
    const tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    // Obtenemos la data de la transacción
    console.log(`Transaction ID: ${tx.txId}`)
  }
  catch (err) {
    console.log("err", err);
  }
}

export const txASA = async(
  algodClient:algosdk.Algodv2, 
  senderAddr:string, 
  senderMnemonic:string, 
  receiverAddr:string, 
  assetIndex:number,
  amount:number
) => {
  try {  
    const suggestedParams = await algodClient.getTransactionParams().do()
    const signer = algosdk.mnemonicToSecretKey(senderMnemonic).sk

    const transactionOptions = {
      from: senderAddr,
      to: receiverAddr,
      amount,
      assetIndex,
      suggestedParams,
    };
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
      transactionOptions
    );
    // Firmamos la transaccion
    const rawSignedTxn = txn.signTxn(signer);
    // Ejecutamos la transacción
    const tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    // Obtenemos la data de la transacción
    console.log(`Transaccion ID: ${tx.txId}`)
  }
  catch (err) {
    console.log("err", err);
  }
}