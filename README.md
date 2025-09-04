
# 📌 LeadsApi

API para gerenciamento de **Leads**, desenvolvida em **.NET 8** com integração a um **frontend React**.  
O projeto permite convidar, aceitar, recusar e listar leads, servindo como base para estudos e aplicações de gestão de contatos.

## 🚀 Tecnologias Utilizadas

### Backend
- .NET 8
- Entity Framework Core
- xUnit (testes unitários)
- Swagger (documentação da API)

### Frontend
- React 18
- Vite
- Axios (consumo da API)

---

## 📂 Estrutura do Projeto

```
LeadsApi-master/
│── LeadsApi/               # API .NET
│   ├── Controllers/         # Endpoints
│   ├── Models/              # Modelos de dados
│   ├── Migrations/          # Mapeamento do banco (EF Core)
│   ├── appsettings.json     # Configurações
│   ├── Program.cs           # Configuração inicial
│   └── LeadsApi.Tests/      # Testes unitários
│
│── LeadsApp/
│   └── leads-frontend/      # Frontend React
│       ├── src/
│       ├── public/
│       └── package.json
```

---

## ⚙️ Como Rodar o Projeto

### 📌 Pré-requisitos
- .NET 8 SDK
- Node.js + npm

### ▶️ Rodando o Backend

```bash
# Entrar na pasta da API
cd LeadsApi-master/LeadsApi

# Restaurar dependências
dotnet restore

# Rodar migrações do banco
dotnet ef database update

# Rodar a API
dotnet run
```

➡ A API ficará disponível em:  
```
https://localhost:5001/swagger
```

---

### ▶️ Rodando o Frontend

```bash
# Entrar no frontend
cd LeadsApi-master/LeadsApp/leads-frontend

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

➡ O frontend ficará disponível em:  
```
http://localhost:5173
```

---

## 📡 Endpoints Principais

| Método | Endpoint       | Descrição                  |
|--------|---------------|-----------------------------|
| GET    | `/invited`    | Lista todos os leads convidados |
| GET    | `/accepted`   | Lista todos os leads aceitos |
| POST   | `/accept`     | Aceita um lead              |
| POST   | `/decline`    | Recusa um lead              |

---

## ✅ Testes Unitários

Para rodar os testes com **xUnit**:

```bash
cd LeadsApi-master/LeadsApi/LeadsApi.Tests
dotnet test
```

---


## 📌 Autor

👤 **Lucas Silva**  
📧 lucasfofs3@gmail.com
