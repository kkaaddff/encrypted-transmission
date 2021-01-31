import express from 'express'

const app = express()

const port = 3001
const serverPrivateKey = 29

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
    res.status(200).send('success!')
  } catch (error) {
    console.log(error)
    res.status(200).send(error)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
