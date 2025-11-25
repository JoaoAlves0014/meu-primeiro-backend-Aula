const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const Usuario = require('../models/usuario'); 
const JWT_SECRET = 'seu-segredo-super-secreto'; 

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }
    const senhaCriptografada = bcrypt.hashSync(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err); // Log detalhado do erro
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('Tentativa de login para o email:', email); // Log do email recebido

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.log('Usuário não encontrado para o email:', email); // Log se o usuário não for encontrado
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    console.log('Usuário encontrado:', usuario); // Log do usuário encontrado

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    console.log('Senha correta:', senhaCorreta); // Log do resultado da comparação da senha

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    console.error('Erro ao realizar login:', err); // Log detalhado do erro
    res.status(500).json({ message: 'Erro ao realizar login.', error: err.message });
  }
};