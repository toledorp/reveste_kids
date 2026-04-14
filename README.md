cat > README.md << 'EOF'
# 🚀 Star Wars API - Fullstack

Sistema fullstack desenvolvido com **Node.js, Express, MongoDB Atlas e React**, permitindo gerenciamento completo (CRUD) dos dados do universo Star Wars com **interface administrativa integrada**.

---


## 📸 Application Preview

### 🏠 Home

![Home Screenshot](assets/screenshot-home.png)

### 📊 Dashboard

![Dashboard Screenshot](assets/screenshot-dashboard.png)

### 🔌 API (Insomnia)

![API Screenshot](assets/screenshot-api.png)

---

## 📌 Objetivo

Projeto desenvolvido para a disciplina **Desenvolvimento Web III**, com foco na construção de uma aplicação fullstack completa.

✔ API REST estruturada  
✔ Integração com MongoDB Atlas  
✔ Frontend em React consumindo API  
✔ Autenticação com JWT  
✔ Painel administrativo com CRUD completo via interface  
✔ Documentação interativa com Swagger  

---

## 🛠️ Tecnologias utilizadas

### 🔧 Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv
- JSON Web Token (JWT)
- Swagger UI Express

### 🎨 Frontend
- React
- Vite
- Fetch API

### 🧪 Ferramentas
- Insomnia
- Swagger
- Git e GitHub

---

## 📂 Estrutura do projeto

```text
ATV01_API_STAR_WARS/
│
├── backend-star-wars/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── package.json
│
├── frontend-star-wars/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── assets/
│   ├── home.png
│   ├── dashboard.png
│   └── api.png
│
├── package.json
└── README.md
```

---

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/toledorp/ATV01_API_STAR_WARS.git
```

### 2. Instalar dependências

#### Backend

```bash
cd backend-star-wars
npm install
```

#### Frontend

```bash
cd ../frontend-star-wars
npm install
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta **backend-star-wars**:

```env
MONGO_URI=sua_string_do_mongodb_atlas
PORT=4000
```

---

### 4. Executar aplicação

Na raiz do projeto:

```bash
npm run dev
```

- Backend: http://localhost:4000
- Frontend: http://localhost:5173

---


## 🌐 Acessos

Backend: http://localhost:4000  
Frontend: http://localhost:5173  
Swagger: http://localhost:4000/api-docs  

---

## 🔐 Autenticação

Sistema com JWT e dois níveis:

Usuário:
- Visualiza dados

Admin:
- Cria
- Edita
- Exclui

---

## 🧩 Funcionalidades

### Backend
- CRUD completo
- API REST
- MongoDB Atlas
- JWT
- Middleware de autorização
- Swagger

### Frontend
- Login
- Painel admin
- CRUD visual
- Paginação
- Controle por perfil

---

## 📚 Entidades

- Films
- Characters
- Planets
- Species
- Vehicles
- Starships

---

## 🔗 Endpoints

Auth:
POST /user  
POST /auth  

Films:
GET /films  
POST /films  
PUT /films/:id  
DELETE /films/:id  

Characters:
GET /persons  
POST /persons  
PUT /persons/:id  
DELETE /persons/:id  

Planets:
GET /planets  
POST /planets  
PUT /planets/:id  
DELETE /planets/:id  

Species:
GET /species  
POST /species  
PUT /species/:id  
DELETE /species/:id  

Vehicles:
GET /vehicles  
POST /vehicles  
PUT /vehicles/:id  
DELETE /vehicles/:id  

Starships:
GET /starships  
POST /starships  
PUT /starships/:id  
DELETE /starships/:id  

---

## 🧪 Testes

- Insomnia  
- Swagger  
- Frontend  

---

## ☁️ Banco

MongoDB Atlas

---

## 🧠 Desafios

- MongoDB Atlas
- JWT
- Integração front/back
- CRUD completo
- Controle de acesso
- Paginação
- Swagger

## 🧩 Exemplo de estrutura de dados (com aninhamento)

```json
{
  "name": "C-3PO",
  "birth_year": "112BBY",
  "homeworld": "Tatooine",
  "species": "Droid",
  "descriptions": {
    "height": 167,
    "mass": 75,
    "hair_color": "n/a",
    "skin_color": "gold",
    "eye_color": "yellow",
    "gender": "n/a"
  }
}
```

---

## 📘 Swagger

http://localhost:4000/api-docs

---

## 🎨 Painel Admin

Permite:

- Criar
- Editar
- Excluir
- Paginar dados

Tudo via interface gráfica.

---

## 🧪 Testes da API

Os testes foram realizados utilizando o **Insomnia**, validando todos os endpoints de CRUD (Create, Read, Update e Delete).

---

## ☁️ Banco de dados

O banco de dados está hospedado na nuvem utilizando o **MongoDB Atlas**.

---

## 🎨 Protótipo do Frontend

Adicionar aqui o link do Figma:

```text
https://www.figma.com/proto/2KIfzXKWMaD8ZzBU6ABgr7/api_star-wars?node-id=0-1&t=ULhOFcygZzI4HqTi-1
```

---

## 🧠 Desafios enfrentados

- Configuração do MongoDB Atlas
- Conexão entre backend e banco de dados
- Estruturação de rotas REST
- Implementação do CRUD completo
- Integração entre frontend e backend
- Organização do projeto fullstack

---

## 📘 Documentação da API

A documentação pode ser acessada via Swagger (caso implementado):

```text
http://localhost:4000/api-docs
```

---

## 👨‍💻 Autor(es)

- Camila Machado de Souza
- Ricardo Sugano
- Rogerio Pupo Toledo

---

## 📄 Licença

Este projeto é acadêmico e não possui fins comerciais.
