import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpError } from '../Utils/HttpError';

// Extensão da interface Request diretamente no arquivo (sem precisar de arquivo de declaração separado)
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };  // Tipagem que você deseja adicionar
    }
  }
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
    //pega a lista que contem bearer e jwt do header
  const authHeader = req.headers.authorization;

  //se nao existe, lança erro
  if (!authHeader) throw new HttpError("Token não fornecido", 401);

  //pega somente o token da lista
  const token = authHeader.split(" ")[1];

  try {
    // Decodifica o token e verifica se sua assinatura contem a secret_key do nosso dotenv
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

    // realiza a verificacao dos campos, para ver se esta de acordo
    if (!payload.id) {
      throw new HttpError("Token mal formado", 400);
    }

    
    req.user = { id: payload.id };
    next();
  } catch (err) {
    throw new HttpError("Token inválido ou expirado", 403);
  }
};
