const privateKey1 = 3 //2 3 5 7 11 13 17 19 23 29
const privateKey2 = 5

let publicKey = 769 // 最大安全数
const p = 1171

const primeMap = [
  433,
  439,
  443,
  449,
  457,
  461,
  463,
  467,
  479,
  487,
  491,
  499,
  503,
  509,
  521,
  523,
  541,
  547,
  557,
  563,
  569,
  571,
  577,
  587,
  593,
  599,
  601,
  607,
  613,
  617,
  619,
  631,
  641,
  643,
  647,
  653,
  659,
  661,
  673,
  677,
  683,
  691,
  701,
  709,
  719,
  727,
  733,
  739,
  743,
  751,
  757,
  761,
  769,
  773,
  787,
  797,
  809,
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
  const transferKey2 = dhGenTransferKey(G, privateKey2)
  const AESKey1 = buildAESKey(transferKey2, privateKey1)
  //   console.log(`${G} AESKey1`, String(AESKey1))
  const AESKey2 = buildAESKey(transferKey1, privateKey2)
  //   console.log(`${G} AESKey2`, String(AESKey2))
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
