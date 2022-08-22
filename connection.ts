import algosdk from 'algosdk'

// Configuración del cliente y conexión al nodo
const algodToken = {
  'X-API-Key': ''
  }
const algodServer = ''
const algodPort = ''


export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)