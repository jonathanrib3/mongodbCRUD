import express from 'express'
import cors from 'cors'
import routes from './routes'


const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(9001, () => {
  console.log(`Server runnning on port 9001`)
})