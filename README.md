 # 📝 Task Master - API Back-End

Task Master é uma API RESTful desenvolvida com **TypeScript**, **Express**, **Prisma** e **Zod**, projetada para gerenciar tarefas e categorias de forma eficiente. Esta aplicação oferece funcionalidades completas para autenticação de usuários, gerenciamento de tarefas e organização por categorias.

## 🚀 Funcionalidades

- 🔐 **Autenticação de Usuário**: Registro e login seguros com autenticação baseada em tokens JWT.
- ✅ **Gerenciamento de Tarefas**: Criação, leitura, atualização e exclusão de tarefas, com suporte a prioridades, status e prazos.
- 🗂️ **Categorias Personalizadas**: Organização de tarefas por categorias específicas do usuário, com suporte a criação automática de categorias.
- 🛡️ **Validação de Dados**: Utilização do Zod para garantir a integridade e a validação dos dados recebidos pela API.
- 🔒 **Segurança**: Hashing de senhas com Bcrypt e proteção de rotas sensíveis através de middleware de autenticação.
- 🏗️ **Padrões de Projeto**: Estrutura modular com separação clara entre camadas de controle, serviço e repositório.

## 🛠️ Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [JWT](https://jwt.io/)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [PostgreSQL](https://www.postgresql.org/)

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarregamento automático.
- `npm run build`: Compila o projeto TypeScript para JavaScript.
- `npm start`: Executa a versão compilada da aplicação.

## 📋 Requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- Variáveis de ambiente configuradas (`.env`), incluindo `DATABASE_URL` e `JWT_SECRET`.

## 📝 Licença

Este projeto está licenciado sob a licença ISC.


