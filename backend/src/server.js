import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import clientesRoutes from './routes/index.js'
import 'dotenv/config'

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors({
  origin: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
  res.status(200).json({ server: 'OK', port })
})

app.use('/api/v1', clientesRoutes)

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`)
})
