# 👕 RevesteKids

Plataforma web para troca de roupas infantis entre pais e responsáveis, com foco em sustentabilidade, reutilização e economia.

Inspirado na experiência do TikTok (feed vertical), o sistema permite que usuários publiquem peças, encontrem roupas compatíveis e realizem trocas de forma simples.

---

# 🎯 Objetivo

Criar um sistema completo (frontend + backend) que permita:

- Login com Google
- Cadastro de roupas infantis
- Feed estilo TikTok
- Sistema de interesse e match
- Chat entre usuários
- Trocas e avaliações

---

# 🧠 Contexto do Produto

## Público-alvo
- Pais e responsáveis

## Problema
- Crianças crescem rápido
- Roupas são pouco usadas
- Alto desperdício

## Solução
- Plataforma simples de troca de roupas
- Experiência visual e social
- Incentivo à economia circular

---

# 🧱 Arquitetura

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- React Query (TanStack)
- Socket.IO Client

## Backend
- NestJS
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- Passport (Google OAuth)
- Socket.IO

## Infra
- Vercel (frontend)
- Render (backend)
- MongoDB Atlas
- Cloudinary (imagens)

---

# 📁 Estrutura do Projeto

## Frontend

src/
  app/
    login/
    feed/
    closet/
    profile/
    chat/
    matches/
  components/
  services/
  store/
  hooks/
  types/

## Backend

src/
  modules/
    auth/
    users/
    items/
    feed/
    interests/
    matches/
    chats/
    swaps/
    reviews/
    upload/
  common/
  config/
  database/

---

# 🔐 Autenticação

- Login com Google OAuth 2.0
- Backend valida usuário
- Geração de JWT
- Sessão baseada em token

---

# 🧩 Funcionalidades

## Usuário
- Criar conta via Google
- Editar perfil
- Ver histórico

## Closet
- Cadastrar roupas
- Editar e excluir
- Marcar como trocada

## Feed
- Scroll vertical estilo TikTok
- Mostrar peças disponíveis
- Filtros básicos

## Interesse e Match
- Demonstrar interesse
- Criar match quando há reciprocidade

## Chat
- Tempo real com Socket.IO
- Troca de mensagens
- Propostas de troca

## Trocas
- Status da troca
- Confirmação bilateral

## Avaliações
- Nota de usuário
- Comentários

---

# 🗄️ Modelagem do Banco

## Users
- name
- email
- googleId
- avatar
- bio
- city
- state
- rating
- totalSwaps

## Items
- ownerId
- title
- description
- size
- ageRange
- condition
- images
- status

## Matches
- userA
- userB
- items envolvidos

## Chats
- participants
- lastMessage

## Messages
- chatId
- senderId
- content
- type
- createdAt

## Swaps
- matchId
- items
- status
- confirmedBy

## Reviews
- reviewerId
- reviewedUserId
- rating
- comment

---

# 🌐 API

## Auth
POST /auth/google  
GET /auth/me  

## Users
GET /users/me  
PUT /users/me  

## Items
POST /items  
GET /items  
GET /items/:id  
PUT /items/:id  
DELETE /items/:id  

## Feed
GET /feed  

## Interests
POST /interests  
GET /interests/me  

## Matches
POST /matches  
GET /matches/me  

## Chats
GET /chats  
GET /chats/:id/messages  
POST /chats/:id/messages  

## Swaps
POST /swaps  
PATCH /swaps/:id  

## Reviews
POST /reviews  
GET /users/:id/reviews  

---

# ⚙️ Variáveis de Ambiente

## Backend (.env)

PORT=3001  
MONGODB_URI=  
JWT_SECRET=  
JWT_EXPIRES_IN=7d  

GOOGLE_CLIENT_ID=  
GOOGLE_CLIENT_SECRET=  
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback  

FRONTEND_URL=http://localhost:3000  

## Frontend (.env.local)

NEXT_PUBLIC_API_URL=http://localhost:3001  

---

# 🚀 Como rodar o projeto

## Backend

cd backend  
npm install  
npm run start:dev  

## Frontend

cd frontend  
npm install  
npm run dev  

---

# 📌 Regras de Negócio

- Usuário não vê suas próprias peças no feed
- Peça trocada não aparece no feed
- Chat só pode ser iniciado após match
- Apenas o dono pode editar ou excluir uma peça
- Avaliação só após troca concluída
- Peças reservadas não podem ser reutilizadas em outras trocas

---

# 🧠 Instruções para o Codex

Você é responsável por implementar este sistema.

## Regras

- Usar NestJS no backend
- Usar Next.js no frontend
- Usar MongoDB com Mongoose
- Seguir arquitetura modular
- Código deve ser limpo e tipado
- Evitar duplicação de código

---

## Ordem de Implementação

1. Setup do backend com NestJS
2. Conexão com MongoDB
3. Implementar autenticação Google + JWT
4. CRUD de usuários
5. CRUD de itens
6. Feed
7. Sistema de interesse
8. Match
9. Chat com Socket.IO
10. Sistema de trocas

---

## Convenções

- Backend: camelCase
- Frontend: PascalCase para componentes
- APIs REST
- TypeScript obrigatório

---

## Não utilizar

- Firebase
- Banco relacional
- Código sem tipagem
- Lógica de negócio dentro de controllers

---

# 📌 Próximas evoluções

- Notificações
- Geolocalização
- Upload de vídeo
- Sistema de recomendação inteligente

---

# 🚀 Uso com Codex

Exemplo de prompt:

Leia o README.md e implemente o backend completo com NestJS.

Ou:

Implemente o módulo de autenticação com Google baseado neste README.