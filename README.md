# 📝 Task Master - API RESTful

Uma API RESTful robusta e escalável para gerenciamento de tarefas desenvolvida com tecnologias modernas. Task Master oferece funcionalidades completas de autenticação, gerenciamento de tarefas e organização por categorias, com suporte a múltiplas prioridades e estados de conclusão.

## 📋 Visão Geral

Task Master é construído seguindo padrões estabelecidos de arquitetura de software, incluindo separação clara entre camadas (Controller, Service, Repository), validação rigorosa de dados e segurança robusta. A aplicação é ideal para sistemas que necessitam de gerenciamento eficiente de tarefas com organização granular e controle de acesso por usuário.

## 🚀 Funcionalidades Principais

- **🔐 Autenticação Segura**: Sistema de autenticação baseado em JWT com registro e login, incluindo hashing de senhas com Bcrypt
- **✅ Gerenciamento de Tarefas**: CRUD completo com suporte a prioridades (Baixa, Média, Alta), estados (Pendente, Em Progresso, Concluído) e prazos
- **🗂️ Categorias Personalizadas**: Organização de tarefas por categorias específicas do usuário com suporte a criação automática
- **🛡️ Validação Rigorosa**: Validação de entrada com Zod garantindo integridade e tipagem dos dados
- **🔒 Segurança em Camadas**: Proteção de rotas sensíveis através de middleware de autenticação, hash de senhas e isolamento de dados por usuário
- **🏗️ Arquitetura Modular**: Estrutura bem-organizada seguindo padrões de design com separação clara de responsabilidades
- **🌐 CORS Configurável**: Suporte integrado para Cross-Origin Resource Sharing

## 🛠️ Stack Tecnológico

| Tecnologia                                       | Versão | Propósito                            |
| ------------------------------------------------ | ------ | ------------------------------------ |
| [TypeScript](https://www.typescriptlang.org/)    | 5.8.3  | Tipagem estática e segurança de tipo |
| [Express](https://expressjs.com/)                | 5.1.0  | Framework web minimalista            |
| [Prisma ORM](https://www.prisma.io/)             | 6.5.0  | ORM moderno com Type Safety          |
| [PostgreSQL](https://www.postgresql.org/)        | -      | Banco de dados relacional            |
| [Zod](https://zod.dev/)                          | 3.24.2 | Validação de schemas em TypeScript   |
| [JWT](https://jwt.io/)                           | 9.0.2  | Autenticação com tokens              |
| [BcryptJS](https://github.com/dcodeIO/bcrypt.js) | 3.0.2  | Hash seguro de senhas                |

## 📊 Modelo de Dados

### Entidades Principais

- **User**: Usuários do sistema com autenticação
- **Task**: Tarefas com prioridade, status e prazo
- **Category**: Categorias para organização de tarefas

### Estados e Prioridades

| Prioridade | Descrição        |
| ---------- | ---------------- |
| LOW        | Baixa prioridade |
| MEDIUM     | Média prioridade |
| HIGH       | Alta prioridade  |

| Status      | Descrição            |
| ----------- | -------------------- |
| PENDING     | Pendente de execução |
| IN_PROGRESS | Em andamento         |
| DONE        | Concluído            |

## 🚀 Iniciando

### Requisitos Obrigatórios

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) (versão 12+)
- npm ou yarn

### Configuração Inicial

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd task-master
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/task_master"
   JWT_SECRET="sua_chave_secreta_aqui"
   NODE_ENV="development"
   PORT=3000
   ```

4. **Execute as migrações do banco de dados**

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento com recarregamento automático
npm run dev

# Compilar TypeScript para JavaScript
npm run build

# Executar versão compilada
npm start

# Sincronizar schema Prisma com banco de dados
npx prisma migrate dev

# Abrir Prisma Studio (UI para banco de dados)
npx prisma studio
```

## 📁 Estrutura do Projeto

```
src/
├── @types/              # Tipos TypeScript customizados
├── controllers/         # Controladores (request handlers)
├── services/           # Lógica de negócio
├── repositories/       # Camada de acesso a dados
├── middlewares/        # Middlewares Express
├── routes/             # Definição de rotas
├── database/           # Configuração de conexão
├── errors/             # Classes de erro customizadas
├── utils/              # Funções utilitárias
├── container.ts        # Injeção de dependências
└── server.ts           # Ponto de entrada da aplicação

prisma/
├── schema.prisma       # Schema do Prisma ORM
└── migrations/         # Histórico de migrações do banco
```

## 🔌 Arquitetura

A aplicação segue o padrão de **três camadas**:

1. **Camada de Apresentação (Controllers)**: Manipula requisições HTTP e respostas
2. **Camada de Negócio (Services)**: Contém a lógica principal da aplicação
3. **Camada de Dados (Repositories)**: Gerencia acesso e persistência de dados

Este padrão garante separação de responsabilidades, facilitando testes unitários, manutenção e escalabilidade.

## 🔐 Segurança

- Senhas são hasheadas usando bcryptjs antes do armazenamento
- Autenticação baseada em JWT para proteção de rotas
- Validação de entrada em todas as rotas usando Zod
- Isolamento de dados por usuário em todas as operações
- CORS configurável para proteção contra ataques cross-origin
- Strict mode ativado no TypeScript para máxima segurança de tipo

## 📝 Licença

Este projeto está licenciado sob a licença ISC.

## 👤 Autor

Desenvolvido como parte de uma solução de gerenciamento de tarefas moderna e escalável (Emerson Carneiro da Silva).
