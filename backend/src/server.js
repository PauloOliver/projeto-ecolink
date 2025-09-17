import express from 'express'
import cors from 'cors'
import clientesRoutes from './routes/index.js'
import 'dotenv/config';

const port = process.env.PORT || 3000



const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Vite
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false, // true só se usar cookies
}));

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({server:"OK", port:port})
})

app.use('/api/v1', clientesRoutes)

app.listen(port,()=>{
    console.log("Servidor rodando")
})