import{
    getAll
} from "../repositories/ClientRepository.js";

export async function  allUsuarios(req, res) {
    const clientes = await getAll();
    res.json(clientes)
    
}