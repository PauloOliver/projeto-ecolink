import { Router } from "express";
import {  createUsuario, login, postPonto, getPontos } from "../controllers/ClientController.js";
import { dbPing } from "../controllers/HealthController.js";
import { auth } from "../middlewares/auth.js";

const clientesRoutes = Router()

clientesRoutes.get("/db/ping", dbPing);
clientesRoutes.post("/usuarios", createUsuario)
clientesRoutes.post("/login", login)

//pontos de coleta

clientesRoutes.post("/pontos", auth, postPonto)
clientesRoutes.get("/pontos", getPontos)

export default clientesRoutes