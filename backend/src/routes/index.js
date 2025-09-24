import { Router } from "express";
import {  createUsuario, login, postPonto, getPontos,updateUser,deleteUser} from "../controllers/ClientController.js";
import { dbPing } from "../controllers/HealthController.js";
import { auth } from "../middlewares/auth.js";
import { postCreate, getPosts } from "../controllers/postController.js";
import { comentarioCreate, getComentarios } from "../controllers/comentarioController.js";

const clientesRoutes = Router()

clientesRoutes.get("/db/ping", dbPing);
clientesRoutes.post("/usuarios", createUsuario)
clientesRoutes.post("/login", login)
clientesRoutes.put("/usuarios", auth, updateUser);
clientesRoutes.delete("/usuarios", auth, deleteUser);


//pontos de coleta

clientesRoutes.post("/pontos", auth, postPonto)
clientesRoutes.get("/pontos", getPontos)

// posts
clientesRoutes.post("/posts", auth, postCreate);
clientesRoutes.get("/posts", getPosts);

// comentários
clientesRoutes.post("/comentarios", auth, comentarioCreate);
clientesRoutes.get("/comentarios/:postId", getComentarios);

export default clientesRoutes