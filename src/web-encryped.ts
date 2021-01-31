const privateKey1 = 3 //2 3 5 7 11 13 17 19 23 29
const privateKey2 = 5

const publicKey = 769 // 最大安全数
const p = 2221

const primeMap = []

function dhGenTransferKey(_publicKey, _privateKey) {
  let res = Math.floor(Math.pow(_publicKey, _privateKey) % p)
  return res
}

function buildAESKey(_transferKey, _privateKey) {
  let res = Math.floor(Math.pow(_transferKey, _privateKey) % p)
  return res
}

console.time('object')
const transferKey1 = dhGenTransferKey(publicKey, privateKey1)
console.log('transferKey1', transferKey1)

const transferKey2 = dhGenTransferKey(publicKey, privateKey2)
console.log('transferKey2', transferKey2)

const AESKey1 = buildAESKey(transferKey2, privateKey1)
console.log('AESKey1', String(AESKey1))

const AESKey2 = buildAESKey(transferKey1, privateKey2)
console.log('AESKey2', String(AESKey2))
console.timeEnd('object')
