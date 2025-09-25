import { Router } from "express";
import {  createUsuario, login, postPonto, getPontos,updateUser,deleteUser} from "../controllers/ClientController.js";
import { dbPing } from "../controllers/HealthController.js";
import { auth } from "../middlewares/auth.js";
import { createPost, getPosts} from "../controllers/postController.js";
import  upload  from "../middlewares/upload.js";

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
clientesRoutes.post("/posts", auth, upload.single("conteudo_foto"), createPost);
clientesRoutes.get("/posts", getPosts);



export default clientesRoutes