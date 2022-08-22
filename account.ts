import algosdk from 'algosdk'

// Create Account

export const createAccount = async() => {
  try {  
      const myaccount = algosdk.generateAccount();

      console.log("Address: " + myaccount.addr);
      let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
      console.log("Mnemonic: "+ account_mnemonic);

      return myaccount;
  }
  catch (err) {
      console.log("err", err);
  }
};