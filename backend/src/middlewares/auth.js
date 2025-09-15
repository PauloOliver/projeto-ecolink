import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const [scheme, token] = h.trim().split(/\s+/); // separa e ignora espaços múltiplos

    if (!/^Bearer$/i.test(scheme) || !token) {
      return res.status(401).json({ error: "token ausente" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email, nome: payload.nome };
    next();
  } catch (e) {
    return res.status(401).json({ error: "token inválido ou expirado" });
  }
}
