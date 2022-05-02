# Teste BuildIT - CRUD no projeto PetShop

## Descrição do projeto
<p align="center">O objetivo desse projeto foi realizar um CRUD em banco de dados, cadastrando animais e seus respectivos donos para um petshop. Esse é um teste para a vaga de Desenvolvedor Fullstack Jr. na empresa BuildIT!</p>

### Pré-requisitos
Antes de começar o projeto, é necessário ter as seguintes ferramentas em sua máquina:
[Git](https://git-scm.com)
[NodeJS](https://nodejs.org/en/);
[MySQL](https://dev.mysql.com/downloads/);
[Workebench](https://dev.mysql.com/downloads/);
E claro, um bom editor de código. Eu recomendo o [VSCode](https://code.visualstudio.com/), mas fica a sua preferência!!

### Passo a passo de como rodar o projeto
O primeiro passo a ser realizado para que nosso projeto rode será a criação do nosso banco de dados, pois nele já existem algumas informações que serão utilizadas desde o início do nosso projeto!

Abra o MySQL Installer! 
Caso seja a primeira vez configurando o MySQL na sua máquina, recomendo esse [tutorial](https://dicasdeprogramacao.com.br/como-instalar-o-mysql-no-windows/)! Ah, não precisa instalar tudo o que o MySQL oferece. Para esse projeto, basta instalar o MySQL Server (pois é onde ficará armazenado nosso banco) e o MySQL Workbench. 
Caso você já tenha ele instalado, vá em reconfigurar o MySQL Server e avance até a opção de troca de senha. O usuário que iremos utilizar para esse teste será o usuário root! Altere a senha para "teste".
Se você não quiser alterar a senha do usuário root, aguarde um pouquinho, pois já irei mostrar como altera no código! 

Agora será necessário clonar este repositório. No seu terminal/cmd, digite o seguinte comando:
```bash
$ git clone https://github.com/jonathannascimento00/projetoPet
```

Ainda pelo terminal, acesse a pasta do projeto com o comando:
```bash
$ cd projetoPet
```

Se você der o comando dir no terminal, você irá ver todas as pastas e arquivos que foram desenvolvidos.

Agora é hora de criarmos nosso banco! Abra o Workbench, faça login no servidor. Após o login ser realizado, abra o script "database-create.sql". Nele contém toda a estrutura de tabelas e os inserts necessários para que nossa aplicação rode. Esse passo é extremamente importante, pois sem ele, não terá como executarmos as funcionalidades do nosso projeto!

Caso você não tenha alterado a senha do usuário root do MySQL, abra o arquivo db.js dentro da pasta projetoPet. Caso você tenha VSCode, execute o comando "code ." dentro do terminal, que automaticamente o editor será aberto.
Após o arquivo db.js ser aberto, altere a const connection, onde existe o atributo "password" e coloque a senha que você deixou no usuário root!

Com o banco criado, vamos instalar as dependências do projeto! Esse passo é necessário para que o projeto seja executado. No terminal dê o seguinte comando:
```bash
$ npm install
```
Com isso, todas as dependências serão instaladas e o projeto poderá ser executado!

Agora é hora de rodarmos o projeto! Para isso, execute o comando:
```bash
$ node server.js
```

O nosso servidor irá rodar na porta 3000 do localhost. E para vermos ele rodando, abra o navegador de sua preferência e acesse: <http://localhost:3000>