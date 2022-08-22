import {createAccount} from './account'
import { algodClient } from './connection'
import { txAlgo } from './algo'
import { createASA, optinASA, txASA } from './asa'

const senderAddr = ""
const senderMnemonic = ""
const receiverAddr = ""
const receiverMnemonic = ""
// createAccount();
// txAlgo(algodClient, senderAddr, senderMnemonic, receiverAddr, 30000)
// createASA(algodClient, senderAddr,senderMnemonic,"NVT","Nuevo Token",100000,2)
// optinASA(algodClient,receiverAddr,receiverMnemonic,106223089)
// txASA(algodClient,senderAddr,senderMnemonic,receiverAddr,106223089,9900)