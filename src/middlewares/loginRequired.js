// Importa o módulo jsonwebtoken para trabalhar com tokens JWT
import jwt from "jsonwebtoken";
import User from "../models/User"; // importei para checar na base de dados
// Exporta um middleware que verifica se o usuário está autenticado
export default async (req, res, next) => {
  // Extrai o header 'authorization' da requisição (onde o token JWT é enviado)
  const { authorization } = req.headers;

  // Se não existir um header 'authorization', retorna erro 401 (Não autorizado)
  if (!authorization) {
    return res.status(401).json({ error: ["Login requerido."] });
  }

  // Divide o valor do header em duas partes: 'Bearer' e o token
  // Ex: "Bearer eyJhbGciOiJIUzI1NiIs..."
  const [text, token] = authorization.split(" ");

  try {
    // Verifica se o token é válido usando a chave secreta
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    // Extrai o id e email do payload do token
    const { id, email } = data;
    const user = await User.findOne({
      // aqui estou verificando na base de dados se o token ainda é valido, ou seja, verificando se o id e o email ainda é o mesmo.
      where: {
        id,
        email,
      },
    });
    if (!user) {
      res.json({ errors: ["Usuário inválido."] });
    }
    // Adiciona o id do usuário ao objeto da requisição
    req.userId = id;

    // Adiciona o email do usuário ao objeto da requisição
    req.userEmail = email;

    // Chama o próximo middleware ou controlador
    next();
  } catch (e) {
    // Se o token for inválido ou expirado, retorna erro 401
    return res.status(401).json({ error: ["Token expirou."] });
  }
};
