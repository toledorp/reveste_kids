# Reveste Kids - Plataforma de Troca de Roupas

Aplicação **fullstack moderna** desenvolvida com **Node.js, Express, MongoDB Atlas, React e Cloudinary**, que permite a troca de roupas entre usuários através de uma experiência interativa inspirada em redes sociais como o TikTok.

---

## Sobre o projeto

O **Reveste Kids** é uma plataforma onde usuários podem:

- Cadastrar roupas
- Curtir peças de outros usuários
- Criar matches automáticos
- Conversar e negociar trocas

Tudo isso com uma interface moderna, fluida e responsiva.

---

## Objetivo

Projeto desenvolvido para a disciplina **Desenvolvimento Web III**, com foco em:

✔ Construção de aplicação fullstack real  
✔ Integração com serviços externos (Cloudinary)  
✔ Interface moderna estilo app mobile  
✔ Boas práticas de arquitetura e organização  

---

## Tecnologias utilizadas

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (Autenticação)
- Dotenv
- Swagger UI

### Frontend
- React
- Vite
- CSS moderno (UI estilo TikTok)
- Fetch API

### Upload de mídia
- Cloudinary

### Ferramentas
- Insomnia
- Swagger
- Git & GitHub

---

## Funcionalidades

### Gestão de roupas
- Cadastro de peças
- Upload de múltiplas imagens
- Upload de vídeo
- Edição completa
- Exclusão de peças

---

### Feed estilo TikTok
- Scroll vertical fluido
- Suporte a imagens e vídeos
- Carousel de mídia
- Layout responsivo:
  - 🖥️ Desktop → informações laterais  
  - 📱 Mobile → informações abaixo  
- Interações rápidas (like e match)

---

### Likes
- Curtir peças
- Remover curtidas
- Bloqueio de auto-like

---

### Matches
- Match automático por interesse mútuo
- Interface de chat em tempo real
- Visualização das peças envolvidas

---

### Meu Closet
- Visualização das próprias peças
- Edição via modal
- Upload e remoção de mídias
- Exclusão de itens

---

### Cadastro de Peças
- Interface moderna
- Upload separado:
  - 📸 Imagens
  - 🎥 Vídeos
- Preview em tempo real
- Integração com Cloudinary

---

## Upload com Cloudinary

- Upload direto pelo frontend
- Suporte a imagens e vídeos
- CDN global
- Otimização automática

### Estrutura:

\`\`\`json
{
  "media": [
    { "type": "image", "url": "https://..." },
    { "type": "video", "url": "https://..." }
  ]
}
\`\`\`

---

## Estrutura do projeto

\`\`\`bash
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
\`\`\`

---

## Como executar

### 1. Clonar o projeto

\`\`\`bash
git clone https://github.com/toledorp/reveste_kids.git
\`\`\`

---

### 2. Instalar dependências

#### Backend

\`\`\`bash
cd backend
npm install
\`\`\`

#### Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

---

### 3. Configurar variáveis de ambiente

Crie um \`.env\` no backend:

\`\`\`env
MONGO_URI=sua_string_mongodb
JWT_SECRET=sua_chave_secreta
PORT=4000
\`\`\`

---

### 4. Rodar o projeto

\`\`\`bash
npm run dev
\`\`\`

---

## Acessos

- Frontend → http://localhost:5173  
- Backend → http://localhost:4000  
- Swagger → http://localhost:4000/api-docs  

---

## Autenticação

- JWT
- Login e cadastro
- Proteção de rotas
- Persistência de sessão

---

## API (principais rotas)

### Auth
\`\`\`
POST /user
POST /auth
\`\`\`

### Roupas
\`\`\`
GET /clothes
POST /clothes
PUT /clothes/:id
DELETE /clothes/:id
GET /clothes/user
\`\`\`

### Likes
\`\`\`
POST /like/:id
DELETE /like/:id
\`\`\`

### Matches
\`\`\`
GET /matches
\`\`\`

---

## Swagger

Documentação disponível em:

\`\`\`
http://localhost:4000/api-docs
\`\`\`

---

## Diferenciais

✨ Interface estilo TikTok  
✨ Upload de imagens e vídeos  
✨ Match automático entre usuários  
✨ UX moderna e responsiva  
✨ Arquitetura fullstack completa  
✨ Pronto para evolução (mobile / deploy)  

---

## Testes

- Insomnia
- Swagger
- Testes manuais

---

## ☁️ Banco de dados

- MongoDB Atlas (Cloud)

---

## Autores

- Camila Machado de Souza  
- Felipe Guedes  
- Kaio Sumikawa  
- Ricardo Sugano  
- Rogerio Pupo Toledo  

---

## Licença

Projeto acadêmico sem fins comerciais.
EOF