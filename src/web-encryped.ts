const privateKey1 = 3 //2 3 5 7 11 13 17 19 23 29
const privateKey2 = 5

let publicKey = 769 // 最大安全数
const p = 4877

const primeMap = [
  7561,
  7573,
  7577,
  7583,
  7589,
  7591,
  7603,
  7607,
  7621,
  7639,
  7643,
  7649,
  7669,
  7673,
  7681,
  7687,
  7691,
  7699,
  7703,
  7717,
  7723,
  7727,
  7741,
  7753,
  7757,
  7759,
  7789,
  7793,
  7817,
  7823,
  7829,
  7841,
  7853,
  7867,
  7873,
  7877,
  7879,
  7883,
  7901,
  7907,
  7919,
  7927,
  7933,
  7937,
  7949,
  7951,
  7963,
  7993,
  8009,
  8011,
  8017,
  8039,
  8053,
  8059,
  8069,
  8081,
  8087,
  8089,
  8093,
  8101,
  8111,
  8117,
  8123,
  8147,
  8161,
  8167,
  8171,
  8179,
  8191,
  8209,
  8219,
  8221,
  8231,
  8233,
  8237,
  8243,
  8263,
  8269,
  8273,
  8287,
  8291,
  8293,
  8297,
  8311,
  8317,
  8329,
  8353,
  8363,
  8369,
  8377,
  8387,
  8389,
  8419,
  8423,
  8429,
  8431,
  8443,
  8447,
  8461,
  8467,
  8501,
  8513,
  8521,
  8527,
  8537,
  8539,
  8543,
  8563,
  8573,
  8581,
  8597,
  8599,
  8609,
  8623,
  8627,
  8629,
]

function dhGenTransferKey(_publicKey, _privateKey) {
  let res = Math.floor(Math.pow(_publicKey, _privateKey) % p)
  return res
}

function buildAESKey(_transferKey, _privateKey) {
  let res = Math.floor(Math.pow(_transferKey, _privateKey) % p)
  return res
}
for (const G of primeMap) {
  const transferKey1 = dhGenTransferKey(G, privateKey1)
  // console.log(`${G} AESKey1`, String(transferKey1))
  const transferKey2 = dhGenTransferKey(G, privateKey2)
  // console.log(`${G} AESKey2`, String(transferKey2))
  const AESKey1 = buildAESKey(transferKey2, privateKey1)
  const AESKey2 = buildAESKey(transferKey1, privateKey2)
  if (AESKey1 !== AESKey2) {
    console.log(`${G} AESKey`, String(AESKey1), String(AESKey2))
  }
}
// 439 AESKey 1794 1799
// 547 AESKey 876 875
// 557 AESKey 1183 1184
// 613 AESKey 1360 1359
// 659 AESKey 928 929
// 677 AESKey 1750 1751
// 719 AESKey 451 450
// 773 AESKey 648 647
// 809 AESKey 824 825
