import express from 'express'
import CryptoJs from 'crypto-js'
const app = express()

const port = 3001
const serverPrivateKey = 5

function dhGenTransferKey(_publicKey, _privateKey) {
  let res = Math.floor(Math.pow(_publicKey, _privateKey) % p)
  return res
}

function buildAESKey(_transferKey, _privateKey) {
  let res = Math.floor(Math.pow(_transferKey, _privateKey) % p)
  return res
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
    let [] = atob(req.headers.encrypted).split('-')
    let result = 'permission success'
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(200).send(error)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
