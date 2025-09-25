import express from 'express'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
import clientesRoutes from './routes/index.js'
import 'dotenv/config';

const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Vite
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
}));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/',(req,res)=>{
    res.status(200).json({server:"OK", port:port})
})

app.use('/api/v1', clientesRoutes)

app.listen(port,()=>{
    console.log("Servidor rodando")
})