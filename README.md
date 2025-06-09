#  API - My NuvemLens

API desenvolvida para gerenciamento de fotos, usuários, comentários e pedidos na plataforma **My NuvemLens**, voltada para observadores de nuvens e ciência cidadã.

---

##  Funcionalidades

- Cadastro, listagem e busca de fotos  
- Cadastro e gerenciamento de usuários  
- Sistema de comentários nas fotos  
- Curtidas nas fotos  
- Cadastro e gerenciamento de produtos e pedidos  
- Autenticação com JWT  
- Upload de imagens com Multer  

---

## Banco de Dados

Este projeto utiliza MySQL como sistema de gerenciamento de banco de dados.

Os scripts SQL estão disponíveis na pasta [`MYSQLDUMP`](./MYSQLDUMP).   
Eles incluem:

- Estrutura do banco (tabelas e relacionamentos)
- Inserts básicos

---
  
##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL** 
- **JWT** (autenticação)
- **Multer** (upload de imagens)
- **Jest** (testes automatizados)

---

## Como Executar o Projeto

###  Pré-requisitos:
- Node.js instalado
- MySQL em execução

### Passos:

1. Clone os repositórios:

```bash
git clone https://github.com/Danietta894/BackEndMyNuvemLens.git
git clone https://github.com/Danietta894/FrontEndMyNuvemLens.git
```

2. Acesse a pasta da API e instale as dependências:

```bash
cd API
npm install
```

3. Configure o arquivo `.env` com as credenciais do seu banco:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor:

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`.

---

##  Testes

Foram realizados os seguintes testes:

-  **Testes unitários** com Jest: validações e regras de negócio  
-  **Testes de integração**: rotas de fotos, comentários, usuários  
-  **Testes de aceitação**: realizados manualmente com Postman  

---

##  Rotas Principais

| Método | Endpoint               | Descrição               |
|--------|------------------------|-------------------------|
| POST   | `/api/auth/login`      | Login do usuário        |
| POST   | `/api/auth/register`   | Cadastro de usuário     |
| GET    | `/api/fotos`           | Listar fotos            |
| POST   | `/api/fotos`           | Enviar nova foto        |
| GET    | `/api/comentarios`     | Listar comentários      |
| POST   | `/api/comentarios`     | Adicionar comentário    |

>  Outras rotas estão disponíveis para gerenciamento de produtos, pedidos, curtidas, denúncias e moderação.

---

## Demonstração

Confira o vídeo com a API em funcionamento:  
 [Acessar Demo no Google Drive](https://drive.google.com/drive/folders/1v2yOq2h7IxqkmguCXe9tFR3N6VZ1_VVB?sort=13&direction=a)

---

##  Desenvolvedora

- **Daniella Nunes Tenório**  
 [GitHub](https://github.com/Danietta894)

---

## Licença

Este projeto está licenciado sob a **Licença MIT**.
