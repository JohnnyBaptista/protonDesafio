# Desafio de Programação - Backend
Backend feito em NodeJS utilizando Express e banco MongoDB

## Como rodar
Basta clonar os arquivos e no diretório rodar os seguintes comandos:

```
npm install
```
Assim ele instalará todas as dependências, em seguida
```
node src/server.js
```
Este último comando irá inicializar o servidor no endereço http://localhost:3333

## Rotas
A API contém as seguintes rotas

1. ### GET
  * **_/users_** -> Retorna todos os usuários
  * **_/musics_** -> Retorna todas as Músicas
  * **_/approve_** -> Retorna todas as Músicas aprovadas
  * **_/disapprove_** -> Retorna todas as Músicas desaprovadas
 
2. ### POST
  * **_/users_** -> Insere um novo usuário no banco
  * **_/musics_** -> Insere uma nova música no banco
  * **_/approve/:musicID_** -> Aprova a música escolhida
  * **_/disapprove/:musicID_** -> Desaprova a música escolhida
  
3. ### PATCH
  * **_/musics/:musicID_** -> Atualiza música escolhida

4. ### DELETE
  * **_/musics/:musicID_** -> Deleta a música escolhida
  
## Body das Requisições
Para algumas requisições (como atualizar ou inserir novos dados) é *necessário* que haja um body, conforme segue:

### Inserir Música ou Atualizar
```javascript
{
  name: String,
  author: String,
  path: String
}
```

### Inserir Usuário
```javascript
{
  user: String,
  password: String,
  type: Number
}
```
Para o tipo admin: _type = 1_; Para o tipo usuário: _type = 2_.
**Todos os campos são obrigatórios**

Para testes, basta utilizar *Postman* ou *Insomnia* e seguir esse padrão de body para as requisições.
A aplicação utiliza meu banco de dados no MongoDB Atlas, com alguns pré cadastros.

# OBRIGADO
