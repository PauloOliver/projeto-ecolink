import{
    createUser,
     getByEmail,
     createPonto,
     listPontosCursor,
     updateUsuario,
     deleteUsuario,
     findUsuarioById
} from "../repositories/ClientRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function createUsuario(req, res, next) {
    try{
        const {nome_usuarios, senha, email, foto = null, perfil = null} = req.body;
        if(!nome_usuarios || !senha || !email) {
            return res.status(400).json ({error: "nome, senha e email são obrigatórios"})
        }

        const rounds = parseInt(process.env.BCRYPT_ROUNDS || "10", 10);
        const senhaHash = await bcrypt.hash(senha, rounds);

        const user = await createUser({nome_usuarios, senhaHash, email: email.toLowerCase(), foto, perfil});
        return res.status(201).json(user);
    }catch (e){
        if (e.code ==="23505") return res.status(409).json({ error: "email já cadastrado"});
        next(e)
    }
}

export async function login (req,res,next){
    try{
        const {email,senha} = req.body;
        if (!email || !senha){
            return res.status(400).json({error:"email e senha são obrigatórios"})
        }

        const user = await getByEmail(email);
        if(!user) return res.status(401).json({error: "credenciais inválidas"});

        const ok = await bcrypt.compare(senha, user.senha);
        if (!ok) return res.status(401).json({error: "credenciais inválidas"})
        
        const {senha:_omit, ...safe} = user;
        const token = jwt.sign(
            {sub: user.id_usuarios, email: user.email, nome: user.nome_usuarios},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        )
        return res.json({user: safe, token});
    } catch (e) {next(e);}
}


export async function updateUser(req, res, next) {
  try {
    const { nome_usuarios, senha } = req.body;
    const id = req.user.id; // vem do JWT

    if (!nome_usuarios && !senha) {
      return res.status(400).json({ error: "Informe nome ou senha para atualizar" });
    }

    const senhaHash = senha ? await bcrypt.hash(senha, 10) : null;

    const updated = await updateUsuario({
      id,
      nome_usuarios: nome_usuarios ?? req.user.nome_usuarios,
      senhaHash,
    });

    if (!updated) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { senha } = req.body;
    const id = req.user.id;

    if (!senha) {
      return res.status(400).json({ error: "Senha é obrigatória para deletar a conta" });
    }

    // buscar usuário
    const usuario = await findUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // validar senha
    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // deletar
    await deleteUsuario(id);
    res.json({ message: "Conta excluída com sucesso" });
  } catch (e) {
    next(e);
  }
}


//---------------------------------------------------------------------------------
// controllers do cadastro de pontos de coleta

export async function postPonto(req,res,next) {

    try{
        const {
             materiais, cep, numero, rua, bairro, cidade,
             horario_funcionamento, contato, observacoes
        } = req.body;

        if (!cep || !rua || !bairro || !cidade){
            return res.status(400).json({error: "cep, rua, bairro e cidade são obrigatórios"})
        }

         const ponto = await createPonto({
            materiais: materiais ?? null,
            cep, numero: numero ?? null, rua, bairro, cidade,
            horario_funcionamento: horario_funcionamento ?? null,
            contato: contato ?? null,
            observacoes: observacoes ?? null,
            userId: req.user.id   // do token
            });
            return res.status(201).json(ponto);
    }catch (e) { next(e);}
    
}
export async function getPontos(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit ?? "10", 10), 50);
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;
    const userId = req.query.userId ? Number(req.query.userId) : null;

    const { items, nextCursor, hasMore } = await listPontosCursor({ limit, cursor, userId });
    return res.json({ items, next_cursor: nextCursor, has_more: hasMore });
  } catch (e) {
    next(e);
  }
}