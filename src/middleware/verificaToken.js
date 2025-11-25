const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-secreto'; 

const verificaToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; 

  console.log('Token recebido:', token); // Log do token recebido

  if (!token) {
    console.log('Acesso negado. Token não fornecido.'); // Log de token ausente
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    console.log('Token decodificado:', decoded); // Log do token decodificado
    req.usuario = decoded; 
    next(); 
  } catch (error) {
    console.log('Erro na validação do token:', error.message); // Log do erro de validação
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = verificaToken;