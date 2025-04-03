# Notes

Um aplicativo de notas desenvolvido com **React** e **json-server** para simular um back-end.

## 📌 Funcionalidades
- Criar, editar e excluir notas
- Persistência de dados com `json-server`
- Interface responsiva e estilizada
- Inicialização automatizada do banco de dados

## 🚀 Tecnologias
- [React](https://react.dev/)
- [json-server](https://github.com/typicode/json-server)

## 🛠 Configuração e Uso
### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ Instalar dependências
```sh
npm install
```

### 3️⃣ Configurar o banco de dados
```sh
npm run setup-db
```
Esse comando copia `db.model.json` para `db.json`, garantindo que o banco de dados tenha um modelo inicial.

### 4️⃣ Rodar o projeto
```sh
npm run dev
```
Esse comando:
- **Inicia o `json-server`** na porta 5000
- **Roda o React**

## 🔥 Scripts disponíveis
- `npm run setup-db` → Restaura o banco para o modelo inicial
- `npm run dev` → Inicializa tudo (frontend + backend)

📌 **Contribuições são bem-vindas!** Se tiver sugestões ou quiser colaborar, fique à vontade para abrir uma issue ou pull request. 😉

