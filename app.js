const express = require('express');
const app = express();
const PORTA = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Sincronizar o banco de dados
const sequelize = require('./src/database');

// Sincronizar o banco de dados
(async () => {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();

// 1. Rotas de PRODUTOS
const produtoRoutes = require('./src/routes/produtoRoutes'); 
app.use('/api/produtos', produtoRoutes); 

// 2. Rotas de USUÁRIOS
const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes); // Novo: para registro e login

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Produtos e Usuários funcionando!');
});

// Inicialização do servidor
if (process.env.NODE_ENV !== 'test') {
  const server = http.createServer(app);
  server.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
}

module.exports = app;