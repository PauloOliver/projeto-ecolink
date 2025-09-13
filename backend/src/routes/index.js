import { Router } from "express";
import { allUsuarios } from "../controllers/ClientController.js";
import { dbPing } from "../controllers/HealthController.js";

const clientesRoutes = Router()
clientesRoutes.get('/clientes', allUsuarios)
clientesRoutes.get("/db/ping", dbPing);

export default clientesRoutes