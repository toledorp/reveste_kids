# 🚀 Reveste Kids - Plataforma de Troca de Roupas

Sistema fullstack desenvolvido com **Node.js, Express, MongoDB Atlas, React e Cloudinary**, permitindo que usuários cadastrem roupas, interajam via likes e realizem trocas através de matches em uma experiência inspirada no TikTok.

---

## 📌 Objetivo

Projeto desenvolvido para a disciplina **Desenvolvimento Web III**, com foco na construção de uma aplicação moderna estilo **rede social de troca de roupas**, incluindo:

✔ Cadastro de peças
✔ Upload de imagens e vídeos
✔ Feed interativo estilo TikTok
✔ Sistema de likes
✔ Matches automáticos entre usuários
✔ CRUD completo via interface
✔ API documentada com Swagger

---

## 🛠️ Tecnologias utilizadas

### 🔧 Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (Autenticação)
* Dotenv
* Swagger UI Express

### 🎨 Frontend

* React
* Vite
* Fetch API
* CSS moderno (UI estilo app)

### ☁️ Upload de mídia

* Cloudinary

### 🧪 Ferramentas

* Insomnia
* Swagger UI
* Git e GitHub

---

## 📸 Funcionalidades principais

### 👕 Roupas

* Cadastro de peças via frontend
* Upload múltiplo de imagens
* Upload de vídeos
* Edição completa (incluindo mídias)
* Exclusão de peças

---

### 📰 Feed estilo TikTok (OFICIAL)

* Exibição vertical estilo swipe
* Suporte a imagens e vídeos no mesmo post
* Carousel de mídia (foto + vídeo)
* Layout responsivo:

  * 🖥️ Web → informações ao lado
  * 📱 Mobile → informações abaixo
* Interações rápidas (curtir, match)

---

### ❤️ Likes

* Curtir peças de outros usuários
* Remover curtida
* Bloqueio de curtida em peças próprias

---

### 🔥 Matches

* Match automático quando há interesse mútuo
* Tela dedicada com:

  * Peças envolvidas
  * Usuários relacionados

---

### 👤 Meu Closet

* Visualização das próprias peças
* Edição via modal moderno
* Upload/remoção de imagens e vídeos
* Exclusão de peças

---

### ➕ Cadastro de Peças

* Interface moderna estilo app
* Upload separado de:

  * 📸 Imagens
  * 🎥 Vídeos
* Preview antes do envio
* Integração com Cloudinary

---

## ☁️ Cloudinary (Upload de mídia)

O sistema utiliza o **Cloudinary** para armazenamento de mídia:

* Upload direto do frontend
* Suporte a múltiplas imagens
* Suporte a vídeos
* URLs otimizadas automaticamente
* CDN global (alta performance)

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
│   │   │   ├── FeedTikTok.jsx
│   │   │   ├── MyCloset.jsx
│   │   │   ├── AddClothing.jsx
│   │   │   ├── Matches.jsx
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

Na raiz do projeto:

```bash
npm run dev
```

---

## 🌐 Acessos

* Frontend: http://localhost:5173
* Backend: http://localhost:4000
* Swagger: http://localhost:4000/api-docs

---

## 🔐 Autenticação

Sistema baseado em JWT:

* Cadastro de usuário
* Login
* Proteção de rotas
* Persistência de sessão no frontend

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

Documentação interativa disponível em:

```
http://localhost:4000/api-docs
```

---

## 🧠 Diferenciais do projeto

* Feed estilo TikTok totalmente funcional
* Upload de imagens e vídeos com Cloudinary
* Interface moderna e responsiva (mobile first)
* Sistema de match automático
* Arquitetura fullstack bem definida
* Experiência de usuário inspirada em apps reais
* Pronto para evolução (mobile app / deploy)

---

## 🧪 Testes

* Insomnia
* Swagger
* Testes manuais via frontend

---

## ☁️ Banco de dados

* MongoDB Atlas (cloud)

---

## 👨‍💻 Autor(es)

* Camila Machado de Souza
* Felipe Guedes
* Kaio Sumikawa
* Ricardo Sugano
* Rogerio Pupo Toledo

---

## 📄 Licença

Projeto acadêmico sem fins comerciais.
