const bcrypt = require('bcryptjs');
const request = require('supertest');
const http = require('http');
const app = require('../app');
const sequelize = require('../src/database');
const Usuario = require('../src/models/usuario');

let server;

beforeAll(async () => {
  server = http.createServer(app);
});

beforeEach(async () => {
  // Limpar todas as tabelas antes de cada teste
  await sequelize.sync({ force: true });
});

afterAll(() => {
  server.close();
});

describe('Testes para UsuarioController', () => {
  it('Deve registrar um novo usuário', async () => {
    const novoUsuario = { nome: 'Teste', email: 'teste@example.com', senha: '123456' };
    const response = await request(server).post('/api/usuarios').send(novoUsuario);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoUsuario.nome);
    expect(response.body.email).toBe(novoUsuario.email);
  });

  it('Deve realizar login com sucesso', async () => {
    const senhaCriptografada = bcrypt.hashSync('123456', 10);
    const novoUsuario = { nome: 'Teste', email: 'teste@example.com', senha: senhaCriptografada };
    await Usuario.create(novoUsuario);

    const loginData = { email: 'teste@example.com', senha: '123456' };
    const response = await request(server).post('/api/usuarios/login').send(loginData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});