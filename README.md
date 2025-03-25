# Node API Boilerplate

Uma estrutura base para APIs Node.js utilizando TypeScript, Koa e boas práticas de desenvolvimento.

## 🚀 Propósito

Este projeto fornece uma base sólida para iniciar rapidamente o desenvolvimento de APIs RESTful, sem a necessidade de configurar um projeto do zero. Ele implementa uma arquitetura organizada e escalável baseada em melhores práticas e padrões de desenvolvimento.

## 🛠️ Tecnologias

- **TypeScript**: Tipagem estática para desenvolvimento mais seguro
- **Koa**: Framework web minimalista para Node.js
- **pnpm**: Gerenciador de pacotes rápido e eficiente
- **Biome**: Ferramenta de formatação e linting (substituindo ESLint/Prettier)
- **Jest**: Framework para testes
- **Zod**: Validação de esquemas
- **Pino**: Sistema de logs estruturados

## 📋 Características

- Estrutura de projeto organizada e escalável
- Configuração completa para desenvolvimento, testes e produção
- Gerenciamento de erros centralizado
- Middleware para tratamento de erros
- Logging configurado e pronto para uso
- Sistema de rotas modularizado
- Docker e docker compose prontos para uso

## 📂 Estrutura do Projeto

```
/
├── src/                 # Código-fonte da aplicação
│   ├── config/          # Configurações (logger, etc.)
│   ├── controllers/     # Controladores da API
│   ├── database/        # Configuração e conexão com banco de dados
│   ├── errors/          # Definições de erros da aplicação
│   ├── middlewares/     # Middlewares do Koa (erro, validação, etc.)
│   ├── repositories/    # Implementação do padrão Repository
│   ├── routes/          # Definição de rotas da API
│   ├── schemas/         # Esquemas de validação com Zod
│   ├── services/        # Lógica de negócios
│   ├── types/           # Definições de tipos e interfaces
│   └── index.ts         # Ponto de entrada da aplicação
├── tests/               # Testes automatizados
│   ├── integration/     # Testes de integração
│   ├── unit/            # Testes unitários
│   └── setup.ts         # Configuração para ambiente de testes
├── docker-compose.yml   # Configuração do Docker Compose
├── Dockerfile           # Definição do container
├── biome.json           # Configuração do Biome (linting/formatting)
├── jest.config.ts       # Configuração do Jest para testes
├── tsconfig.json        # Configuração do TypeScript
├── .env.example         # Exemplo de variáveis de ambiente
└── package.json         # Dependências e scripts
```

## 🚀 Como Usar

### Opção 1: Desenvolvimento Local

#### Pré-requisitos

- Node.js 18+
- pnpm 8+

#### Instalação

1. Clone este repositório ou use-o como template
2. Instale as dependências:

```bash
pnpm install
```

#### Desenvolvimento

```bash
# Iniciar em modo de desenvolvimento
pnpm dev

# Verificar linting
pnpm lint:check

# Aplicar correções de linting
pnpm lint

# Verificar formatação
pnpm format:check

# Aplicar formatação
pnpm format
```

#### Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Verificar cobertura de testes
pnpm test:coverage
```

### Opção 2: Utilizando Docker

#### Pré-requisitos

- Docker

> **Nota**: Utilizando Docker, você não precisa ter Node.js ou pnpm instalados localmente.

#### Desenvolvimento com Docker

```bash
# Iniciar serviços definidos no docker-compose.yml
# Este comando constrói a imagem automaticamente na primeira execução
docker compose up

# Se você fez alterações no Dockerfile ou precisa reconstruir a imagem:
docker compose up --build
```

## 🧩 Customização

Este scaffold é intencionalmente abstrato em relação à escolha do banco de dados e outras tecnologias específicas. Você pode facilmente adicionar:

- Módulos de banco de dados (MongoDB, PostgreSQL, MySQL, etc.)
- Autenticação (JWT, OAuth, etc.)
- Documentação da API (Swagger, etc.)
- Validação (expandir o uso do Zod)
- Monitoramento (expandir logging, métricas, etc.)
