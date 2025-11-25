const bcrypt = require('bcryptjs');
const request = require('supertest');
const http = require('http');
const app = require('../app');
const sequelize = require('../src/database');
const Usuario = require('../src/models/usuario');

let server;
let token;

beforeAll(async () => {
  server = http.createServer(app);
  await sequelize.sync({ force: true }); // Sincronizar o banco de dados antes de todos os testes

  // Criar um usuário e obter um token válido para autenticação
  const senhaCriptografada = bcrypt.hashSync('123456', 10);
  const novoUsuario = { nome: 'Teste', email: 'teste@example.com', senha: senhaCriptografada };
  await Usuario.create(novoUsuario);

  const loginResponse = await request(server).post('/api/usuarios/login').send({
    email: 'teste@example.com',
    senha: '123456',
  });
  token = loginResponse.body.token;
});

beforeEach(async () => {
  // Limpar a tabela de produtos antes de cada teste
  await sequelize.query('DELETE FROM produtos');
});

afterAll(async () => {
  await sequelize.close(); // Fechar conexão com o banco de dados após todos os testes
  server.close();
});

describe('Testes para ProdutoController', () => {
  it('Deve listar todos os produtos', async () => {
    const response = await request(server).get('/api/produtos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve criar um novo produto', async () => {
    const novoProduto = { nome: 'Produto Teste', preco: 99.99 };
    const response = await request(server)
      .post('/api/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoProduto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoProduto.nome);
    expect(response.body.preco).toBe(novoProduto.preco);
  });
});