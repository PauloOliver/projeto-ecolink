import express from 'express'
import cors from 'cors'
import clientesRoutes from './routes/index.js'
import 'dotenv/config';

const port = process.env.PORT || 3000



const app = express()

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({server:"OK", port:port})
})

app.use('/api/v1', clientesRoutes)

app.listen(port,()=>{
    console.log("Servidor rodando")
})