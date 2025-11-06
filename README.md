# 📝 Projeto Cadastro - Do Zero ao Deploy

Sistema completo de cadastro de usuários com frontend em HTML/CSS/JS puro e backend serverless na Vercel com MongoDB Atlas.

## 🚀 Tecnologias

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (Serverless Function)
- **Banco de Dados**: MongoDB Atlas
- **Deploy**: Vercel

## 📁 Estrutura do Projeto

```
/PROJETO_CADASTRO
├── index.html          # Página principal com formulário
├── style.css           # Estilos da aplicação
├── script.js           # Lógica do frontend
├── api/
│   └── register.js     # Função serverless (backend)
├── package.json        # Dependências do projeto
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Documentação
```

## ⚙️ Configuração

### 1. MongoDB Atlas

1. Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um novo cluster (gratuito)
3. Em "Database Access", crie um usuário com senha
4. Em "Network Access", adicione `0.0.0.0/0` para permitir acesso de qualquer IP
5. Clique em "Connect" → "Connect your application"
6. Copie a string de conexão (parecida com: `mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/myDatabase`)

### 2. Deploy na Vercel

1. Instale a CLI da Vercel (se ainda não tiver):
   ```bash
   npm install -g vercel
   ```

2. No terminal, dentro da pasta do projeto, execute:
   ```bash
   vercel
   ```

3. Durante o processo, a Vercel fará algumas perguntas:
   - Link to existing project? **N** (No)
   - Project name? **projeto-cadastro** (ou o nome que preferir)
   - In which directory is your code located? **./** (pressione Enter)

4. Adicione a variável de ambiente `MONGODB_URI`:
   ```bash
   vercel env add MONGODB_URI
   ```
   - Cole sua string de conexão do MongoDB Atlas
   - Selecione todos os ambientes (Production, Preview, Development)

5. Faça o deploy em produção:
   ```bash
   vercel --prod
   ```

## 🎯 Como Usar

Após o deploy, você receberá uma URL da Vercel (ex: `https://projeto-cadastro.vercel.app`).

1. Acesse a URL no navegador
2. Preencha o formulário com nome, email e senha
3. Clique em "Cadastrar"
4. Você verá uma mensagem de sucesso ou erro

## 🔧 Desenvolvimento Local

Para testar localmente:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz com:
   ```
   MONGODB_URI=sua_string_de_conexao_aqui
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   vercel dev
   ```

4. Acesse `http://localhost:3000`

## 📝 Notas Importantes

- **Segurança**: Em produção, você deveria criptografar as senhas com bcrypt antes de salvar
- **Validação**: Adicione validações mais robustas (ex: força da senha, formato do email)
- **HTTPS**: A Vercel fornece HTTPS automaticamente
- **Escalabilidade**: As serverless functions da Vercel escalam automaticamente

## 🎓 Próximos Passos

- [ ] Adicionar criptografia de senha (bcrypt)
- [ ] Implementar página de login
- [ ] Adicionar validação de força de senha
- [ ] Criar dashboard do usuário
- [ ] Implementar recuperação de senha

## 📄 Licença

ISC
