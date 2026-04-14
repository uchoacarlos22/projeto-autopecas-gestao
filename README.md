# 🛠️ Zenith Autoparts - Sistema de Gestão

## Descrição

O **Zenith Autoparts** é uma API de alto nível desenvolvida para o gerenciamento de estoque de **auto peças e produtos automotivos**. Este projeto foi evoluído de um CRUD básico para uma solução backend robusta, focada em escalabilidade corporativa, segurança e documentação de excelência.

### 🌟 Diferenciais Técnicos (Elite)
- **Documentação Live (Swagger/OpenAPI 3.0):** Interface interativa disponível em `/api-docs` para testes em tempo real.
- **Validação com Joi:** Esquemas de dados profissionais que garantem a integridade das informações.
- **Segurança Proativa (Helmet):** Middleware configurado para proteção contra vulnerabilidades web comuns.
- **Arquitetura Service Layer:** Código desacoplado e organizado, facilitando a manutenção e expansão.
- **Custom Error Handling:** Sistema padronizado de tratamento de erros (`NotFoundError`, `ValidationError`).
- **Testes de Integração (Jest):** Suíte automatizada garantindo a estabilidade das rotas de produtos.

## 🛠️ Tecnologias Utilizadas

- **Node.js & Express:** Core da aplicação.
- **MySQL & Sequelize (ORM):** Persistência de dados relacional.
- **Joi:** Validação de esquemas.
- **Swagger:** Documentação técnica.
- **Helmet:** Camada de segurança.
- **Jest & Supertest:** Testes automatizados.
- **SQLite3:** Banco de dados rápido para o ambiente de testes.

## 🚀 Instalação e Execução

1. Faça um clone deste repositório.
2. Navegue até a pasta do projeto: `cd backend`.
3. Instale as dependências: `npm install`.
4. Configure sua conexão MySQL no arquivo `.env`.
5. Execute as migrations: `npm run pretest` (ou `npx sequelize db:migrate`).
6. Inicie em modo desenvolvimento: `npm run dev`.
7. **Documentação:** Acesse `http://localhost:3333/api-docs` para ver a API em ação.

## 🧪 Testes

Para garantir que tudo está funcionando conforme o esperado:
```bash
npm test
```

---
*Este projeto foi desenvolvido como parte de um portfólio de engenharia de software de alta performance.*
