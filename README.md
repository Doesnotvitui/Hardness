# Sistema de Cadastro e Gerenciamento de Usuários - Hardness

Este projeto consiste em um sistema web completo para cadastro, login e administração de usuários. Ele foi desenvolvido como parte de uma **etapa do processo seletivo da empresa Hardness**, com foco em demonstrar a implementação das operações CRUD (Create, Read, Update, Delete) no desenvolvimento frontend e backend.

## 📁 Estrutura de Páginas

- `cadastro.html` — Tela de cadastro de novos usuários com validações.
- `login.html` — Tela de login com redirecionamento conforme o tipo de usuário.
- `index.html` — Página principal para usuários comuns, permite listar os usuários.
- `admin.html` — Painel administrativo com funcionalidades de listagem, atualização e exclusão de qualquer usuário.

## 👤 Níveis de Acesso

- **Administrador**: pode listar, editar e excluir todos os usuários no painel `admin.html`.
- **Usuário comum**: pode visualizar apenas os dados no `index.html`.

## 🚀 Como Executar

1. Crie o banco de dados no seu servidor local.
2. Execute o seguinte comando SQL para criar a tabela e inserir o usuário administrador:

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    senha VARCHAR(255) NOT NULL,
    admin SMALLINT DEFAULT 0
);

-- Cria um usuário administrador padrão
INSERT INTO clientes (nome, telefone, endereco, senha, admin)
VALUES ('Administrador', '00000000000', 'Endereço do Admin', 'admin123', 1);
