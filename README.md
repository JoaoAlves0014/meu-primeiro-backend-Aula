# Meu Primeiro Backend

## Descrição
Este projeto é uma API backend desenvolvida em Node.js utilizando Express, SQLite e Sequelize. Ele implementa autenticação e autorização com JWT, seguindo o padrão MVC (Model-View-Controller) para organização do código. Além disso, conta com testes automatizados utilizando Jest e Supertest.

## Funcionalidades
- **Gerenciamento de Produtos**:
  - Listar todos os produtos
  - Buscar produto por ID
  - Criar, atualizar e deletar produtos
- **Gerenciamento de Usuários**:
  - Cadastro de novos usuários
  - Login com autenticação JWT
- **Segurança**:
  - Middleware para validação de tokens JWT
  - Proteção de rotas
- **Testes Automatizados**:
  - Testes unitários e de integração com Jest e Supertest

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **SQLite**
- **Sequelize**
- **JWT (JSON Web Token)**
- **Jest**
- **Supertest**

## Estrutura do Projeto
```
meu-primeiro-backend/
├── src/
│   ├── controllers/
│   │   ├── produtoController.js
│   │   ├── usuarioController.js
│   ├── routes/
│   │   ├── produtoRoutes.js
│   │   ├── usuarioRoutes.js
│   ├── models/
│   │   ├── produto.js
│   │   ├── usuario.js
│   ├── middleware/
│   │   ├── verificaToken.js
│   ├── database.js
├── tests/
│   ├── produtoController.test.js
│   ├── usuarioController.test.js
├── app.js
├── package.json
├── README.md
```

## Configuração e Execução

### Pré-requisitos
- Node.js instalado

### Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Configuração
1. Crie um arquivo `.env` na raiz do projeto e defina a variável de ambiente para o JWT:
   ```env
   JWT_SECRET=sua_chave_secreta
   ```

### Execução
- Inicie o servidor em modo desenvolvimento:
  ```bash
  npm run dev
  ```
- Inicie o servidor em modo produção:
  ```bash
  npm start
  ```

### Testes
- Execute os testes automatizados:
  ```bash
  npm test
  ```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).