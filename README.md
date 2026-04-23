# 🚀 Reveste Kids - Plataforma de Troca de Roupas

Sistema fullstack desenvolvido com **Node.js, Express, MongoDB Atlas, React e Cloudinary**, permitindo que usuários cadastrem roupas, interajam via likes e realizem trocas através de matches.

---

## 📌 Objetivo

Projeto desenvolvido para a disciplina **Desenvolvimento Web III**, com foco na construção de uma aplicação moderna estilo **rede social de troca de roupas**, incluindo:

✔ Cadastro de peças  
✔ Upload de imagens e vídeos  
✔ Feed interativo  
✔ Sistema de likes  
✔ Matches entre usuários  
✔ CRUD completo via interface  
✔ API documentada com Swagger  

---

## 🛠️ Tecnologias utilizadas

### 🔧 Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (Autenticação)
- Dotenv
- Swagger UI Express

### 🎨 Frontend
- React
- Vite
- Fetch API
- CSS moderno (UI estilo app)

### ☁️ Upload de mídia
- Cloudinary

### 🧪 Ferramentas
- Insomnia
- Swagger UI
- Git e GitHub

---

## 📸 Funcionalidades principais

### 👕 Roupas
- Cadastro de peças via frontend
- Upload múltiplo de imagens
- Suporte a vídeos
- Edição e exclusão

### 📰 Feed
- Exibição das peças em formato de **carousel (swipe)**
- Suporte a imagens e vídeos
- Visual moderno estilo rede social

### ❤️ Likes
- Curtir peças de outros usuários
- Descurtir
- Bloqueio de like em peças do próprio usuário

### 🔥 Matches
- Match automático quando há interesse mútuo
- Tela dedicada exibindo as peças envolvidas

### 👤 Meu Closet
- Visualização das próprias peças
- Edição via modal moderno
- Exclusão

---

## ☁️ Cloudinary (Upload de mídia)

O sistema utiliza o **Cloudinary** para armazenamento de mídia:

- Upload direto do frontend
- Suporte a múltiplas imagens
- Suporte a vídeos
- URLs otimizadas automaticamente
- CDN global (alta performance)

### Estrutura de mídia

```json
{
  "media": [
    {
      "type": "image",
      "url": "https://..."
    },
    {
      "type": "video",
      "url": "https://..."
    }
  ]
}
```

---

## 📂 Estrutura do projeto

```text
reveste_kids/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── index.html
│
└── README.md
```

---

## ⚙️ Como executar o projeto

### 1. Clonar repositório

```bash
git clone https://github.com/toledorp/reveste_kids.git
```

---

### 2. Instalar dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta **backend**:

```env
MONGO_URI=sua_string_mongodb
JWT_SECRET=sua_chave_secreta
PORT=4000
```

---

### 4. Executar aplicação

```bash
npm run dev
```

---

## 🌐 Acessos

- Frontend: http://localhost:5173  
- Backend: http://localhost:4000  
- Swagger: http://localhost:4000/api-docs  

---

## 🔐 Autenticação

Sistema com JWT:

- Registro de usuário
- Login
- Rotas protegidas

---

## 🔗 Endpoints principais

### Auth
```
POST /user
POST /auth
```

### Roupas
```
GET /clothes
POST /clothes
PUT /clothes/:id
DELETE /clothes/:id
GET /clothes/user
```

### Likes
```
POST /like/:id
DELETE /like/:id
```

### Matches
```
GET /matches
```

---

## 📘 Swagger

A documentação interativa da API está disponível em:

```
http://localhost:4000/api-docs
```

---

## 🧠 Diferenciais do projeto

- Upload de mídia com Cloudinary (imagens + vídeos)
- Interface estilo aplicativo moderno (UX)
- Sistema de match baseado em interesse mútuo
- Feed com carousel (swipe)
- Arquitetura fullstack bem definida
- Projeto preparado para evolução

---

## 🧪 Testes

- Insomnia
- Swagger
- Testes via frontend

---

## ☁️ Banco de dados

MongoDB Atlas (cloud)

---

## 👨‍💻 Autor(es)

- Camila Machado de Souza 
- Felipe Guedes
- Kaio Sumikawa 
- Ricardo Sugano  
- Rogerio Pupo Toledo  

---

## 📄 Licença

Projeto acadêmico sem fins comerciais.