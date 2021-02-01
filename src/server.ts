import express from 'express'
import CryptoJs from 'crypto-js'
const app = express()

const port = 3001
const p = 4877
const serverPrivateKey = 5

function dhGenTransferKey(_publicKey, _privateKey) {
  let res = Math.floor(Math.pow(_publicKey, _privateKey) % p)
  return res
}

function buildAESKey(_transferKey, _privateKey) {
  let res = Math.floor(Math.pow(_transferKey, _privateKey) % p)
  return res
}

function aesEecrypt(data, AES_KEY) {
  let srcs = data
  let encrypt = CryptoJs.AES.encrypt(srcs, AES_KEY, {
    iv: '',
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7,
  })
  let result = encrypt.toString()
  return result
}

function buildMD5Key(_str) {
  let result = CryptoJs.MD5(_str).toString()
  return result.slice(8, 24)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.all('', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.get('/', async function rootHandler(req, res, next) {
  try {
    const [publicKey, frontendTransferKey] = new Buffer(req.headers.encrypted, 'base64')
      .toString()
      .split('-')
    const backTransferKey = dhGenTransferKey(Number(publicKey), serverPrivateKey)
    const AESKey = buildAESKey(Number(frontendTransferKey), serverPrivateKey)
    const AES_MD5_KEY = buildMD5Key(AESKey)

    let result = 'permission success'
    result = aesEecrypt(result, AES_MD5_KEY)
    res
      .status(200)
      .send({ result: result, encrypted: new Buffer(String(backTransferKey)).toString('base64') })
  } catch (error) {
    console.log(error)
    res.status(200).send(error)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
